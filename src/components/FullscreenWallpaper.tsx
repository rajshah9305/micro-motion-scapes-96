
import { useState, useEffect } from "react";
import { X, Download, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { WallpaperProps } from "./WallpaperCard";

interface FullscreenWallpaperProps {
  wallpaper: WallpaperProps;
  onClose: () => void;
  onNext?: () => void;
  onPrevious?: () => void;
  hasNext?: boolean;
  hasPrevious?: boolean;
}

const FullscreenWallpaper = ({
  wallpaper,
  onClose,
  onNext,
  onPrevious,
  hasNext = false,
  hasPrevious = false,
}: FullscreenWallpaperProps) => {
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Prevent body scrolling when fullscreen is open
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);
  
  const handleDownload = () => {
    // In a real app, we would handle the actual download here
    toast({
      title: "Download started",
      description: `Downloading ${wallpaper.title}...`,
    });
  };
  
  const handleImageLoad = () => {
    setIsLoading(false);
  };
  
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") onClose();
    if (e.key === "ArrowRight" && onNext && hasNext) onNext();
    if (e.key === "ArrowLeft" && onPrevious && hasPrevious) onPrevious();
  };
  
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onNext, onPrevious, hasNext, hasPrevious]);
  
  return (
    <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">
      {/* Close button */}
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={onClose}
        className="absolute top-4 right-4 text-white hover:bg-white/10"
      >
        <X className="h-6 w-6" />
      </Button>
      
      {/* Navigation buttons */}
      {hasPrevious && (
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={onPrevious}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:bg-white/10"
        >
          <ChevronLeft className="h-8 w-8" />
        </Button>
      )}
      
      {hasNext && (
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={onNext}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:bg-white/10"
        >
          <ChevronRight className="h-8 w-8" />
        </Button>
      )}
      
      {/* Loading indicator */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-12 w-12 rounded-full border-2 border-micro-purple border-t-transparent animate-spin"></div>
        </div>
      )}
      
      {/* Wallpaper image */}
      <div className="w-full h-full flex items-center justify-center p-8">
        <img 
          src={wallpaper.src.replace('/public', '')} 
          alt={wallpaper.title}
          className="max-w-full max-h-full object-contain"
          onLoad={handleImageLoad}
        />
      </div>
      
      {/* Wallpaper info */}
      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/60 to-transparent">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between">
          <div>
            <h2 className="text-xl md:text-2xl font-medium text-white mb-1">{wallpaper.title}</h2>
            <p className="text-white/70 text-sm">{wallpaper.category}</p>
          </div>
          <Button 
            onClick={handleDownload}
            className="micro-button-primary mt-4 md:mt-0"
          >
            <Download className="h-4 w-4 mr-2" />
            Download Wallpaper
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FullscreenWallpaper;
