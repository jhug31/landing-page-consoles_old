import { useEffect, useState } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { ArrowUpRight } from 'lucide-react';

interface ProductCardProps {
  imageUrl?: string;
  fileName?: string;
}

const ProductCard = ({ imageUrl, fileName }: ProductCardProps) => {
  const [productUrl, setProductUrl] = useState<string | null>(null);
  const [ficheProduitUrl, setFicheProduitUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchProductData = async () => {
      if (!fileName) return;

      try {
        // Extraire le numéro de fiche du nom de fichier
        let fileNumber = fileName.replace(/\.png$/, '');
        if (fileNumber.startsWith('servante_')) {
          fileNumber = fileNumber.replace('servante_', '');
        }
        
        console.log('Fetching data for file number:', fileNumber);
        
        // Récupérer l'URL du produit
        const { data, error } = await supabase
          .from('urls_associes')
          .select('url')
          .eq('numero_fiche', fileNumber)
          .maybeSingle();

        if (error) {
          console.error('Erreur lors de la récupération de l\'URL:', error);
          return;
        }

        if (data?.url) {
          const cleanUrl = data.url.replace(/:$/, '').trim();
          try {
            const url = new URL(cleanUrl);
            if (url.protocol === 'http:' || url.protocol === 'https:') {
              setProductUrl(url.toString());
            }
          } catch (e) {
            console.error('URL invalide:', cleanUrl, e);
          }
        }

        // Récupérer l'URL de la fiche produit depuis le bucket
        try {
          const { data: ficheProduitData } = supabase
            .storage
            .from('fiches produits')
            .getPublicUrl(`${fileNumber}.png`);

          if (ficheProduitData?.publicUrl) {
            // Vérifier si l'image existe en faisant une requête HEAD
            const response = await fetch(ficheProduitData.publicUrl, { method: 'HEAD' });
            if (response.ok) {
              setFicheProduitUrl(ficheProduitData.publicUrl);
            } else {
              console.log('Fiche produit non trouvée:', fileNumber);
            }
          }
        } catch (error) {
          console.error('Erreur lors de la récupération de la fiche produit:', error);
        }
      } catch (error) {
        console.error('Erreur lors de la requête:', error);
      }
    };

    fetchProductData();
  }, [fileName]);

  const openUrl = () => {
    if (productUrl) {
      try {
        const url = new URL(productUrl);
        if (url.protocol === 'http:' || url.protocol === 'https:') {
          window.open(url.toString(), '_blank', 'noopener,noreferrer');
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
            loading="lazy"
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
      
      {ficheProduitUrl && (
        <a
          href={productUrl || '#'}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full aspect-[4/3] bg-white rounded overflow-hidden hover:opacity-90 transition-opacity"
          onClick={(e) => {
            if (!productUrl) e.preventDefault();
          }}
        >
          <img 
            src={ficheProduitUrl}
            alt="Fiche produit"
            className="w-full h-full object-contain"
            loading="lazy"
            onError={(e) => {
              console.error('Error loading fiche produit:', ficheProduitUrl);
              e.currentTarget.parentElement?.classList.add('hidden');
            }}
          />
        </a>
      )}

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