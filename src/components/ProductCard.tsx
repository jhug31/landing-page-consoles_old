import { useState } from 'react';

interface ProductCardProps {
  imageUrl?: string;
  fileName?: string;
}

const ProductCard = ({ imageUrl, fileName }: ProductCardProps) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="product-card bg-industrial-700 rounded-lg p-4 flex flex-col items-center justify-center gap-4">
      <div className="w-full aspect-square bg-industrial-600 rounded flex items-center justify-center overflow-hidden">
        {imageUrl && (
          <img 
            src={imageUrl} 
            alt={fileName || "Product"} 
            className="w-full h-full object-contain"
            onLoad={() => setIsLoading(false)}
          />
        )}
        {isLoading && <div className="animate-pulse w-full h-full bg-industrial-500" />}
      </div>
      {fileName && (
        <p className="text-sm text-gray-300 text-center mt-2">
          {fileName.replace(/\.[^/.]+$/, "")}
        </p>
      )}
    </div>
  );
};

export default ProductCard;