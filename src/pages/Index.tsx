
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
        <div className="text-center">
          <div className="flex items-center gap-2 mb-4 justify-center">
            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-micro-purple to-micro-dark-purple animate-pulse" />
          </div>
          <h2 className="text-2xl font-medium animate-pulse-slow">
            micro<span className="text-micro-purple">scapes</span>
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
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
