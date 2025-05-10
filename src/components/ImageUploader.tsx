
import { useState } from "react";
import { UploadCloud, Image } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";

const ImageUploader = ({ onUploadSuccess }: { onUploadSuccess?: (imageUrl: string) => void }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid file type",
        description: "Please select an image file.",
        variant: "destructive",
      });
      return;
    }
    
    setSelectedFile(file);
    
    // Create preview URL
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result as string);
    };
    fileReader.readAsDataURL(file);
  };
  
  const handleUpload = async () => {
    if (!selectedFile) return;
    
    setIsUploading(true);
    
    try {
      // In a real application, you would upload the file to a server here
      // For this demo, we'll simulate a server response after a delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Generate a fake URL for the uploaded image
      const fakeImageUrl = URL.createObjectURL(selectedFile);
      
      toast({
        title: "Upload successful",
        description: "Your wallpaper has been uploaded successfully.",
      });
      
      if (onUploadSuccess) {
        onUploadSuccess(fakeImageUrl);
      }
      
      // Reset the form
      setSelectedFile(null);
      setPreviewUrl(null);
    } catch (error) {
      toast({
        title: "Upload failed",
        description: "There was a problem uploading your wallpaper.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };
  
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Image className="h-5 w-5 text-micro-purple" />
          Upload Wallpaper
        </CardTitle>
        <CardDescription>
          Share your favorite wallpapers with the microScapes community
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="image" className="text-sm font-medium">Image</Label>
            <div className={`border-2 border-dashed rounded-lg p-4 transition-all ${previewUrl ? 'border-micro-purple' : 'border-gray-300 dark:border-gray-700'} hover:border-micro-purple`}>
              {previewUrl ? (
                <div className="relative aspect-video w-full overflow-hidden rounded-md">
                  <img 
                    src={previewUrl} 
                    alt="Preview" 
                    className="object-cover w-full h-full"
                    onError={() => {
                      toast({
                        title: "Image Error",
                        description: "There was a problem loading the preview.",
                        variant: "destructive",
                      });
                      setPreviewUrl(null);
                    }}
                  />
                </div>
              ) : (
                <label htmlFor="image" className="flex flex-col items-center justify-center py-6 cursor-pointer">
                  <UploadCloud className="h-10 w-10 text-gray-400 dark:text-gray-500 mb-2" />
                  <span className="text-sm text-gray-500 dark:text-gray-400">Click to select or drag & drop</span>
                  <span className="text-xs text-gray-400 dark:text-gray-500 mt-1">PNG, JPG, WebP up to 5MB</span>
                </label>
              )}
              <Input 
                id="image" 
                type="file" 
                className="sr-only"
                accept="image/*"
                onChange={handleFileChange}
              />
            </div>
          </div>
          
          {selectedFile && (
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Selected: {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button 
          onClick={handleUpload} 
          disabled={!selectedFile || isUploading} 
          className="micro-button-primary"
        >
          {isUploading ? (
            <>
              <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
              Uploading...
            </>
          ) : (
            <>
              <UploadCloud className="h-4 w-4 mr-2" />
              Upload Wallpaper
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ImageUploader;
