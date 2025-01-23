import React from 'react';
import ProductImage from './product/ProductImage';
import ProductLink from './product/ProductLink';
import { useProductData } from '@/hooks/useProductData';

interface ProductCardProps {
  imageUrl?: string;
  fileName?: string;
}

const ProductCard = ({ imageUrl, fileName }: ProductCardProps) => {
  const { ficheProduitUrl, description, isLoading, error } = useProductData(fileName);

  return (
    <div className="product-card bg-industrial-700 rounded-lg p-4 flex flex-col items-center justify-center gap-4">
      <ProductImage imageUrl={imageUrl} fileName={fileName} />
      
      <div className="w-full">
        <ProductLink 
          isLoading={isLoading}
          error={error}
          ficheProduitUrl={ficheProduitUrl}
        />
      </div>

      <div className="w-full bg-industrial-600 p-3 rounded">
        {isLoading ? (
          <div className="h-4 bg-industrial-500 animate-pulse rounded"></div>
        ) : description ? (
          <p className="text-sm text-gray-400">{description}</p>
        ) : (
          <p className="text-sm text-gray-400">
            Contactez-nous pour plus d'informations sur ce produit
          </p>
        )}
      </div>
    </div>
  );
};

export default ProductCard;