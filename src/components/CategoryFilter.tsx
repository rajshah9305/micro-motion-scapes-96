
import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface CategoryFilterProps {
  categories: string[];
  activeCategory: string;
  onSelectCategory: (category: string) => void;
}

const CategoryFilter = ({ categories, activeCategory, onSelectCategory }: CategoryFilterProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [indicatorStyle, setIndicatorStyle] = useState({
    left: "0px",
    width: "0px",
  });

  useEffect(() => {
    // Update indicator position when active category changes
    updateIndicatorPosition();
  }, [activeCategory]);

  const updateIndicatorPosition = () => {
    if (!containerRef.current) return;
    
    const activeIndex = categories.indexOf(activeCategory);
    const button = containerRef.current.children[activeIndex] as HTMLElement;
    
    if (button) {
      const { offsetLeft, offsetWidth } = button;
      setIndicatorStyle({
        left: `${offsetLeft}px`,
        width: `${offsetWidth}px`,
      });
    }
  };

  return (
    <div className="relative mb-12 mt-8">
      <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-micro-purple/20 to-transparent -z-10"></div>
      <div 
        ref={containerRef}
        className="flex justify-center items-center gap-1 md:gap-3 mx-auto max-w-fit bg-white/50 backdrop-blur-md p-1.5 rounded-full border border-white/30 shadow-lg dark:bg-micro-darkest-purple/50 dark:border-micro-purple/30"
      >
        {categories.map((category, index) => (
          <button
            key={category}
            className={cn(
              "relative z-10 px-5 py-2 rounded-full text-sm md:text-base transition-all duration-300 font-medium",
              activeCategory === category 
                ? "text-white" 
                : "text-micro-darkest-purple dark:text-white/80 hover:text-micro-darkest-purple/70 dark:hover:text-white"
            )}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            onClick={() => onSelectCategory(category)}
          >
            {category}
            {hoveredIndex === index && activeCategory !== category && (
              <span className="absolute inset-0 bg-micro-dark-purple/10 dark:bg-micro-purple/10 rounded-full animate-scale-in" />
            )}
          </button>
        ))}

        {/* Active indicator */}
        <div
          ref={indicatorRef}
          className="absolute h-[calc(100%-12px)] bg-gradient-to-r from-micro-purple to-micro-dark-purple rounded-full transition-all duration-300 ease-out shadow-[0_0_20px_rgba(155,135,245,0.5)]"
          style={{
            left: indicatorStyle.left,
            width: indicatorStyle.width,
          }}
        />
      </div>
    </div>
  );
};

export default CategoryFilter;
