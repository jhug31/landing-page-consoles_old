import ProductImage from './ProductImage';
import ProductButton from './ProductButton';
import { useProductInfo } from '@/hooks/useProductInfo';

interface ProductCardProps {
  imageUrl?: string;
  fileName?: string;
}

const ProductCard = ({ imageUrl, fileName }: ProductCardProps) => {
  const { ficheProduitUrl, description, isLoading, error } = useProductInfo(fileName);

  return (
    <div className="product-card bg-industrial-700 rounded-lg p-4 flex flex-col items-center justify-center gap-4">
      <ProductImage imageUrl={imageUrl} fileName={fileName} />
      
      {description && (
        <div className="w-full px-4 py-3 bg-[#ea384c] rounded-lg text-center">
          <p className="text-black font-bold">
            {description}
          </p>
        </div>
      )}

      <div className="w-full">
        <ProductButton 
          ficheProduitUrl={ficheProduitUrl}
          isLoading={isLoading}
          error={error}
        />
      </div>
    </div>
  );
};

export default ProductCard;