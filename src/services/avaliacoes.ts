export type Avaliacao = {
  idAvaliacao: number;
  idLog?: number;
  nota: number;
  comentario?: string;
};

const API_BASE = (import.meta.env.VITE_API_BASE as string).replace(/\/+$/, "");
const AVALIACOES_URL = `${API_BASE}/avaliacoes`;

export async function getAvaliacoes(): Promise<Avaliacao[]> {
  const r = await fetch(AVALIACOES_URL, { method: "GET" });
  if (!r.ok) throw new Error(`GET ${r.status}`);
  return r.json();
}

export async function createAvaliacao(body: { nota: number; comentario?: string; idLog?: number }) {
  const payload = {
    nota: Math.max(1, Math.min(5, Math.floor(body.nota))),
    comentario: (body.comentario ?? "").slice(0, 67),
    idLog: body.idLog ?? 1
  };

  const r = await fetch(`${API_BASE}/avaliacoes`, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(payload),
  });

  const txt = await r.text().catch(() => "");
  if (!r.ok) throw new Error(`POST ${r.status} ${txt}`);
  return txt ? JSON.parse(txt) : null;
}