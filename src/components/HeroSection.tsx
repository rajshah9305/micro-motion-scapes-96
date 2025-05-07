
import { useRef, useState, useEffect } from "react";
import { ArrowDown } from "lucide-react";

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    setIsVisible(true);
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    
    if (heroRef.current) {
      observer.observe(heroRef.current);
    }
    
    return () => {
      if (heroRef.current) {
        observer.unobserve(heroRef.current);
      }
    };
  }, []);

  const scrollToContent = () => {
    const contentSection = document.getElementById("featured-wallpapers");
    if (contentSection) {
      contentSection.scrollIntoView({ behavior: "smooth" });
    }
  };
  
  return (
    <div 
      ref={heroRef}
      className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden"
    >
      <div className={`absolute inset-0 bg-gradient-to-br from-micro-purple/10 to-transparent transition-opacity duration-700 ease-in-out opacity-${isVisible ? '100' : '0'}`} />
      
      <div 
        className={`absolute inset-0 bg-[url('/public/lovable-uploads/5a0d7dc9-da28-4072-bb88-2c7b511950ed.png')] bg-cover bg-center transition-transform duration-1000 ease-out ${isVisible ? 'scale-100' : 'scale-110'}`}
        style={{ opacity: 0.5 }}
      />
      
      <div className="absolute inset-0 bg-background/10 backdrop-blur-[2px]" />
      
      <div className={`relative z-10 text-center px-6 max-w-4xl mx-auto transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
          Discover <span className="text-shimmer font-bold">beautiful</span> wallpapers for your devices
        </h1>
        <p className="text-lg md:text-xl opacity-90 mb-10 max-w-2xl mx-auto">
          Curated collection of high-quality wallpapers to transform your screens with stunning visuals.
        </p>
        <button 
          onClick={scrollToContent}
          className="micro-button-primary group"
        >
          Explore Wallpapers
        </button>
      </div>
      
      <div 
        className="absolute bottom-8 animate-bounce cursor-pointer" 
        onClick={scrollToContent}
      >
        <ArrowDown className="h-6 w-6 text-white drop-shadow-md" />
      </div>
    </div>
  );
};

export default HeroSection;
