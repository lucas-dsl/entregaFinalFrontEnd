export type Avaliacao = {
  idAvaliacao: number;
  idLog?: number;
  nota: number;
  comentario?: string;
};

const RAW = (import.meta.env.VITE_API_BASE as string | undefined) ?? "/api";
const API_BASE = RAW.replace(/\/+$/, "");
export const AVALIACOES_URL = `${API_BASE}/avaliacoes`;

export async function getAvaliacoes() {
  const r = await fetch(AVALIACOES_URL, { method: "GET" });
  const txt = await r.text().catch(() => "");
  if (!r.ok) throw new Error(`GET ${r.status} ${txt}`);
  return txt ? JSON.parse(txt) : [];
}

export async function createAvaliacao(body: { nota: number; comentario?: string; idLog?: number }) {
  const payload = {
    nota: Math.max(1, Math.min(5, Math.floor(body.nota))),
    comentario: (body.comentario ?? "").slice(0, 67),
    idLog: body.idLog ?? 1,
  };
  const r = await fetch(AVALIACOES_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(payload),
  });
  const txt = await r.text().catch(() => "");
  if (!r.ok) throw new Error(`POST ${r.status} ${txt}`);
  return txt ? JSON.parse(txt) : null;
}