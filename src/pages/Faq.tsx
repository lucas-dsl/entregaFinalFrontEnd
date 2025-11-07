import { useState } from "react";
import Seta from "../assets/icons/seta-para-baixo.png";

interface FaqItem {
  question: string;
  answer: string;
}

const faqs: FaqItem[] = [
  {
    question: "Como posso acessar minha teleconsulta?",
    answer:
      "Caso tenha problemas para acessar sua teleconsulta, entre no chatbot e siga as instruções fornecidas. Se o problema persistir, entre em contato com nosso suporte pelo e-mail.",
  },
  {
    question: "Quais médicos estão disponíveis para teleconsultas?",
    answer:
      "Nosso chatbot pode ajudar a informar quais médicos estão disponíveis para teleconsultas, incluindo suas especialidades e horários.",
  },
  {
    question: "O que faço se o médico não estiver disponível no horário agendado?",
    answer:
      "Se o médico não estiver disponível, o chatbot pode te ajudar a remarcar a consulta ou sugerir outros horários.",
  },
  {
    question: "É necessário realizar um cadastro para agendar uma consulta?",
    answer:
      "Sim, para garantir o agendamento correto, você precisa realizar um cadastro inicial. O chatbot te guiará nesse processo.",
  },
  {
    question: "Como posso acessar o histórico das minhas teleconsultas?",
    answer:
      "O histórico fica disponível no site do Hospital das Clínicas, onde você pode acessar consultas passadas, prescrições e mais.",
  },
  {
    question: "Posso agendar uma teleconsulta para um familiar?",
    answer:
      "Sim, você pode agendar para um familiar. O chatbot pedirá os dados necessários da pessoa que será atendida.",
  },
];

const Faq = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAnswer = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <main>
      <section
        id="perguntas-frequentes"
        className="py-8"
        aria-labelledby="faq-title"
      >
        <h2
          id="faq-title"
          className="text-3xl font-bold text-center mb-2 mx-6"
        >
          Perguntas Frequentes
        </h2>
        <p className="text-lg text-center text-gray-600 mb-8 mx-4">
          Respostas para as dúvidas mais comuns sobre nosso chatbot de
          teleconsultas
        </p>

        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <article
                key={index}
                className="faq-item mb-4 mx-6"
              >
                <button
                  onClick={() => toggleAnswer(index)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                  className="flex justify-between items-center w-full p-4 bg-gray-100 rounded-lg text-left focus:outline-none focus:ring-2 focus:ring-cyan-700"
                >
                  <span className="text-lg font-semibold text-gray-800">
                    {faq.question}
                  </span>
                  <img
                    src={Seta}
                    alt={isOpen ? "Recolher resposta" : "Expandir resposta"}
                    className={`w-5 h-5 transform transition-transform ${isOpen ? "rotate-180" : ""
                      }`}
                  />
                </button>

                {isOpen && (
                  <div
                    id={`faq-answer-${index}`}
                    role="region"
                    className="p-4 bg-gray-50 text-gray-700 rounded-b-lg"
                  >
                    {faq.answer}
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
};

export default Faq;
