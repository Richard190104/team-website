"use client";

import { useEffect, useRef, useState } from "react";

const links = [
  ["O projekte", "projekt"],
  ["Technológie", "technologie"],
  ["Dokumenty", "dokumenty"],
  ["Šprinty", "sprinty"],
  ["Tím", "tim"],
  ["Kontakt", "kontakt"],
] as const;

const pad = (n: number) => String(n).padStart(2, "0");
const T = (d: boolean) => (d ? "t-d" : "t-l");
const clamp = (n: number) => Math.min(1, Math.max(0, n));

export default function Header({ team, season }: { team: string; season: string }) {
  const [s, setS] = useState({ active: -1, solid: false, p: 0 });
  const [open, setOpen] = useState(false);
  const [ind, setInd] = useState({ left: 0, width: 0 });
  const refs = useRef<(HTMLAnchorElement | null)[]>([]);
  const sideRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const logoRef = useRef<HTMLAnchorElement | null>(null);
  const barRef = useRef<HTMLDivElement | null>(null);
  const toneKey = useRef("");
  const [tones, setTones] = useState({
    logo: true, bar: true,
    items: links.map(() => true), segs: links.slice(1).map(() => true),
  });

  useEffect(() => {
    let raf = 0;
    const calc = () => {
      raf = 0;
      const sy = window.scrollY;
      const vh = window.innerHeight;
      const y = sy + vh * 0.35;
      let active = -1;
      links.forEach(([, id], k) => {
        const el = document.getElementById(id);
        if (el && y >= el.getBoundingClientRect().top + sy) active = k;
      });
      const heroH = (document.querySelector(".hero") as HTMLElement | null)?.offsetHeight ?? 0;
      const max = document.documentElement.scrollHeight - vh;
      const next = { active, solid: sy > heroH - 80, p: max > 0 ? sy / max : 0 };
      setS((prev) =>
        prev.active === next.active && prev.solid === next.solid && Math.abs(prev.p - next.p) < 0.002 ? prev : next
      );

      // farba menu podľa pozadia pod jednotlivými prvkami
      const zones = Array.from(document.querySelectorAll(".hero, .sec.dark, .footer")).map((e) => e.getBoundingClientRect());
      const dark = (yy: number) => zones.some((r) => yy >= r.top && yy < r.bottom);
      const mid = (el: Element | null) => { if (!el) return 0; const r = el.getBoundingClientRect(); return r.top + r.height / 2; };
      const ys = links.map((_, i) => mid(sideRefs.current[i]));
      const nt = {
        logo: dark(mid(logoRef.current)),
        bar: dark(mid(barRef.current)),
        items: ys.map(dark),
        segs: ys.slice(1).map((yy, i) => dark((yy + ys[i]) / 2)),
      };
      const key = JSON.stringify(nt);
      if (key !== toneKey.current) { toneKey.current = key; setTones(nt); }

      // časová os šprintov – vypĺňa sa pri scrolle
      const tl = document.querySelector(".timeline") as HTMLElement | null;
      if (tl) {
        const r = tl.getBoundingClientRect();
        tl.style.setProperty("--fill", String(clamp((vh * 0.65 - r.top) / r.height)));
        tl.querySelectorAll(".tl-item").forEach((li) =>
          li.classList.toggle("on", li.getBoundingClientRect().top < vh * 0.65)
        );
      }
    };
    const on = () => { if (!raf) raf = requestAnimationFrame(calc); };
    calc();

    document.documentElement.classList.add("js");
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && (e.target.classList.add("in"), io.unobserve(e.target))),
      { threshold: 0.12 }
    );
    document.querySelectorAll(".sec-head, .sec-body").forEach((el) => io.observe(el));

    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => {
      window.removeEventListener("scroll", on);
      window.removeEventListener("resize", on);
      io.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    const el = refs.current[s.active];
    if (el) setInd({ left: el.offsetLeft + 14, width: el.offsetWidth - 28 });
  }, [s.active]);

  const t = Math.max(s.active, 0);

  return (
    <>
    <aside className="side">
      <a href="#" className={`logo ${T(tones.logo)}`} ref={logoRef}>
        <i>S</i>
        <span>{team}<small>FIIT STU · {season}</small></span>
      </a>

      <div className="trail">
        <svg className="rail" width="16" height={links.length * 44} viewBox={`0 0 16 ${links.length * 44}`} aria-hidden>
          {links.slice(1).map((_, i) => (
            <g key={i} className={T(tones.segs[i])}>
              <rect className="track" x="7" y={22 + i * 44} width="2" height="44" />
              <rect className="fill" x="7" y={22 + i * 44} width="2" height="44" style={{ transform: `scaleY(${clamp(t - i)})` }} />
            </g>
          ))}
          {links.map((_, i) => (
            <g key={i} className={`node ${T(tones.items[i])} ${i === s.active ? "on" : i < s.active ? "past" : ""}`}>
              <rect className="halo" x="-2" y={12 + i * 44} width="20" height="20" />
              <rect className="box" x="2" y={16 + i * 44} width="12" height="12" />
            </g>
          ))}
        </svg>
        <nav>
          {links.map(([label, id], i) => (
            <a
              key={id}
              href={`#${id}`}
              ref={(el) => { sideRefs.current[i] = el; }}
              className={`${T(tones.items[i])} ${i === s.active ? "on" : i < s.active ? "past" : ""}`}
            >
              <em>{pad(i + 1)}</em>
              {label}
            </a>
          ))}
        </nav>
      </div>

      <div className={`side-bar ${T(tones.bar)}`} ref={barRef}><i style={{ width: `${s.p * 100}%` }} /></div>
    </aside>

    <header className={`nav${s.solid || open ? " solid" : ""}`}>
      <div className="wrap nav-in">
        <a href="#" className="logo" onClick={() => setOpen(false)}>
          <i>S</i>
          {team}
        </a>
        <nav className={`links${open ? " open" : ""}`}>
          {links.map(([label, id], i) => (
            <a
              key={id}
              href={`#${id}`}
              ref={(el) => { refs.current[i] = el; }}
              className={i === s.active ? "on" : ""}
              onClick={() => setOpen(false)}
            >
              {label}
            </a>
          ))}
          <span className="ind" style={{ left: ind.left, width: ind.width, opacity: s.active >= 0 ? 1 : 0 }} />
        </nav>
        <button className="burger" aria-label="Menu" aria-expanded={open} onClick={() => setOpen((v) => !v)}>
          <span /><span />
        </button>
      </div>
      <div className="progress"><i style={{ width: `${s.p * 100}%` }} /></div>
    </header>
    </>
  );
}
