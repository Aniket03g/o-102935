
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useCart } from '../contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ShoppingCart, Plus, Minus, X, ArrowLeft, ArrowRight, Trash2 } from 'lucide-react';

const Cart = () => {
  const navigate = useNavigate();
  const { items, updateQuantity, removeFromCart, clearCart, getTotalPrice } = useCart();

  const subtotal = getTotalPrice();
  const shipping = subtotal > 99 ? 0 : 9.99;
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shipping + tax;

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        
        <main className="container-modern pt-32 pb-20">
          <div className="max-w-4xl mx-auto text-center">
            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-8">
              <ShoppingCart size={48} className="text-muted-foreground" />
            </div>
            <h1 className="text-4xl font-bold text-foreground mb-4">Your cart is empty</h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-md mx-auto">
              Looks like you haven't added any products to your cart yet.
            </p>
            <div className="flex gap-4 justify-center">
              <Button 
                onClick={() => navigate('/marketplace')}
                className="btn-primary"
              >
                <ArrowLeft size={20} className="mr-2" />
                Continue Shopping
              </Button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container-modern pt-32 pb-20">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-12">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">Shopping Cart</h1>
              <p className="text-muted-foreground">
                {items.length} item{items.length !== 1 ? 's' : ''} in your cart
              </p>
            </div>
            <Button
              variant="outline"
              onClick={clearCart}
              className="text-destructive hover:text-destructive hover:bg-destructive/10"
            >
              <Trash2 size={16} className="mr-2" />
              Clear Cart
            </Button>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              {items.map((item) => (
                <Card key={`${item.id}-${item.variant}`} className="card-premium">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-6">
                      {/* Product Image */}
                      <div className="flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-24 h-24 object-cover rounded-xl border border-border"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-lg text-foreground mb-1 line-clamp-2">
                          {item.name}
                        </h3>
                        {item.variant && (
                          <p className="text-sm text-muted-foreground mb-3">{item.variant}</p>
                        )}
                        
                        <div className="flex items-center justify-between">
                          {/* Quantity Controls */}
                          <div className="flex items-center gap-3">
                            <span className="text-sm font-medium text-foreground">Quantity:</span>
                            <div className="flex items-center border border-border rounded-lg overflow-hidden">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="p-2 hover:bg-accent transition-colors"
                              >
                                <Minus size={14} />
                              </button>
                              <span className="px-4 py-2 border-x border-border min-w-[50px] text-center font-medium">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="p-2 hover:bg-accent transition-colors"
                              >
                                <Plus size={14} />
                              </button>
                            </div>
                          </div>

                          {/* Remove Button */}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFromCart(item.id)}
                            className="text-destructive hover:text-destructive hover:bg-destructive/10"
                          >
                            <X size={16} className="mr-1" />
                            Remove
                          </Button>
                        </div>
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        <p className="text-2xl font-bold text-foreground">
                          ${(item.price * item.quantity).toLocaleString()}
                        </p>
                        {item.originalPrice && (
                          <p className="text-sm text-muted-foreground line-through">
                            ${(item.originalPrice * item.quantity).toLocaleString()}
                          </p>
                        )}
                        <p className="text-sm text-muted-foreground mt-1">
                          ${item.price.toLocaleString()} each
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="card-premium sticky top-8">
                <CardHeader>
                  <CardTitle className="text-foreground">Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="font-medium text-foreground">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Shipping</span>
                      <span className={`font-medium ${shipping === 0 ? 'text-green-600' : 'text-foreground'}`}>
                        {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Tax</span>
                      <span className="font-medium text-foreground">${tax.toFixed(2)}</span>
                    </div>
                    <div className="border-t border-border pt-3">
                      <div className="flex justify-between font-semibold text-lg">
                        <span className="text-foreground">Total</span>
                        <span className="text-foreground">${total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  {shipping > 0 && (
                    <div className="bg-accent/50 border border-border rounded-lg p-3">
                      <p className="text-xs text-muted-foreground">
                        Add ${(99 - subtotal).toFixed(2)} more for free shipping!
                      </p>
                    </div>
                  )}

                  <div className="space-y-3 pt-4">
                    <Button 
                      onClick={() => navigate('/checkout')}
                      className="w-full h-12 text-lg font-semibold bg-primary hover:bg-primary/90"
                    >
                      Proceed to Checkout
                      <ArrowRight size={20} className="ml-2" />
                    </Button>
                    
                    <Button 
                      variant="outline"
                      onClick={() => navigate('/marketplace')}
                      className="w-full h-12"
                    >
                      <ArrowLeft size={20} className="mr-2" />
                      Continue Shopping
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Cart;
