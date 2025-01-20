import { useState, useEffect } from 'react';
import { Input } from './ui/input';
import { supabase } from '@/integrations/supabase/client';

interface ProductCardProps {
  imageUrl?: string;
  fileName?: string;
}

interface ProductInfo {
  url: string;
  ficheProduitUrl: string | null;
}

const ProductCard = ({ imageUrl, fileName }: ProductCardProps) => {
  const [productInfo, setProductInfo] = useState<ProductInfo | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProductInfo = async () => {
      if (!fileName) return;

      try {
        // Extract numero_fiche from filename (remove .png extension)
        const numeroFiche = fileName.replace('.png', '');

        // Fetch URL from urls_associes table
        const { data: urlData, error: urlError } = await supabase
          .from('urls_associes')
          .select('url')
          .eq('numero_fiche', numeroFiche)
          .single();

        if (urlError) {
          console.error('Error fetching URL:', urlError);
          setError('Error fetching product URL');
          return;
        }

        if (!urlData) {
          console.log('No URL found for product:', numeroFiche);
          return;
        }

        // Get the fiche produit image URL
        const { data: ficheProduitData } = supabase
          .storage
          .from('fiches produits')
          .getPublicUrl(`${numeroFiche}.png`);

        setProductInfo({
          url: urlData.url,
          ficheProduitUrl: ficheProduitData.publicUrl
        });

      } catch (err) {
        console.error('Error fetching product info:', err);
        setError('Error fetching product information');
      }
    };

    fetchProductInfo();
  }, [fileName]);

  const openUrl = () => {
    if (productInfo?.url) {
      window.open(productInfo.url, '_blank');
    }
  };

  return (
    <div className="product-card bg-industrial-700 rounded-lg p-4 flex flex-col items-center justify-center gap-4">
      <div 
        className="w-full aspect-square bg-industrial-600 rounded flex items-center justify-center overflow-hidden cursor-pointer"
        onClick={openUrl}
      >
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
      
      {productInfo?.ficheProduitUrl && (
        <a 
          href={productInfo.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="w-full"
        >
          <img
            src={productInfo.ficheProduitUrl}
            alt="Fiche produit"
            className="w-full h-auto object-contain rounded"
            onError={(e) => {
              console.error('Error loading fiche produit:', productInfo.ficheProduitUrl);
              e.currentTarget.style.display = 'none';
            }}
          />
        </a>
      )}

      {error && (
        <div className="text-red-500 text-sm">{error}</div>
      )}
    </div>
  );
};

export default ProductCard;