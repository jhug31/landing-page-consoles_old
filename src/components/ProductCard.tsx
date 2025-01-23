import ProductImage from './ProductImage';
import ProductButton from './ProductButton';
import { useProductInfo } from '@/hooks/useProductInfo';

interface ProductCardProps {
  imageUrl?: string;
  fileName?: string;
}

const ProductCard = ({ imageUrl, fileName }: ProductCardProps) => {
  const { ficheProduitUrl, isLoading, error } = useProductInfo(fileName);

  return (
    <div className="product-card bg-industrial-700 rounded-lg p-4 flex flex-col items-center justify-center gap-4">
      <ProductImage imageUrl={imageUrl} fileName={fileName} />

      <div className="w-full">
        <ProductButton 
          ficheProduitUrl={ficheProduitUrl}
          isLoading={isLoading}
          error={error}
        />
      </div>

      <div className="w-full bg-highlight rounded p-3 text-center">
        <p className="text-sm font-medium text-white">
          Nouvelle cartouche
        </p>
      </div>
    </div>
  );
};

export default ProductCard;