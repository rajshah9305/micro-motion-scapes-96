
import { useRef, useState, useEffect } from 'react';
import { Download, Smartphone, Monitor } from 'lucide-react';

const DownloadPromo = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);
  
  return (
    <section 
      ref={sectionRef} 
      className="relative py-24 px-6 md:px-10 overflow-hidden bg-gradient-to-br from-micro-purple/10 to-background dark:from-micro-purple/20 dark:to-micro-darkest-purple"
    >
      <div 
        className={`absolute top-0 right-0 w-full h-full bg-[url('/public/lovable-uploads/0f0b82f1-6525-4a04-b86d-ed35d793ae19.png')] bg-cover bg-center opacity-10 transition-all duration-1000 ease-out ${
          isVisible ? 'opacity-10 scale-100' : 'opacity-0 scale-110'
        }`}
      />
      
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div
            className={`transition-all duration-1000 ease-out ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
            }`}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Get <span className="text-shimmer">microScapes</span> on all your devices
            </h2>
            <p className="text-micro-gray dark:text-white/70 mb-8">
              Download our app to access high-quality wallpapers on any device. Synchronize your favorites and enjoy a seamless experience across all your screens.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <button className="micro-button-primary flex items-center gap-2">
                <Smartphone className="h-4 w-4" />
                <span>iOS & Android</span>
              </button>
              <button className="micro-button-secondary flex items-center gap-2">
                <Monitor className="h-4 w-4" />
                <span>Desktop</span>
              </button>
            </div>
          </div>
          
          <div 
            className={`bg-white/30 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-xl dark:bg-micro-darkest-purple/50 dark:border-micro-purple/20 transition-all duration-1000 ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
          >
            <div className="flex items-center justify-center">
              <div className="relative w-64 h-[400px] rounded-3xl overflow-hidden border-8 border-micro-darkest-purple shadow-lg dark:border-micro-purple/50">
                <img 
                  src="/public/lovable-uploads/1ac80422-a732-4896-afb5-da2ab606ac84.png" 
                  alt="Mobile app preview" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-micro-darkest-purple/50 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <h3 className="text-lg font-medium">microScapes</h3>
                  <p className="text-sm opacity-80">Mobile App</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DownloadPromo;
