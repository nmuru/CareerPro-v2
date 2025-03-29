import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bookmark, X } from 'lucide-react';
import { Person } from "@/types";
import { useSavedItems } from '@/hooks/useSavedItems';
import { useToast } from '@/hooks/use-toast';

interface RecommendationCardProps {
  person: Person;
  actionLabel: string;
  onAction: (person: Person) => void;
}

export default function RecommendationCard({ person, actionLabel, onAction }: RecommendationCardProps) {
  const { saveItem, isItemSaved, removeSavedItem } = useSavedItems();
  const [isSaved, setIsSaved] = useState(() => isItemSaved('person', person.id));
  const [isIgnored, setIsIgnored] = useState(false);
  const { toast } = useToast();

  if (isIgnored) {
    return null;
  }

  const handleSave = async () => {
    if (isSaved) {
      await removeSavedItem('person', person.id);
      setIsSaved(false);
      toast({
        title: "Removed from saved items",
        description: `${person.name} has been removed from your saved items`,
      });
    } else {
      await saveItem('person', person.id, person);
      setIsSaved(true);
      toast({
        title: "Saved for later",
        description: `${person.name} has been added to your saved items`,
      });
    }
  };

  const handleIgnore = () => {
    setIsIgnored(true);
    toast({
      title: "Recommendation ignored",
      description: `${person.name} has been removed from your recommendations`,
    });
  };

  return (
    <Card className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition">
      <CardContent className="p-0">
        <div className="flex items-start">
          <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700 mr-3 flex-shrink-0 overflow-hidden">
            {person.imageUrl ? (
              <img 
                src={person.imageUrl} 
                alt={person.name} 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-300 dark:bg-gray-600">
                <span className="text-gray-600 dark:text-gray-300 font-semibold text-sm">
                  {person.name.charAt(0)}
                </span>
              </div>
            )}
          </div>
          <div className="flex-1">
            <h4 className="font-semibold">{person.name}</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">{person.position}</p>
            <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">{person.connection}</p>
          </div>
        </div>
        <div className="mt-4 flex space-x-2">
          <Button 
            variant="default" 
            className="flex-1 bg-[#0A66C2] hover:bg-blue-700 text-white text-sm"
            onClick={() => onAction(person)}
          >
            {actionLabel}
          </Button>
          <Button 
            variant="outline" 
            size="icon" 
            className="border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm"
            onClick={handleSave}
          >
            <Bookmark className={`h-4 w-4 ${isSaved ? "fill-current" : ""}`} />
          </Button>
          <Button 
            variant="outline" 
            size="icon" 
            className="border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm"
            onClick={handleIgnore}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
