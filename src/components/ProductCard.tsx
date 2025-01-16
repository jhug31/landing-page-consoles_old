interface ProductCardProps {
  imageUrl?: string;
}

const ProductCard = ({ imageUrl }: ProductCardProps) => {
  return (
    <div className="product-card bg-industrial-700 rounded-lg p-8 flex items-center justify-center">
      <div className="w-32 h-48 bg-industrial-600 rounded flex items-center justify-center">
        {imageUrl && <img src={imageUrl} alt="Product" className="w-full h-full object-cover" />}
      </div>
    </div>
  );
};

export default ProductCard;