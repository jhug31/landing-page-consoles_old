import { useEffect, useState } from "react";
import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";
import { Separator } from "@/components/ui/separator";
import { supabase } from "@/integrations/supabase/client";
import { Mail } from "lucide-react";

interface FileObject {
  name: string;
  signedUrl: string;
}

const Servantes = () => {
  const [files, setFiles] = useState<FileObject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const { data: fileList, error: listError } = await supabase
          .storage
          .from('servantes-d-atelier')
          .list();

        if (listError) {
          console.error('Error listing files:', listError);
          return;
        }

        const filesWithUrls = await Promise.all(
          fileList.map(async (file) => {
            const { data: { signedUrl }, error: urlError } = await supabase
              .storage
              .from('servantes-d-atelier')
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
        <div className="text-left mb-32 animate-fadeIn">
          <h1 className="text-4xl md:text-5xl font-light mb-4 tracking-wide">
            Servantes d'atelier
          </h1>
          <Separator className="my-4 w-16 bg-gray-600" />
          <p className="text-gray-400 text-base tracking-widest">
            INDUSTRIAL PRODUCTS
          </p>
        </div>

        <div 
          className="w-full grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto animate-fadeIn" 
          style={{ animationDelay: "0.2s" }}
        >
          {loading ? (
            Array(9).fill(null).map((_, index) => (
              <ProductCard key={index} />
            ))
          ) : (
            files.map((file, index) => (
              <ProductCard
                key={index}
                imageUrl={file.signedUrl}
                fileName={file.name}
              />
            ))
          )}
        </div>
      </main>

      <footer className="mt-16 border-t border-gray-800">
        <div className="container mx-auto px-4 py-8">
          <div className="flex md:justify-center items-center">
            <div className="rounded-full bg-industrial-700 p-3 inline-flex items-center justify-center">
              <Mail className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Servantes;