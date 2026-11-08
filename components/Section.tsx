export default function Section({
  id, eyebrow, title, lead, children, alt, dark,
}: {
  id: string; eyebrow?: string; title: string; lead?: string; children: React.ReactNode; alt?: boolean; dark?: boolean;
}) {
  return (
    <section id={id} className={`sec${alt ? " alt" : ""}${dark ? " dark" : ""}`}>
      <div className="wrap">
        <header className="sec-head">
          {eyebrow && <span className="eyebrow">{eyebrow}</span>}
          <h2>{title}</h2>
          {lead && <p className="lead">{lead}</p>}
        </header>
        <div className="sec-body">{children}</div>
      </div>
    </section>
  );
}
