import { Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="mt-16 border-t border-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="flex md:justify-center items-center">
          <div className="rounded-full bg-industrial-700 p-3 inline-flex items-center justify-center">
            <Mail className="h-6 w-6 text-white" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;