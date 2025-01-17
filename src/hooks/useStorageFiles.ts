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
        console.log(`Fetching files from ${bucketName} bucket...`);
        const { data: fileList, error: listError } = await supabase
          .storage
          .from(bucketName)
          .list();

        if (listError) {
          console.error('Error listing files:', listError);
          if (isMounted) {
            setError('Erreur lors de la récupération des fichiers');
          }
          return;
        }

        if (!fileList || fileList.length === 0) {
          console.log("No files found in bucket");
          if (isMounted) {
            setFiles([]);
          }
          return;
        }

        const filesWithUrls = await Promise.all(
          fileList.map(async (file) => {
            const { data: { publicUrl } } = supabase
              .storage
              .from(bucketName)
              .getPublicUrl(file.name);

            return {
              name: file.name,
              signedUrl: publicUrl
            };
          })
        );

        console.log("Generated URLs:", filesWithUrls);
        if (isMounted) {
          setFiles(filesWithUrls);
        }
      } catch (error) {
        console.error('Error fetching files:', error);
        if (isMounted) {
          setError('Une erreur est survenue');
        }
      } finally {
        if (isMounted) {
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