"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { computeStats, DEFAULT_URL, valid, type Remote } from "@/lib/site";

const URL_ = process.env.NEXT_PUBLIC_SITE_DATA_URL || DEFAULT_URL;
const Ctx = createContext<Remote | null>(null);
export const useRemote = () => useContext(Ctx) as Remote;

// Východiskové dáta prídu z buildu. Po načítaní stránky sa stiahne čerstvý docs/site.json z repa,
// a ak sa nepodarí (privátne repo, výpadok, zlý tvar), ostanú východiskové (lokálna záloha).
export function RemoteProvider({ initial, children }: { initial: Remote; children: React.ReactNode }) {
  const [data, setData] = useState<Remote>(initial);
  useEffect(() => {
    const ac = new AbortController();
    fetch(URL_, { signal: ac.signal })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(`HTTP ${r.status}`))))
      .then((j) => valid(j) && setData(j))
      .catch(() => {});
    return () => ac.abort();
  }, []);
  return <Ctx.Provider value={data}>{children}</Ctx.Provider>;
}

export function Stats({ members }: { members: number }) {
  const { sprints } = useRemote();
  return (
    <dl className="stats">
      {computeStats(members, sprints).map(([v, l]) => (
        <div key={l}>
          <dt>{v}</dt>
          <dd>{l}</dd>
        </div>
      ))}
    </dl>
  );
}

export function TechList() {
  const { tech } = useRemote();
  return (
    <ul className="list">
      {tech.map((t) => (
        <li key={t.name}>
          <h3>{t.name}</h3>
          <p>{t.text}</p>
          <span className="tag">{t.area}</span>
        </li>
      ))}
    </ul>
  );
}

export function SprintList() {
  const { sprints } = useRemote();
  return (
    <ol className="timeline">
      {sprints.map((s) => (
        <li key={s.n} className="tl-item">
          <span className="tl-dot">{s.n}</span>
          <div className="tl-card">
            <div className="tl-meta">
              <span>Šprint {s.n} · {s.range}</span>
              <span className={`status st-${s.status}`}>{s.status}</span>
            </div>
            <p>{s.text}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
