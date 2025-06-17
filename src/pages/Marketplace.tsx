
import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Navbar from "../components/Navbar";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Star, Filter, Grid, List, Heart, ShoppingCart, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

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
  const [searchQuery, setSearchQuery] = useState("");
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

    if (searchQuery) {
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
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
        break;
    }

    setFilteredProducts(filtered);
  }, [category, sortOrder, searchQuery]);

  const handleProductClick = (productId: number) => {
    navigate(`/product/${productId}`);
  };

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case "Bestseller": return "bg-amber-50 text-amber-700 border border-amber-200";
      case "New": return "bg-emerald-50 text-emerald-700 border border-emerald-200";
      case "Gaming": return "bg-violet-50 text-violet-700 border border-violet-200";
      case "Premium": return "bg-blue-50 text-blue-700 border border-blue-200";
      default: return "bg-gray-50 text-gray-700 border border-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/50">
      <Navbar />
      
      <main className="container mx-auto px-6 pt-32 pb-20">
        {/* Header Section */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-4">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight">
              Marketplace
            </h1>
            <Badge variant="secondary" className="px-4 py-2 text-sm font-medium bg-blue-50 text-blue-700 border border-blue-200">
              Premium Collection
            </Badge>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl leading-relaxed">
            Discover premium technology solutions from trusted brands. Every product is carefully curated for quality and performance.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200/60 p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-11 border-gray-300 focus:border-blue-500 focus:ring-blue-500/20"
              />
            </div>

            <div className="flex flex-wrap gap-4 items-center">
              {/* Results count */}
              <div className="text-sm text-gray-600 font-medium whitespace-nowrap">
                <span className="text-gray-900 font-semibold">{filteredProducts.length}</span> products found
              </div>
              
              {/* Category Filter */}
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="w-48 h-11 border-gray-300 focus:border-blue-500 focus:ring-blue-500/20">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent className="bg-white border-gray-200 shadow-xl">
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="aio">All-in-One PCs</SelectItem>
                  <SelectItem value="laptops">Laptops</SelectItem>
                  <SelectItem value="gaming">Gaming Laptops</SelectItem>
                  <SelectItem value="printers">Printers</SelectItem>
                  <SelectItem value="scanners">Scanners</SelectItem>
                </SelectContent>
              </Select>

              {/* Sort */}
              <Select value={sortOrder} onValueChange={setSortOrder}>
                <SelectTrigger className="w-48 h-11 border-gray-300 focus:border-blue-500 focus:ring-blue-500/20">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent className="bg-white border-gray-200 shadow-xl">
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="price-asc">Price: Low to High</SelectItem>
                  <SelectItem value="price-desc">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                </SelectContent>
              </Select>

              {/* View Mode */}
              <div className="flex bg-gray-100 rounded-lg p-1">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className={`h-9 px-3 ${viewMode === "grid" ? "bg-white shadow-sm" : "hover:bg-transparent"}`}
                >
                  <Grid size={16} />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className={`h-9 px-3 ${viewMode === "list" ? "bg-white shadow-sm" : "hover:bg-transparent"}`}
                >
                  <List size={16} />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className={`grid gap-6 ${viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1"}`}>
          {filteredProducts.map((product, index) => (
            <Card 
              key={product.id} 
              className="group overflow-hidden bg-white border border-gray-200/60 hover:border-gray-300 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer hover:-translate-y-1 animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
              onClick={() => handleProductClick(product.id)}
            >
              <div className="relative aspect-square overflow-hidden bg-gray-50">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Badge */}
                <div className={`absolute top-3 left-3 px-3 py-1.5 text-xs font-semibold rounded-full ${getBadgeColor(product.badge)}`}>
                  {product.badge}
                </div>
                
                {/* Discount */}
                {product.discount && (
                  <div className="absolute top-3 right-3 bg-red-500 text-white px-2.5 py-1.5 text-xs font-bold rounded-full shadow-sm">
                    -{product.discount}%
                  </div>
                )}
                
                {/* Quick Actions */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <div className="flex gap-2">
                    <Button size="sm" variant="secondary" className="bg-white/95 hover:bg-white text-gray-900 shadow-lg h-9 w-9 p-0">
                      <Heart size={16} />
                    </Button>
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg h-9 w-9 p-0">
                      <ShoppingCart size={16} />
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="p-5">
                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors leading-snug">
                  {product.name}
                </h3>
                
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xl font-bold text-gray-900">{product.price}</span>
                  {product.originalPrice && (
                    <span className="text-sm text-gray-500 line-through">{product.originalPrice}</span>
                  )}
                </div>
                
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star 
                        key={i}
                        className={`w-4 h-4 ${i < Math.floor(product.rating) ? "fill-amber-400 text-amber-400" : "text-gray-300"}`}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-medium text-gray-900">{product.rating}</span>
                  <span className="text-sm text-gray-500">
                    ({product.reviews})
                  </span>
                </div>
                
                <div className="flex flex-wrap gap-1.5">
                  {product.specs.slice(0, 2).map((spec, i) => (
                    <Badge key={i} variant="secondary" className="text-xs px-2 py-1 bg-gray-100 text-gray-700 border-0">
                      {spec}
                    </Badge>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search or filter criteria</p>
            <Button 
              onClick={() => {
                setCategory("all");
                setSearchQuery("");
              }} 
              variant="outline"
              className="border-gray-300 hover:border-gray-400"
            >
              Clear all filters
            </Button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Marketplace;
