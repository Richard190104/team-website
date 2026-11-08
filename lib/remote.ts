// Build: stiahne docs/site.json z repa appky, pri zlyhaní použije data/site.json.
// Tento výsledok je východiskový stav stránky. Prehliadač si potom pri načítaní stiahne čerstvú verziu (components/RemoteData.tsx).
import fallback from "@/data/site.json";
import { DEFAULT_URL, valid, type Remote } from "@/lib/site";

// Privátne repo: SITE_DATA_URL = https://api.github.com/repos/<org>/<repo>/contents/docs/site.json + SITE_DATA_TOKEN
const URL_ = process.env.SITE_DATA_URL || DEFAULT_URL;
const TOKEN = process.env.SITE_DATA_TOKEN;

export async function getRemote(): Promise<Remote> {
  try {
    const r = await fetch(URL_, {
      headers: TOKEN ? { Authorization: `Bearer ${TOKEN}`, Accept: "application/vnd.github.raw+json" } : undefined,
      signal: AbortSignal.timeout(10000),
    });
    if (!r.ok) throw new Error(`HTTP ${r.status}`);
    const j = await r.json();
    if (!valid(j)) throw new Error("neplatný tvar site.json");
    return j;
  } catch (e) {
    console.warn(`[site] použitá záložná kópia data/site.json (${e instanceof Error ? e.message : e})`);
    return fallback as unknown as Remote;
  }
}
