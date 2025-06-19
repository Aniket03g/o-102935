import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
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
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="container-modern pt-32 pb-20">
        {/* Header Section */}
        <div className="mb-16 text-center">
          <div className="flex items-center justify-center gap-4 mb-6">
            <h1 className="text-heading text-5xl lg:text-6xl text-gradient">
              Marketplace
            </h1>
            <div className="badge-accent animate-fade-up" style={{ animationDelay: '200ms' }}>
              Premium Collection
            </div>
          </div>
          <p className="text-body text-xl max-w-3xl mx-auto animate-fade-up" style={{ animationDelay: '400ms' }}>
            Discover premium technology solutions from trusted brands. Every product is carefully curated for quality and performance.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="card-premium p-8 mb-12 animate-fade-up" style={{ animationDelay: '600ms' }}>
          <div className="flex flex-col lg:flex-row gap-8 items-start lg:items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-lg">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search premium products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-modern pl-12 h-14 text-lg"
              />
            </div>

            <div className="flex flex-wrap gap-4 items-center">
              {/* Results count */}
              <div className="text-body font-medium whitespace-nowrap">
                <span className="text-gray-900 font-bold">{filteredProducts.length}</span> products found
              </div>
              
              {/* Category Filter */}
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="w-56 h-14 input-modern text-lg">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent className="glass border-gray-200 shadow-2xl rounded-2xl">
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
                <SelectTrigger className="w-56 h-14 input-modern text-lg">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent className="glass border-gray-200 shadow-2xl rounded-2xl">
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="price-asc">Price: Low to High</SelectItem>
                  <SelectItem value="price-desc">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                </SelectContent>
              </Select>

              {/* View Mode */}
              <div className="flex bg-gray-100 rounded-2xl p-1.5 border border-gray-200">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className={`h-12 px-4 rounded-xl font-medium transition-all duration-200 ${
                    viewMode === "grid" 
                      ? "bg-white shadow-sm text-gray-900" 
                      : "hover:bg-white/50 text-gray-600"
                  }`}
                >
                  <Grid size={18} />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className={`h-12 px-4 rounded-xl font-medium transition-all duration-200 ${
                    viewMode === "list" 
                      ? "bg-white shadow-sm text-gray-900" 
                      : "hover:bg-white/50 text-gray-600"
                  }`}
                >
                  <List size={18} />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className={`grid gap-8 ${
          viewMode === "grid" 
            ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" 
            : "grid-cols-1"
        }`}>
          {filteredProducts.map((product, index) => (
            <div 
              key={product.id}
              className="animate-fade-up"
              style={{ animationDelay: `${800 + index * 100}ms` }}
            >
              <ProductCard
                id={product.id}
                name={product.name}
                price={product.price}
                image={product.image}
                rating={product.rating}
                reviews={product.reviews}
              />
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-24 animate-fade-up">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">No products found</h3>
            <p className="text-body text-lg mb-8 max-w-md mx-auto">
              Try adjusting your search or filter criteria to find what you're looking for
            </p>
            <Button 
              onClick={() => {
                setCategory("all");
                setSearchQuery("");
              }} 
              className="btn-secondary"
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
