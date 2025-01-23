import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface ProductCardProps {
  imageUrl?: string;
  fileName?: string;
}

const ProductCard = ({ imageUrl, fileName }: ProductCardProps) => {
  const [ficheProduitUrl, setFicheProduitUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProductInfo = async () => {
      if (!fileName) {
        setIsLoading(false);
        return;
      }

      try {
        // Extract the product number from the filename (removing .png extension)
        const numeroFiche = fileName.replace('.png', '');

        // Get the PNG URL from the 'fiches produits' bucket
        const { data: publicUrl } = supabase
          .storage
          .from('fiches produits')
          .getPublicUrl(`${numeroFiche}.png`);

        if (publicUrl) {
          setFicheProduitUrl(publicUrl.publicUrl);
        }
      } catch (err) {
        console.error('Error fetching product info:', err);
        setError('Erreur lors du chargement des informations du produit');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProductInfo();
  }, [fileName]);

  return (
    <div className="product-card bg-industrial-700 rounded-lg p-4 flex flex-col items-center justify-center gap-4">
      <div className="w-full aspect-square bg-industrial-600 rounded flex items-center justify-center overflow-hidden">
        {imageUrl ? (
          <img 
            src={imageUrl} 
            alt={fileName || "Produit"} 
            className="w-full h-full object-contain"
            onError={(e) => {
              console.error('Error loading image:', imageUrl);
              e.currentTarget.src = '/placeholder.svg';
            }}
          />
        ) : (
          <div className="w-full h-full bg-industrial-800 flex items-center justify-center text-gray-400">
            Produit
          </div>
        )}
      </div>
      
      <div className="w-full">
        {isLoading ? (
          <div className="h-10 bg-industrial-600 animate-pulse rounded"></div>
        ) : error ? (
          <div className="text-red-500 text-sm text-center">{error}</div>
        ) : ficheProduitUrl ? (
          <a
            href={ficheProduitUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full block text-center py-2 px-4 bg-industrial-600 hover:bg-industrial-500 transition-colors rounded text-gray-300 text-sm"
          >
            Voir la fiche produit
          </a>
        ) : (
          <div className="text-gray-500 text-sm text-center">
            Fiche produit non disponible
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;