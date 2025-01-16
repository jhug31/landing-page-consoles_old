import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 w-full p-4 z-10 bg-transparent">
      <nav>
        <ul className="flex space-x-8 text-sm font-light tracking-wider justify-end">
          <li>
            <Link 
              to="/" 
              className="text-white hover:text-gray-300 transition-colors text-xs uppercase"
            >
              Coffres à outils
            </Link>
          </li>
          <li>
            <Link 
              to="/servantes" 
              className="text-white hover:text-gray-300 transition-colors text-xs uppercase"
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