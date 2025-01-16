import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";
import PageTitle from "@/components/PageTitle";
import Footer from "@/components/Footer";
import { useStorageFiles } from "@/hooks/useStorageFiles";

const IndexCopy = () => {
  const { files, loading, error } = useStorageFiles('servantes-d-atelier');

  const renderContent = () => {
    if (error) {
      return (
        <div className="text-center text-red-500">
          {error}
        </div>
      );
    }

    return (
      <div 
        className="w-full grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto animate-fadeIn" 
        style={{ animationDelay: "0.2s" }}
      >
        {loading ? (
          Array(6).fill(null).map((_, index) => (
            <ProductCard key={`loading-${index}`} />
          ))
        ) : (
          files.map((file, index) => (
            <ProductCard
              key={`file-${file.name}-${index}`}
              imageUrl={file.signedUrl}
              fileName={file.name}
            />
          ))
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 pt-32 flex flex-col">
        <PageTitle 
          title="Servantes d'atelier"
          subtitle="INDUSTRIAL PRODUCTS"
        />

        {renderContent()}
      </main>

      <Footer />
    </div>
  );
};

export default IndexCopy;