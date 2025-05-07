
import { useState } from "react";
import { Download, Eye } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";

export interface WallpaperProps {
  id: string;
  src: string;
  title: string;
  category: string;
}

const WallpaperCard = ({ src, title, category }: WallpaperProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation();
    // In a real app, we would handle the actual download here
    toast({
      title: "Download started",
      description: `Downloading ${title}...`,
    });
  };
  
  const handleView = () => {
    // In a real app, we would open a fullscreen view
    toast({
      title: "Opening wallpaper",
      description: `Viewing ${title} in full screen`,
    });
  };
  
  return (
    <div 
      className="micro-card micro-hover group h-[350px] md:h-[400px] cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleView}
    >
      <div className="relative h-full overflow-hidden">
        <img 
          src={src} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
        />
        
        <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />
        
        <div className={`absolute bottom-0 left-0 right-0 p-4 transition-all duration-300 transform ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <h3 className="text-white text-xl font-medium mb-1 drop-shadow-md">{title}</h3>
          <p className="text-white/80 text-sm mb-4">{category}</p>
          
          <div className="flex gap-2">
            <Button 
              size="sm" 
              onClick={handleDownload}
              className="micro-button-primary"
            >
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
            <Button 
              size="sm" 
              variant="outline" 
              onClick={(e) => {
                e.stopPropagation();
                handleView();
              }}
              className="bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30"
            >
              <Eye className="h-4 w-4 mr-2" />
              View
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WallpaperCard;
