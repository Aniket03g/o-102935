
import React from 'react';
import { useCart } from '../contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { ShoppingCart, Plus, Minus, X, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CartSidebar = () => {
  const { items, removeFromCart, updateQuantity, getTotalItems, getTotalPrice, isOpen, setIsOpen } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    setIsOpen(false);
    navigate('/checkout');
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative h-10 w-10 rounded-full hover:bg-accent/50 transition-all duration-200"
        >
          <ShoppingCart size={20} className="text-foreground" />
          {getTotalItems() > 0 && (
            <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 text-xs bg-primary text-primary-foreground animate-pulse">
              {getTotalItems()}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      
      <SheetContent className="w-full sm:max-w-md bg-background border-border">
        <SheetHeader className="pb-6">
          <SheetTitle className="flex items-center gap-2">
            <ShoppingCart size={20} />
            Shopping Cart ({getTotalItems()})
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <ShoppingCart size={48} className="text-muted-foreground mb-4" />
            <p className="text-lg font-medium text-muted-foreground mb-2">Your cart is empty</p>
            <p className="text-sm text-muted-foreground mb-6">Add some products to get started</p>
            <Button onClick={() => setIsOpen(false)} className="w-full">
              Continue Shopping
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto space-y-4 max-h-[calc(100vh-300px)]">
              {items.map((item) => (
                <div key={`${item.id}-${item.variant}`} className="flex items-start gap-4 p-4 bg-card rounded-xl border border-border">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm text-card-foreground line-clamp-2 mb-1">
                      {item.name}
                    </h4>
                    {item.variant && (
                      <p className="text-xs text-muted-foreground mb-2">{item.variant}</p>
                    )}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus size={12} />
                        </Button>
                        <span className="text-sm font-medium w-8 text-center">
                          {item.quantity}
                        </span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus size={12} />
                        </Button>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive hover:text-destructive"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <X size={14} />
                      </Button>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-sm">
                      ₹{(item.price * item.quantity).toLocaleString()}
                    </p>
                    {item.originalPrice && (
                      <p className="text-xs text-muted-foreground line-through">
                        ₹{(item.originalPrice * item.quantity).toLocaleString()}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-border pt-6 mt-6 space-y-4">
              <div className="flex justify-between items-center text-lg font-bold">
                <span>Total:</span>
                <span>₹{getTotalPrice().toLocaleString()}</span>
              </div>
              <Button 
                onClick={handleCheckout} 
                className="w-full h-12 text-lg font-semibold bg-primary hover:bg-primary/90"
              >
                Checkout
                <ArrowRight size={20} className="ml-2" />
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartSidebar;
