import React from 'react';
import ProductImage from './product/ProductImage';
import ProductInfo from './product/ProductInfo';
import ProductLink from './product/ProductLink';
import { useProductData } from '@/hooks/useProductData';

interface ProductCardProps {
  imageUrl?: string;
  fileName?: string;
}

const ProductCard = ({ imageUrl, fileName }: ProductCardProps) => {
  const { ficheProduitUrl, productInfo, isLoading, error } = useProductData(fileName);

  return (
    <div className="product-card bg-industrial-700 rounded-lg p-4 flex flex-col items-center justify-center gap-4">
      <ProductImage imageUrl={imageUrl} fileName={fileName} />
      
      <div className="w-full bg-industrial-600 p-3 rounded">
        <ProductInfo 
          isLoading={isLoading}
          reference={productInfo?.reference ?? null}
          description={productInfo?.description ?? null}
        />
      </div>
      
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