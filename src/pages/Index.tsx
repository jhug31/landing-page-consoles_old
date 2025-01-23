import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";
import { Separator } from "@/components/ui/separator";
import { useStorageFiles } from "@/hooks/useStorageFiles";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

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

      <ContactForm files={files} />
      <Footer />
    </div>
  );
};

export default Index;