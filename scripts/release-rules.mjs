import fs from "node:fs";
import path from "node:path";
const HOME = process.env.USERPROFILE || process.env.HOME;
const cfg = JSON.parse(fs.readFileSync(path.join(HOME, ".config", "configstore", "firebase-tools.json"), "utf8"));
const T = cfg.tokens.access_token;
const H = { Authorization: `Bearer ${T}`, "Content-Type": "application/json" };
const PID = "blogging-5760b";
// create ruleset
const content = "rules_version = '2';\nservice firebase.storage {\n  match /b/{bucket}/o {\n    match /{allPaths=**} {\n      allow read: if true;\n      allow write: if false;\n    }\n  }\n}";
const rs = await fetch(`https://firebaserules.googleapis.com/v1/projects/${PID}/rulesets`, { method: "POST", headers: H, body: JSON.stringify({ source: { files: [{ name: "storage.rules", content }] } }) });
const rsj = await rs.json();
console.log("ruleset:", rs.status, rsj.name || rsj.error?.message?.slice(0, 100));
if (rs.ok && rsj.name) {
  // PATCH existing release to point to new ruleset
  const rel = await fetch(`https://firebaserules.googleapis.com/v1/projects/${PID}/releases/firebase.storage?updateMask=rulesetName`, { method: "PATCH", headers: H, body: JSON.stringify({ name: `projects/${PID}/releases/firebase.storage`, rulesetName: rsj.name }) });
  const relj = await rel.json();
  console.log("release PATCH:", rel.status, rel.ok ? "OK — public read enabled" : relj.error?.message?.slice(0, 120));
}
