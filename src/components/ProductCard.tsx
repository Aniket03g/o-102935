
import { Star, ShoppingCart, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useState } from "react";

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
  const [isLiked, setIsLiked] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsAddingToCart(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 600));
    
    setIsAddingToCart(false);
    // Add cart wiggle animation to navbar cart icon here
  };

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  return (
    <div className="group relative bg-card rounded-2xl overflow-hidden border border-border hover:border-border/60 shadow-sm hover:shadow-2xl transition-all duration-500 ease-out hover:-translate-y-2 hover:scale-[1.02]">
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-muted">
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
              onClick={handleLike}
              className={`h-11 w-11 p-0 bg-background/95 backdrop-blur-sm hover:bg-background border-0 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110 ${
                isLiked ? 'animate-heartbeat' : ''
              }`}
            >
              <Heart 
                size={18} 
                className={`transition-colors duration-200 ${
                  isLiked ? 'text-red-500 fill-red-500' : 'text-muted-foreground'
                }`} 
              />
            </Button>
            <Button
              size="sm"
              onClick={handleAddToCart}
              disabled={isAddingToCart}
              className={`h-11 w-11 p-0 bg-primary/90 backdrop-blur-sm hover:bg-primary border-0 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110 ${
                isAddingToCart ? 'animate-pulse' : ''
              }`}
            >
              <ShoppingCart 
                size={18} 
                className={`text-primary-foreground transition-transform duration-200 ${
                  isAddingToCart ? 'scale-75' : ''
                }`} 
              />
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div 
        className="p-6 cursor-pointer"
        onClick={() => navigate(`/product/${id}`)}
      >
        <h3 className="font-semibold text-card-foreground text-lg leading-snug mb-2 line-clamp-2 group-hover:text-muted-foreground transition-colors duration-200">
          {name}
        </h3>
        
        <div className="flex items-center justify-between mb-4">
          <p className="text-2xl font-bold text-card-foreground tracking-tight">{price}</p>
          <div className="flex items-center gap-1.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 transition-colors duration-200 ${
                  i < rating ? "fill-amber-400 text-amber-400" : "text-muted"
                }`}
              />
            ))}
            <span className="text-sm text-muted-foreground ml-1">({reviews})</span>
          </div>
        </div>

        <Button 
          className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-xl shadow-sm hover:shadow-lg transition-all duration-200 group-hover:bg-primary/80 hover:scale-[1.02]"
          onClick={handleAddToCart}
          disabled={isAddingToCart}
        >
          {isAddingToCart ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
              Adding...
            </div>
          ) : (
            'Add to Cart'
          )}
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
