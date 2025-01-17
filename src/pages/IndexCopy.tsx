import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";
import PageTitle from "@/components/PageTitle";
import Footer from "@/components/Footer";

const IndexCopy = () => {
  const renderContent = () => {
    return (
      <div 
        className="w-full grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto animate-fadeIn" 
        style={{ animationDelay: "0.2s" }}
      >
        {Array(6).fill(null).map((_, index) => (
          <ProductCard key={`product-${index}`} />
        ))}
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