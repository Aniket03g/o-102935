
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from "../components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ShieldCheck, Lock, CreditCard, MapPin, User, Mail, Phone } from "lucide-react";

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
}

const Checkout = () => {
  const navigate = useNavigate();
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
    nameOnCard: ''
  });
  
  const [errors, setErrors] = useState<FormErrors>({});

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateField = (field: keyof FormData, value: string): string => {
    switch (field) {
      case 'email':
        return value.includes('@') ? '' : 'Please enter a valid email address';
      case 'cardNumber':
        return value.length >= 16 ? '' : 'Please enter a valid card number';
      case 'cvv':
        return value.length >= 3 ? '' : 'Please enter a valid CVV';
      default:
        return value.trim() ? '' : 'This field is required';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: FormErrors = {};
    
    (Object.keys(formData) as Array<keyof FormData>).forEach(field => {
      const error = validateField(field, formData[field]);
      if (error) newErrors[field] = error;
    });
    
    if (Object.keys(newErrors).length === 0) {
      // Process order
      console.log('Order submitted:', formData);
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      <main className="container-modern pt-32 pb-20">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
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
              <Card className="sticky top-8 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="text-gray-900 dark:text-white">Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                      <span className="font-medium text-gray-900 dark:text-white">$2,399.00</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Shipping</span>
                      <span className="font-medium text-green-600 dark:text-green-400">Free</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Tax</span>
                      <span className="font-medium text-gray-900 dark:text-white">$191.92</span>
                    </div>
                    <Separator className="bg-gray-200 dark:bg-gray-700" />
                    <div className="flex justify-between font-semibold text-lg">
                      <span className="text-gray-900 dark:text-white">Total</span>
                      <span className="text-gray-900 dark:text-white">$2,590.92</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Checkout Form */}
            <div className="lg:col-span-2 space-y-8">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Contact Information */}
                <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
                      <Mail size={20} />
                      Contact Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="email" className="text-gray-700 dark:text-gray-300">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className={`mt-1 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white ${errors.email ? 'border-red-500' : ''}`}
                        placeholder="your@email.com"
                      />
                      {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                    </div>
                  </CardContent>
                </Card>

                {/* Shipping Information */}
                <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
                      <MapPin size={20} />
                      Shipping Address
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName" className="text-gray-700 dark:text-gray-300">First Name</Label>
                        <Input
                          id="firstName"
                          value={formData.firstName}
                          onChange={(e) => handleInputChange('firstName', e.target.value)}
                          className={`mt-1 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white ${errors.firstName ? 'border-red-500' : ''}`}
                        />
                        {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                      </div>
                      <div>
                        <Label htmlFor="lastName" className="text-gray-700 dark:text-gray-300">Last Name</Label>
                        <Input
                          id="lastName"
                          value={formData.lastName}
                          onChange={(e) => handleInputChange('lastName', e.target.value)}
                          className={`mt-1 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white ${errors.lastName ? 'border-red-500' : ''}`}
                        />
                        {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="address" className="text-gray-700 dark:text-gray-300">Street Address</Label>
                      <Input
                        id="address"
                        value={formData.address}
                        onChange={(e) => handleInputChange('address', e.target.value)}
                        className={`mt-1 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white ${errors.address ? 'border-red-500' : ''}`}
                      />
                      {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="city" className="text-gray-700 dark:text-gray-300">City</Label>
                        <Input
                          id="city"
                          value={formData.city}
                          onChange={(e) => handleInputChange('city', e.target.value)}
                          className={`mt-1 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white ${errors.city ? 'border-red-500' : ''}`}
                        />
                        {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
                      </div>
                      <div>
                        <Label htmlFor="state" className="text-gray-700 dark:text-gray-300">State</Label>
                        <Input
                          id="state"
                          value={formData.state}
                          onChange={(e) => handleInputChange('state', e.target.value)}
                          className={`mt-1 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white ${errors.state ? 'border-red-500' : ''}`}
                        />
                        {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state}</p>}
                      </div>
                      <div>
                        <Label htmlFor="zipCode" className="text-gray-700 dark:text-gray-300">ZIP Code</Label>
                        <Input
                          id="zipCode"
                          value={formData.zipCode}
                          onChange={(e) => handleInputChange('zipCode', e.target.value)}
                          className={`mt-1 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white ${errors.zipCode ? 'border-red-500' : ''}`}
                        />
                        {errors.zipCode && <p className="text-red-500 text-sm mt-1">{errors.zipCode}</p>}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Payment Information */}
                <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
                      <Lock size={20} />
                      Payment Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="cardNumber" className="text-gray-700 dark:text-gray-300">Card Number</Label>
                      <Input
                        id="cardNumber"
                        value={formData.cardNumber}
                        onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                        className={`mt-1 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white ${errors.cardNumber ? 'border-red-500' : ''}`}
                        placeholder="1234 5678 9012 3456"
                      />
                      {errors.cardNumber && <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>}
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div className="col-span-2">
                        <Label htmlFor="expiryDate" className="text-gray-700 dark:text-gray-300">Expiry Date</Label>
                        <Input
                          id="expiryDate"
                          value={formData.expiryDate}
                          onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                          className={`mt-1 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white ${errors.expiryDate ? 'border-red-500' : ''}`}
                          placeholder="MM/YY"
                        />
                        {errors.expiryDate && <p className="text-red-500 text-sm mt-1">{errors.expiryDate}</p>}
                      </div>
                      <div>
                        <Label htmlFor="cvv" className="text-gray-700 dark:text-gray-300">CVV</Label>
                        <Input
                          id="cvv"
                          value={formData.cvv}
                          onChange={(e) => handleInputChange('cvv', e.target.value)}
                          className={`mt-1 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white ${errors.cvv ? 'border-red-500' : ''}`}
                          placeholder="123"
                        />
                        {errors.cvv && <p className="text-red-500 text-sm mt-1">{errors.cvv}</p>}
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="nameOnCard" className="text-gray-700 dark:text-gray-300">Name on Card</Label>
                      <Input
                        id="nameOnCard"
                        value={formData.nameOnCard}
                        onChange={(e) => handleInputChange('nameOnCard', e.target.value)}
                        className={`mt-1 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white ${errors.nameOnCard ? 'border-red-500' : ''}`}
                      />
                      {errors.nameOnCard && <p className="text-red-500 text-sm mt-1">{errors.nameOnCard}</p>}
                    </div>
                  </CardContent>
                </Card>

                {/* Submit Button */}
                <Button 
                  type="submit" 
                  className="w-full h-14 text-lg font-semibold bg-gray-900 hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg"
                >
                  <CreditCard className="mr-2" size={20} />
                  Complete Order
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
