import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import ProductCard from '@/components/ProductCard';

const Servantes = () => {
  const [files, setFiles] = useState<{ url: string; name: string }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFiles = async () => {
      console.info('Fetching files from servantes-d-atelier bucket...');
      
      const { data: files, error } = await supabase
        .storage
        .from('servantes-d-atelier')
        .list();

      console.info('Files found:', files);

      if (error) {
        console.error('Error fetching files:', error);
        return;
      }

      const validFiles = files?.filter(file => 
        file.name.match(/\.(jpg|jpeg|png|gif|webp)$/i)
      ) || [];

      const signedUrls = await Promise.all(
        validFiles.slice(0, 5).map(async (file) => {
          const { data } = await supabase
            .storage
            .from('servantes-d-atelier')
            .createSignedUrl(file.name, 3600);
          
          return {
            url: data?.signedUrl || '',
            name: file.name
          };
        })
      );

      console.info('Valid files with URLs:', signedUrls);
      setFiles(signedUrls);
      setLoading(false);
    };

    fetchFiles();
  }, []);

  return (
    <div className="min-h-screen bg-industrial-800 text-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Servantes d'atelier</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {loading ? (
            Array(5).fill(null).map((_, index) => (
              <div key={index} className="animate-pulse bg-industrial-700 rounded-lg aspect-square" />
            ))
          ) : (
            files.map((file, index) => (
              <ProductCard
                key={index}
                imageUrl={file.url}
                fileName={file.name}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Servantes;