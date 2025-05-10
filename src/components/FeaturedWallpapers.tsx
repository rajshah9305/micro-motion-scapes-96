
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { UploadCloud } from 'lucide-react';
import WallpaperCard, { WallpaperProps } from './WallpaperCard';
import FullscreenWallpaper from './FullscreenWallpaper';
import CategoryFilter from './CategoryFilter';
import { Button } from '@/components/ui/button';

// Sample wallpapers data
const wallpapersData: WallpaperProps[] = [
  {
    id: '1',
    src: '/public/lovable-uploads/c887f472-13a2-4bbc-b589-7b03e0681778.png',
    title: 'Mountain Peak',
    category: 'Nature',
  },
  {
    id: '2',
    src: '/public/lovable-uploads/d8ce9eb7-8ece-4324-9a44-4152d9fd2bbc.png',
    title: 'Sunset Horizon',
    category: 'Sunset',
  },
  {
    id: '3',
    src: '/public/lovable-uploads/93fd63ba-8f68-4ae0-98d9-9d4f701e8c75.png',
    title: 'Autumn Mountains',
    category: 'Nature',
  },
  {
    id: '4',
    src: '/public/lovable-uploads/678cf8b0-2e09-4679-aed3-78074b0035c0.png',
    title: 'Valley View',
    category: 'Landscape',
  },
  {
    id: '5',
    src: '/public/lovable-uploads/1ac80422-a732-4896-afb5-da2ab606ac84.png',
    title: 'Sunset Silhouette',
    category: 'Sunset',
  },
  {
    id: '6',
    src: '/public/lovable-uploads/fdda6423-fa01-4d26-861d-8c55c4910553.png',
    title: 'Red Clouds',
    category: 'Abstract',
  },
  {
    id: '7',
    src: '/public/lovable-uploads/a3a82ec9-18e3-417f-87c9-59a5132ee1ff.png',
    title: 'Night Sky',
    category: 'Night',
  },
  {
    id: '8',
    src: '/public/lovable-uploads/5a0d7dc9-da28-4072-bb88-2c7b511950ed.png',
    title: 'Dock at Night',
    category: 'Night',
  },
  {
    id: '9',
    src: '/public/lovable-uploads/13cde2f0-a0a5-46ee-8ac1-a705389a7c4f.png',
    title: 'Mountain Sunset',
    category: 'Sunset',
  },
  {
    id: '10',
    src: '/public/lovable-uploads/0f0b82f1-6525-4a04-b86d-ed35d793ae19.png',
    title: 'Night Mountains',
    category: 'Night',
  },
];

const FeaturedWallpapers = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [filteredWallpapers, setFilteredWallpapers] = useState<WallpaperProps[]>(wallpapersData);
  const [visibleItems, setVisibleItems] = useState<WallpaperProps[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState<Record<string, boolean>>({});
  const [fullscreenWallpaper, setFullscreenWallpaper] = useState<WallpaperProps | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(-1);

  // Track image loading status
  const handleImageLoad = (id: string) => {
    setImagesLoaded(prev => ({ ...prev, [id]: true }));
  };

  const handleImageError = (id: string) => {
    console.error(`Failed to load image for wallpaper ${id}`);
    // We still mark it as loaded to remove the loading state
    setImagesLoaded(prev => ({ ...prev, [id]: true }));
  };

  // Extract unique categories from data
  const categories = ['All', ...new Set(wallpapersData.map(item => item.category))];

  // Handle view wallpaper in fullscreen
  const handleViewWallpaper = (id: string) => {
    const index = filteredWallpapers.findIndex(item => item.id === id);
    if (index !== -1) {
      setFullscreenWallpaper(filteredWallpapers[index]);
      setCurrentIndex(index);
    }
  };

  // Handle navigation in fullscreen mode
  const handleNext = () => {
    if (currentIndex < filteredWallpapers.length - 1) {
      setFullscreenWallpaper(filteredWallpapers[currentIndex + 1]);
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setFullscreenWallpaper(filteredWallpapers[currentIndex - 1]);
      setCurrentIndex(currentIndex - 1);
    }
  };

  useEffect(() => {
    // Filter wallpapers based on active category
    const filtered = activeCategory === 'All' 
      ? wallpapersData
      : wallpapersData.filter(item => item.category === activeCategory);
    
    setFilteredWallpapers(filtered);
  }, [activeCategory]);

  useEffect(() => {
    // Stagger the appearance of wallpapers for nice animation effect
    setVisibleItems([]);
    const showItemsWithDelay = async () => {
      const newVisibleItems: WallpaperProps[] = [];
      for (let i = 0; i < filteredWallpapers.length; i++) {
        newVisibleItems.push(filteredWallpapers[i]);
        setVisibleItems([...newVisibleItems]);
        await new Promise(resolve => setTimeout(resolve, 100));
      }
    };
    showItemsWithDelay();
  }, [filteredWallpapers]);

  return (
    <section id="featured-wallpapers" className="py-20 px-6 md:px-10 bg-micro-softer-white dark:bg-micro-darkest-purple relative overflow-hidden">
      {/* Background decoration elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-micro-purple/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-micro-dark-purple/10 rounded-full blur-3xl -z-10"></div>
      
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-micro-purple to-micro-dark-purple bg-clip-text text-transparent">
                Featured Wallpapers
              </span>
            </h2>
            <p className="text-micro-gray dark:text-white/70 max-w-xl">
              Explore our collection of high-quality wallpapers curated for all your devices.
              Each piece tells a unique story through color and composition.
            </p>
          </div>
          <Button asChild className="micro-button-primary mt-6 md:mt-0">
            <Link to="/upload">
              <UploadCloud className="h-4 w-4 mr-2" />
              Upload Wallpaper
            </Link>
          </Button>
        </div>
        
        <CategoryFilter 
          categories={categories} 
          activeCategory={activeCategory} 
          onSelectCategory={setActiveCategory} 
        />
        
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
          {visibleItems.map((wallpaper, index) => (
            <div 
              key={wallpaper.id}
              className="opacity-0 animate-fade-in mb-6 break-inside-avoid"
              style={{ 
                animationDelay: `${index * 100}ms`, 
                animationFillMode: 'forwards',
              }}
            >
              <WallpaperCard 
                {...wallpaper} 
                onImageLoad={() => handleImageLoad(wallpaper.id)}
                onImageError={() => handleImageError(wallpaper.id)}
                onView={handleViewWallpaper}
              />
            </div>
          ))}
        </div>
        
        {visibleItems.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="h-12 w-12 rounded-full border-2 border-micro-purple border-t-transparent animate-spin mb-4"></div>
            <p className="text-micro-gray dark:text-white/70">Loading wallpapers...</p>
          </div>
        )}
      </div>

      {/* Fullscreen wallpaper view */}
      {fullscreenWallpaper && (
        <FullscreenWallpaper 
          wallpaper={fullscreenWallpaper}
          onClose={() => setFullscreenWallpaper(null)}
          onNext={handleNext}
          onPrevious={handlePrevious}
          hasNext={currentIndex < filteredWallpapers.length - 1}
          hasPrevious={currentIndex > 0}
        />
      )}
    </section>
  );
};

export default FeaturedWallpapers;
