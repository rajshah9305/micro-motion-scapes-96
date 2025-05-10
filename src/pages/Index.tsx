
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturedWallpapers from "@/components/FeaturedWallpapers";
import DownloadPromo from "@/components/DownloadPromo";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { toast } from "@/components/ui/use-toast";

const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Simulate loading state
    const timer = setTimeout(() => {
      setIsLoaded(true);
      toast({
        title: "Welcome to microScapes",
        description: "Explore and download beautiful wallpapers for all your devices.",
      });
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  if (!isLoaded) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-micro-softer-white dark:bg-micro-darkest-purple">
        <div className="text-center relative">
          {/* Animated decorative elements */}
          <div className="absolute -top-20 -left-20 w-40 h-40 bg-micro-purple/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-micro-dark-purple/20 rounded-full blur-3xl animate-pulse"></div>
          
          <div className="flex items-center gap-2 mb-4 justify-center relative">
            <div className="h-16 w-16 rounded-full bg-gradient-to-br from-micro-purple to-micro-dark-purple animate-pulse relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
          </div>
          <h2 className="text-3xl font-medium animate-pulse-slow relative z-10">
            micro<span className="bg-gradient-to-r from-micro-purple to-micro-dark-purple bg-clip-text text-transparent">scapes</span>
          </h2>
          <p className="text-micro-gray dark:text-white/70 mt-2">Loading experience...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-micro-softer-white to-white dark:from-micro-darkest-purple dark:to-[#15182a] overflow-hidden">
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_50%_120%,rgba(155,135,245,0.1),rgba(255,255,255,0)_70%)]"></div>
      <Navbar />
      <HeroSection />
      <FeaturedWallpapers />
      <DownloadPromo />
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Index;
