import IconMail from "../assets/icons/icone-email.png";
import IconLinkedin from "../assets/icons/icone-linkedin.png";
import IconGithub from "../assets/icons/icone-github.png";
import type { Member } from "../types/member";

interface MemberCardProps {
    member: Member;
}

export const MemberCard = ({ member }: MemberCardProps) => {
    return (
        <article className="bg-white rounded-2xl shadow-md p-6 text-center transform transition-transform duration-300 hover:scale-105 hover:shadow-lg">
            <div className="mb-4">
                <img
                    src={member.image}
                    alt={`Foto de ${member.name}, ${member.role}`}
                    className="w-32 h-32 rounded-full border-4 border-cyan-700 object-cover mx-auto"
                />
            </div>
            <h3 className="text-xl font-semibold">{member.name}</h3>
            <p className="text-gray-600">{member.role} - (RM: {member.rm})</p>
            <p className="text-gray-600 mb-4">({member.turma})</p>
            <p className="text-sm text-gray-700 mb-4">{member.bio}</p>

            <nav className="flex justify-center space-x-4">
                {member.links.github && (
                    <a
                        href={member.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`GitHub de ${member.name}`}
                    >
                        <img src={IconGithub} alt="" className="w-6 h-6" />
                    </a>
                )}
                {member.links.linkedin && (
                    <a
                        href={member.links.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`LinkedIn de ${member.name}`}
                    >
                        <img src={IconLinkedin} alt="" className="w-6 h-6" />
                    </a>
                )}
                {member.links.email && (
                    <a
                        href={member.links.email}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`E-mail de ${member.name}`}
                    >
                        <img src={IconMail} alt="" className="w-6 h-6" />
                    </a>
                )}
            </nav>
        </article>
    );
};
