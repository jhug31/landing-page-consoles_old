import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="fixed top-0 left-0 w-full p-4 z-10 bg-transparent">
      <nav className="relative">
        {/* Hamburger button */}
        <button 
          onClick={toggleMenu}
          className="md:hidden text-white hover:text-gray-300 transition-colors"
          aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>

        {/* Menu items */}
        <ul className={`
          ${isMenuOpen ? 'flex' : 'hidden'} 
          md:flex flex-col md:flex-row 
          md:space-x-8 space-y-4 md:space-y-0 
          md:justify-end font-medium text-[13px] tracking-[0.1em]
          absolute md:relative 
          top-12 md:top-0 
          left-0 md:left-auto
          w-full md:w-auto
          bg-industrial-900/95 md:bg-transparent
          p-4 md:p-0
          rounded-lg md:rounded-none
          backdrop-blur-sm md:backdrop-blur-none
          border border-white/10 md:border-none
        `}>
          <li>
            <Link 
              to="/" 
              className={`relative text-white hover:text-gray-300 transition-colors block
                ${location.pathname === "/" ? "after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-[1px] after:bg-white after:transform after:scale-x-100 after:transition-transform after:duration-300" : "after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-[1px] after:bg-white after:transform after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300"}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Coffres à outils
            </Link>
          </li>
          <li>
            <Link 
              to="/servantes" 
              className={`relative text-white hover:text-gray-300 transition-colors block
                ${location.pathname === "/servantes" ? "after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-[1px] after:bg-white after:transform after:scale-x-100 after:transition-transform after:duration-300" : "after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-[1px] after:bg-white after:transform after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300"}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Servantes d'atelier
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;