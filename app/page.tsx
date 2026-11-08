import Header from "@/components/Header";
import Section from "@/components/Section";
import Contours from "@/components/Contours";
import { ArrowIcon, DataIcon, FileIcon, MapIcon, OfflineIcon } from "@/components/Icons";
import { about, documents, members, project, sprints, stats, tech } from "@/lib/data";

const icons = [MapIcon, OfflineIcon, DataIcon];
const initials = (n: string) => n.split(" ").map((p) => p[0]).slice(0, 2).join("").toUpperCase();

const base = process.env.NEXT_PUBLIC_BASE_PATH || "";

export default function Home() {
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
          <div className="grid">
            {documents.map((d) => (
              <a key={d.title} href={d.href.startsWith("http") ? d.href : `${base}${d.href}`} className="card doc" target={d.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">
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
