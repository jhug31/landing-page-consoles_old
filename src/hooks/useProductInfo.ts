
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

        // On vérifie d'abord si le fichier existe dans le bucket
        const { data: fileList, error: listError } = await supabase
          .storage
          .from('fiches produits')
          .list('', {
            search: `${numeroFiche}.png`
          });

        if (listError) {
          console.error('❌ Error listing files:', listError);
          throw listError;
        }

        // Si le fichier existe dans le bucket
        if (fileList && fileList.length > 0) {
          console.log(`✅ File ${numeroFiche}.png found in bucket`);
          // On vérifie s'il existe une URL alternative dans la table urls_associes
          const { data: urlData, error: urlError } = await supabase
            .from('urls_associes')
            .select('url')
            .eq('numero_fiche', numeroFiche)
            .maybeSingle();

          if (urlError) {
            console.error('❌ Error fetching URL from urls_associes:', urlError);
            throw urlError;
          }

          // On utilise l'URL de la base de données si elle existe
          if (urlData && urlData.url) {
            console.log('🔗 Using URL from database:', urlData.url);
            setFicheProduitUrl(urlData.url);
          } else {
            // Sinon, on génère l'URL du bucket
            const { data: storageData } = supabase
              .storage
              .from('fiches produits')
              .getPublicUrl(fileList[0].name);

            console.log('🔗 Using storage URL:', storageData.publicUrl);
            setFicheProduitUrl(storageData.publicUrl);
          }
        } else {
          console.warn(`⚠️ File ${numeroFiche}.png not found in bucket`);
          setFicheProduitUrl(null);
          setError('Fichier non trouvé');
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
