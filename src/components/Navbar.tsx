
import { Search, User, ShoppingCart, Moon, Sun, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isDark, setIsDark] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    setIsDark(isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !isDark;
    setIsDark(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode.toString());
    document.documentElement.classList.toggle('dark', newDarkMode);
  };

  const categories = [
    { name: "Electronics", path: "/marketplace?category=electronics" },
    { name: "Laptops", path: "/marketplace?category=laptops" },
    { name: "Gaming", path: "/marketplace?category=gaming" },
    { name: "Mobile", path: "/marketplace?category=mobile" },
    { name: "Accessories", path: "/marketplace?category=accessories" }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-b border-gray-200/60 shadow-sm">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link 
            to="/" 
            className="text-2xl font-bold text-gray-900 hover:text-blue-600 transition-colors duration-200"
          >
            TechStore
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {categories.map((category) => (
              <Link 
                key={category.name}
                to={category.path} 
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 relative group py-2"
              >
                {category.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" className="h-10 w-10 p-0 hover:bg-gray-100">
              <Search size={20} className="text-gray-600" />
            </Button>
            
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={toggleDarkMode}
              className="h-10 w-10 p-0 hover:bg-gray-100"
            >
              {isDark ? <Sun size={20} className="text-amber-500" /> : <Moon size={20} className="text-gray-600" />}
            </Button>
            
            <Button variant="ghost" size="sm" className="h-10 w-10 p-0 hover:bg-gray-100">
              <User size={20} className="text-gray-600" />
            </Button>
            
            <Button variant="ghost" size="sm" className="h-10 w-10 p-0 hover:bg-gray-100 relative">
              <ShoppingCart size={20} className="text-gray-600" />
              <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium text-[10px]">
                0
              </span>
            </Button>
            
            <Button 
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden h-10 w-10 p-0 hover:bg-gray-100"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden overflow-hidden transition-all duration-300 ${isMobileMenuOpen ? 'max-h-80 opacity-100 mt-6' : 'max-h-0 opacity-0'}`}>
          <div className="bg-gray-50 rounded-xl p-4 space-y-2 border border-gray-200">
            {categories.map((category) => (
              <Link 
                key={category.name}
                to={category.path}
                className="block py-3 px-4 text-gray-700 hover:text-blue-600 hover:bg-white rounded-lg font-medium transition-all duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {category.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
