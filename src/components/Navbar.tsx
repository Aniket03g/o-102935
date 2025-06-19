
import { Search, User, ShoppingCart, Moon, Sun, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isDark, setIsDark] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [isCartAnimating, setIsCartAnimating] = useState(false);

  useEffect(() => {
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    setIsDark(isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !isDark;
    setIsDark(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode.toString());
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const handleCartClick = () => {
    setIsCartAnimating(true);
    setTimeout(() => setIsCartAnimating(false), 500);
  };

  const categories = [
    { name: "Electronics", path: "/marketplace?category=electronics" },
    { name: "Laptops", path: "/marketplace?category=laptops" },
    { name: "Gaming", path: "/marketplace?category=gaming" },
    { name: "Mobile", path: "/marketplace?category=mobile" },
    { name: "Accessories", path: "/marketplace?category=accessories" }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/60 shadow-sm transition-all duration-300">
      <div className="container-modern py-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link 
            to="/" 
            className="text-3xl font-bold font-heading text-gradient hover:scale-105 transition-all duration-300 hover:drop-shadow-sm"
          >
            TechStore
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-10">
            {categories.map((category) => (
              <Link 
                key={category.name}
                to={category.path} 
                className="nav-item text-muted-foreground hover:text-foreground font-medium transition-all duration-300 py-3 text-lg"
              >
                {category.name}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-3">
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-12 w-12 p-0 hover:bg-muted rounded-2xl transition-all duration-300 hover:scale-110 hover:shadow-md"
            >
              <Search size={22} className="text-muted-foreground transition-colors duration-200" />
            </Button>
            
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={toggleDarkMode}
              className="h-12 w-12 p-0 hover:bg-muted rounded-2xl transition-all duration-300 hover:scale-110 hover:shadow-md hover:rotate-12"
            >
              {isDark ? (
                <Sun size={22} className="text-amber-500 transition-all duration-300" />
              ) : (
                <Moon size={22} className="text-muted-foreground transition-all duration-300" />
              )}
            </Button>
            
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-12 w-12 p-0 hover:bg-muted rounded-2xl transition-all duration-300 hover:scale-110 hover:shadow-md"
            >
              <User size={22} className="text-muted-foreground transition-colors duration-200" />
            </Button>
            
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleCartClick}
              className={`h-12 w-12 p-0 hover:bg-muted rounded-2xl transition-all duration-300 hover:scale-110 hover:shadow-md relative ${
                isCartAnimating ? 'animate-cart-wiggle' : ''
              }`}
            >
              <ShoppingCart size={22} className="text-muted-foreground transition-colors duration-200" />
              <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full w-6 h-6 flex items-center justify-center font-medium text-[11px] transition-all duration-200 hover:scale-110">
                {cartCount}
              </span>
            </Button>
            
            <Button 
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden h-12 w-12 p-0 hover:bg-muted rounded-2xl transition-all duration-300 hover:scale-110"
            >
              {isMobileMenuOpen ? (
                <X size={22} className="transition-transform duration-200 rotate-90" />
              ) : (
                <Menu size={22} className="transition-transform duration-200" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden overflow-hidden transition-all duration-500 ${
          isMobileMenuOpen ? 'max-h-96 opacity-100 mt-8' : 'max-h-0 opacity-0'
        }`}>
          <div className="bg-card/80 backdrop-blur-xl rounded-3xl p-6 space-y-2 border border-border">
            {categories.map((category) => (
              <Link 
                key={category.name}
                to={category.path}
                className="block py-4 px-6 text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-2xl font-medium transition-all duration-300 text-lg hover:translate-x-2"
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
