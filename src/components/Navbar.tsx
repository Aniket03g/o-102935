
import { Search, User, ShoppingCart, Moon, Sun, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

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
    { name: "All-in-One PCs", path: "/marketplace?category=aio" },
    { name: "Laptops", path: "/marketplace?category=laptops" },
    { name: "Gaming Laptops", path: "/marketplace?category=gaming" },
    { name: "Printers", path: "/marketplace?category=printers" },
    { name: "Scanners", path: "/marketplace?category=scanners" }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-100 dark:border-gray-800 transition-all duration-300">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link 
            to="/" 
            className="text-2xl font-bold text-primary dark:text-white hover:scale-105 transition-transform duration-200"
          >
            HP STORE
          </Link>
          
          <div className="hidden lg:flex items-center space-x-8">
            {categories.map((category) => (
              <Link 
                key={category.name}
                to={category.path} 
                className="nav-link text-accent dark:text-gray-300 hover:text-primary dark:hover:text-white transition-all duration-200 hover:-translate-y-0.5"
              >
                {category.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <button className="p-2 hover:text-accent dark:hover:text-gray-300 transition-all duration-200 hover:scale-110">
              <Search size={20} />
            </button>
            <button 
              onClick={toggleDarkMode}
              className="p-2 hover:text-accent dark:hover:text-gray-300 transition-all duration-200 hover:scale-110 hover:rotate-12"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button className="p-2 hover:text-accent dark:hover:text-gray-300 transition-all duration-200 hover:scale-110">
              <User size={20} />
            </button>
            <button className="p-2 hover:text-accent dark:hover:text-gray-300 transition-all duration-200 hover:scale-110 relative">
              <ShoppingCart size={20} />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                0
              </span>
            </button>
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 hover:text-accent dark:hover:text-gray-300 transition-all duration-200"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden overflow-hidden transition-all duration-300 ${isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="pt-4 space-y-2">
            {categories.map((category, index) => (
              <Link 
                key={category.name}
                to={category.path}
                className="block py-2 text-accent dark:text-gray-300 hover:text-primary dark:hover:text-white transition-all duration-200 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
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
