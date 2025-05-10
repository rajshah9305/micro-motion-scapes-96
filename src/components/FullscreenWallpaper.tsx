
import { useState, useEffect } from "react";
import { X, Download, ChevronLeft, ChevronRight, Maximize2, Minimize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { WallpaperProps } from "./WallpaperCard";
import { Dialog, DialogContent } from "@/components/ui/dialog";

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
  const [isFullyImmersive, setIsFullyImmersive] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [isZoomed, setIsZoomed] = useState(false);
  
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

  const toggleImmersiveMode = () => {
    setIsFullyImmersive(!isFullyImmersive);
  };

  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
  };
  
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") onClose();
    if (e.key === "ArrowRight" && onNext && hasNext) onNext();
    if (e.key === "ArrowLeft" && onPrevious && hasPrevious) onPrevious();
    if (e.key === "f") toggleImmersiveMode();
    if (e.key === "z") toggleZoom();
  };
  
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onNext, onPrevious, hasNext, hasPrevious, isFullyImmersive, isZoomed]);
  
  return (
    <div 
      className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center"
      onMouseMove={() => setShowControls(true)}
      onMouseLeave={() => isFullyImmersive && setShowControls(false)}
    >
      {/* Controls fade out in immersive mode when mouse is not moving */}
      <div 
        className={`absolute inset-0 flex items-center justify-center z-50 transition-opacity duration-300 ${
          isFullyImmersive && !showControls ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        {/* Close button */}
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:bg-white/10 z-50"
        >
          <X className="h-6 w-6" />
        </Button>
        
        {/* Immersive mode toggle */}
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleImmersiveMode}
          className="absolute top-4 right-16 text-white hover:bg-white/10 z-50"
        >
          {isFullyImmersive ? 
            <Minimize2 className="h-6 w-6" /> : 
            <Maximize2 className="h-6 w-6" />
          }
        </Button>

        {/* Zoom toggle */}
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleZoom}
          className="absolute top-4 right-28 text-white hover:bg-white/10 z-50"
        >
          {isZoomed ? 
            <Minimize2 className="h-6 w-6" /> : 
            <Maximize2 className="h-6 w-6" />
          }
        </Button>
        
        {/* Navigation buttons */}
        {hasPrevious && (
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onPrevious}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:bg-white/10 z-50"
          >
            <ChevronLeft className="h-8 w-8" />
          </Button>
        )}
        
        {hasNext && (
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onNext}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:bg-white/10 z-50"
          >
            <ChevronRight className="h-8 w-8" />
          </Button>
        )}
      </div>
      
      {/* Loading indicator */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center z-40">
          <div className="h-12 w-12 rounded-full border-2 border-micro-purple border-t-transparent animate-spin"></div>
        </div>
      )}
      
      {/* Wallpaper image with zoom effect */}
      <div className={`w-full h-full flex items-center justify-center p-8 overflow-hidden ${isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'}`}>
        <img 
          src={wallpaper.src.replace('/public', '')} 
          alt={wallpaper.title}
          className={`max-w-full max-h-full object-contain transition-transform duration-500 ${
            isZoomed ? 'scale-150 cursor-zoom-out' : 'scale-100 cursor-zoom-in'
          }`}
          onLoad={handleImageLoad}
          onClick={toggleZoom}
        />
      </div>
      
      {/* Wallpaper info (hidden in fully immersive mode) */}
      {!isFullyImmersive && (
        <div className={`absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/60 to-transparent transition-opacity duration-300 ${
          isFullyImmersive ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}>
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between">
            <div>
              <h2 className="text-xl md:text-2xl font-medium text-white mb-1">
                {wallpaper.title}
              </h2>
              <p className="text-white/70 text-sm">{wallpaper.category}</p>
              <p className="text-white/50 text-xs mt-1">
                Press keyboard shortcuts: ← Previous | → Next | F Immersive mode | Z Zoom | Esc Close
              </p>
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
      )}
    </div>
  );
};

export default FullscreenWallpaper;
