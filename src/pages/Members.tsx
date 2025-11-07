import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import type { Member } from "../types/member";
import { MemberCard } from "../components/MemberCard";
import MemberModal from "../components/MemberModal"

import FotoP from "../assets/img/foto-lucas.jpg";
import FotoS from "../assets/img/fotojr.jpg";
import FotoT from "../assets/img/foto-barreto.jpeg";

const members: Member[] = [
  {
    name: "Lucas",
    role: "Desenvolvedor Frontend",
    rm: "562118",
    turma: "1TDSPK",
    bio: "Estudante em formação, liderando o desenvolvimento do site da equipe e do gerenciamento de banco de dados.",
    image: FotoP,
    links: {
      github: "https://github.com/lucas-dsl",
      linkedin: "https://www.linkedin.com/in/lucas-da-silva-571122346/",
      email: "https://mail.google.com/mail/?view=cm&to=silvalucas71743@gmail.com",
    },
  },
  {
    name: "Júnior",
    role: "Desenvolvedor Backend",
    rm: "565699",
    turma: "1TDSPK",
    bio: "Estudante em formação, liderando a criação e desenvolvimento do projeto em Python.",
    image: FotoS,
    links: {
      github: "https://github.com/JRsantos077",
      linkedin: "https://www.linkedin.com/in/junior-7-70952035b/",
      email: "https://mail.google.com/mail/?view=cm&to=regisjunior2702@gmail.com",
    },
  },
  {
    name: "Guilherme",
    role: "Desenvolvedor Fullstack",
    rm: "561226",
    turma: "1TDSPK",
    bio: "Estudante em formação, atuando tanto no frontend quanto no backend, garantindo a integração perfeita entre as duas áreas.",
    image: FotoT,
    links: {
      github: "https://github.com/GuiBR001",
      linkedin: "https://www.linkedin.com/in/guilherme-barreto-35342a353/",
      email: "https://mail.google.com/mail/?view=cm&to=guilhermebramos.dev@gmail.com",
    },
  },
];

const Members = () => {
  const { rm } = useParams<{ rm?: string }>();
  const navigate = useNavigate();
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);

  useEffect(() => {
    if (rm) {
      const found = members.find((m) => m.rm === rm);
      if (found) {
        setSelectedMember(found);
      } else {
        navigate("/members", { replace: true });
      }
    } else {
      setSelectedMember(null);
    }
  }, [rm, navigate]);

  const openModal = (member: Member) => {
    navigate(`/members/${member.rm}`);
  };

  const closeModal = () => {
    navigate("/members");
  };

  return (
    <main className="bg-gray-50 py-12">
      <section aria-labelledby="integrantes" className="max-w-5xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-4">Integrantes</h2>
        <p className="text-center text-gray-600 mb-12">
          Conheça os membros da nossa equipe e suas funções no projeto.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {members.map((member) => (
            <div key={member.rm} onClick={() => openModal(member)} className="cursor-pointer">
              <MemberCard member={member} />
            </div>
          ))}
        </div>
      </section>

      {selectedMember && (
        <MemberModal member={selectedMember} onClose={closeModal} />
      )}
    </main>
  );
};

export default Members;
