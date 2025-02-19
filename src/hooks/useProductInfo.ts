
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

        // On vérifie d'abord si le fichier existe dans la table urls_associes
        const { data: urlData, error: urlError } = await supabase
          .from('urls_associes')
          .select('url')
          .eq('numero_fiche', numeroFiche)
          .maybeSingle();

        if (urlError) {
          console.error('❌ Error fetching URL from urls_associes:', urlError);
          throw urlError;
        }

        // Si on trouve une URL dans la table urls_associes, on l'utilise
        if (urlData && urlData.url) {
          console.log('🔗 Found URL in database:', urlData.url);
          setFicheProduitUrl(urlData.url);
        } else {
          // Sinon, on cherche dans le bucket de stockage
          const { data: urlData } = supabase
            .storage
            .from('fiches produits')
            .getPublicUrl(`${numeroFiche}.png`);

          if (urlData) {
            console.log('🔗 Generated storage URL:', urlData.publicUrl);
            setFicheProduitUrl(urlData.publicUrl);
          }
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
