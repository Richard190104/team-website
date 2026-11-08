// Pevné údaje webu: projekt, o projekte, tím, zápisnice. Šprinty, technológie a dokumenty
// sa sťahujú z docs/site.json v repozitári appky (pozri lib/remote.ts). TODO = zatiaľ neznáme.
export const project = {
  season: "2026/27",
  team: "SATS-SEO-GIS",
  title: "Mapa aktívneho turizmu na Slovensku",
  tagline: "Webová aplikácia s mapou turistických trás, vrcholov a miest, v slovenčine aj angličtine.",
  email: "tim@example.com", // TODO: tímový e-mail
};

export const about = {
  text: "Tímový projekt FIIT STU. Aplikácia zobrazuje slovenské turistické trasy, vrcholy a miesta na mape. Každá trasa a každé miesto má vlastnú staticky generovanú stránku pripravenú pre vyhľadávače. Dáta spracúvame z OpenStreetMap a ďalších zdrojov v databáze PostGIS.",
  points: [
    { title: "Interaktívna mapa", text: "Mapa v MapLibre GL s geometriou trás, zhlukovaním bodov a odloženým načítaním." },
    { title: "Stránky pre vyhľadávače", text: "Samostatné stránky trás, vrcholov a miest so schema.org, sitemap a hreflang pre SK a EN." },
    { title: "Dáta", text: "Import z OpenStreetMap, GeoNames, rurAllure a Natural Earth do PostGIS, 7 tematických trás." },
  ],
};

export const minutes = [
  { title: "Zápisnica 3. 11. 2026", text: "Zmena v tíme, retrospektíva 1. šprintu, demo stránky (Lighthouse 100/100/100)", href: "/zapisnice/zapisnica_3_11_2026.docx" },
  { title: "Zápisnica 27. 10. 2026", text: "Založenie GitHubu, Plane, plánovanie 2. šprintu", href: "/zapisnice/zapisnica_27_10_2026.docx" },
  { title: "Zápisnica 20. 10. 2026", text: "Výber technológií (React, Next.js), use case diagramy", href: "/zapisnice/zapisnica_20_10_2026.docx" },
  { title: "Zápisnica 12. 10. 2026", text: "Predstavenie zadania, rozdelenie rolí, plánovanie 1. šprintu", href: "/zapisnice/zapisnica_12_10_2026.docx" },
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
