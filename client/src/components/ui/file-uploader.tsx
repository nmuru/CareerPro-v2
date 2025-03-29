import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, FileText, ChevronRight, Linkedin, AlertCircle, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface FileUploaderProps {
  onFileUpload: (file: File) => void;
  isLoading: boolean;
}

export default function FileUploader({ onFileUpload, isLoading }: FileUploaderProps) {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  
  // Set up animation timing
  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => {
      setIsAnimating(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const validateFile = (file: File): boolean => {
    // For demo purposes we'll accept any file type, but show the proper validation message
    const isPDF = file.type === 'application/pdf';
    
    if (!isPDF) {
      toast({
        title: "File type notice",
        description: "For a real LinkedIn profile, please use a PDF file. For this demo, we'll process your file.",
        variant: "default",
      });
      // Return true anyway for the demo
      return true;
    }
    
    // Check file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "File size should be less than 5MB",
        variant: "destructive",
      });
      return false;
    }
    
    return true;
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (validateFile(file)) {
        setSelectedFile(file);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (validateFile(file)) {
        setSelectedFile(file);
      }
    }
  };

  const handleUpload = () => {
    if (selectedFile) {
      onFileUpload(selectedFile);
    } else {
      toast({
        title: "No file selected",
        description: "Please select a PDF file to upload",
        variant: "destructive",
      });
    }
  };

  const triggerFileInput = () => {
    inputRef.current?.click();
  };
  
  // For demo purposes, allow skipping the upload
  const handleDemoSkip = () => {
    const mockFile = new File(["dummy content"], "linkedin-profile.pdf", { type: "application/pdf" });
    onFileUpload(mockFile);
  };

  return (
    <Card className={`bg-white dark:bg-gray-800 rounded-xl shadow-md mb-6 text-center overflow-hidden ${isAnimating ? 'slide-up-animation' : ''}`}>
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 h-2"></div>
      <CardContent className="p-8">
        <div className="max-w-md mx-auto">
          <div className="relative mb-6">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full inline-block">
              <Linkedin className="w-10 h-10 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          
          <h3 className="text-2xl font-bold mb-3">Upload Your LinkedIn Profile</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Export your LinkedIn profile as PDF and upload it to get personalized career and networking recommendations.
          </p>
          
          <div className="bg-blue-50 dark:bg-blue-900/10 p-4 rounded-lg mb-6 text-left">
            <div className="flex items-start">
              <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 mr-2 flex-shrink-0" />
              <p className="text-sm text-blue-800 dark:text-blue-300">
                <span className="font-medium">How to export your LinkedIn PDF:</span> Go to your LinkedIn profile &rarr; More button &rarr; Save to PDF
              </p>
            </div>
          </div>
          
          <div 
            className={`relative border-2 border-dashed rounded-xl p-8 transition-colors cursor-pointer group ${
              dragActive 
                ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20" 
                : "border-gray-300 dark:border-gray-600 hover:border-blue-400 dark:hover:border-blue-500"
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={triggerFileInput}
          >
            {/* Animated glow effect on hover */}
            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-blue-500/0 via-blue-500/10 to-blue-500/0 opacity-0 group-hover:opacity-100 blur-xl transition-opacity"></div>
            
            <input 
              ref={inputRef}
              type="file" 
              className="hidden" 
              accept=".pdf" 
              onChange={handleChange}
            />
            <div className="flex flex-col items-center">
              {selectedFile ? (
                <>
                  <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full mb-3">
                    <FileText className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="flex items-center mb-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-1" />
                    <span className="font-medium text-green-700 dark:text-green-400">File selected</span>
                  </div>
                  <span className="text-sm font-medium">{selectedFile.name}</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                  </span>
                </>
              ) : (
                <>
                  <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-full mb-3 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30 transition-colors">
                    <Upload className="h-8 w-8 text-gray-400 dark:text-gray-500 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
                  </div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Click to upload or drag and drop
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    PDF files recommended (max. 5MB)
                  </span>
                </>
              )}
            </div>
          </div>
          
          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <Button 
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium transition-all group"
              onClick={handleUpload}
              disabled={!selectedFile || isLoading}
              size="lg"
            >
              {isLoading ? (
                <span className="flex items-center">
                  <span className="mr-2">Processing...</span>
                </span>
              ) : (
                <span className="flex items-center">
                  <span>Continue with Upload</span>
                  <ChevronRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              )}
            </Button>
            
            <Button 
              variant="outline"
              onClick={handleDemoSkip}
              disabled={isLoading}
              className="text-gray-600 border-gray-300 hover:bg-gray-50 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-800"
            >
              Continue with Demo Data
            </Button>
          </div>
        </div>
      </CardContent>
      
      {/* Animation keyframes */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes slide-up {
          0% { transform: translateY(20px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        
        .slide-up-animation {
          animation: slide-up 0.8s ease-out forwards;
        }
      `}} />
    </Card>
  );
}
