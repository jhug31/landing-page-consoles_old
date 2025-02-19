
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const useProductInfo = (fileName: string | undefined) => {
  const [ficheProduitUrl, setFicheProduitUrl] = useState<string | null>(null);
  const [description, setDescription] = useState<string | null>(null);
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

        // Vérifier si le fichier existe dans le bucket avant de générer l'URL
        const { data: fileExists, error: checkError } = await supabase
          .storage
          .from('fiches produits')
          .list('', {
            search: `${numeroFiche}.png`
          });

        if (checkError) {
          console.error('❌ Error checking file existence:', checkError);
          throw checkError;
        }

        // Si le fichier existe, générer l'URL
        if (fileExists && fileExists.length > 0) {
          const { data: urlData } = supabase
            .storage
            .from('fiches produits')
            .getPublicUrl(`${numeroFiche}.png`);

          if (urlData) {
            console.log('🔗 Product file URL:', urlData.publicUrl);
            setFicheProduitUrl(urlData.publicUrl);
          }
        } else {
          console.warn(`⚠️ No file found for ${numeroFiche}.png in bucket`);
          setFicheProduitUrl(null);
        }

        // Fetch the product description
        const { data: descriptionData, error: descriptionError } = await supabase
          .from('description')
          .select('description')
          .eq('numero_fiche', numeroFiche)
          .maybeSingle();

        if (descriptionError) {
          throw descriptionError;
        }

        if (descriptionData) {
          console.log('📝 Product description:', descriptionData.description);
          setDescription(descriptionData.description);
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

  return { ficheProduitUrl, description, isLoading, error };
};
