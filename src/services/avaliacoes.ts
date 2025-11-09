export type Avaliacao = {
  idAvaliacao: number;
  idLog?: number;
  nota: number;
  comentario?: string;
};

const ENDPOINT = (import.meta.env.VITE_AVALIACOES_URL || "").trim();
const API_BASE = (import.meta.env.VITE_API_BASE || "").replace(/\/+$/, "");

function resolveUrl(u?: string) {
  if (u && /^https?:\/\//.test(u)) return u;
  if (ENDPOINT) return ENDPOINT;
  const path = (u || "/avaliacoes").startsWith("/")
    ? (u || "/avaliacoes")
    : `/${u || "avaliacoes"}`;
  return API_BASE ? `${API_BASE}${path}` : path;
}

// GET
export async function getAvaliacoes(url?: string): Promise<Avaliacao[]> {
  const r = await fetch(resolveUrl(url));
  if (!r.ok) throw new Error(`GET ${r.status}`);
  return r.json();
}

// POST
export async function createAvaliacao(
  body: { nota: number; comentario: string; idLog?: number },
  url?: string
) {
  const r = await fetch(resolveUrl(url), {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(body),
  });
  if (!r.ok) {
    const txt = await r.text().catch(() => "");
    throw new Error(`POST ${r.status} ${txt}`);
  }
  try {
    return await r.json();
  } catch {
    return null;
  }
}