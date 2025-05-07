
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Download, Image, Sun, Moon } from "lucide-react";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    document.documentElement.classList.toggle('dark', newMode);
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 py-5 px-6 md:px-10 transition-all duration-300 flex items-center justify-between 
        ${scrolled ? 'bg-white bg-opacity-70 backdrop-blur-md shadow-sm dark:bg-micro-darkest-purple dark:bg-opacity-70' : ''}`}
    >
      <div className="flex items-center">
        <div className="flex items-center gap-2">
          <Image className="h-6 w-6 text-micro-purple" />
          <h1 className="text-xl font-medium">
            micro<span className="text-micro-purple">scapes</span>
          </h1>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleDarkMode}
          className="rounded-full"
        >
          {isDarkMode ? (
            <Sun className="h-5 w-5 text-micro-purple" />
          ) : (
            <Moon className="h-5 w-5 text-micro-purple" />
          )}
        </Button>
        <Button className="micro-button-primary flex items-center gap-2">
          <Download className="h-4 w-4" />
          <span>Download App</span>
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
