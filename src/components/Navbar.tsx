
import { useState, useEffect } from "react";
import { Menu, X, Sun, Moon, Image, UploadCloud } from "lucide-react";
import { Link } from "react-router-dom";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { useMobile } from "@/hooks/use-mobile";

const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const isMobile = useMobile();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  
  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/80 dark:bg-micro-dark-purple/80 shadow-md backdrop-blur-md' : 'bg-transparent'}`}>
      <nav className="max-w-7xl mx-auto px-6 md:px-10 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-micro-purple to-micro-dark-purple flex items-center justify-center">
              <Image className="h-4 w-4 text-white" />
            </div>
            <h1 className={`text-xl font-medium ${isScrolled ? 'text-black dark:text-white' : 'text-micro-dark-purple dark:text-white'}`}>
              micro<span className="text-micro-purple">scapes</span>
            </h1>
          </Link>
          
          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className="micro-nav-link">Home</Link>
            <a href="#featured-wallpapers" className="micro-nav-link">Wallpapers</a>
            <a href="#" className="micro-nav-link">About</a>
            <Link to="/upload" className="micro-nav-link flex items-center gap-1">
              <UploadCloud className="h-4 w-4" />
              Upload
            </Link>
          </div>
          
          <div className="hidden md:flex items-center gap-2">
            <Button 
              variant="outline" 
              size="icon" 
              onClick={toggleTheme}
              className="rounded-full border-micro-purple/20"
            >
              {theme === "dark" ? (
                <Sun className="h-[1.2rem] w-[1.2rem] text-yellow-400" />
              ) : (
                <Moon className="h-[1.2rem] w-[1.2rem] text-micro-purple" />
              )}
            </Button>
            <Button className="micro-button-primary">
              Download App
            </Button>
          </div>
          
          <div className="md:hidden flex items-center gap-2">
            <Button 
              variant="outline" 
              size="icon" 
              onClick={toggleTheme}
              className="rounded-full border-micro-purple/20"
            >
              {theme === "dark" ? (
                <Sun className="h-[1.2rem] w-[1.2rem] text-yellow-400" />
              ) : (
                <Moon className="h-[1.2rem] w-[1.2rem] text-micro-purple" />
              )}
            </Button>
            <Button 
              variant="outline" 
              size="icon" 
              onClick={toggleMenu}
              className="rounded-full border-micro-purple/20"
            >
              {isMenuOpen ? (
                <X className="h-[1.2rem] w-[1.2rem] text-micro-purple" />
              ) : (
                <Menu className="h-[1.2rem] w-[1.2rem] text-micro-purple" />
              )}
            </Button>
          </div>
        </div>
      </nav>
      
      {/* Mobile menu */}
      {isMenuOpen && isMobile && (
        <div className="md:hidden fixed inset-0 pt-16 bg-white/95 dark:bg-micro-dark-purple/95 backdrop-blur-md z-40">
          <div className="flex flex-col items-center justify-center gap-6 h-full">
            <Link 
              to="/" 
              className="text-xl font-medium" 
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <a 
              href="#featured-wallpapers" 
              className="text-xl font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Wallpapers
            </a>
            <a 
              href="#" 
              className="text-xl font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </a>
            <Link 
              to="/upload" 
              className="text-xl font-medium flex items-center gap-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <UploadCloud className="h-5 w-5" />
              Upload
            </Link>
            <Button 
              className="micro-button-primary mt-4"
              onClick={() => setIsMenuOpen(false)}
            >
              Download App
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
