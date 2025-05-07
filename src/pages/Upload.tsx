
import Navbar from "@/components/Navbar";
import ImageUploader from "@/components/ImageUploader";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

const Upload = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <ImageUploader />
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Upload;
