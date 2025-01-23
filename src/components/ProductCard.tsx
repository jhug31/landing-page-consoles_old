import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface ProductCardProps {
  imageUrl?: string;
  fileName?: string;
}

interface ProductInfo {
  reference?: string;
  description?: string;
}

const ProductCard = ({ imageUrl, fileName }: ProductCardProps) => {
  const [ficheProduitUrl, setFicheProduitUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [productInfo, setProductInfo] = useState<ProductInfo | null>(null);

  useEffect(() => {
    const fetchProductInfo = async () => {
      if (!fileName) {
        setIsLoading(false);
        return;
      }

      try {
        // Extract the product number from the filename (removing .png extension)
        const numeroFiche = fileName.replace('.png', '');

        // Get product info from urls_associes table
        const { data: productData, error: productError } = await supabase
          .from('urls_associes')
          .select('reference, description')
          .eq('numero_fiche', numeroFiche)
          .single();

        if (productError) throw productError;
        if (productData) {
          setProductInfo(productData);
        }

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
      
      {/* Product Info Cartridge */}
      <div className="w-full bg-industrial-600 rounded p-3 space-y-2">
        {isLoading ? (
          <div className="space-y-2">
            <div className="h-4 bg-industrial-500 animate-pulse rounded"></div>
            <div className="h-4 bg-industrial-500 animate-pulse rounded w-3/4"></div>
          </div>
        ) : productInfo ? (
          <>
            {productInfo.reference && (
              <p className="text-sm font-medium text-gray-300">
                Réf: {productInfo.reference}
              </p>
            )}
            {productInfo.description && (
              <p className="text-xs text-gray-400">
                {productInfo.description}
              </p>
            )}
          </>
        ) : (
          <p className="text-sm text-gray-400 text-center">
            Information produit non disponible
          </p>
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