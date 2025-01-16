import { useState } from 'react';
import { Input } from './ui/input';

interface ProductCardProps {
  imageUrl?: string;
  fileName?: string;
}

const ProductCard = ({ imageUrl, fileName }: ProductCardProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [url, setUrl] = useState('');

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  };

  const openUrl = () => {
    if (url) {
      window.open(url, '_blank');
    }
  };

  return (
    <div className="product-card bg-industrial-700 rounded-lg p-4 flex flex-col items-center justify-center gap-4">
      <div 
        className="w-full aspect-square bg-industrial-600 rounded flex items-center justify-center overflow-hidden cursor-pointer"
        onClick={openUrl}
      >
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
      <Input
        type="url"
        placeholder="Entrez l'URL du produit"
        value={url}
        onChange={handleUrlChange}
        className="w-full text-sm bg-industrial-600 border-industrial-500 text-gray-300 placeholder:text-gray-500"
      />
    </div>
  );
};

export default ProductCard;