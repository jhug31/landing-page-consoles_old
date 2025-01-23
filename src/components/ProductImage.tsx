interface ProductImageProps {
  imageUrl?: string;
  fileName?: string;
}

const ProductImage = ({ imageUrl, fileName }: ProductImageProps) => {
  return (
    <div className="w-full aspect-square bg-industrial-600 rounded flex items-center justify-center overflow-hidden">
      {imageUrl ? (
        <img 
          src={imageUrl} 
          alt={fileName || "Produit"} 
          className="w-full h-full object-contain"
          onError={(e) => {
            console.error('Error loading image:', imageUrl);
            e.currentTarget.src = '/placeholder.svg';
          }}
        />
      ) : (
        <div className="w-full h-full bg-industrial-800 flex items-center justify-center text-gray-400">
          Produit
        </div>
      )}
    </div>
  );
};

export default ProductImage;