
import { Download, Image, Github } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-micro-softer-white dark:bg-micro-darkest-purple py-12 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center border-t border-micro-purple/10 pt-8">
          <div className="flex items-center gap-2 mb-6 md:mb-0">
            <Image className="h-6 w-6 text-micro-purple" />
            <h2 className="text-xl font-medium">
              micro<span className="text-micro-purple">scapes</span>
            </h2>
          </div>
          
          <div className="flex items-center gap-4">
            <a 
              href="#" 
              className="text-sm text-micro-gray hover:text-micro-purple transition-colors duration-300"
            >
              Privacy
            </a>
            <a 
              href="#" 
              className="text-sm text-micro-gray hover:text-micro-purple transition-colors duration-300"
            >
              Terms
            </a>
            <a 
              href="#" 
              className="text-sm text-micro-gray hover:text-micro-purple transition-colors duration-300"
            >
              Contact
            </a>
          </div>
        </div>
        
        <div className="mt-8 text-center text-sm text-micro-gray">
          <p>© 2025 MicroScapes. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
