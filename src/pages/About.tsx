
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { Image } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <section className="pt-32 pb-20 px-6 md:px-10 bg-micro-softer-white dark:bg-micro-darkest-purple">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center mb-8">
            <div className="h-16 w-16 rounded-full bg-gradient-to-br from-micro-purple to-micro-dark-purple flex items-center justify-center">
              <Image className="h-8 w-8 text-white" />
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-8">About microScapes</h1>
          
          <div className="space-y-6 text-lg">
            <p>
              microScapes is a curated collection of high-quality wallpapers designed to transform your devices with stunning visuals. 
              Our mission is to provide beautiful, high-resolution wallpapers that inspire creativity and enhance your digital experience.
            </p>
            
            <p>
              Every wallpaper in our collection is carefully selected for its aesthetic appeal and visual quality. 
              Whether you're looking for serene nature scenes, vibrant abstracts, or minimalist designs, 
              microScapes offers a diverse range of options to suit your style and preferences.
            </p>
            
            <p>
              Our platform is built with a focus on user experience, making it easy to discover, preview, and download wallpapers 
              for all your devices. We regularly update our collection with fresh content to keep your screens looking their best.
            </p>
            
            <p>
              We also welcome submissions from talented photographers and designers who want to share their work with our community. 
              If you have a wallpaper you'd like to contribute, simply use our upload feature to submit your creation.
            </p>
            
            <p>
              Thank you for visiting microScapes. We hope you enjoy our wallpaper collection and find the perfect background 
              to enhance your digital workspace.
            </p>
          </div>
        </div>
      </section>
      
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default About;
