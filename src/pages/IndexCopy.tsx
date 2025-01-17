import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageTitle from "@/components/PageTitle";
import { supabase } from "@/integrations/supabase/client";

interface FileObject {
  name: string;
  signedUrl: string;
}

const IndexCopy = () => {
  const [files, setFiles] = useState<FileObject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const { data: fileList, error: listError } = await supabase
          .storage
          .from('copy coffres a outils')
          .list();

        if (listError) {
          console.error('Error listing files:', listError);
          return;
        }

        const filesWithUrls = await Promise.all(
          fileList.map(async (file) => {
            const { data: { signedUrl }, error: urlError } = await supabase
              .storage
              .from('copy coffres a outils')
              .createSignedUrl(file.name, 3600);

            if (urlError) {
              console.error('Error getting signed URL:', urlError);
              return null;
            }

            return {
              name: file.name,
              signedUrl: signedUrl
            };
          })
        );

        setFiles(filesWithUrls.filter((file): file is FileObject => file !== null));
      } catch (error) {
        console.error('Error fetching files:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFiles();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 pt-32 flex flex-col">
        <PageTitle 
          title="Copy Coffres à outils"
          subtitle="INDUSTRIAL PRODUCTS"
        />

        <div 
          className="w-full grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto animate-fadeIn" 
          style={{ animationDelay: "0.2s" }}
        >
          {loading ? (
            Array(9).fill(null).map((_, index) => (
              <div key={index} className="bg-industrial-700 rounded-lg p-4 flex flex-col items-center justify-center gap-4">
                <div className="w-full aspect-square bg-industrial-600 rounded animate-pulse" />
                <div className="w-full h-10 bg-industrial-600 rounded animate-pulse" />
              </div>
            ))
          ) : (
            files.map((file, index) => (
              <div key={index} className="bg-industrial-700 rounded-lg p-4 flex flex-col items-center justify-center gap-4">
                <div className="w-full aspect-square bg-industrial-600 rounded flex items-center justify-center overflow-hidden">
                  <img 
                    src={file.signedUrl} 
                    alt={file.name} 
                    className="w-full h-full object-contain"
                  />
                </div>
                <input
                  type="url"
                  placeholder="Entrez l'URL du produit"
                  className="w-full text-sm bg-industrial-600 border border-industrial-500 rounded text-gray-300 placeholder:text-gray-500 px-3 py-2"
                />
              </div>
            ))
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default IndexCopy;