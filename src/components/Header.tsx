import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();

  return (
    <header className="fixed top-0 left-0 w-full p-4 z-10 bg-transparent">
      <nav>
        <ul className="flex space-x-8 justify-end font-medium text-[13px] tracking-[0.1em]">
          <li>
            <Link 
              to="/" 
              className={`relative text-white hover:text-gray-300 transition-colors
                ${location.pathname === "/" ? "after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-[1px] after:bg-white after:transform after:scale-x-100 after:transition-transform after:duration-300" : "after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-[1px] after:bg-white after:transform after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300"}`}
            >
              Coffres à outils
            </Link>
          </li>
          <li>
            <Link 
              to="/servantes" 
              className={`relative text-white hover:text-gray-300 transition-colors
                ${location.pathname === "/servantes" ? "after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-[1px] after:bg-white after:transform after:scale-x-100 after:transition-transform after:duration-300" : "after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-[1px] after:bg-white after:transform after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300"}`}
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