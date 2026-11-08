// Spoločné typy, validácia a pomocné funkcie pre dáta z repa (používa server aj prehliadač).
export type Tech = { area: string; name: string; text: string };
export type Doc = { title: string; text: string; type: string; href: string };
export type Sprint = { n: number; range: string; status: string; done: number; total: number; text: string };
export type Remote = { tech: Tech[]; documents: Doc[]; sprints: Sprint[] };

export const DEFAULT_URL = "https://raw.githubusercontent.com/team-17-fiit/sats-seo-gis/main/docs/site.json";

const isStr = (v: unknown) => typeof v === "string" && v.length > 0;
export const valid = (x: any): x is Remote =>
  x &&
  Array.isArray(x.tech) && x.tech.every((t: any) => isStr(t?.area) && isStr(t?.name) && isStr(t?.text)) &&
  Array.isArray(x.documents) && x.documents.every((d: any) => isStr(d?.title) && isStr(d?.text) && isStr(d?.href)) &&
  Array.isArray(x.sprints) && x.sprints.length > 0 &&
  x.sprints.every((s: any) => typeof s?.n === "number" && isStr(s?.range) && isStr(s?.status) && isStr(s?.text) && typeof s?.done === "number" && typeof s?.total === "number");

const plural = (n: number, one: string, few: string, many: string) => (n === 1 ? one : n >= 2 && n <= 4 ? few : many);

export function computeStats(membersCount: number, sprints: Sprint[]): [string, string][] {
  const tasks = sprints.reduce((a, s) => a + s.total, 0);
  return [
    [String(membersCount), plural(membersCount, "člen tímu", "členovia tímu", "členov tímu")],
    [String(sprints.length), plural(sprints.length, "šprint", "šprinty", "šprintov")],
    [String(tasks), plural(tasks, "úloha v šprintoch", "úlohy v šprintoch", "úloh v šprintoch")],
  ];
}
