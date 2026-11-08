// Zdroj pravdy: Plane (workspace SATS-SEO-GIS) a repozitár aplikácie (github.com/Matus17/sats-seo-gis).
// Stav úloh v šprintoch k 8. 11. 2026. TODO = v Plane ani v aplikácii zatiaľ nie je.
export const project = {
  season: "2026/27",
  team: "SATS-SEO-GIS",
  title: "Mapa aktívneho turizmu na Slovensku",
  tagline: "Webová aplikácia s mapou turistických trás, vrcholov a miest, v slovenčine aj angličtine.",
  email: "tim@example.com", // TODO: tímový e-mail
};

export const stats = [
  ["6", "členov tímu"]
];

export const about = {
  text: "Tímový projekt FIIT STU. Aplikácia zobrazuje slovenské turistické trasy, vrcholy a miesta na mape. Každá trasa a každé miesto má vlastnú staticky generovanú stránku pripravenú pre vyhľadávače. Dáta spracúvame z OpenStreetMap a ďalších zdrojov v databáze PostGIS.",
  points: [
    { title: "Interaktívna mapa", text: "Mapa v MapLibre GL s geometriou trás, zhlukovaním bodov a odloženým načítaním." },
    { title: "Stránky pre vyhľadávače", text: "Samostatné stránky trás, vrcholov a miest so schema.org, sitemap a hreflang pre SK a EN." },
    { title: "Dáta", text: "Import z OpenStreetMap, GeoNames, rurAllure a Natural Earth do PostGIS, 7 tematických trás." },
  ],
};

export const tech = [
  { area: "Frontend", name: "Next.js + React", text: "Next.js 15 a React 19 so statickým exportom, stránky sa generujú pri builde." },
  { area: "Mapa", name: "MapLibre GL", text: "Mapa za rozhraním MapAdapter, bez WebGL ju nahradí statický obrázok." },
  { area: "Backend", name: "Python + FastAPI", text: "REST API /api/v1 (trasy, miesta) a import dát (OSM, GeoNames, rurAllure)." },
  { area: "Dáta", name: "PostgreSQL + PostGIS", text: "Kanonická databázová schéma, import OpenStreetMap cez osm2pgsql." },
  { area: "Klient", name: "PWA", text: "Základ PWA s web manifestom, inštalovateľná aplikácia." },
  { area: "Kvalita", name: "Playwright, Vitest, Lighthouse CI", text: "Lint a testy na každý PR, Lighthouse: výkon a SEO ≥ 80 %, LCP ≤ 2,5 s, CLS ≤ 0,1." },
];

const repo = "https://github.com/Matus17/sats-seo-gis/tree/main/docs";
export const documents = [
  { title: "Zápisnice", text: "Zápisnice a revízie šprintov", type: "GitHub", href: `${repo}/minutes` },
  { title: "Metodiky", text: "Definition of Done, code review, testovanie, komunikácia", type: "GitHub", href: `${repo}/methodology` },
  { title: "Architektúra", text: "Cieľová architektúra systému", type: "GitHub", href: `${repo}/architecture` },
  { title: "Rozhodnutia (ADR)", text: "Záznamy architektonických rozhodnutí", type: "GitHub", href: `${repo}/adr` },
  { title: "Plánovanie", text: "Šprinty a register licencií dát", type: "GitHub", href: `${repo}/planning` },
];

export const sprints = [
  { n: 1, range: "12. 10. – 25. 10. 2026", text: "Repozitár, CI, licenčný register, prvý dátový extrakt. Hotových 15 z 15 úloh.", status: "hotovo" },
  { n: 2, range: "26. 10. – 8. 11. 2026", text: "Crawlovateľné stránky trás a miest, Wikidata, mapa s geometriou, SK/EN. Hotových 22 z 32 úloh, 4 sú v kontrole.", status: "prebieha" },
];

export const members = [
  // Roly podľa pridelených úloh v Plane (k 8. 11. 2026)
  { name: "Matúš Vrábel", roles: ["Dáta", "Databáza"] },
  { name: "Nikolas Kristin", roles: ["Frontend", "SEO"] },
  { name: "Matúš Plško", roles: ["Riadenie projektu", "Dokumentácia"] },
  { name: "Ivan Šport", roles: ["CI a testovanie", "Dáta"] },
  { name: "Richard Pukáč", roles: ["Web", "Design systém"] },
  { name: "Leon Radó", roles: ["Mapa", "Dáta"] },
];
