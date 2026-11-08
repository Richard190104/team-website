"use client";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Section from "@/components/Section";
import Contours from "@/components/Contours";
import { ArrowIcon, DataIcon, MapIcon, OfflineIcon } from "@/components/Icons";
import Docs from "@/components/Docs";
import { about, members, minutes, project } from "@/lib/data";
import fallback from "@/data/site.json";

// Obsah z repa appky (šprinty, technológie, dokumenty). Ak fetch nepôjde, ostane lokálna záloha.
const SITE_URL = process.env.NEXT_PUBLIC_SITE_DATA_URL || "https://raw.githubusercontent.com/team-17-fiit/sats-seo-gis/main/docs/site.json";

const icons = [MapIcon, OfflineIcon, DataIcon];
const initials = (n: string) => n.split(" ").map((p) => p[0]).slice(0, 2).join("").toUpperCase();

export default function Home() {
  const [site, setSite] = useState(fallback);
  useEffect(() => {
    fetch(SITE_URL).then((r) => r.json()).then((j) => j.tech && j.documents && j.sprints && setSite(j)).catch(() => {});
  }, []);
  const { tech, documents, sprints } = site;
  const nSp = sprints.length;
  const stats = [
    [String(members.length), "členov tímu"],
    [String(nSp), nSp === 1 ? "šprint" : nSp < 5 ? "šprinty" : "šprintov"],
    [String(sprints.reduce((a, s) => a + s.total, 0)), "úloh v šprintoch"],
  ];
  return (
    <>
      <Header team={project.team} season={project.season} />
      <main>
        <section className="hero">
          <Contours seed={1} rings={9} />
          <div className="wrap hero-wrap">
            <div className="hero-main">
              <h1>{project.title}</h1>
              <p className="hero-sub">{project.tagline}</p>
              <div className="actions">
                <a className="btn primary" href="#projekt">Chcem vedieť viac</a>
                <a className="btn ghost" href="#dokumenty">Dokumenty</a>
              </div>
            </div>
            <dl className="stats">
              {stats.map(([v, l]) => (
                <div key={l}>
                  <dt>{v}</dt>
                  <dd>{l}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <Section id="projekt" title="O projekte" lead={about.text}>
          <div className="grid">
            {about.points.map((p, i) => {
              const Icon = icons[i % icons.length];
              return (
                <article key={p.title} className="card">
                  <div className="ico"><Icon /></div>
                  <h3>{p.title}</h3>
                  <p>{p.text}</p>
                </article>
              );
            })}
          </div>
        </Section>

        <Section id="technologie" title="Technológie" alt>
          <ul className="list">
            {tech.map((t) => (
              <li key={t.name}>
                <h3>{t.name}</h3>
                <p>{t.text}</p>
                <span className="tag">{t.area}</span>
              </li>
            ))}
          </ul>
        </Section>

        <Section id="dokumenty" title="Dokumenty" lead="Zápisnice, retrospektívy, metodiky a dokumentácia na jednom mieste.">
          <Docs documents={documents} minutes={minutes} />
        </Section>

        <Section id="sprinty" title="Šprinty" alt>
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
        </Section>

        <Section id="tim" title="Tím">
          <div className="grid">
            {members.map((m, i) => (
              <article key={i} className="card member">
                <div className="avatar">{initials(m.name)}</div>
                <div>
                  <h3>{m.name}</h3>
                  <div className="roles">
                    {m.roles.map((r) => <span key={r} className="tag">{r}</span>)}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </Section>

        <Section id="kontakt" title="Kontakt" lead="Máte otázku k projektu alebo záujem o spoluprácu? Napíšte nám." dark>
          <a className="btn primary big" href={`mailto:${project.email}`}>{project.email}</a>
        </Section>
      </main>
      <footer className="footer">
        <div className="wrap foot-in">
          <span>{project.team}</span>
          <span>FIIT STU · {project.season}</span>
        </div>
      </footer>
    </>
  );
}
