"use client";
import { useEffect, useRef, useState } from "react";
import { ArrowIcon, FileIcon } from "@/components/Icons";

type Item = { title: string; text: string; href: string; type?: string };
const base = process.env.NEXT_PUBLIC_BASE_PATH || "";
const url = (h: string) => (h.startsWith("http") ? h : `${base}${h}`);

export default function Docs({ documents, minutes }: { documents: Item[]; minutes: Item[] }) {
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <div className="grid">
        <button type="button" className="card doc doc-btn" onClick={() => setOpen(true)} aria-haspopup="dialog">
          <div className="doc-top">
            <div className="ico"><FileIcon /></div>
            <span className="tag mute">{minutes.length} súbory</span>
          </div>
          <h3>Zápisnice</h3>
          <p>Zápisy zo stretnutí tímu, od zadania po retrospektívu 1. šprintu.</p>
          <span className="go"><ArrowIcon /></span>
        </button>
        {documents.map((d) => (
          <a key={d.title} href={url(d.href)} className="card doc" target={d.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">
            <div className="doc-top">
              <div className="ico"><FileIcon /></div>
              <span className="tag mute">{d.type}</span>
            </div>
            <h3>{d.title}</h3>
            <p>{d.text}</p>
            <span className="go"><ArrowIcon /></span>
          </a>
        ))}
      </div>

      {open && (
        <div className="modal" onClick={() => setOpen(false)}>
          <div className="modal-box" role="dialog" aria-modal="true" aria-label="Zápisnice" onClick={(e) => e.stopPropagation()}>
            <div className="modal-head">
              <h3>Zápisnice</h3>
              <button ref={closeRef} type="button" className="modal-x" onClick={() => setOpen(false)} aria-label="Zavrieť">×</button>
            </div>
            <ul className="modal-list">
              {minutes.map((m) => (
                <li key={m.title}>
                  <a href={url(m.href)} download>
                    <span className="m-t">{m.title}</span>
                    <span className="m-d">{m.text}</span>
                    <span className="tag mute">DOCX</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
