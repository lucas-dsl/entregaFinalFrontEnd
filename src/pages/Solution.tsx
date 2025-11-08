import { useState } from "react";
import LogoHC from "../assets/logos/logo-hc.png";
import ChatHC from "../components/Chathc";
import RatingWidget from "../components/RatingWidget";

const Solution = () => {
  const [cpf, setCpf] = useState("");
  const [senha, setSenha] = useState("");
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-5 relative">
      <form className="bg-white p-8 rounded-lg shadow-md max-w-sm w-full text-center">
        <img src={LogoHC} alt="Logo HC" className="h-16 mx-auto mb-3" />

        <h2 className="text-sm font-normal mb-1">Portal do Paciente</h2>
        <h3 className="text-lg font-semibold mb-5">Acessar conta</h3>

        <label htmlFor="cpf" className="sr-only">CPF</label>
        <input
          id="cpf"
          type="text"
          placeholder="Digite seu CPF"
          value={cpf}
          onChange={(e) => setCpf(e.target.value)}
          className="w-full p-3 mb-4 border border-gray-300 rounded-md"
        />

        <label htmlFor="senha" className="sr-only">Senha</label>
        <input
          id="senha"
          type="password"
          placeholder="Digite sua senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          className="w-full p-3 mb-4 border border-gray-300 rounded-md"
        />

        <a href="#" className="block text-xs text-right text-cyan-700 mb-4 hover:underline">
          Esqueci minha senha
        </a>

        <button type="submit" className="w-full p-3 mb-3 bg-cyan-700 text-white font-bold rounded-md hover:bg-cyan-800">
          ACESSAR
        </button>
        <button type="button" className="w-full p-3 mb-3 border border-cyan-700 text-cyan-700 font-bold rounded-md hover:bg-cyan-50">
          CADASTRAR SENHA
        </button>

        <div className="my-3 text-xs text-gray-500">OU</div>

        <button type="button" className="w-full p-3 border border-cyan-700 text-cyan-700 font-bold rounded-md hover:bg-cyan-50">
          ACESSAR RESULTADO COM ETIQUETA
        </button>
      </form>

      <div className="flex gap-3 flex-wrap justify-center mt-6">
        <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Google Play" className="h-10" />
        <img src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg" alt="App Store" className="h-10" />
      </div>

      <div className="fixed left-6 bottom-8 z-40">
        <RatingWidget url="/api/avaliacoes" />
      </div>
      <ChatHC chatOpen={chatOpen} setChatOpen={setChatOpen} />
    </main>
  );
};

export default Solution;
