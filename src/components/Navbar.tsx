
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
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-gray-200/60 shadow-sm">
      <div className="container-modern py-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link 
            to="/" 
            className="text-3xl font-bold text-gradient hover:scale-105 transition-transform duration-200"
          >
            TechStore
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-10">
            {categories.map((category) => (
              <Link 
                key={category.name}
                to={category.path} 
                className="text-gray-700 hover:text-gray-900 font-medium transition-all duration-200 relative group py-3 text-lg"
              >
                {category.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-900 transition-all duration-300 group-hover:w-full rounded-full"></span>
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="sm" className="h-12 w-12 p-0 hover:bg-gray-100 rounded-2xl transition-all duration-200">
              <Search size={22} className="text-gray-600" />
            </Button>
            
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={toggleDarkMode}
              className="h-12 w-12 p-0 hover:bg-gray-100 rounded-2xl transition-all duration-200"
            >
              {isDark ? <Sun size={22} className="text-amber-500" /> : <Moon size={22} className="text-gray-600" />}
            </Button>
            
            <Button variant="ghost" size="sm" className="h-12 w-12 p-0 hover:bg-gray-100 rounded-2xl transition-all duration-200">
              <User size={22} className="text-gray-600" />
            </Button>
            
            <Button variant="ghost" size="sm" className="h-12 w-12 p-0 hover:bg-gray-100 rounded-2xl transition-all duration-200 relative">
              <ShoppingCart size={22} className="text-gray-600" />
              <span className="absolute -top-1 -right-1 bg-gray-900 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-medium text-[11px]">
                0
              </span>
            </Button>
            
            <Button 
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden h-12 w-12 p-0 hover:bg-gray-100 rounded-2xl transition-all duration-200"
            >
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden overflow-hidden transition-all duration-500 ${
          isMobileMenuOpen ? 'max-h-96 opacity-100 mt-8' : 'max-h-0 opacity-0'
        }`}>
          <div className="glass rounded-3xl p-6 space-y-2 border border-gray-200">
            {categories.map((category) => (
              <Link 
                key={category.name}
                to={category.path}
                className="block py-4 px-6 text-gray-700 hover:text-gray-900 hover:bg-white/50 rounded-2xl font-medium transition-all duration-200 text-lg"
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
