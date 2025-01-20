import { useEffect, useState } from "react";
import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";
import { Separator } from "@/components/ui/separator";
import { useStorageFiles } from "@/hooks/useStorageFiles";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

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

      {/* Floating CTA Button */}
      <div className="fixed bottom-8 right-8 z-50 animate-bounce">
        <Button
          className="bg-highlight hover:bg-highlight/90 text-white font-medium px-6 py-6 rounded-full shadow-lg transition-all duration-300 hover:scale-105 flex items-center gap-2"
          onClick={() => window.open('mailto:contact@example.com')}
        >
          <Mail className="h-5 w-5" />
          Contactez-nous
        </Button>
      </div>

      <footer className="mt-16 border-t border-gray-800">
        <div className="container mx-auto px-4 py-8">
          <div className="flex md:justify-center items-center">
            <div className="rounded-full bg-industrial-700 p-3 inline-flex items-center justify-center">
              <Mail className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;