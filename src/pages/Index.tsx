import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col relative">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 flex flex-col justify-center items-center">
        <div className="text-center mb-32 animate-fadeIn">
          <h1 className="text-6xl md:text-7xl font-light mb-6 tracking-wide">
            Coffres à outils
          </h1>
          <p className="text-highlight text-xl tracking-widest">
            INDUSTRIAL PRODUCTS
          </p>
        </div>

        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto animate-fadeIn" style={{ animationDelay: "0.2s" }}>
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </div>
      </main>
    </div>
  );
};

export default Index;