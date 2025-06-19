
import { Star, ShoppingCart, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface ProductCardProps {
  id?: number;
  name: string;
  price: string;
  image: string;
  rating: number;
  reviews: number;
}

const ProductCard = ({ id = 1, name, price, image, rating, reviews }: ProductCardProps) => {
  const navigate = useNavigate();

  return (
    <div className="group relative bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-gray-200 shadow-sm hover:shadow-xl transition-all duration-500 ease-out hover:-translate-y-1">
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-gray-50">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-110"
        />
        
        {/* Quick Action Overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
          <div className="flex gap-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            <Button
              size="sm"
              variant="secondary"
              className="h-11 w-11 p-0 bg-white/95 backdrop-blur-sm hover:bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110"
            >
              <Heart size={18} className="text-gray-700" />
            </Button>
            <Button
              size="sm"
              className="h-11 w-11 p-0 bg-gray-900/90 backdrop-blur-sm hover:bg-gray-900 border-0 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110"
            >
              <ShoppingCart size={18} className="text-white" />
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div 
        className="p-6 cursor-pointer"
        onClick={() => navigate(`/product/${id}`)}
      >
        <h3 className="font-semibold text-gray-900 text-lg leading-snug mb-2 line-clamp-2 group-hover:text-gray-700 transition-colors duration-200">
          {name}
        </h3>
        
        <div className="flex items-center justify-between mb-4">
          <p className="text-2xl font-bold text-gray-900 tracking-tight">{price}</p>
          <div className="flex items-center gap-1.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < rating ? "fill-amber-400 text-amber-400" : "text-gray-200"
                }`}
              />
            ))}
            <span className="text-sm text-gray-500 ml-1">({reviews})</span>
          </div>
        </div>

        <Button 
          className="w-full h-12 bg-gray-900 hover:bg-gray-800 text-white font-medium rounded-xl shadow-sm hover:shadow-lg transition-all duration-200 group-hover:bg-gray-800"
          onClick={(e) => {
            e.stopPropagation();
            // Add to cart logic here
          }}
        >
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
