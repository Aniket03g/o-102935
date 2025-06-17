
import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Navbar from "../components/Navbar";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Star, Filter, Grid, List, Heart, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const products = [
  {
    id: 1,
    name: "Dell OptiPlex 7090 All-in-One",
    price: "$1,299",
    originalPrice: "$1,499",
    rating: 4.5,
    reviews: 128,
    category: "aio",
    image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
    badge: "Bestseller",
    specs: ["Intel i7", "16GB RAM", "512GB SSD", "23.8\" Display"],
    discount: 13
  },
  {
    id: 2,
    name: "MacBook Pro 16-inch",
    price: "$2,399",
    originalPrice: "$2,699",
    rating: 4.8,
    reviews: 456,
    category: "laptops",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca4",
    badge: "Premium",
    specs: ["M2 Pro", "16GB RAM", "1TB SSD", "16.2\" Retina"],
    discount: 11
  },
  {
    id: 3,
    name: "ASUS ROG Strix G15",
    price: "$1,599",
    originalPrice: "$1,899",
    rating: 4.7,
    reviews: 89,
    category: "gaming",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
    badge: "Gaming",
    specs: ["AMD Ryzen 7", "16GB RAM", "1TB SSD", "RTX 4060"],
    discount: 16
  },
  {
    id: 4,
    name: "Brother HL-L3270CDW",
    price: "$299",
    originalPrice: "$349",
    rating: 4.4,
    reviews: 167,
    category: "printers",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    badge: "Reliable",
    specs: ["Color Laser", "24 ppm", "Wi-Fi", "Auto Duplex"],
    discount: 14
  },
  {
    id: 5,
    name: "Epson Perfection V39",
    price: "$199",
    originalPrice: "$229",
    rating: 4.2,
    reviews: 43,
    category: "scanners",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    badge: "Compact",
    specs: ["Flatbed Scanner", "4800 DPI", "USB 3.0", "Auto Feed"],
    discount: 13
  },
  {
    id: 6,
    name: "Surface Laptop Studio",
    price: "$1,299",
    originalPrice: "$1,599",
    rating: 4.6,
    reviews: 94,
    category: "laptops",
    image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1",
    badge: "New",
    specs: ["Intel i7", "16GB RAM", "512GB SSD", "14.4\" Touch"],
    discount: 19
  }
];

const Marketplace = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [sortOrder, setSortOrder] = useState("newest");
  const [category, setCategory] = useState("all");
  const [viewMode, setViewMode] = useState("grid");
  const [filteredProducts, setFilteredProducts] = useState(products);

  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam) {
      setCategory(categoryParam);
    }
  }, [searchParams]);

  useEffect(() => {
    let filtered = products;
    
    if (category !== "all") {
      filtered = products.filter(product => product.category === category);
    }

    // Sort products
    switch (sortOrder) {
      case "price-asc":
        filtered.sort((a, b) => parseInt(a.price.replace(/[^0-9]/g, '')) - parseInt(b.price.replace(/[^0-9]/g, '')));
        break;
      case "price-desc":
        filtered.sort((a, b) => parseInt(b.price.replace(/[^0-9]/g, '')) - parseInt(a.price.replace(/[^0-9]/g, '')));
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      default:
        // newest first
        break;
    }

    setFilteredProducts(filtered);
  }, [category, sortOrder]);

  const handleProductClick = (productId: number) => {
    navigate(`/product/${productId}`);
  };

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case "Bestseller": return "bg-orange-500 hover:bg-orange-600";
      case "New": return "bg-green-500 hover:bg-green-600";
      case "Gaming": return "bg-purple-500 hover:bg-purple-600";
      case "Premium": return "bg-blue-500 hover:bg-blue-600";
      default: return "bg-gray-500 hover:bg-gray-600";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Navbar />
      
      <main className="container mx-auto px-6 pt-32 pb-16">
        <div className="mb-12 animate-fade-in">
          <div className="flex items-center gap-4 mb-6">
            <h1 className="text-5xl font-bold text-gray-900 dark:text-white">
              Marketplace
            </h1>
            <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 px-3 py-1">
              Professional Grade
            </Badge>
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-xl max-w-3xl">
            Discover premium technology solutions from trusted brands. Every product is carefully curated for quality and performance.
          </p>
        </div>

        <div className="flex flex-wrap gap-6 items-center justify-between mb-8 p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex gap-6 items-center">
            <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
              <span className="text-gray-900 dark:text-white font-semibold">{filteredProducts.length}</span> products found
            </div>
            
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="w-[200px] border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="aio">All-in-One PCs</SelectItem>
                <SelectItem value="laptops">Laptops</SelectItem>
                <SelectItem value="gaming">Gaming Laptops</SelectItem>
                <SelectItem value="printers">Printers</SelectItem>
                <SelectItem value="scanners">Scanners</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-3 items-center">
            <Select value={sortOrder} onValueChange={setSortOrder}>
              <SelectTrigger className="w-[200px] border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="price-asc">Price: Low to High</SelectItem>
                <SelectItem value="price-desc">Price: High to Low</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex border rounded-xl overflow-hidden border-gray-300 dark:border-gray-600">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className="rounded-none border-0"
              >
                <Grid size={16} />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
                className="rounded-none border-0"
              >
                <List size={16} />
              </Button>
            </div>
          </div>
        </div>

        <div className={`grid gap-8 ${viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1"}`}>
          {filteredProducts.map((product, index) => (
            <Card 
              key={product.id} 
              className="group overflow-hidden hover:shadow-2xl transition-all duration-500 cursor-pointer bg-white dark:bg-gray-800 border-0 shadow-lg hover:-translate-y-2 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
              onClick={() => handleProductClick(product.id)}
            >
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className={`absolute top-4 left-4 px-3 py-1.5 text-xs font-bold text-white rounded-full ${getBadgeColor(product.badge)} transition-colors`}>
                  {product.badge}
                </div>
                {product.discount && (
                  <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1.5 text-xs font-bold rounded-full shadow-lg">
                    -{product.discount}%
                  </div>
                )}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <div className="flex gap-3">
                    <Button size="sm" className="bg-white/90 text-gray-900 hover:bg-white">
                      <Heart size={16} />
                    </Button>
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                      <ShoppingCart size={16} />
                    </Button>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-bold text-lg mb-3 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                  {product.name}
                </h3>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-gray-900 dark:text-white font-bold text-2xl">{product.price}</span>
                  {product.originalPrice && (
                    <span className="text-gray-500 line-through text-lg">{product.originalPrice}</span>
                  )}
                </div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star 
                        key={i}
                        className={`w-4 h-4 ${i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                      />
                    ))}
                  </div>
                  <span className="font-semibold text-gray-900 dark:text-white">{product.rating}</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    ({product.reviews} reviews)
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.specs.slice(0, 2).map((spec, i) => (
                    <Badge key={i} variant="secondary" className="text-xs px-2 py-1">
                      {spec}
                    </Badge>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <div className="text-gray-500 dark:text-gray-400 text-xl mb-4">
              No products found in this category
            </div>
            <Button onClick={() => setCategory("all")} variant="outline">
              View All Products
            </Button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Marketplace;
