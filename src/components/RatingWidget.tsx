import { useEffect, useMemo, useState } from "react";
import { getAvaliacoes, createAvaliacao, type Avaliacao } from "../services/avaliacoes";

type Props = { url?: string; className?: string };

export default function RatingWidget({ url = "/api/avaliacoes", className }: Props) {
    const [open, setOpen] = useState(false);
    const [showAll, setShowAll] = useState(false);
    const [itens, setItens] = useState<Avaliacao[]>([]);
    const [score, setScore] = useState(0);
    const [comentario, setComentario] = useState("");
    const [sending, setSending] = useState(false);
    const [msg, setMsg] = useState<{ text: string; type: "ok" | "err" } | null>(null);

    useEffect(() => {
        getAvaliacoes(url)
            .then(setItens)
            .catch((e) => setMsg({ text: `Falha ao carregar: ${e.message}`, type: "err" }));
    }, [url]);

    const { media, total } = useMemo(() => {
        if (!itens.length) return { media: 0, total: 0 };
        const soma = itens.reduce((acc, a) => acc + (a.nota || 0), 0);
        return { media: soma / itens.length, total: itens.length };
    }, [itens]);

    async function enviar() {
        if (!score) {
            setMsg({ text: "Escolha uma nota de 1 a 5.", type: "err" });
            return;
        }

        setSending(true);
        setMsg(null);

        const comentarioSafe = (comentario?.trim() ?? "").slice(0, 255);
        const basePayload = { nota: Number(score), comentario: comentarioSafe };

        try {
            // 1ª tentativa: sem idLog (se o backend já aceitar, passa)
            await createAvaliacao(basePayload, url);
        } catch (e1: any) {
            try {
                // 2ª tentativa: com idLog padrão (para backend que ainda exige)
                await createAvaliacao({ ...basePayload, idLog: 1 }, url);
            } catch (e2: any) {
                setMsg({ text: `Não foi possível enviar: ${e2.message}`, type: "err" });
                setSending(false);
                return;
            }
        }

        const lista = await getAvaliacoes(url);
        setItens(lista);
        setScore(0);
        setComentario("");
        setMsg({ text: "Obrigado pela avaliação! ✨", type: "ok" });
        setSending(false);
    }

    const Star = ({ n }: { n: number }) => (
        <button
            type="button"
            onClick={() => setScore(n)}
            className={`text-2xl leading-none transition ${score >= n ? "text-amber-400" : "text-gray-400 hover:text-amber-400"
                } focus:outline-none focus:ring-2 focus:ring-[#007474]/30 rounded`}
            aria-label={`${n} estrela${n > 1 ? "s" : ""}`}
        >
            ★
        </button>
    );

    return (
        <div className={className}>
            {/* botão gatilho (abre/fecha card) */}
            <button
                onClick={() => setOpen((v) => !v)}
                className="rounded-full bg-[#007474] text-white px-4 py-2 sm:py-3 text-sm sm:text-base shadow-lg hover:bg-[#006262] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#007474]"
                aria-expanded={open}
            >
                {open ? "Fechar feedback" : "Avaliar chatbot"}
            </button>

            {/* card */}
            {open && (
                <div className="mt-3 w-full sm:w-80 rounded-2xl border bg-white/95 shadow-xl backdrop-blur p-4">
                    <div className="flex items-start justify-between">
                        <h3 className="font-semibold text-gray-900">Avalie o Chatbot</h3>
                        <span className="text-sm text-gray-600">
                            {media.toFixed(1)}★ <span className="text-gray-400">·</span> {total}
                        </span>
                    </div>

                    <div className="mt-2 flex gap-2">{[1, 2, 3, 4, 5].map((n) => <Star key={n} n={n} />)}</div>

                    <textarea
                        className="mt-3 w-full rounded-xl border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#007474]/40"
                        placeholder="Comentário (opcional)"
                        rows={3}
                        value={comentario}
                        onChange={(e) => setComentario(e.target.value)}
                    />

                    <div className="mt-1 text-right text-xs text-gray-500">
                        {comentario.length}/255
                    </div>

                    <button
                        onClick={enviar}
                        disabled={sending || !score}
                        className="mt-3 w-full rounded-xl bg-[#007474] text-white font-semibold py-2 hover:bg-[#006262] disabled:opacity-60"
                    >
                        {sending ? "Enviando..." : "Enviar avaliação"}
                    </button>

                    {msg && (
                        <p className={`mt-2 text-sm ${msg.type === "ok" ? "text-emerald-700" : "text-rose-700"} break-words`}>
                            {msg.text}
                        </p>
                    )}

                    <button
                        onClick={() => setShowAll(true)}
                        className="mt-3 w-full text-sm underline text-gray-700 hover:text-gray-900"
                    >
                        Ver todas as avaliações
                    </button>
                </div>
            )}

            {/* modal com todas as avaliações */}
            {showAll && (
                <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40" role="dialog" aria-modal="true">
                    <div className="w-[100vw] sm:w-[92vw] sm:max-w-xl h-[92dvh] sm:h-auto sm:max-h-[80vh] rounded-t-2xl sm:rounded-2xl bg-white shadow-2xl p-4">
                        <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold">Todas as avaliações</h4>
                            <button
                                onClick={() => setShowAll(false)}
                                className="rounded-lg px-2 py-1 border hover:bg-gray-50"
                                aria-label="Fechar"
                            >
                                ✕
                            </button>
                        </div>

                        <div className="max-h-[78dvh] sm:max-h-96 overflow-y-auto pr-1">
                            <ul className="space-y-2">
                                {itens.length ? (
                                    itens.map((a) => (
                                        <li key={a.idAvaliacao} className="rounded-xl border bg-white p-2">
                                            <div className="flex items-start gap-2">
                                                <span className="inline-flex items-center justify-center rounded-lg bg-amber-50 px-2 py-0.5 text-amber-600 text-xs font-semibold">
                                                    {a.nota}★
                                                </span>
                                                <span className="text-sm text-gray-700">{a.comentario || "—"}</span>
                                            </div>
                                        </li>
                                    ))
                                ) : (
                                    <li className="text-gray-500 text-sm">Sem avaliações ainda.</li>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}