import React from 'react';

interface ProductLinkProps {
  isLoading: boolean;
  error: string | null;
  ficheProduitUrl: string | null;
}

const ProductLink = ({ isLoading, error, ficheProduitUrl }: ProductLinkProps) => {
  if (isLoading) {
    return <div className="h-10 bg-industrial-600 animate-pulse rounded"></div>;
  }

  if (error) {
    return <div className="text-red-500 text-sm text-center">{error}</div>;
  }

  if (!ficheProduitUrl) {
    return (
      <div className="text-gray-500 text-sm text-center">
        Fiche produit non disponible
      </div>
    );
  }

  return (
    <a
      href={ficheProduitUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="w-full block text-center py-2 px-4 bg-industrial-600 hover:bg-industrial-500 transition-colors rounded text-gray-300 text-sm"
    >
      Voir la fiche produit
    </a>
  );
};

export default ProductLink;