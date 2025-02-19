
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface FileObject {
  name: string;
  signedUrl: string;
}

export const useStorageFiles = (bucketName: string) => {
  const [files, setFiles] = useState<FileObject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchFiles = async () => {
      try {
        console.log(`🔍 Début de la récupération des fichiers du bucket "${bucketName}"...`);

        // Récupérer le nombre de lignes dans la table 'description'
        const { count: dbCount, error: countError } = await supabase
          .from('description')
          .select('*', { count: 'exact' });

        if (countError) {
          console.error('❌ Erreur lors du comptage des lignes dans la table:', countError);
          if (isMounted) {
            setError('Erreur lors du comptage des lignes dans la table');
            setLoading(false);
          }
          return;
        }

        console.log(`📊 Nombre de lignes dans la table: ${dbCount}`);

        // Récupérer les fichiers du bucket
        const { data: fileList, error: listError } = await supabase
          .storage
          .from(bucketName)
          .list();

        if (listError) {
          console.error('❌ Erreur lors de la récupération des fichiers:', listError);
          if (isMounted) {
            setError('Erreur lors de la récupération des fichiers');
            setLoading(false);
          }
          return;
        }

        // Vérifier que le nombre de fichiers correspond au nombre de lignes
        if (!fileList) {
          console.log("ℹ️ Aucun fichier trouvé dans le bucket");
          if (isMounted) {
            setFiles([]);
            setLoading(false);
          }
          return;
        }

        if (fileList.length !== dbCount) {
          console.warn(`⚠️ Attention: Le nombre de fichiers (${fileList.length}) ne correspond pas au nombre de lignes dans la table (${dbCount})`);
        }

        console.log("📁 Liste des fichiers trouvés:", fileList.map(f => f.name));
        console.log(`📊 Nombre total de fichiers: ${fileList.length}`);

        const filesWithUrls = fileList.map((file) => {
          const { data } = supabase
            .storage
            .from(bucketName)
            .getPublicUrl(file.name);

          const publicUrl = data.publicUrl;
          console.log(`🔗 URL générée pour ${file.name}:`, publicUrl);

          return {
            name: file.name,
            signedUrl: publicUrl
          };
        });

        console.log("✅ Traitement terminé");
        console.log("📝 Liste finale des fichiers avec URLs:", filesWithUrls);
        console.log(`📊 Nombre final de fichiers: ${filesWithUrls.length}`);
        
        if (isMounted) {
          // Ne garder que le nombre de fichiers correspondant au nombre de lignes dans la table
          setFiles(filesWithUrls.slice(0, dbCount));
          setLoading(false);
        }
      } catch (error) {
        console.error('❌ Erreur inattendue:', error);
        if (isMounted) {
          setError('Une erreur est survenue');
          setLoading(false);
        }
      }
    };

    fetchFiles();

    return () => {
      isMounted = false;
    };
  }, [bucketName]);

  return { files, loading, error };
};
