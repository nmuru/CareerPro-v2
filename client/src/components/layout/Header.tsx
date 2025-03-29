import { useTheme } from "@/lib/theme-provider";
import { Button } from "@/components/ui/button";
import { Sun, Moon, User } from "lucide-react";

export default function Header() {
  const { theme, setTheme } = useTheme();

  return (
    <header className="bg-white dark:bg-[#283E4A] shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <svg 
            className="w-8 h-8 text-[#0077B5]" 
            fill="currentColor" 
            viewBox="0 0 24 24"
          >
            <path d="M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z"></path>
            <path 
              fill="white" 
              d="M8 17V10H6V17H8ZM7 8.75C7.69036 8.75 8.25 8.19036 8.25 7.5C8.25 6.80964 7.69036 6.25 7 6.25C6.30964 6.25 5.75 6.80964 5.75 7.5C5.75 8.19036 6.30964 8.75 7 8.75ZM18 17H16.004V14.003C16.004 12.9935 15.998 11.6871 14.654 11.6871C13.302 11.6871 13.002 12.7935 13.002 13.9391V17H11V10H12.948V10.97H12.983C13.319 10.388 14.013 9.771 15.032 9.771C17.038 9.771 18 10.75 18 13.24V17Z"
            ></path>
          </svg>
          <h1 className="text-xl font-bold text-[#0077B5] dark:text-white">NetworkPro</h1>
        </div>
        
        {/* Right Side Actions */}
        <div className="flex items-center space-x-4">
          {/* Dark Mode Toggle */}
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
            <span className="sr-only">Toggle theme</span>
          </Button>
          
          {/* User Menu */}
          <div className="relative">
            <Button 
              variant="ghost" 
              size="icon" 
              className="rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                <User className="h-5 w-5 text-gray-600" />
              </div>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
