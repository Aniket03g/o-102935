
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from "../components/Navbar";
import { Star, Heart, Share2, Truck, Shield, RotateCcw, ChevronLeft, ChevronRight, Plus, Minus, Check } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const ProductDetails = () => {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState("16GB RAM");
  const [isImageLoading, setIsImageLoading] = useState(true);

  const product = {
    name: "Surface Laptop Studio",
    price: 1299,
    originalPrice: 1599,
    rating: 4.6,
    reviews: 94,
    availability: "In Stock",
    stockCount: 12,
    sku: "MS-SLS-14-001",
    brand: "Microsoft",
    images: [
      "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=800&fit=crop"
    ],
    description: "Experience exceptional performance and innovative design with the Surface Laptop Studio. Perfect for creative professionals with powerful Intel processors, stunning display quality, and versatile form factor that adapts to your workflow.",
    variants: [
      { name: "8GB RAM", price: 1099, available: true },
      { name: "16GB RAM", price: 1299, available: true },
      { name: "32GB RAM", price: 1599, available: false }
    ],
    features: [
      "14.4-inch PixelSense Flow touchscreen display",
      "Intel Core i7 processor with RTX graphics",
      "All-day battery life up to 19 hours",
      "Dynamic woven hinge for multiple modes",
      "Surface Pen and touch support",
      "Dolby Atmos spatial audio"
    ],
    benefits: [
      { icon: Truck, title: "Free Shipping", description: "Free delivery on orders over $99" },
      { icon: RotateCcw, title: "30-Day Returns", description: "Easy returns within 30 days" },
      { icon: Shield, title: "2-Year Warranty", description: "Comprehensive warranty coverage" }
    ]
  };

  const currentVariant = product.variants.find(v => v.name === selectedVariant);
  const currentPrice = currentVariant?.price || product.price;
  const savings = product.originalPrice - currentPrice;

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            
            {/* Product Images */}
            <div className="space-y-6">
              <div className="relative group">
                <div className="aspect-square bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
                  {isImageLoading && (
                    <Skeleton className="w-full h-full" />
                  )}
                  <img
                    src={product.images[selectedImage]}
                    alt={product.name}
                    className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-105 ${
                      isImageLoading ? 'opacity-0' : 'opacity-100'
                    }`}
                    onLoad={() => setIsImageLoading(false)}
                  />
                  
                  {/* Navigation arrows */}
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>
              
              {/* Thumbnail Gallery */}
              <div className="grid grid-cols-4 gap-3">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                      selectedImage === index
                        ? 'border-blue-500 ring-2 ring-blue-500/20'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Information */}
            <div className="space-y-8">
              
              {/* Header */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 flex-wrap">
                  <Badge variant="secondary" className="bg-green-50 text-green-700 border-green-200 px-3 py-1">
                    {product.availability}
                  </Badge>
                  <Badge variant="outline" className="px-3 py-1">
                    {product.brand}
                  </Badge>
                  <span className="text-sm text-gray-600">
                    Only {product.stockCount} left in stock
                  </span>
                </div>
                
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                  {product.name}
                </h1>
                
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={18}
                        className={`${
                          i < Math.floor(product.rating) 
                            ? "fill-yellow-400 text-yellow-400" 
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="font-semibold text-gray-900">{product.rating}</span>
                  <span className="text-gray-600">({product.reviews} reviews)</span>
                </div>
              </div>

              {/* Pricing */}
              <div className="space-y-3">
                <div className="flex items-baseline gap-4">
                  <span className="text-4xl font-bold text-gray-900">
                    ${currentPrice.toLocaleString()}
                  </span>
                  {savings > 0 && (
                    <>
                      <span className="text-xl text-gray-500 line-through">
                        ${product.originalPrice.toLocaleString()}
                      </span>
                      <Badge className="bg-red-50 text-red-700 border-red-200 px-3 py-1">
                        Save ${savings}
                      </Badge>
                    </>
                  )}
                </div>
                <p className="text-gray-600">
                  Free shipping on orders over $99 • Pay in 4 interest-free installments
                </p>
              </div>

              {/* Variants */}
              <div className="space-y-3">
                <h3 className="font-semibold text-gray-900">Configuration</h3>
                <div className="grid grid-cols-1 gap-3">
                  {product.variants.map((variant) => (
                    <button
                      key={variant.name}
                      onClick={() => variant.available && setSelectedVariant(variant.name)}
                      disabled={!variant.available}
                      className={`p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                        selectedVariant === variant.name
                          ? 'border-blue-500 bg-blue-50'
                          : variant.available
                          ? 'border-gray-200 hover:border-gray-300 bg-white'
                          : 'border-gray-200 bg-gray-50 opacity-50 cursor-not-allowed'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="font-medium text-gray-900">{variant.name}</span>
                          {!variant.available && (
                            <span className="text-sm text-gray-500 ml-2">(Out of Stock)</span>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-gray-900">
                            ${variant.price.toLocaleString()}
                          </span>
                          {selectedVariant === variant.name && (
                            <Check size={20} className="text-blue-500" />
                          )}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity and Add to Cart */}
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="flex items-center">
                    <span className="text-sm font-medium text-gray-700 mr-4">Quantity:</span>
                    <div className="flex items-center border border-gray-300 rounded-xl overflow-hidden">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="p-3 hover:bg-gray-50 transition-colors"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="px-4 py-3 border-x border-gray-300 min-w-[60px] text-center font-medium">
                        {quantity}
                      </span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="p-3 hover:bg-gray-50 transition-colors"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button 
                    size="lg"
                    className="flex-1 h-14 text-lg font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
                  >
                    Add to Cart • ${(currentPrice * quantity).toLocaleString()}
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => setIsFavorite(!isFavorite)}
                    className={`h-14 px-6 rounded-xl border-2 transition-all duration-200 ${
                      isFavorite 
                        ? 'border-red-300 bg-red-50 text-red-600 hover:bg-red-100' 
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <Heart size={20} className={isFavorite ? 'fill-current' : ''} />
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="h-14 px-6 rounded-xl border-2 border-gray-300 hover:border-gray-400 transition-all duration-200"
                  >
                    <Share2 size={20} />
                  </Button>
                </div>
              </div>

              {/* Benefits */}
              <div className="grid grid-cols-1 gap-4">
                {product.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-100">
                    <div className="flex-shrink-0 w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                      <benefit.icon size={20} className="text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{benefit.title}</h4>
                      <p className="text-sm text-gray-600">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Description */}
              <Card className="border-gray-200">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-3">About this product</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">{product.description}</p>
                  <div className="space-y-2">
                    <h4 className="font-medium text-gray-900">Key Features:</h4>
                    <ul className="space-y-2">
                      {product.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-3 text-gray-700">
                          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {/* Specifications Accordion */}
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="specifications" className="border border-gray-200 rounded-xl px-6">
                  <AccordionTrigger className="text-left font-semibold hover:no-underline">
                    Technical Specifications
                  </AccordionTrigger>
                  <AccordionContent className="pt-4">
                    <div className="grid grid-cols-1 gap-3">
                      {[
                        ["Processor", "Intel Core i7-11370H"],
                        ["Memory", "16GB LPDDR4x RAM"],
                        ["Storage", "512GB NVMe SSD"],
                        ["Display", "14.4\" PixelSense Touch"],
                        ["Graphics", "NVIDIA GeForce RTX 3050 Ti"],
                        ["Operating System", "Windows 11 Pro"],
                        ["Battery", "Up to 19 hours"],
                        ["Weight", "4.0 lbs (1.8 kg)"]
                      ].map(([key, value]) => (
                        <div key={key} className="flex justify-between py-2 border-b border-gray-100 last:border-0">
                          <span className="font-medium text-gray-900">{key}</span>
                          <span className="text-gray-700">{value}</span>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductDetails;
