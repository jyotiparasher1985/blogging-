/**
 * NewsScope → Firebase migration (one-shot seed)
 * - Firestore: SITE, POSTS, FILTERS, LATEST, PLATFORMS, QUICK_PICKS, FAQS, CITATIONS, NEWS_SOURCE, NEWS
 * - Storage: public/img/*.jpg → gs://bucket/img/*.jpg (+ public-read rules best-effort)
 * Evidence: Evidence/firebase-migration.json
 * Run: node scripts/seed-firebase.mjs
 */
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

const PID = process.argv[2] || "blogging-5760b";
const HOME = process.env.USERPROFILE || process.env.HOME;
const cfg = JSON.parse(fs.readFileSync(path.join(HOME, ".config", "configstore", "firebase-tools.json"), "utf8"));
const TOKEN = cfg.tokens?.access_token;
if (!TOKEN) throw new Error("No access token — run `npx.cmd firebase projects:list` first");
const H = { Authorization: `Bearer ${TOKEN}`, "Content-Type": "application/json" };
const j = (r) => r.json().catch(() => ({}));

/* ---------- 1) Load site data (Vite ESM data file) ---------- */
let src = fs.readFileSync("src/data/posts.js", "utf8").replace(/export\s+const/g, "const");
const modUrl = "data:text/javascript;charset=utf-8," + encodeURIComponent(
  src + "\nexport { SITE, POSTS, FILTERS, LATEST, PLATFORMS, QUICK_PICKS, FAQS, CITATIONS, NEWS_SOURCE, NEWS };"
);
const D = await import(modUrl);

/* ---------- 2) Firestore value converter ---------- */
function val(v) {
  if (v === null || v === undefined) return { nullValue: null };
  if (typeof v === "boolean") return { booleanValue: v };
  if (typeof v === "number") return Number.isInteger(v) ? { integerValue: String(v) } : { doubleValue: v };
  if (typeof v === "string") return { stringValue: v };
  if (Array.isArray(v)) return { arrayValue: { values: (v.length ? v : [null]).map(val) } };
  return { mapValue: { fields: Object.fromEntries(Object.entries(v).filter(([, x]) => x !== undefined).map(([k, x]) => [k, val(x)])) } };
}
const FS_BASE = `https://firestore.googleapis.com/v1/projects/${PID}/databases/(default)/documents`;
async function writeDoc(coll, docId, data) {
  const fields = Object.fromEntries(
    Object.entries(data).filter(([, x]) => x !== undefined).map(([k, x]) => [k, val(x)])
  );
  const r = await fetch(`${FS_BASE}/${coll}/${docId}`, { method: "PATCH", headers: H, body: JSON.stringify({ fields }) });
  return { coll, id: docId, ok: r.ok, status: r.status, err: r.ok ? null : (await j(r)).error?.message?.slice(0, 140) };
}

/* ---------- 3) Seed Firestore ---------- */
const plan = [];
plan.push(["site", "main", D.SITE]);
D.POSTS.forEach((p) => plan.push(["posts", p.slug, p]));
D.FILTERS.forEach((f, i) => plan.push(["filters", String(i), f]));
D.LATEST.forEach((l, i) => plan.push(["latest", String(i), l]));
D.PLATFORMS.forEach((p, i) => plan.push(["platforms", String(i).padStart(2, "0"), p]));
D.QUICK_PICKS.forEach((q, i) => plan.push(["quick_picks", String(i), q]));
D.FAQS.forEach((f, i) => plan.push(["faqs", String(i), f]));
D.CITATIONS.forEach((c, i) => plan.push(["citations", String(i), c]));
plan.push(["news_source", "main", D.NEWS_SOURCE]);
D.NEWS.forEach((n, i) => plan.push(["news", String(i), n]));

const results = [];
for (let i = 0; i < plan.length; i += 8) {
  const chunk = plan.slice(i, i + 8);
  const rs = await Promise.all(chunk.map(([c, id, d]) => writeDoc(c, id, d)));
  results.push(...rs);
}
const fsOk = results.filter((r) => r.ok).length;
console.log(`Firestore: ${fsOk}/${plan.length} docs written`);

/* ---------- 4) Storage: detect/create bucket ---------- */
const bucketCandidates = [`${PID}.appspot.com`, `${PID}.firebasestorage.app`];
let bucket = null, bucketStatus = null;
for (const b of bucketCandidates) {
  const r = await fetch(`https://firebasestorage.googleapis.com/v0/b/${b}/o?maxResults=1`, { headers: { Authorization: `Bearer ${TOKEN}` } });
  if (r.status === 200) { bucket = b; bucketStatus = `existing (${b})`; break; }
  bucketStatus = `missing (${b} → ${r.status})`;
}
if (!bucket) {
  bucket = `${PID}.firebasestorage.app`;
  // route 1: Firebase Storage admin API
  let created = false, lastErr = null;
  const r1 = await fetch(`https://firebasestorage.googleapis.com/v0/a/${PID}/b`, { method: "POST", headers: H, body: JSON.stringify({ name: bucket }) }).catch((e) => null);
  if (r1?.ok) { created = true; lastErr = null; }
  else if (r1) lastErr = `v0/a route: ${r1.status} ${(await j(r1)).error?.message?.slice(0, 90)}`;
  // route 2: GCS JSON API
  if (!created) {
    const cr = await fetch(`https://storage.googleapis.com/storage/v1/b?project=${PID}`, { method: "POST", headers: H, body: JSON.stringify({ name: bucket }) });
    const crj = await j(cr);
    if (cr.ok) created = true;
    else if (crj?.error?.code === 409) { created = true; lastErr = null; }
    else lastErr = `GCS route: ${cr.status} ${crj?.error?.message?.slice(0, 120)}`;
  }
  bucketStatus = created ? `created (${bucket})` : `blocked (${lastErr})`;
}
console.log(`Storage bucket: ${bucketStatus}`);

/* ---------- 5) Upload images ---------- */
const files = fs.readdirSync("public/img").filter((f) => /\.(jpe?g|png|webp)$/i.test(f));
const uploads = [];
for (const f of files) {
  const buf = fs.readFileSync(path.join("public/img", f));
  const md5 = crypto.createHash("md5").update(buf).digest("hex");
  let up = await fetch(`https://firebasestorage.googleapis.com/v0/b/${bucket}/o?name=img/${f}`, {
    method: "POST", headers: { Authorization: `Bearer ${TOKEN}`, "Content-Type": "image/jpeg" }, body: buf,
  });
  let meta = await j(up);
  if (!up.ok) { // fallback: GCS JSON API upload
    up = await fetch(`https://storage.googleapis.com/upload/storage/v1/b/${bucket}/o?name=img/${f}&uploadType=media`, {
      method: "POST", headers: { Authorization: `Bearer ${TOKEN}`, "Content-Type": "image/jpeg" }, body: buf,
    });
    meta = await j(up);
  }
  const token = meta.downloadTokens?.split(",")[0];
  uploads.push({
    name: `img/${f}`, size: buf.length, md5,
    ok: up.ok, status: up.status,
    generation: meta.generation, downloadToken: token,
    downloadUrl: token ? `https://firebasestorage.googleapis.com/v0/b/${bucket}/o/${encodeURIComponent("img/" + f)}?alt=media&token=${token}` : null,
  });
}
console.log(`Storage upload: ${uploads.filter((u) => u.ok).length}/${files.length} files`);

/* ---------- 6) Public-read rules (best-effort) ---------- */
let rules = { attempted: true, ok: false };
try {
  const content = `rules_version = '2';\nservice firebase.storage {\n  match /b/${bucket}/o {\n    allow read: if true;\n    allow write: if false;\n  }\n}`;
  const rs = await fetch(`https://firebaserules.googleapis.com/v1/projects/${PID}/rulesets`, {
    method: "POST", headers: H, body: JSON.stringify({ source: { files: [{ name: "storage.rules", content }] } }),
  });
  const rsj = await j(rs);
  if (rs.ok && rsj.name) {
    const rel = await fetch(`https://firebaserules.googleapis.com/v1/projects/${PID}/releases`, {
      method: "POST", headers: H, body: JSON.stringify({ name: `projects/${PID}/releases/firebase.storage`, rulesetName: rsj.name }),
    });
    const relj = await j(rel);
    rules = { attempted: true, ok: rel.ok, ruleset: rsj.name, release: rel.ok ? "firebase.storage" : (relj.error?.message || `status ${rel.status}`).slice(0, 120) };
  } else {
    rules = { attempted: true, ok: false, error: (rsj.error?.message || `status ${rs.status}`).slice(0, 120) };
  }
} catch (e) { rules = { attempted: true, ok: false, error: String(e).slice(0, 120) }; }
console.log(`Storage rules public-read: ${rules.ok ? "released" : "best-effort failed — console me manually Get Started/Run rules"}`);

/* ---------- 7) Verify fetch-back ---------- */
const vDoc = await fetch(`${FS_BASE}/posts/${D.POSTS[0].slug}`, { headers: { Authorization: `Bearer ${TOKEN}` } });
const vDocj = await j(vDoc);
const verifyDoc = { path: `posts/${D.POSTS[0].slug}`, status: vDoc.status, titleMatches: vDocj.fields?.title?.stringValue === D.POSTS[0].title };
const sampleUpload = uploads.find((u) => u.ok && u.downloadUrl);
let verifyImg = null;
if (sampleUpload?.downloadUrl) {
  const dl = await fetch(sampleUpload.downloadUrl);
  const buf = Buffer.from(await dl.arrayBuffer());
  verifyImg = { name: sampleUpload.name, status: dl.status, md5Matches: crypto.createHash("md5").update(buf).digest("hex") === sampleUpload.md5 };
}
console.log(`Verify: doc ${verifyDoc.status}/${verifyDoc.titleMatches ? "title ✅" : "title ❌"} · img ${verifyImg ? verifyImg.status + "/" + (verifyImg.md5Matches ? "md5 ✅" : "md5 ❌") : "n/a"}`);

/* ---------- 8) Evidence dump ---------- */
const evidence = {
  project: PID,
  createdAt: new Date().toISOString(),
  method: "firebase-tools OAuth (cloud-platform scope) → Firestore REST v1 + Firebase Storage v0 / GCS JSON API",
  firestore: {
    database: "projects/blogging-5760b/databases/(default)",
    location: "asia-south1",
    collections: {
      site: 1, posts: D.POSTS.length, filters: D.FILTERS.length, latest: D.LATEST.length,
      platforms: D.PLATFORMS.length, quick_picks: D.QUICK_PICKS.length, faqs: D.FAQS.length,
      citations: D.CITATIONS.length, news_source: 1, news: D.NEWS.length,
    },
    totalDocs: plan.length, written: fsOk,
    failures: results.filter((r) => !r.ok),
    verify: verifyDoc,
    consoleUrl: "https://console.firebase.google.com/project/blogging-5760b/firestore/databases/-default-/data",
  },
  storage: {
    bucket, bucketStatus, rules,
    files: uploads,
    verify: verifyImg,
    consoleUrl: "https://console.firebase.google.com/project/blogging-5760b/storage",
  },
};
fs.mkdirSync("Evidence", { recursive: true });
fs.writeFileSync("Evidence/firebase-migration.json", JSON.stringify(evidence, null, 2));
console.log("Evidence: Evidence/firebase-migration.json");
console.log(fsOk === plan.length && uploads.every((u) => u.ok) ? "ALL-OK" : "PARTIAL — check failures in evidence JSON");
