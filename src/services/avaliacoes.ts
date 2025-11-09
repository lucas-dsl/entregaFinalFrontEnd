export type Avaliacao = {
  idAvaliacao: number;
  idLog?: number;
  nota: number;
  comentario?: string;
};

const API_BASE = (import.meta.env.VITE_API_BASE as string | undefined)?.replace(/\/+$/, "");
if (!API_BASE) {
  throw new Error("VITE_API_BASE não configurada no build (Vercel Settings › Environment Variables).");
}

const AVALIACOES_URL = `${API_BASE}/avaliacoes`;

if (typeof window !== "undefined") {
  console.log("API_BASE =", API_BASE);
  console.log("AVALIACOES_URL =", AVALIACOES_URL);
}

export async function getAvaliacoes(): Promise<Avaliacao[]> {
  const r = await fetch(AVALIACOES_URL, { method: "GET" });
  if (!r.ok) throw new Error(`GET ${r.status}`);
  return r.json();
}

export async function createAvaliacao(body: { nota: number; comentario?: string; idLog?: number }) {
  const r = await fetch(AVALIACOES_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json", "Accept": "application/json" },
    body: JSON.stringify(body),
  });
  if (!r.ok) {
    const txt = await r.text().catch(() => "");
    throw new Error(`POST ${r.status} ${txt}`);
  }
  try { return await r.json(); } catch { return null; }
}