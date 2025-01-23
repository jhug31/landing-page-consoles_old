import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const useProductInfo = (fileName: string | undefined) => {
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
        const numeroFiche = fileName.replace('.png', '');
        console.log('🔍 Fetching product info for:', numeroFiche);

        // Get the product file URL
        const { data: publicUrl } = supabase
          .storage
          .from('fiches produits')
          .getPublicUrl(`${numeroFiche}.png`);

        if (publicUrl) {
          console.log('🔗 Product file URL:', publicUrl.publicUrl);
          setFicheProduitUrl(publicUrl.publicUrl);
        }

      } catch (err) {
        console.error('❌ Error in fetchProductInfo:', err);
        setError('Erreur lors du chargement des informations du produit');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProductInfo();
  }, [fileName]);

  return { ficheProduitUrl, isLoading, error };
};