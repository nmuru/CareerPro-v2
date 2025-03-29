import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

interface RefreshButtonProps {
  onClick: () => void;
}

export default function RefreshButton({ onClick }: RefreshButtonProps) {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await onClick();
    } finally {
      setTimeout(() => {
        setIsRefreshing(false);
      }, 750); // Minimum spinner display time for better UX
    }
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleRefresh}
      disabled={isRefreshing}
      className="flex items-center text-[#0A66C2] hover:text-blue-700 font-medium"
    >
      <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
      Refresh Recommendations
    </Button>
  );
}
