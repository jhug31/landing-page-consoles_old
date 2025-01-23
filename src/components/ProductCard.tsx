import React from 'react';
import ProductImage from './product/ProductImage';
import ProductLink from './product/ProductLink';
import { useProductData } from '@/hooks/useProductData';

interface ProductCardProps {
  imageUrl?: string;
  fileName?: string;
}

const ProductCard = ({ imageUrl, fileName }: ProductCardProps) => {
  const { ficheProduitUrl, isLoading, error } = useProductData(fileName);

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
    </div>
  );
};

export default ProductCard;