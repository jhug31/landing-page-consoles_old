import { useEffect, useState } from 'react';
import { Input } from './ui/input';
import { supabase } from "@/integrations/supabase/client";
import { ArrowUpRight } from 'lucide-react';

interface ProductCardProps {
  imageUrl?: string;
  fileName?: string;
}

const ProductCard = ({ imageUrl, fileName }: ProductCardProps) => {
  const [productUrl, setProductUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchProductUrl = async () => {
      if (!fileName) return;

      try {
        // Extraire le numéro de fiche du nom de fichier
        let fileNumber = fileName.replace(/\.png$/, '');
        if (fileNumber.startsWith('servante_')) {
          fileNumber = fileNumber.replace('servante_', '');
        }
        
        console.log('Fetching URL for file number:', fileNumber);
        
        const { data, error } = await supabase
          .from('urls_associes')
          .select('url')
          .eq('numero_fiche', fileNumber)
          .maybeSingle();

        if (error) {
          console.error('Erreur lors de la récupération de l\'URL:', error);
          return;
        }

        console.log('Database response:', data);

        if (data?.url) {
          // Remove any trailing colons and validate URL
          const cleanUrl = data.url.replace(/:$/, '').trim();
          console.log('Cleaned URL:', cleanUrl);
          
          try {
            const url = new URL(cleanUrl);
            if (url.protocol === 'http:' || url.protocol === 'https:') {
              console.log('Setting valid URL:', url.toString());
              setProductUrl(url.toString());
            } else {
              console.error('Invalid URL protocol:', url.protocol);
            }
          } catch (e) {
            console.error('URL invalide:', cleanUrl, e);
          }
        }
      } catch (error) {
        console.error('Erreur lors de la requête Supabase:', error);
      }
    };

    fetchProductUrl();
  }, [fileName]);

  const openUrl = () => {
    if (productUrl) {
      try {
        const url = new URL(productUrl);
        if (url.protocol === 'http:' || url.protocol === 'https:') {
          window.open(url.toString(), '_blank', 'noopener,noreferrer');
        } else {
          console.error('Invalid URL protocol:', url.protocol);
        }
      } catch (e) {
        console.error('Erreur lors de l\'ouverture de l\'URL:', e);
      }
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
      {productUrl && (
        <a
          href={productUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full text-sm text-gray-300 hover:text-white flex items-center justify-center gap-2 transition-colors"
        >
          Voir fiche-produit <ArrowUpRight className="w-4 h-4" />
        </a>
      )}
    </div>
  );
};

export default ProductCard;