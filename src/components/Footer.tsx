const Footer = () => {
  return (
    <footer className="mt-16 border-t border-gray-800 bg-industrial-800">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-white font-semibold mb-4">Informations légales</h3>
            <p className="text-gray-400 text-sm">
              INDUSTRIAL PRODUCTS SARL<br />
              Capital social : 50 000€<br />
              RCS Paris B 123 456 789
            </p>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Siège social</h3>
            <p className="text-gray-400 text-sm">
              123 Avenue des Outillages<br />
              75001 Paris, France<br />
              SIRET : 123 456 789 00001
            </p>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <p className="text-gray-400 text-sm">
              Tél : +33 (0)1 23 45 67 89<br />
              Email : contact@example.com<br />
              TVA : FR 12 345 678 901
            </p>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Mentions légales</h3>
            <p className="text-gray-400 text-sm">
              © 2024 INDUSTRIAL PRODUCTS<br />
              Tous droits réservés<br />
              <span className="hover:text-white cursor-pointer">Politique de confidentialité</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;