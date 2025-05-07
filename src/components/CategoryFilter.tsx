
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
    <div className="relative mb-8">
      <div 
        ref={containerRef}
        className="flex justify-center items-center gap-1 md:gap-3 mx-auto max-w-fit bg-white/30 backdrop-blur-md p-1.5 rounded-full border border-white/20 dark:bg-micro-darkest-purple/50 dark:border-micro-purple/20"
      >
        {categories.map((category, index) => (
          <button
            key={category}
            className={cn(
              "relative z-10 px-4 py-1.5 rounded-full text-sm md:text-base transition-colors duration-300",
              activeCategory === category 
                ? "text-white" 
                : "text-micro-darkest-purple dark:text-white/70 hover:text-micro-darkest-purple/70 dark:hover:text-white"
            )}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            onClick={() => onSelectCategory(category)}
          >
            {category}
          </button>
        ))}

        {/* Active indicator */}
        <div
          ref={indicatorRef}
          className="absolute h-[calc(100%-12px)] bg-micro-purple rounded-full transition-all duration-300 ease-out"
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
