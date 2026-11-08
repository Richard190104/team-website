const base = { width: 22, height: 22, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round" } as const;

export const MapIcon = () => (
  <svg {...base}><path d="M9 4 3 6v14l6-2 6 2 6-2V4l-6 2-6-2Z" /><path d="M9 4v14M15 6v14" /></svg>
);
export const OfflineIcon = () => (
  <svg {...base}><path d="M5 12.5a10 10 0 0 1 4-2.3M2 9a15 15 0 0 1 5-3M10 16a5 5 0 0 1 4 0M12 20h.01M3 3l18 18" /></svg>
);
export const DataIcon = () => (
  <svg {...base}><ellipse cx="12" cy="6" rx="8" ry="3" /><path d="M4 6v6c0 1.7 3.6 3 8 3s8-1.3 8-3V6M4 12v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6" /></svg>
);
export const FileIcon = () => (
  <svg {...base}><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Z" /><path d="M14 3v5h5M9 13h6M9 17h6" /></svg>
);
export const ArrowIcon = () => (
  <svg {...base} width={18} height={18}><path d="M7 17 17 7M8 7h9v9" /></svg>
);
