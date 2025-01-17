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
            setLoading(false);
          }
          return;
        }

        if (!fileList || fileList.length === 0) {
          console.log("No files found in bucket");
          if (isMounted) {
            setFiles([]);
            setLoading(false);
          }
          return;
        }

        console.log("Files found in bucket:", fileList);

        const filesWithUrls = fileList.map((file) => {
          const { data: { publicUrl } } = supabase
            .storage
            .from(bucketName)
            .getPublicUrl(file.name);

          console.log(`Generated URL for ${file.name}:`, publicUrl);

          return {
            name: file.name,
            signedUrl: publicUrl
          };
        });

        console.log("Final files with URLs:", filesWithUrls);
        
        if (isMounted) {
          setFiles(filesWithUrls);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error in fetchFiles:', error);
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