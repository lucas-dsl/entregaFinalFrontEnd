import { useMemo, useState } from "react";
import LogoHC from "../assets/logos/logo-hc.png";
import ChatHC from "../components/Chathc";
import RatingWidget from "../components/RatingWidget";

const Solution = () => {
  const [cpf, setCpf] = useState("");
  const [senha, setSenha] = useState("");
  const [touched, setTouched] = useState<{ cpf: boolean; senha: boolean }>({
    cpf: false,
    senha: false,
  });
  const [chatOpen, setChatOpen] = useState(false);

  const [showInfo, setShowInfo] = useState(false);

  const cpfError = useMemo(() => {
    if (!touched.cpf) return "";
    const onlyDigits = cpf.replace(/\D/g, "");
    if (!onlyDigits) return "CPF é obrigatório.";
    if (onlyDigits.length !== 11) return "CPF deve ter 11 dígitos numéricos.";
    return "";
  }, [cpf, touched.cpf]);

  const senhaError = useMemo(() => {
    if (!touched.senha) return "";
    if (!senha) return "Senha é obrigatória.";
    if (senha.length < 6) return "Mínimo de 6 caracteres.";
    return "";
  }, [senha, touched.senha]);

  const formInvalid = !!cpfError || !!senhaError;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setTouched({ cpf: true, senha: true });
    if (formInvalid) return;

    setShowInfo(true);
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-5 relative">
      <form
        onSubmit={handleSubmit}
        noValidate
        className="bg-white p-8 rounded-lg shadow-md max-w-sm w-full text-center"
      >
        <img src={LogoHC} alt="Logo HC" className="h-16 mx-auto mb-3" />

        <h2 className="text-sm font-normal mb-1">Portal do Paciente</h2>
        <h3 className="text-lg font-semibold mb-5">Acessar conta</h3>

        <label htmlFor="cpf" className="sr-only">CPF</label>
        <input
          id="cpf"
          type="text"
          inputMode="numeric"
          placeholder="Digite seu CPF (somente números)"
          value={cpf}
          onChange={(e) => setCpf(e.target.value)}
          onBlur={() => setTouched((t) => ({ ...t, cpf: true }))}
          className={`w-full p-3 mb-1 border rounded-md ${
            cpfError ? "border-rose-500" : "border-gray-300"
          }`}
          aria-invalid={!!cpfError}
          aria-describedby="cpf-erro"
        />
        {cpfError && (
          <p id="cpf-erro" className="text-left text-sm text-rose-600 mb-3">{cpfError}</p>
        )}

        <label htmlFor="senha" className="sr-only">Senha</label>
        <input
          id="senha"
          type="password"
          placeholder="Digite sua senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          onBlur={() => setTouched((t) => ({ ...t, senha: true }))}
          className={`w-full p-3 mb-1 border rounded-md ${
            senhaError ? "border-rose-500" : "border-gray-300"
          }`}
          aria-invalid={!!senhaError}
          aria-describedby="senha-erro"
        />
        {senhaError && (
          <p id="senha-erro" className="text-left text-sm text-rose-600 mb-3">{senhaError}</p>
        )}

        <a href="#" className="block text-xs text-right text-cyan-700 mb-4 hover:underline">
          Esqueci minha senha
        </a>

        <button
          type="submit"
          disabled={formInvalid}
          className="w-full p-3 mb-3 bg-cyan-700 text-white font-bold rounded-md hover:bg-cyan-800 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          ACESSAR
        </button>

        <button
          type="button"
          className="w-full p-3 mb-3 border border-cyan-700 text-cyan-700 font-bold rounded-md hover:bg-cyan-50"
        >
          CADASTRAR SENHA
        </button>

        <div className="my-3 text-xs text-gray-500">OU</div>

        <button
          type="button"
          className="w-full p-3 border border-cyan-700 text-cyan-700 font-bold rounded-md hover:bg-cyan-50"
        >
          ACESSAR RESULTADO COM ETIQUETA
        </button>
      </form>

      <div className="flex gap-3 flex-wrap justify-center mt-6">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
          alt="Google Play"
          className="h-10"
        />
        <img
          src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
          alt="App Store"
          className="h-10"
        />
      </div>

      <div className="fixed left-6 bottom-7 z-40">
        <RatingWidget url="/api/avaliacoes" />
      </div>
      <ChatHC chatOpen={chatOpen} setChatOpen={setChatOpen} />

      {showInfo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
          role="dialog"
          aria-modal="true"
          onClick={() => setShowInfo(false)} 
        >
          <div
            className="w-[92vw] max-w-md rounded-2xl bg-white shadow-2xl p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-3">
              <h4 className="text-lg font-semibold">Informação</h4>
              <button
                onClick={() => setShowInfo(false)}
                className="rounded-lg px-2 py-1 border hover:bg-gray-50"
                aria-label="Fechar"
              >
                ✕
              </button>
            </div>

            <p className="text-sm text-gray-700">
              Este formulário é apenas uma simulação para fins de demonstração. Sistema de login não adicionado.
            </p>

            <div className="mt-5 flex justify-end gap-2">
              <button
                onClick={() => setShowInfo(false)}
                className="px-4 py-2 rounded-lg border hover:bg-gray-50"
              >
                Entendi
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default Solution;