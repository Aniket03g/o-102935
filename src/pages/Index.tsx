
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import CategoryNav from "../components/CategoryNav";
import ProductCard from "../components/ProductCard";
import { Zap, Shield, Truck, Headphones } from "lucide-react";

const featuredProducts = [
  {
    id: 1,
    name: "HP EliteOne 800 G9 AiO",
    price: "$1,299",
    image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
    rating: 4.5,
    reviews: 128
  },
  {
    id: 2,
    name: "HP OMEN 16 Gaming",
    price: "$1,599",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
    rating: 4.7,
    reviews: 89
  },
  {
    id: 3,
    name: "HP Spectre x360 14",
    price: "$1,299",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    rating: 4.8,
    reviews: 94
  },
  {
    id: 4,
    name: "HP LaserJet Pro",
    price: "$299",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    rating: 4.4,
    reviews: 167
  }
];

const benefits = [
  {
    icon: <Zap className="w-8 h-8" />,
    title: "Lightning Fast",
    description: "Experience blazing speeds with our latest processors and SSD technology"
  },
  {
    icon: <Shield className="w-8 h-8" />,
    title: "Built to Last",
    description: "Premium build quality with comprehensive warranty protection"
  },
  {
    icon: <Truck className="w-8 h-8" />,
    title: "Free Shipping",
    description: "Complimentary shipping on all orders over $50 nationwide"
  },
  {
    icon: <Headphones className="w-8 h-8" />,
    title: "Expert Support",
    description: "24/7 technical support from certified HP specialists"
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
              Find the perfect HP product for your needs
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
              Discover our most popular HP devices
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
              Why Choose HP?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 animate-fade-in" style={{ animationDelay: '200ms' }}>
              Experience the HP advantage
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
