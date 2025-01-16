import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="absolute top-0 right-0 p-6 z-10">
      <nav>
        <ul className="flex space-x-6 text-gray-400">
          <li>
            <Link to="/" className="hover:text-white transition-colors">
              Coffres à outils
            </Link>
          </li>
          <li>
            <Link to="/servantes" className="hover:text-white transition-colors">
              Servantes d'atelier
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;