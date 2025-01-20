import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";
import { Separator } from "@/components/ui/separator";
import { useStorageFiles } from "@/hooks/useStorageFiles";
import { Button } from "@/components/ui/button";
import { Phone, Mail } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const Index = () => {
  const { files, loading, error } = useStorageFiles('coffres-a-outils');

  return (
    <div className="min-h-screen flex flex-col bg-industrial-900">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 pt-32 flex flex-col">
        <div className="text-left mb-32 animate-fadeIn">
          <h1 className="text-4xl md:text-5xl font-light mb-4 tracking-wide text-white">
            Coffres à outils et Servantes d'atelier
          </h1>
          <Separator className="my-4 w-16 bg-gray-600" />
          <p className="text-gray-400 text-base tracking-widest">
            INDUSTRIAL PRODUCTS
          </p>
        </div>

        {error && (
          <div className="text-red-500 mb-8">
            Une erreur est survenue lors du chargement des produits.
          </div>
        )}

        <div 
          className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-7xl mx-auto animate-fadeIn" 
          style={{ animationDelay: "0.2s" }}
        >
          {loading ? (
            Array(12).fill(null).map((_, index) => (
              <ProductCard key={index} />
            ))
          ) : (
            files.map((file, index) => (
              <ProductCard
                key={index}
                imageUrl={file.signedUrl}
                fileName={file.name}
              />
            ))
          )}
        </div>
      </main>

      {/* Floating CTA Button with Popover */}
      <div className="fixed bottom-8 right-8 z-50">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              className="bg-white hover:bg-white/90 text-[#222222] font-bold px-6 py-6 rounded-full shadow-lg transition-all duration-300 hover:scale-105"
            >
              Demandez une offre
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="end">
            <div className="flex flex-col gap-2 p-4">
              <a 
                href="tel:+33123456789" 
                className="flex items-center gap-2 text-sm px-4 py-2 hover:bg-gray-100 rounded-md transition-colors"
              >
                <Phone className="h-4 w-4" />
                <span>+33 (0)1 23 45 67 89</span>
              </a>
              <a 
                href="mailto:contact@example.com"
                className="flex items-center gap-2 text-sm px-4 py-2 hover:bg-gray-100 rounded-md transition-colors"
              >
                <Mail className="h-4 w-4" />
                <span>contact@example.com</span>
              </a>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      {/* Footer avec mentions légales */}
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
    </div>
  );
};

export default Index;