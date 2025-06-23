
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon, Search, User, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from 'next-themes';
import CartSidebar from './CartSidebar';
import AuthModal from './AuthModal';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Marketplace', path: '/marketplace' },
    { name: 'Categories', path: '/marketplace?category=all' },
  ];

  const isActivePath = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path.split('?')[0]);
  };

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    console.log('Theme toggled to:', newTheme);
  };

  const handleNavItemClick = (path: string) => {
    if (path.includes('?')) {
      const [pathname, search] = path.split('?');
      navigate(`${pathname}?${search}`);
    } else {
      navigate(path);
    }
    setIsOpen(false);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/20 transition-all duration-300">
        <div className="container-modern">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div 
              className="flex items-center space-x-2 cursor-pointer hover:opacity-80 transition-opacity duration-200"
              onClick={() => navigate('/')}
            >
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-primary-foreground font-bold text-lg">T</span>
              </div>
              <span className="text-2xl font-bold text-foreground tracking-tight">TechHub</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavItemClick(item.path)} 
                  className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 relative overflow-hidden group ${
                    isActivePath(item.path)
                      ? 'text-primary bg-primary/10'
                      : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
                  }`}
                >
                  <span className="relative z-10">{item.name}</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
                </button>
              ))}
            </div>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center space-x-3">
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 rounded-full hover:bg-accent/50 transition-all duration-200"
                onClick={() => navigate('/marketplace')}
              >
                <Search size={20} />
              </Button>
              
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 rounded-full hover:bg-accent/50 transition-all duration-200"
              >
                <Heart size={20} />
              </Button>

              <div className="flex items-center">
                <CartSidebar />
              </div>

              {mounted && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleTheme}
                  className="h-10 w-10 rounded-full hover:bg-accent/50 transition-all duration-200"
                >
                  {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                </Button>
              )}

              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowAuthModal(true)}
                className="h-10 w-10 rounded-full hover:bg-accent/50 transition-all duration-200"
              >
                <User size={20} />
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-2">
              <div className="flex items-center">
                <CartSidebar />
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(!isOpen)}
                className="h-10 w-10 rounded-full hover:bg-accent/50 transition-all duration-200"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isOpen && (
            <div className="md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-xl border-b border-border/20 shadow-2xl animate-fade-in">
              <div className="px-6 py-8 space-y-4">
                {navItems.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => handleNavItemClick(item.path)}
                    className={`block w-full text-left px-6 py-4 rounded-xl font-medium transition-all duration-200 ${
                      isActivePath(item.path)
                        ? 'text-primary bg-primary/10'
                        : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
                    }`}
                  >
                    {item.name}
                  </button>
                ))}
                
                <div className="flex items-center justify-between pt-6 border-t border-border/20">
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-10 w-10 rounded-full hover:bg-accent/50"
                    >
                      <Search size={20} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-10 w-10 rounded-full hover:bg-accent/50"
                    >
                      <Heart size={20} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        setShowAuthModal(true);
                        setIsOpen(false);
                      }}
                      className="h-10 w-10 rounded-full hover:bg-accent/50"
                    >
                      <User size={20} />
                    </Button>
                  </div>
                  
                  {mounted && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={toggleTheme}
                      className="h-10 w-10 rounded-full hover:bg-accent/50"
                    >
                      {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                    </Button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </>
  );
};

export default Navbar;
