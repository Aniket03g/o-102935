
import { ArrowRight, Play, Sparkles, Shield, Truck, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_80%,_rgba(59,130,246,0.08)_0%,_transparent_50%)]"></div>
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_20%,_rgba(147,51,234,0.08)_0%,_transparent_50%)]"></div>
      </div>

      <div className="container mx-auto px-6 py-32 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Trust Badge */}
          <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-full px-4 py-2 mb-8 animate-fade-in">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-700">
              Trusted by 50,000+ customers worldwide
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in leading-[1.1] tracking-tight" style={{ animationDelay: '100ms' }}>
            <span className="text-gray-900">Premium</span>{' '}
            <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">Technology</span>
            <br />
            <span className="text-gray-900">for Everyone</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed animate-fade-in" style={{ animationDelay: '200ms' }}>
            Discover cutting-edge electronics, powerful laptops, gaming gear, and essential accessories. 
            Experience technology that transforms your digital lifestyle.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 animate-fade-in" style={{ animationDelay: '300ms' }}>
            <Button 
              asChild
              size="lg" 
              className="px-8 py-3 text-base font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
            >
              <Link to="/marketplace">
                Shop Now
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              className="px-8 py-3 text-base font-semibold border-2 border-gray-300 hover:border-blue-600 hover:text-blue-600 rounded-xl transition-all duration-300 hover:-translate-y-0.5"
            >
              <Play className="mr-2 w-5 h-5" />
              Watch Demo
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: '400ms' }}>
            <div className="flex items-center justify-center gap-3 p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-gray-200/50 shadow-sm">
              <Shield className="w-6 h-6 text-green-600" />
              <div className="text-left">
                <div className="font-semibold text-gray-900 text-sm">Secure Shopping</div>
                <div className="text-gray-600 text-xs">SSL Protected</div>
              </div>
            </div>
            
            <div className="flex items-center justify-center gap-3 p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-gray-200/50 shadow-sm">
              <Truck className="w-6 h-6 text-blue-600" />
              <div className="text-left">
                <div className="font-semibold text-gray-900 text-sm">Free Shipping</div>
                <div className="text-gray-600 text-xs">On orders $99+</div>
              </div>
            </div>
            
            <div className="flex items-center justify-center gap-3 p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-gray-200/50 shadow-sm">
              <Clock className="w-6 h-6 text-violet-600" />
              <div className="text-left">
                <div className="font-semibold text-gray-900 text-sm">24/7 Support</div>
                <div className="text-gray-600 text-xs">Expert help</div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 animate-fade-in" style={{ animationDelay: '500ms' }}>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-1">10K+</div>
              <div className="text-gray-600 text-sm font-medium">Products</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-1">50K+</div>
              <div className="text-gray-600 text-sm font-medium">Customers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-1">99.9%</div>
              <div className="text-gray-600 text-sm font-medium">Uptime</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-1">4.9★</div>
              <div className="text-gray-600 text-sm font-medium">Rating</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-gray-300 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
