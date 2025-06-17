
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import CategoryNav from "../components/CategoryNav";
import ProductCard from "../components/ProductCard";
import { Zap, Shield, Truck, Headphones } from "lucide-react";

const featuredProducts = [
  {
    id: 1,
    name: "MacBook Pro 14-inch",
    price: "$1,999",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8",
    rating: 4.8,
    reviews: 342
  },
  {
    id: 2,
    name: "Gaming Laptop RTX 4080",
    price: "$1,899",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
    rating: 4.7,
    reviews: 189
  },
  {
    id: 3,
    name: "Ultrabook ThinkPad X1",
    price: "$1,299",
    image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed",
    rating: 4.6,
    reviews: 156
  },
  {
    id: 4,
    name: "Wireless Printer Pro",
    price: "$399",
    image: "https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae",
    rating: 4.4,
    reviews: 223
  }
];

const benefits = [
  {
    icon: <Zap className="w-8 h-8" />,
    title: "Lightning Fast",
    description: "Experience blazing speeds with cutting-edge technology and performance"
  },
  {
    icon: <Shield className="w-8 h-8" />,
    title: "Quality Assured",
    description: "Premium products with comprehensive warranty and quality guarantee"
  },
  {
    icon: <Truck className="w-8 h-8" />,
    title: "Free Shipping",
    description: "Complimentary shipping on all orders over $50 nationwide"
  },
  {
    icon: <Headphones className="w-8 h-8" />,
    title: "Expert Support",
    description: "24/7 technical support from certified technology specialists"
  }
];

const Index = () => {
  return (
    <div className="min-h-screen bg-[#FAFAF8] dark:bg-gray-900 transition-colors duration-300">
      <Navbar />
      <HeroSection />
      
      {/* Categories Section */}
      <section className="py-20 bg-white dark:bg-gray-800 transition-colors duration-300">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white animate-fade-in">
              Shop by Category
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 animate-fade-in" style={{ animationDelay: '200ms' }}>
              Find the perfect tech product for your needs
            </p>
          </div>
          <div className="animate-fade-in" style={{ animationDelay: '400ms' }}>
            <CategoryNav />
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white animate-fade-in">
              Featured Products
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 animate-fade-in" style={{ animationDelay: '200ms' }}>
              Discover our most popular tech devices
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product, index) => (
              <div 
                key={product.id} 
                className="animate-fade-in hover-lift"
                style={{ animationDelay: `${400 + index * 100}ms` }}
              >
                <ProductCard {...product} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white animate-fade-in">
              Why Choose Us?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 animate-fade-in" style={{ animationDelay: '200ms' }}>
              Experience the premium difference
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div 
                key={index}
                className="text-center p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 animate-fade-in"
                style={{ animationDelay: `${400 + index * 100}ms` }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 text-white rounded-xl mb-6">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
