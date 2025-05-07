
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Image, Upload, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMobile } from "@/hooks/use-mobile";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isMobile = useMobile();
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 px-6 md:px-10 py-4 transition-all duration-300 ${
        isScrolled ? 'bg-white/80 dark:bg-micro-darkest-purple/80 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-micro-purple to-micro-dark-purple flex items-center justify-center">
              <Image className="h-4 w-4 text-white" />
            </div>
            <h1 className="text-xl font-medium">
              micro<span className="text-micro-purple">scapes</span>
            </h1>
          </div>
        </Link>
        
        {/* Desktop navigation */}
        <div className="hidden md:flex items-center gap-8">
          <div className="flex items-center gap-6">
            <Link 
              to="/" 
              className="text-micro-gray hover:text-micro-purple transition-colors duration-300"
            >
              Home
            </Link>
            <Link 
              to="#featured-wallpapers" 
              className="text-micro-gray hover:text-micro-purple transition-colors duration-300"
            >
              Wallpapers
            </Link>
            <Link 
              to="#" 
              className="text-micro-gray hover:text-micro-purple transition-colors duration-300"
            >
              About
            </Link>
          </div>
          
          <Link to="/upload">
            <Button variant="outline" className="micro-button">
              <Upload className="h-4 w-4 mr-2" />
              Upload
            </Button>
          </Link>
        </div>
        
        {/* Mobile menu button */}
        <div className="md:hidden">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && isMobile && (
        <div className="fixed inset-0 top-16 bg-white dark:bg-micro-darkest-purple z-40 p-6 flex flex-col">
          <div className="flex flex-col gap-6 py-6">
            <Link 
              to="/" 
              className="text-lg font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="#featured-wallpapers" 
              className="text-lg font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Wallpapers
            </Link>
            <Link 
              to="#" 
              className="text-lg font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link 
              to="/upload"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Button className="micro-button-primary w-full mt-4">
                <Upload className="h-4 w-4 mr-2" />
                Upload
              </Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
