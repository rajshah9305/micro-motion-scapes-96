
import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ImageUploader from "@/components/ImageUploader";
import ScrollToTop from "@/components/ScrollToTop";
import { Button } from "@/components/ui/button";

const Upload = () => {
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  
  const handleUploadSuccess = (imageUrl: string) => {
    setUploadedImages(prev => [...prev, imageUrl]);
  };
  
  return (
    <div className="min-h-screen bg-micro-softer-white dark:bg-micro-darkest-purple">
      <Navbar />
      
      <div className="max-w-7xl mx-auto py-16 px-6 md:px-10">
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Upload Wallpapers</h1>
          <p className="text-micro-gray dark:text-white/70 max-w-xl mx-auto">
            Share your creative wallpapers with the microScapes community. 
            High-quality images will be featured on our homepage.
          </p>
        </div>
        
        <div className="mb-16">
          <ImageUploader onUploadSuccess={handleUploadSuccess} />
        </div>
        
        {uploadedImages.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Your Uploads</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {uploadedImages.map((url, index) => (
                <div key={index} className="micro-card overflow-hidden">
                  <div className="aspect-video">
                    <img 
                      src={url} 
                      alt={`Uploaded wallpaper ${index + 1}`} 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        // Replace with placeholder if image fails to load
                        (e.target as HTMLImageElement).src = '/placeholder.svg';
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        <div className="text-center">
          <Button asChild className="micro-button-primary">
            <Link to="/">
              Return to Homepage
            </Link>
          </Button>
        </div>
      </div>
      
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Upload;
