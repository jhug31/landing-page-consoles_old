import React from 'react';

interface ProductInfoProps {
  isLoading: boolean;
  reference: string | null;
  description: string | null;
}

const ProductInfo = ({ isLoading, reference, description }: ProductInfoProps) => {
  if (isLoading) {
    return (
      <div className="space-y-2">
        <div className="h-4 bg-industrial-500 animate-pulse rounded"></div>
        <div className="h-4 bg-industrial-500 animate-pulse rounded w-2/3"></div>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div className="text-sm">
        {reference ? (
          <p className="text-gray-300 font-medium">{reference}</p>
        ) : (
          <p className="text-gray-500">Référence non disponible</p>
        )}
      </div>
      <div className="text-sm">
        {description ? (
          <p className="text-gray-400">{description}</p>
        ) : (
          <p className="text-gray-500">Description non disponible</p>
        )}
      </div>
    </div>
  );
};

export default ProductInfo;