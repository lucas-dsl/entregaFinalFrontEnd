import fotoP from "../assets/img/foto-homeP.jpg";
import fotoS from "../assets/img/foto-homeS.jpg";
import { useNavigate } from "react-router-dom"

const Home = () => {
  const navigate = useNavigate();

  return (
    <main className="mx-6 my-6 flex flex-col gap-8 md:mx-40">
      <header className="text-center">
        <h1 className="bg-[#007474] py-4 px-2 rounded-lg text-white font-semibold text-lg md:text-xl lg:text-3xl xl:text-4xl">
          Bem-vindo ao HC Assistente
        </h1>
        <p className="mt-4 font-bold text-sm md:text-lg lg:text-xl xl:text-2xl">
          Auxiliando pacientes a se conectarem com a saúde digital com mais
          facilidade.
        </p>
      </header>

      <img
        src={fotoP}
        alt="Tela inicial do aplicativo HC Assistente"
        className="w-full rounded-lg"
      />

      <section className="flex flex-col items-center bg-[#FAF0E6] rounded-lg p-4 lg:p-10 gap-6">
        <h2 className="text-[#333] font-bold text-lg md:text-2xl lg:text-4xl">
          Objetivo
        </h2>

        <p className="text-[#333] text-sm md:text-base lg:text-lg xl:text-xl leading-relaxed">
          O HC Assistente é um chatbot que funciona como um suporte direto ao
          aplicativo principal do Hospital das Clínicas, oferecendo uma série de
          recursos inovadores e acessíveis para pacientes com dificuldades
          digitais. A principal proposta do chatbot é reduzir a taxa de
          absenteísmo de consultas online, que atualmente gira em torno de 20%,
          para menos de 10%. Isso será alcançado através de um chatbot
          completo com vídeos tutoriais e uma IA treinada para o auxílio dos
          pacientes.
        </p>

        <img
          src={fotoS}
          alt="Exemplo de tutoriais e suporte do HC Assistente"
          className="rounded-lg"
        />

        <p className="text-[#333] text-sm md:text-base lg:text-lg xl:text-xl leading-relaxed">
          O HC Assistente oferece tutoriais em vídeo de fácil compreensão,
          disponíveis dentro do próprio app. Esses
          tutoriais orientam os pacientes sobre como utilizar o aplicativo
          principal para acessar consultas e ver agendamentos. A IA
          incorporada ao aplicativo oferece um suporte para tirar dúvidas sobre
          o uso do aplicativo, garantindo que o paciente não se sinta perdido.
        </p>
      </section>

      <button onClick={() => navigate("/solution")} className="bg-[#007474] text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-[#005f5f] transition h-14 text-lg"> Ver Solução </button>
    </main>
  );
};

export default Home;
