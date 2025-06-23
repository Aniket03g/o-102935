
import { Star, ShoppingCart, Heart, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useCart } from "../contexts/CartContext";
import { useToast } from "@/hooks/use-toast";

interface ProductCardProps {
  id?: number;
  name: string;
  price: string;
  originalPrice?: string;
  image: string;
  rating: number;
  reviews: number;
  badge?: string;
  discount?: number;
}

const ProductCard = ({ 
  id = 1, 
  name, 
  price, 
  originalPrice,
  image, 
  rating, 
  reviews,
  badge,
  discount
}: ProductCardProps) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toast } = useToast();
  const [isLiked, setIsLiked] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsAddingToCart(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 600));
    
    // Convert price string to number
    const numericPrice = parseInt(price.replace(/[^0-9]/g, ''));
    const numericOriginalPrice = originalPrice ? parseInt(originalPrice.replace(/[^0-9]/g, '')) : undefined;
    
    addToCart({
      id,
      name,
      price: numericPrice,
      originalPrice: numericOriginalPrice,
      image
    });
    
    setIsAddingToCart(false);
    setJustAdded(true);
    
    toast({
      title: "Added to cart!",
      description: `${name} has been added to your cart.`,
      duration: 2000,
    });
    
    // Reset the "just added" state after animation
    setTimeout(() => setJustAdded(false), 2000);
  };

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
    
    toast({
      title: isLiked ? "Removed from wishlist" : "Added to wishlist",
      description: isLiked ? `${name} removed from your wishlist.` : `${name} added to your wishlist.`,
      duration: 2000,
    });
  };

  const getBadgeColor = (badgeText: string) => {
    switch (badgeText) {
      case "Bestseller": return "bg-amber-500/10 text-amber-600 border-amber-500/20";
      case "New": return "bg-emerald-500/10 text-emerald-600 border-emerald-500/20";
      case "Gaming": return "bg-violet-500/10 text-violet-600 border-violet-500/20";
      case "Premium": return "bg-blue-500/10 text-blue-600 border-blue-500/20";
      default: return "bg-muted text-muted-foreground border-border";
    }
  };

  return (
    <div className="group relative bg-card rounded-2xl overflow-hidden border border-border hover:border-border/60 shadow-sm hover:shadow-2xl transition-all duration-500 ease-out hover:-translate-y-2 hover:scale-[1.02]">
      {/* Discount Badge */}
      {discount && (
        <div className="absolute top-4 left-4 z-10 bg-destructive text-destructive-foreground px-3 py-1 rounded-full text-sm font-bold shadow-lg">
          -{discount}%
        </div>
      )}
      
      {/* Category Badge */}
      {badge && (
        <div className={`absolute top-4 right-4 z-10 px-3 py-1 rounded-full text-xs font-medium border ${getBadgeColor(badge)} backdrop-blur-sm`}>
          {badge}
        </div>
      )}

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
              disabled={isAddingToCart || justAdded}
              className={`h-11 w-11 p-0 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110 ${
                justAdded 
                  ? 'bg-green-500 hover:bg-green-600' 
                  : 'bg-primary/90 hover:bg-primary'
              } ${isAddingToCart ? 'animate-pulse' : ''}`}
            >
              {justAdded ? (
                <Check size={18} className="text-white" />
              ) : (
                <ShoppingCart 
                  size={18} 
                  className={`text-primary-foreground transition-transform duration-200 ${
                    isAddingToCart ? 'scale-75' : ''
                  }`} 
                />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div 
        className="p-6 cursor-pointer"
        onClick={() => navigate(`/product/${id}`)}
      >
        <h3 className="font-semibold text-card-foreground text-lg leading-snug mb-2 line-clamp-2 group-hover:text-primary transition-colors duration-200">
          {name}
        </h3>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <p className="text-2xl font-bold text-card-foreground tracking-tight">{price}</p>
            {originalPrice && (
              <p className="text-lg text-muted-foreground line-through">{originalPrice}</p>
            )}
          </div>
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
          disabled={isAddingToCart || justAdded}
        >
          {isAddingToCart ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
              Adding...
            </div>
          ) : justAdded ? (
            <div className="flex items-center gap-2">
              <Check size={16} />
              Added to Cart
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
