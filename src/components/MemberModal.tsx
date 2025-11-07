import { createPortal } from "react-dom";
import type { Member } from "../types/member";

interface MemberModalProps {
  member: Member;
  onClose: () => void;
}

const MemberModal: React.FC<MemberModalProps> = ({ member, onClose }) => {
  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-black text-xl"
        >
          ✖
        </button>

        <img
          src={member.image}
          alt={member.name}
          className="w-32 h-32 object-cover rounded-full mx-auto mb-4"
        />

        <h2 className="text-2xl font-bold text-center">{member.name}</h2>
        <p className="text-center text-gray-500 mb-4">{member.role} - {member.turma}</p>

        <p className="text-gray-700 text-sm mb-4">{member.bio}</p>

        <div className="flex justify-center gap-4 mt-4">
          <a href={member.links.github} target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href={member.links.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href={member.links.email} target="_blank" rel="noopener noreferrer">Email</a>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default MemberModal;
