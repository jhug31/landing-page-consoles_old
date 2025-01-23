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

  if (!reference && !description) {
    return (
      <p className="text-gray-500 text-sm text-center">
        Informations non disponibles
      </p>
    );
  }

  return (
    <div className="space-y-1 text-sm">
      {reference && (
        <p className="text-gray-300 font-medium">{reference}</p>
      )}
      {description && (
        <p className="text-gray-400">{description}</p>
      )}
    </div>
  );
};

export default ProductInfo;