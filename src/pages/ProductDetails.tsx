
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
    name: "HP EliteOne 800 G9 All-in-One",
    price: "$1,299",
    originalPrice: "$1,499",
    rating: 4.5,
    reviews: 128,
    availability: "In Stock",
    sku: "HP-EO800-G9-001",
    images: [
      "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
      "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
      "https://images.unsplash.com/photo-1518770660439-4636190af475",
      "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d"
    ],
    description: "Experience exceptional performance and sleek design with the HP EliteOne 800 G9 All-in-One PC. Perfect for modern workspaces with powerful Intel processors and stunning display quality.",
    specs: {
      "Processor": "Intel Core i7-12700",
      "Memory": "16GB DDR4 RAM",
      "Storage": "512GB NVMe SSD",
      "Display": "23.8\" FHD IPS Touch",
      "Graphics": "Intel UHD Graphics",
      "Connectivity": "Wi-Fi 6E, Bluetooth 5.2",
      "Ports": "4x USB-A, 2x USB-C, HDMI",
      "Operating System": "Windows 11 Pro"
    },
    features: [
      "Sleek all-in-one design saves space",
      "High-performance Intel processor",
      "Fast SSD storage for quick boot times",
      "Full HD touchscreen display",
      "Built-in webcam with privacy shutter",
      "Energy efficient design"
    ]
  };

  return (
    <div className="min-h-screen bg-background dark:bg-gray-900 transition-colors duration-300">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-32 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4 animate-fade-in">
            <div className="aspect-square overflow-hidden rounded-xl bg-white dark:bg-gray-800 p-4">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover rounded-lg transition-transform duration-300 hover:scale-105"
              />
            </div>
            <div className="grid grid-cols-4 gap-3">
              {product.images.map((image, index) => (
                <div 
                  key={index} 
                  className={`aspect-square rounded-lg overflow-hidden cursor-pointer border-2 transition-all duration-200 ${
                    selectedImage === index 
                      ? 'border-blue-500 scale-105' 
                      : 'border-transparent hover:border-gray-300 dark:hover:border-gray-600'
                  }`}
                  onClick={() => setSelectedImage(index)}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover hover:opacity-75 transition-opacity"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6 animate-fade-in" style={{ animationDelay: '200ms' }}>
            <div>
              <Badge className="mb-2 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                {product.availability}
              </Badge>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">{product.name}</h1>
              <p className="text-gray-600 dark:text-gray-400">SKU: {product.sku}</p>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-3xl font-bold text-primary dark:text-white">{product.price}</span>
                <span className="text-xl text-gray-500 line-through">{product.originalPrice}</span>
                <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
                  Save $200
                </Badge>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                    }`}
                  />
                ))}
                <span className="text-lg font-semibold ml-2">{product.rating}</span>
              </div>
              <span className="text-gray-600 dark:text-gray-400">({product.reviews} reviews)</span>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center border dark:border-gray-600 rounded-lg">
                <button 
                  className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  -
                </button>
                <span className="px-4 py-2 border-x dark:border-gray-600">{quantity}</span>
                <button 
                  className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </button>
              </div>
              <Button 
                className="flex-1 h-12 text-lg font-semibold hover:scale-105 transition-transform"
                size="lg"
              >
                Add to Cart - {product.price}
              </Button>
            </div>

            <div className="flex gap-3">
              <Button 
                variant="outline" 
                size="lg" 
                className={`flex-1 transition-all ${isFavorite ? 'text-red-500 border-red-500' : ''}`}
                onClick={() => setIsFavorite(!isFavorite)}
              >
                <Heart className={`w-5 h-5 mr-2 ${isFavorite ? 'fill-current' : ''}`} />
                {isFavorite ? 'Saved' : 'Save'}
              </Button>
              <Button variant="outline" size="lg" className="flex-1">
                <Share2 className="w-5 h-5 mr-2" />
                Share
              </Button>
            </div>

            {/* Product Features */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
              <h3 className="font-semibold text-lg mb-4 text-gray-900 dark:text-white">Key Features</h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-gray-700 dark:text-gray-300">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    {feature}
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
            <div className="grid grid-cols-2 gap-4 pt-8">
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg flex items-center gap-3">
                <Truck className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Free Shipping</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">On orders over $50</p>
                </div>
              </div>
              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg flex items-center gap-3">
                <RotateCcw className="w-8 h-8 text-green-600 dark:text-green-400" />
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Easy Returns</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">30-day return policy</p>
                </div>
              </div>
              <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg flex items-center gap-3">
                <Shield className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Secure Payment</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">SSL encrypted</p>
                </div>
              </div>
              <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg flex items-center gap-3">
                <Headphones className="w-8 h-8 text-orange-600 dark:text-orange-400" />
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">24/7 Support</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Expert assistance</p>
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
