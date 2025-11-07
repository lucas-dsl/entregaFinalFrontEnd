export type Avaliacao = {
  idAvaliacao: number;
  idLog?: number;
  nota: number;
  comentario?: string;
};

// GET
export async function getAvaliacoes(url = "/api/avaliacoes"): Promise<Avaliacao[]> {
  const r = await fetch(url);
  if (!r.ok) throw new Error(`GET ${r.status}`);
  return r.json();
}

// POST
export async function createAvaliacao(
  body: { nota: number; comentario: string; idLog?: number },
  url = "/api/avaliacoes"
) {
  const r = await fetch(url, {
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