
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from "../components/Navbar";
import { Star, Heart, Share2, Truck, Shield, RotateCcw, Headphones } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const ProductDetails = () => {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  const product = {
    name: "Surface Laptop Studio",
    price: "$1,299",
    originalPrice: "$1,599",
    rating: 4.6,
    reviews: 94,
    availability: "In Stock",
    sku: "MS-SLS-14-001",
    brand: "Microsoft",
    warranty: "2 Years",
    images: [
      "https://images.unsplash.com/photo-1531297484001-80022131f5a1",
      "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
      "https://images.unsplash.com/photo-1518770660439-4636190af475",
      "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d"
    ],
    description: "Experience exceptional performance and innovative design with the Surface Laptop Studio. Perfect for creative professionals with powerful Intel processors, stunning display quality, and versatile form factor.",
    specs: {
      "Processor": "Intel Core i7-11370H",
      "Memory": "16GB LPDDR4x RAM",
      "Storage": "512GB NVMe SSD",
      "Display": "14.4\" PixelSense Touch",
      "Graphics": "NVIDIA GeForce RTX 3050 Ti",
      "Connectivity": "Wi-Fi 6, Bluetooth 5.1",
      "Ports": "2x USB-C, 1x USB-A, Surface Connect",
      "Operating System": "Windows 11 Pro",
      "Battery": "Up to 19 hours",
      "Weight": "4.0 lbs (1.8 kg)"
    },
    features: [
      "Innovative 14.4-inch PixelSense Flow display",
      "Dynamic woven hinge for multiple modes",
      "High-performance NVIDIA RTX graphics",
      "Precision haptic touchpad",
      "Surface Pen and Surface Slim Pen 2 support",
      "Studio Microphones for crystal-clear calls"
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Navbar />
      
      <main className="container mx-auto px-6 pt-32 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Product Images */}
          <div className="space-y-6 animate-fade-in">
            <div className="aspect-square overflow-hidden rounded-3xl bg-white dark:bg-gray-800 p-8 shadow-xl">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover rounded-2xl transition-transform duration-500 hover:scale-105"
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((image, index) => (
                <div 
                  key={index} 
                  className={`aspect-square rounded-2xl overflow-hidden cursor-pointer border-3 transition-all duration-300 shadow-lg ${
                    selectedImage === index 
                      ? 'border-blue-500 scale-105 shadow-blue-200 dark:shadow-blue-800' 
                      : 'border-transparent hover:border-gray-300 dark:hover:border-gray-600 hover:scale-105'
                  }`}
                  onClick={() => setSelectedImage(index)}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover hover:opacity-90 transition-opacity"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-8 animate-fade-in" style={{ animationDelay: '200ms' }}>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 px-4 py-2 text-sm font-semibold">
                  {product.availability}
                </Badge>
                <Badge variant="outline" className="px-4 py-2 text-sm">
                  {product.brand}
                </Badge>
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white leading-tight">{product.name}</h1>
              <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                <span>SKU: {product.sku}</span>
                <span>•</span>
                <span>Warranty: {product.warranty}</span>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="flex items-center gap-4">
                <span className="text-4xl font-bold text-gray-900 dark:text-white">{product.price}</span>
                <span className="text-2xl text-gray-500 line-through">{product.originalPrice}</span>
                <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 px-3 py-2 text-sm font-semibold">
                  Save $300
                </Badge>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-6 h-6 ${
                      i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                    }`}
                  />
                ))}
                <span className="text-xl font-bold ml-3">{product.rating}</span>
              </div>
              <span className="text-gray-600 dark:text-gray-400 text-lg">({product.reviews} verified reviews)</span>
            </div>

            <div className="flex items-center gap-6">
              <div className="flex items-center border-2 border-gray-300 dark:border-gray-600 rounded-xl overflow-hidden">
                <button 
                  className="px-6 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-xl font-semibold"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  -
                </button>
                <span className="px-6 py-3 border-x-2 border-gray-300 dark:border-gray-600 text-xl font-semibold min-w-[60px] text-center">{quantity}</span>
                <button 
                  className="px-6 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-xl font-semibold"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </button>
              </div>
              <Button 
                className="flex-1 h-14 text-xl font-bold hover:scale-105 transition-all duration-300 shadow-lg bg-blue-600 hover:bg-blue-700"
                size="lg"
              >
                Add to Cart - {product.price}
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Button 
                variant="outline" 
                size="lg" 
                className={`h-14 text-lg font-semibold transition-all duration-300 ${isFavorite ? 'text-red-500 border-red-500 bg-red-50 dark:bg-red-900/20' : 'hover:scale-105'}`}
                onClick={() => setIsFavorite(!isFavorite)}
              >
                <Heart className={`w-6 h-6 mr-3 ${isFavorite ? 'fill-current' : ''}`} />
                {isFavorite ? 'Saved' : 'Save for Later'}
              </Button>
              <Button variant="outline" size="lg" className="h-14 text-lg font-semibold hover:scale-105 transition-all duration-300">
                <Share2 className="w-6 h-6 mr-3" />
                Share Product
              </Button>
            </div>

            {/* Product Features */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-8 border border-blue-200/50 dark:border-blue-800/50">
              <h3 className="font-bold text-xl mb-6 text-gray-900 dark:text-white">Key Features</h3>
              <ul className="space-y-4">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-start text-gray-700 dark:text-gray-300">
                    <div className="w-3 h-3 bg-blue-500 rounded-full mr-4 mt-2 flex-shrink-0"></div>
                    <span className="text-lg">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="description">
                <AccordionTrigger className="text-left">Product Description</AccordionTrigger>
                <AccordionContent className="text-gray-600 dark:text-gray-400">
                  {product.description}
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="specifications">
                <AccordionTrigger className="text-left">Technical Specifications</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3">
                    {Object.entries(product.specs).map(([key, value]) => (
                      <div key={key} className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                        <span className="font-medium text-gray-900 dark:text-white">{key}</span>
                        <span className="text-gray-600 dark:text-gray-400">{value}</span>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="warranty">
                <AccordionTrigger className="text-left">Warranty & Support</AccordionTrigger>
                <AccordionContent className="text-gray-600 dark:text-gray-400">
                  <ul className="space-y-2">
                    <li>• 1-year limited hardware warranty</li>
                    <li>• 24/7 customer support</li>
                    <li>• Free software support for 90 days</li>
                    <li>• Optional extended warranty available</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            {/* Service Benefits */}
            <div className="grid grid-cols-2 gap-6 pt-8">
              <div className="bg-blue-50 dark:bg-blue-900/30 p-6 rounded-2xl flex items-center gap-4 border border-blue-200 dark:border-blue-800">
                <Truck className="w-10 h-10 text-blue-600 dark:text-blue-400" />
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white text-lg">Free Shipping</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Express delivery available</p>
                </div>
              </div>
              <div className="bg-green-50 dark:bg-green-900/30 p-6 rounded-2xl flex items-center gap-4 border border-green-200 dark:border-green-800">
                <RotateCcw className="w-10 h-10 text-green-600 dark:text-green-400" />
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white text-lg">Easy Returns</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">30-day return policy</p>
                </div>
              </div>
              <div className="bg-purple-50 dark:bg-purple-900/30 p-6 rounded-2xl flex items-center gap-4 border border-purple-200 dark:border-purple-800">
                <Shield className="w-10 h-10 text-purple-600 dark:text-purple-400" />
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white text-lg">Secure Payment</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">256-bit SSL encryption</p>
                </div>
              </div>
              <div className="bg-orange-50 dark:bg-orange-900/30 p-6 rounded-2xl flex items-center gap-4 border border-orange-200 dark:border-orange-800">
                <Headphones className="w-10 h-10 text-orange-600 dark:text-orange-400" />
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white text-lg">Expert Support</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">24/7 technical assistance</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductDetails;
