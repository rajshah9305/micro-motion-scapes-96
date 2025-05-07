
import { ArrowDownCircle, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HeroSection = () => {
  const scrollToWallpapers = () => {
    const element = document.getElementById('featured-wallpapers');
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center px-6 md:px-10 pt-20 pb-10">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-micro-softest-white to-micro-softer-white dark:from-micro-darkest-purple dark:to-micro-dark-purple -z-10" />
      
      {/* Floating orbs */}
      <div className="absolute top-1/4 left-1/4 h-40 w-40 bg-micro-purple/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/3 h-60 w-60 bg-micro-purple/5 rounded-full blur-3xl" />
      
      <div className="max-w-4xl text-center">
        <div className="animate-fade-in">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Beautiful <span className="text-micro-purple">Wallpapers</span> for All Your Devices
          </h1>
          
          <p className="text-micro-gray dark:text-white/70 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
            Explore our curated collection of high-resolution wallpapers designed to make your devices look stunning.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              className="micro-button-primary text-base h-12 px-8"
              onClick={scrollToWallpapers}
            >
              <ArrowDownCircle className="h-5 w-5 mr-2" />
              Explore Wallpapers
            </Button>
            
            <Link to="/upload">
              <Button variant="outline" className="micro-button text-base h-12 px-8">
                <Upload className="h-5 w-5 mr-2" />
                Upload Your Own
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
