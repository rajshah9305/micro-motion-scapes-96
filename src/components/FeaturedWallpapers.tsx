
import { useState, useEffect } from 'react';
import WallpaperCard, { WallpaperProps } from './WallpaperCard';
import CategoryFilter from './CategoryFilter';

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

  // Extract unique categories from data
  const categories = ['All', ...new Set(wallpapersData.map(item => item.category))];

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
    <section id="featured-wallpapers" className="py-20 px-6 md:px-10 bg-micro-softer-white dark:bg-micro-darkest-purple">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Featured Wallpapers</h2>
        <p className="text-center text-micro-gray dark:text-white/70 mb-10 max-w-xl mx-auto">
          Explore our collection of high-quality wallpapers curated for all your devices.
        </p>
        
        <CategoryFilter 
          categories={categories} 
          activeCategory={activeCategory} 
          onSelectCategory={setActiveCategory} 
        />
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {visibleItems.map((wallpaper, index) => (
            <div 
              key={wallpaper.id}
              className="opacity-0 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
            >
              <WallpaperCard {...wallpaper} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedWallpapers;
