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
        console.log('🔍 Fetching product info for:', fileName);
        const numeroFiche = fileName.replace('.png', '');

        // Get the product description
        const { data: descriptionData, error: descriptionError } = await supabase
          .from('description')
          .select('description')
          .eq('numero_fiche', numeroFiche)
          .maybeSingle();

        if (descriptionError) {
          console.error('❌ Error fetching description:', descriptionError);
          setError('Erreur lors du chargement de la description');
        } else {
          console.log('📝 Description data:', descriptionData);
          setDescription(descriptionData?.description ?? null);
        }

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

  return { ficheProduitUrl, description, isLoading, error };
};