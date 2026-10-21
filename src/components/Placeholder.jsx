/* Gradient placeholder art (works offline — no external images) */

const ICONS = {
  doc: <path d="M7 9h10M7 13h6" />,
  grid: <path d="M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z" />,
  chart: <path d="M3 21h18M6 21V10m6 11V4m6 17v-8" />,
  spark: <path d="M12 3l2.2 5.6L20 11l-5.8 2.4L12 19l-2.2-5.6L4 11l5.8-2.4z" />,
  search: (<><circle cx="10" cy="10" r="6" /><path d="m20 20-5.5-5.5" /></>),
  code: <path d="m8 8-4 4 4 4m8-8 4 4-4 4" />,
  money: (<><circle cx="12" cy="12" r="9" /><path d="M15 9.5A2.5 2.5 0 0 0 12 8c-1.4 0-2.5.9-2.5 2S10.6 12 12 12s2.5.9 2.5 2-1.1 2-2.5 2a2.5 2.5 0 0 1-3-2.2M12 6v2m0 8v2" /></>),
  bolt: <path d="M13 2 4 14h6l-1 8 9-12h-6z" />,
  globe: (<><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a15 15 0 0 1 0 18 15 15 0 0 1 0-18" /></>),
  palette: <path d="M12 3a9 9 0 1 0 0 18c1.5 0 2-1 1.3-2-1-1.4-.2-3 1.7-3H18a3 3 0 0 0 3-3c0-5.5-4-10-9-10z" />,
  megaphone: <path d="M3 11v4l12 5V6L3 11zm12-1 4-2v10l-4-2M8 16v4" />,
  robot: (<><rect x="5" y="8" width="14" height="10" rx="2" /><path d="M12 8V4m-3 9h.01M15 13h.01M9 21h6" /></>),
  scroll: <path d="M7 4h11v13a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3V6a2 2 0 0 1 2-2zm2 5h7M9 13h7" />,
};

export default function Placeholder({ ph = "ph-1", icon = "doc", aspect = "", img = "" }) {
  return (
    <div className={`ph ${ph} ${aspect}`} aria-hidden="true">
      {img
        ? <img src={img} alt="" loading="lazy" />
        : <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
            {ICONS[icon] || ICONS.doc}
          </svg>}
    </div>
  );
}
