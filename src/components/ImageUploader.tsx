
import { useState } from "react";
import { Upload, ImageIcon } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const ImageUploader = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Nature");
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(null);
      setPreview(null);
      return;
    }

    const file = e.target.files[0];
    setSelectedFile(file);
    
    // Create preview
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);
    
    // Clean up preview URL when component unmounts
    return () => URL.revokeObjectURL(objectUrl);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedFile) {
      toast({
        title: "No file selected",
        description: "Please select an image to upload",
        variant: "destructive"
      });
      return;
    }

    if (!title) {
      toast({
        title: "Title required",
        description: "Please provide a title for your wallpaper",
        variant: "destructive"
      });
      return;
    }
    
    setIsUploading(true);
    
    // In a real app, we would upload the file to a server here
    // Simulate upload delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast({
      title: "Upload successful",
      description: `Your wallpaper "${title}" has been submitted and is pending review.`,
    });
    
    // Reset form
    setSelectedFile(null);
    setPreview(null);
    setTitle("");
    setCategory("Nature");
    setIsUploading(false);
  };

  return (
    <div className="py-20 px-6 md:px-10 bg-micro-softer-white dark:bg-micro-darkest-purple min-h-screen">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Upload Wallpaper</h1>
          <p className="text-micro-gray dark:text-white/70 max-w-xl mx-auto">
            Share your beautiful wallpapers with the microScapes community. 
            High quality images will be featured on our platform.
          </p>
        </div>
        
        <Card className="micro-card">
          <form onSubmit={handleSubmit}>
            <CardHeader>
              <CardTitle>Submit Wallpaper</CardTitle>
              <CardDescription>
                Please upload a high-resolution image (minimum 1920×1080px)
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium">Image</label>
                <div 
                  className={`border-2 border-dashed rounded-lg p-6 ${preview ? 'border-micro-purple' : 'border-gray-300 hover:border-micro-purple'} transition-all duration-200 cursor-pointer text-center`}
                  onClick={() => document.getElementById('image-upload')?.click()}
                >
                  {preview ? (
                    <div className="relative w-full aspect-video">
                      <img 
                        src={preview} 
                        alt="Preview" 
                        className="w-full h-full object-cover rounded"
                      />
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-8">
                      <Upload className="h-12 w-12 text-micro-purple mb-2" />
                      <p className="text-sm text-micro-gray mb-2">Drag and drop your image here or click to browse</p>
                      <p className="text-xs text-micro-gray/70">PNG, JPG, WEBP (max 10MB)</p>
                    </div>
                  )}
                  
                  <Input 
                    id="image-upload"
                    type="file" 
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </div>
                <label 
                  htmlFor="image-upload" 
                  className="block w-full cursor-pointer"
                >
                  <div className="mt-2 w-full flex justify-center">
                    <Button 
                      type="button" 
                      variant="outline"
                      className="micro-button"
                    >
                      <ImageIcon className="h-4 w-4 mr-2" />
                      {preview ? "Change image" : "Select image"}
                    </Button>
                  </div>
                </label>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="title" className="block text-sm font-medium">Title</label>
                <Input 
                  id="title" 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Give your wallpaper a title"
                  className="micro-input"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="category" className="block text-sm font-medium">Category</label>
                <select
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                >
                  <option value="Nature">Nature</option>
                  <option value="Sunset">Sunset</option>
                  <option value="Landscape">Landscape</option>
                  <option value="Abstract">Abstract</option>
                  <option value="Night">Night</option>
                </select>
              </div>
            </CardContent>
            
            <CardFooter>
              <Button 
                type="submit" 
                className="micro-button-primary w-full"
                disabled={isUploading}
              >
                {isUploading ? (
                  <>
                    <span className="animate-pulse mr-2">●</span>
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Wallpaper
                  </>
                )}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default ImageUploader;
