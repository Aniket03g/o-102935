
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import Navbar from "../components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { ShieldCheck, Lock, CreditCard, MapPin, User, Mail, Phone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface FormData {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  nameOnCard: string;
  createAccount: boolean;
  password: string;
}

interface FormErrors {
  email?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  cardNumber?: string;
  expiryDate?: string;
  cvv?: string;
  nameOnCard?: string;
  password?: string;
}

const Checkout = () => {
  const navigate = useNavigate();
  const { items, getTotalPrice, clearCart } = useCart();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState<FormData>({
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    nameOnCard: '',
    createAccount: false,
    password: ''
  });
  
  const [errors, setErrors] = useState<FormErrors>({});

  // Calculate totals
  const subtotal = getTotalPrice();
  const tax = Math.round(subtotal * 0.08); // 8% tax
  const total = subtotal + tax;

  // If cart is empty, redirect to marketplace
  React.useEffect(() => {
    if (items.length === 0) {
      navigate('/marketplace');
    }
  }, [items, navigate]);

  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateField = (field: keyof FormData, value: string): string => {
    switch (field) {
      case 'email':
        return value.includes('@') ? '' : 'Please enter a valid email address';
      case 'cardNumber':
        return value.replace(/\s/g, '').length >= 16 ? '' : 'Please enter a valid card number';
      case 'cvv':
        return value.length >= 3 ? '' : 'Please enter a valid CVV';
      case 'phone':
        return value.length >= 10 ? '' : 'Please enter a valid phone number';
      case 'password':
        return formData.createAccount && value.length < 6 ? 'Password must be at least 6 characters' : '';
      default:
        return value.trim() ? '' : 'This field is required';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: FormErrors = {};
    
    // Validate required fields
    const requiredFields: (keyof FormData)[] = [
      'email', 'firstName', 'lastName', 'phone', 'address', 
      'city', 'state', 'zipCode', 'cardNumber', 'expiryDate', 'cvv', 'nameOnCard'
    ];
    
    if (formData.createAccount) {
      requiredFields.push('password');
    }
    
    requiredFields.forEach(field => {
      const error = validateField(field, formData[field] as string);
      if (error) newErrors[field as keyof FormErrors] = error;
    });
    
    if (Object.keys(newErrors).length === 0) {
      // Process order
      console.log('Order submitted:', formData);
      toast({
        title: "Order Placed Successfully!",
        description: "Your order has been confirmed and will be processed shortly.",
      });
      clearCart();
      navigate('/order-success');
    } else {
      setErrors(newErrors);
      toast({
        title: "Please fix the errors",
        description: "Check the form for any missing or invalid information.",
        variant: "destructive"
      });
    }
  };

  if (items.length === 0) {
    return null; // Will redirect via useEffect
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container-modern pt-32 pb-20">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Secure Checkout
            </h1>
            <div className="flex items-center justify-center gap-2 text-green-600 dark:text-green-400">
              <ShieldCheck size={20} />
              <span className="font-medium">SSL Encrypted & Secure</span>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-8 bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-card-foreground">Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Cart Items */}
                  <div className="space-y-3 mb-4">
                    {items.map((item) => (
                      <div key={`${item.id}-${item.variant}`} className="flex items-center gap-3">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-12 h-12 object-cover rounded-lg"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-card-foreground truncate">
                            {item.name}
                          </p>
                          {item.variant && (
                            <p className="text-xs text-muted-foreground">{item.variant}</p>
                          )}
                          <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                        </div>
                        <p className="text-sm font-medium text-card-foreground">
                          ₹{(item.price * item.quantity).toLocaleString()}
                        </p>
                      </div>
                    ))}
                  </div>
                  
                  <Separator className="bg-border" />
                  
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="font-medium text-card-foreground">₹{subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Shipping</span>
                      <span className="font-medium text-green-600 dark:text-green-400">Free</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Tax</span>
                      <span className="font-medium text-card-foreground">₹{tax.toLocaleString()}</span>
                    </div>
                    <Separator className="bg-border" />
                    <div className="flex justify-between font-semibold text-lg">
                      <span className="text-card-foreground">Total</span>
                      <span className="text-card-foreground">₹{total.toLocaleString()}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Checkout Form */}
            <div className="lg:col-span-2 space-y-8">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Contact Information */}
                <Card className="bg-card border-border">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-card-foreground">
                      <Mail size={20} />
                      Contact Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="email" className="text-foreground">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className={`mt-1 bg-background border-input text-foreground ${errors.email ? 'border-destructive' : ''}`}
                        placeholder="your@email.com"
                      />
                      {errors.email && <p className="text-destructive text-sm mt-1">{errors.email}</p>}
                    </div>
                    
                    {/* Create Account Option */}
                    <div className="flex items-center space-x-2 p-4 bg-muted/50 rounded-lg">
                      <Switch
                        id="create-account"
                        checked={formData.createAccount}
                        onCheckedChange={(checked) => handleInputChange('createAccount', checked)}
                      />
                      <Label htmlFor="create-account" className="text-foreground font-medium">
                        Create an account for faster checkout
                      </Label>
                    </div>
                    
                    {formData.createAccount && (
                      <div>
                        <Label htmlFor="password" className="text-foreground">Password</Label>
                        <Input
                          id="password"
                          type="password"
                          value={formData.password}
                          onChange={(e) => handleInputChange('password', e.target.value)}
                          className={`mt-1 bg-background border-input text-foreground ${errors.password ? 'border-destructive' : ''}`}
                          placeholder="Enter password (min 6 characters)"
                        />
                        {errors.password && <p className="text-destructive text-sm mt-1">{errors.password}</p>}
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Shipping Information */}
                <Card className="bg-card border-border">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-card-foreground">
                      <MapPin size={20} />
                      Shipping Address
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName" className="text-foreground">First Name</Label>
                        <Input
                          id="firstName"
                          value={formData.firstName}
                          onChange={(e) => handleInputChange('firstName', e.target.value)}
                          className={`mt-1 bg-background border-input text-foreground ${errors.firstName ? 'border-destructive' : ''}`}
                        />
                        {errors.firstName && <p className="text-destructive text-sm mt-1">{errors.firstName}</p>}
                      </div>
                      <div>
                        <Label htmlFor="lastName" className="text-foreground">Last Name</Label>
                        <Input
                          id="lastName"
                          value={formData.lastName}
                          onChange={(e) => handleInputChange('lastName', e.target.value)}
                          className={`mt-1 bg-background border-input text-foreground ${errors.lastName ? 'border-destructive' : ''}`}
                        />
                        {errors.lastName && <p className="text-destructive text-sm mt-1">{errors.lastName}</p>}
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="phone" className="text-foreground">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className={`mt-1 bg-background border-input text-foreground ${errors.phone ? 'border-destructive' : ''}`}
                        placeholder="+91 98765 43210"
                      />
                      {errors.phone && <p className="text-destructive text-sm mt-1">{errors.phone}</p>}
                    </div>
                    
                    <div>
                      <Label htmlFor="address" className="text-foreground">Street Address</Label>
                      <Input
                        id="address"
                        value={formData.address}
                        onChange={(e) => handleInputChange('address', e.target.value)}
                        className={`mt-1 bg-background border-input text-foreground ${errors.address ? 'border-destructive' : ''}`}
                      />
                      {errors.address && <p className="text-destructive text-sm mt-1">{errors.address}</p>}
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="city" className="text-foreground">City</Label>
                        <Input
                          id="city"
                          value={formData.city}
                          onChange={(e) => handleInputChange('city', e.target.value)}
                          className={`mt-1 bg-background border-input text-foreground ${errors.city ? 'border-destructive' : ''}`}
                        />
                        {errors.city && <p className="text-destructive text-sm mt-1">{errors.city}</p>}
                      </div>
                      <div>
                        <Label htmlFor="state" className="text-foreground">State</Label>
                        <Input
                          id="state"
                          value={formData.state}
                          onChange={(e) => handleInputChange('state', e.target.value)}
                          className={`mt-1 bg-background border-input text-foreground ${errors.state ? 'border-destructive' : ''}`}
                        />
                        {errors.state && <p className="text-destructive text-sm mt-1">{errors.state}</p>}
                      </div>
                      <div>
                        <Label htmlFor="zipCode" className="text-foreground">PIN Code</Label>
                        <Input
                          id="zipCode"
                          value={formData.zipCode}
                          onChange={(e) => handleInputChange('zipCode', e.target.value)}
                          className={`mt-1 bg-background border-input text-foreground ${errors.zipCode ? 'border-destructive' : ''}`}
                          placeholder="400001"
                        />
                        {errors.zipCode && <p className="text-destructive text-sm mt-1">{errors.zipCode}</p>}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Payment Information */}
                <Card className="bg-card border-border">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-card-foreground">
                      <Lock size={20} />
                      Payment Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="cardNumber" className="text-foreground">Card Number</Label>
                      <Input
                        id="cardNumber"
                        value={formData.cardNumber}
                        onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                        className={`mt-1 bg-background border-input text-foreground ${errors.cardNumber ? 'border-destructive' : ''}`}
                        placeholder="1234 5678 9012 3456"
                      />
                      {errors.cardNumber && <p className="text-destructive text-sm mt-1">{errors.cardNumber}</p>}
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div className="col-span-2">
                        <Label htmlFor="expiryDate" className="text-foreground">Expiry Date</Label>
                        <Input
                          id="expiryDate"
                          value={formData.expiryDate}
                          onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                          className={`mt-1 bg-background border-input text-foreground ${errors.expiryDate ? 'border-destructive' : ''}`}
                          placeholder="MM/YY"
                        />
                        {errors.expiryDate && <p className="text-destructive text-sm mt-1">{errors.expiryDate}</p>}
                      </div>
                      <div>
                        <Label htmlFor="cvv" className="text-foreground">CVV</Label>
                        <Input
                          id="cvv"
                          value={formData.cvv}
                          onChange={(e) => handleInputChange('cvv', e.target.value)}
                          className={`mt-1 bg-background border-input text-foreground ${errors.cvv ? 'border-destructive' : ''}`}
                          placeholder="123"
                        />
                        {errors.cvv && <p className="text-destructive text-sm mt-1">{errors.cvv}</p>}
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="nameOnCard" className="text-foreground">Name on Card</Label>
                      <Input
                        id="nameOnCard"
                        value={formData.nameOnCard}
                        onChange={(e) => handleInputChange('nameOnCard', e.target.value)}
                        className={`mt-1 bg-background border-input text-foreground ${errors.nameOnCard ? 'border-destructive' : ''}`}
                      />
                      {errors.nameOnCard && <p className="text-destructive text-sm mt-1">{errors.nameOnCard}</p>}
                    </div>
                  </CardContent>
                </Card>

                {/* Submit Button */}
                <Button 
                  type="submit" 
                  className="w-full h-14 text-lg font-semibold bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg"
                >
                  <CreditCard className="mr-2" size={20} />
                  Complete Order - ₹{total.toLocaleString()}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Checkout;
