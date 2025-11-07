import logo from '../assets/logos/logo-hcassistente.png'
import { useState } from "react";
import { Link } from "react-router-dom";
import X from "../assets/icons/close.png"
import Menu from "../assets/icons/menu.png"

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <header className="bg-[#0056b3] inset-x-0 top-0 z-10">
      <nav className="flex items-center justify-evenly" aria-label="Main navigation">
        <div>
          <Link to="/" className="-m-1.5 p-1.5">
            <img src={logo} alt="Logo da HC Assistente" className="h-30 w-auto" />
          </Link>
        </div>

        <ul className="hidden md:flex w-5/7 justify-evenly">
          <li><Link to="/" className="text-lg font-semibold text-white">Início</Link></li>
          <li><Link to="/members" className="text-lg font-semibold text-white">Integrantes</Link></li>
          <li><Link to="/faq" className="text-lg font-semibold text-white">FAQ</Link></li>
          <li><Link to="/contact" className="text-lg font-semibold text-white">Contato</Link></li>
          <li><Link to="/solution" className="text-lg font-semibold text-white">Solução</Link></li>
        </ul>

        <button
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
        >
          {isOpen ? <img src={X} alt="Icone para Fechar Menu" /> : <img src={Menu} alt="Icone para Abrir Menu"/>}
        </button>
      </nav>

      {isOpen && (
        <ul
          className="md:hidden bg-[#0056b3] flex flex-col items-center py-4 space-y-4"
          role="menu"
        >
          <li><Link to="/" className="text-lg font-semibold text-white" role="menuitem" onClick={handleLinkClick}>Início</Link></li>
          <li><Link to="/members" className="text-lg font-semibold text-white" role="menuitem" onClick={handleLinkClick}>Integrantes</Link></li>
          <li><Link to="/faq" className="text-lg font-semibold text-white" role="menuitem" onClick={handleLinkClick}>FAQ</Link></li>
          <li><Link to="/contact" className="text-lg font-semibold text-white" role="menuitem" onClick={handleLinkClick}>Contato</Link></li>
          <li><Link to="/solution" className="text-lg font-semibold text-white" role="menuitem" onClick={handleLinkClick}>Solução</Link></li>
        </ul>
      )}
    </header>
  );
};

export default Header;
