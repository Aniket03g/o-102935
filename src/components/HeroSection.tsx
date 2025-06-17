
import { ArrowRight, Play, Sparkles, Shield, Truck, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50/30 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      {/* Professional background pattern */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_80%,_rgba(59,130,246,0.1)_0%,_transparent_50%)] dark:bg-[radial-gradient(circle_at_20%_80%,_rgba(59,130,246,0.2)_0%,_transparent_50%)]"></div>
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_20%,_rgba(147,51,234,0.1)_0%,_transparent_50%)] dark:bg-[radial-gradient(circle_at_80%_20%,_rgba(147,51,234,0.2)_0%,_transparent_50%)]"></div>
      </div>

      <div className="container mx-auto px-6 py-32 relative z-10">
        <div className="text-center max-w-5xl mx-auto">
          {/* Professional badge */}
          <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-full px-6 py-3 mb-8 shadow-sm animate-fade-in">
            <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span className="text-sm font-semibold text-blue-700 dark:text-blue-300">
              Trusted by 50,000+ Customers Worldwide
            </span>
          </div>

          {/* Professional heading */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 animate-fade-in leading-tight" style={{ animationDelay: '200ms' }}>
            <span className="text-gray-900 dark:text-white">Premium</span>{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Technology</span>
            <br />
            <span className="text-gray-900 dark:text-white">Solutions</span>
          </h1>

          {/* Professional subtitle */}
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed font-light animate-fade-in" style={{ animationDelay: '400ms' }}>
            Discover cutting-edge electronics, powerful laptops, gaming gear, and essential accessories. 
            Experience technology that transforms your digital lifestyle with enterprise-grade quality.
          </p>

          {/* Professional CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16 animate-fade-in" style={{ animationDelay: '600ms' }}>
            <Button 
              asChild
              size="lg" 
              className="px-10 py-4 text-lg font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              <Link to="/marketplace">
                Explore Products
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              className="px-10 py-4 text-lg font-semibold border-2 border-gray-300 dark:border-gray-600 hover:border-blue-600 dark:hover:border-blue-400 rounded-xl transform hover:scale-105 transition-all duration-300"
            >
              <Play className="mr-2 w-5 h-5" />
              Watch Demo
            </Button>
          </div>

          {/* Professional trust indicators */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto animate-fade-in" style={{ animationDelay: '800ms' }}>
            <div className="flex items-center justify-center gap-3 p-6 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-700/50">
              <Shield className="w-8 h-8 text-green-600 dark:text-green-400" />
              <div>
                <div className="text-lg font-semibold text-gray-900 dark:text-white">Secure Shopping</div>
                <div className="text-gray-600 dark:text-gray-400">SSL Protected</div>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3 p-6 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-700/50">
              <Truck className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              <div>
                <div className="text-lg font-semibold text-gray-900 dark:text-white">Free Shipping</div>
                <div className="text-gray-600 dark:text-gray-400">On orders $50+</div>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3 p-6 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-700/50">
              <Clock className="w-8 h-8 text-purple-600 dark:text-purple-400" />
              <div>
                <div className="text-lg font-semibold text-gray-900 dark:text-white">24/7 Support</div>
                <div className="text-gray-600 dark:text-gray-400">Expert assistance</div>
              </div>
            </div>
          </div>

          {/* Professional stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 animate-fade-in" style={{ animationDelay: '1000ms' }}>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-2">10K+</div>
              <div className="text-gray-600 dark:text-gray-400 font-medium">Products</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-2">50K+</div>
              <div className="text-gray-600 dark:text-gray-400 font-medium">Customers</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-2">99.9%</div>
              <div className="text-gray-600 dark:text-gray-400 font-medium">Uptime</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-2">4.9★</div>
              <div className="text-gray-600 dark:text-gray-400 font-medium">Rating</div>
            </div>
          </div>
        </div>
      </div>

      {/* Professional scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce-gentle">
        <div className="w-6 h-10 border-2 border-gray-400 dark:border-gray-500 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gray-400 dark:bg-gray-500 rounded-full mt-2 animate-pulse-slow"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
