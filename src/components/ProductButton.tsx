import { ExternalLink } from 'lucide-react';

interface ProductButtonProps {
  ficheProduitUrl: string | null;
  isLoading: boolean;
  error: string | null;
}

const ProductButton = ({ ficheProduitUrl, isLoading, error }: ProductButtonProps) => {
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
      className="w-full block text-center py-2 px-4 bg-industrial-600 hover:bg-industrial-500 transition-colors rounded text-gray-300 text-sm flex items-center justify-center gap-2"
    >
      Voir la fiche produit
      <ExternalLink className="w-4 h-4" />
    </a>
  );
};

export default ProductButton;