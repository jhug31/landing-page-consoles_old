import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageTitle from "@/components/PageTitle";
import ProductCard from "@/components/ProductCard";
import { useStorageFiles } from "@/hooks/useStorageFiles";

const IndexCopy = () => {
  const { files, loading } = useStorageFiles('copy coffres a outils');

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 pt-32 flex flex-col">
        <PageTitle 
          title="Copy Coffres à outils"
          subtitle="INDUSTRIAL PRODUCTS"
        />

        <div 
          className="w-full grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto animate-fadeIn" 
          style={{ animationDelay: "0.2s" }}
        >
          {loading ? (
            Array(9).fill(null).map((_, index) => (
              <div key={index} className="bg-industrial-700 rounded-lg p-4 flex flex-col items-center justify-center gap-4">
                <div className="w-full aspect-square bg-industrial-600 rounded animate-pulse" />
                <div className="w-full h-10 bg-industrial-600 rounded animate-pulse" />
              </div>
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

      <Footer />
    </div>
  );
};

export default IndexCopy;