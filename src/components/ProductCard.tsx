import { useState } from 'react';
import { Input } from './ui/input';

interface ProductCardProps {
  imageUrl?: string;
  fileName?: string;
}

const ProductCard = ({ imageUrl, fileName }: ProductCardProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [url, setUrl] = useState('');
  const [hasError, setHasError] = useState(false);

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  };

  const openUrl = () => {
    if (url) {
      window.open(url, '_blank');
    }
  };

  const handleImageLoad = () => {
    console.log("Image loaded successfully:", fileName);
    setIsLoading(false);
    setHasError(false);
  };

  const handleImageError = () => {
    console.error("Error loading image:", fileName);
    setIsLoading(false);
    setHasError(true);
  };

  return (
    <div className="product-card bg-industrial-700 rounded-lg p-4 flex flex-col items-center justify-center gap-4">
      <div 
        className="w-full aspect-square bg-industrial-600 rounded flex items-center justify-center overflow-hidden cursor-pointer"
        onClick={openUrl}
      >
        {imageUrl && !hasError && (
          <img 
            src={imageUrl} 
            alt={fileName || "Product"} 
            className="w-full h-full object-contain"
            onLoad={handleImageLoad}
            onError={handleImageError}
          />
        )}
        {isLoading && <div className="animate-pulse w-full h-full bg-industrial-500" />}
        {hasError && <div className="w-full h-full bg-industrial-800 flex items-center justify-center text-gray-400">Erreur de chargement</div>}
      </div>
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