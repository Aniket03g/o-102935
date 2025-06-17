
import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Navbar from "../components/Navbar";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Star, Filter, Grid, List } from "lucide-react";
import { Button } from "@/components/ui/button";

const products = [
  {
    id: 1,
    name: "HP EliteOne 800 G9 AiO",
    price: "$1,299",
    originalPrice: "$1,499",
    rating: 4.5,
    reviews: 128,
    category: "aio",
    image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
    badge: "Bestseller",
    specs: ["Intel i7", "16GB RAM", "512GB SSD", "23.8\" Display"]
  },
  {
    id: 2,
    name: "HP Pavilion 15 Laptop",
    price: "$899",
    originalPrice: "$1,099",
    rating: 4.3,
    reviews: 256,
    category: "laptops",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    badge: "New",
    specs: ["Intel i5", "8GB RAM", "256GB SSD", "15.6\" FHD"]
  },
  {
    id: 3,
    name: "HP OMEN 16 Gaming Laptop",
    price: "$1,599",
    originalPrice: "$1,899",
    rating: 4.7,
    reviews: 89,
    category: "gaming",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
    badge: "Gaming",
    specs: ["AMD Ryzen 7", "16GB RAM", "1TB SSD", "RTX 4060"]
  },
  {
    id: 4,
    name: "HP LaserJet Pro M404n",
    price: "$299",
    originalPrice: "$349",
    rating: 4.4,
    reviews: 167,
    category: "printers",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    badge: "Reliable",
    specs: ["Laser Printer", "38 ppm", "Wi-Fi", "Auto Duplex"]
  },
  {
    id: 5,
    name: "HP ScanJet Pro 2500 f1",
    price: "$199",
    originalPrice: "$229",
    rating: 4.2,
    reviews: 43,
    category: "scanners",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    badge: "Compact",
    specs: ["Flatbed Scanner", "1200 DPI", "USB 3.0", "Auto Feed"]
  },
  {
    id: 6,
    name: "HP Spectre x360 14",
    price: "$1,299",
    originalPrice: "$1,599",
    rating: 4.8,
    reviews: 94,
    category: "laptops",
    image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1",
    badge: "Premium",
    specs: ["Intel Evo", "16GB RAM", "512GB SSD", "2-in-1 Design"]
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
      case "Bestseller": return "bg-orange-500";
      case "New": return "bg-green-500";
      case "Gaming": return "bg-purple-500";
      case "Premium": return "bg-blue-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAF8] dark:bg-gray-900 transition-colors duration-300">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-32 pb-16">
        <div className="mb-12 animate-fade-in">
          <h1 className="text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            Discover HP Products
          </h1>
          <p className="text-accent dark:text-gray-400 text-lg">
            Innovative technology solutions for work, creativity, and gaming
          </p>
        </div>

        <div className="flex flex-wrap gap-4 items-center justify-between mb-8 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
          <div className="flex gap-4 items-center">
            <div className="text-sm text-accent dark:text-gray-400">
              {filteredProducts.length} products found
            </div>
            
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="w-[180px] dark:bg-gray-700 dark:text-white">
                <SelectValue placeholder="Categories" />
              </SelectTrigger>
              <SelectContent className="dark:bg-gray-700 dark:text-white">
                <SelectItem value="all">All Products</SelectItem>
                <SelectItem value="aio">All-in-One PCs</SelectItem>
                <SelectItem value="laptops">Laptops</SelectItem>
                <SelectItem value="gaming">Gaming Laptops</SelectItem>
                <SelectItem value="printers">Printers</SelectItem>
                <SelectItem value="scanners">Scanners</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-2 items-center">
            <Select value={sortOrder} onValueChange={setSortOrder}>
              <SelectTrigger className="w-[180px] dark:bg-gray-700 dark:text-white">
                <SelectValue placeholder="Sort order" />
              </SelectTrigger>
              <SelectContent className="dark:bg-gray-700 dark:text-white">
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="price-asc">Price: Low to High</SelectItem>
                <SelectItem value="price-desc">Price: High to Low</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex border rounded-lg overflow-hidden dark:border-gray-600">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className="rounded-none"
              >
                <Grid size={16} />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
                className="rounded-none"
              >
                <List size={16} />
              </Button>
            </div>
          </div>
        </div>

        <div className={`grid gap-6 ${viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1"}`}>
          {filteredProducts.map((product, index) => (
            <Card 
              key={product.id} 
              className="group overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer bg-white dark:bg-gray-800 border-0 hover:-translate-y-1 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
              onClick={() => handleProductClick(product.id)}
            >
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className={`absolute top-2 left-2 px-2 py-1 text-xs font-semibold text-white rounded-full ${getBadgeColor(product.badge)}`}>
                  {product.badge}
                </div>
                {product.originalPrice && (
                  <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 text-xs font-semibold rounded-full">
                    Sale
                  </div>
                )}
              </div>
              <div className="p-6">
                <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {product.name}
                </h3>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-primary dark:text-white font-bold text-xl">{product.price}</span>
                  {product.originalPrice && (
                    <span className="text-gray-500 line-through text-sm">{product.originalPrice}</span>
                  )}
                </div>
                <div className="flex items-center gap-1 mb-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star 
                      key={i}
                      className={`w-4 h-4 ${i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                    />
                  ))}
                  <span className="text-sm text-accent dark:text-gray-400 ml-2">
                    {product.rating} ({product.reviews} reviews)
                  </span>
                </div>
                <div className="space-y-1">
                  {product.specs.slice(0, 2).map((spec, i) => (
                    <span key={i} className="inline-block bg-gray-100 dark:bg-gray-700 text-xs px-2 py-1 rounded mr-1 text-gray-600 dark:text-gray-300">
                      {spec}
                    </span>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <div className="text-gray-500 dark:text-gray-400 text-lg">
              No products found in this category
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Marketplace;
