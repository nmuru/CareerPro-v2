import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

interface ShowMoreButtonProps {
  onClick: () => void;
}

export default function ShowMoreButton({ onClick }: ShowMoreButtonProps) {
  return (
    <Button
      variant="ghost"
      onClick={onClick}
      className="text-[#0A66C2] hover:text-blue-700 font-medium flex items-center mt-4"
    >
      Show More <ChevronDown className="h-4 w-4 ml-2" />
    </Button>
  );
}
