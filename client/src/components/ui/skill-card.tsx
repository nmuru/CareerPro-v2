import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bookmark, Zap } from 'lucide-react';
import { SkillToLearn } from "@/types";
import { useSavedItems } from '@/hooks/useSavedItems';
import { useToast } from '@/hooks/use-toast';

interface SkillCardProps {
  skill: SkillToLearn;
}

export default function SkillCard({ skill }: SkillCardProps) {
  const { saveItem, isItemSaved, removeSavedItem } = useSavedItems();
  const [isSaved, setIsSaved] = useState(() => isItemSaved('skill', skill.id));
  const { toast } = useToast();

  const handleSave = async () => {
    if (isSaved) {
      await removeSavedItem('skill', skill.id);
      setIsSaved(false);
      toast({
        title: "Removed from saved skills",
        description: `${skill.name} has been removed from your saved skills`,
      });
    } else {
      await saveItem('skill', skill.id, skill);
      setIsSaved(true);
      toast({
        title: "Skill saved for later",
        description: `${skill.name} has been added to your saved skills`,
      });
    }
  };

  const handleExploreCourses = () => {
    toast({
      title: "Exploring courses",
      description: `Showing courses for ${skill.name}`,
    });
  };

  // Get badge color based on badge label
  const getBadgeColor = (badge: string) => {
    switch (badge.toLowerCase()) {
      case 'high demand':
        return "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200";
      case 'trending':
        return "bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200";
      case 'essential':
        return "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200";
      case 'valuable':
        return "bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200";
      case 'in demand':
        return "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200";
      default:
        return "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200";
    }
  };

  return (
    <Card className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition">
      <CardContent className="p-0">
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-semibold">{skill.name}</h4>
          <Badge className={getBadgeColor(skill.badge)}>
            {skill.badge}
          </Badge>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{skill.description}</p>
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-3">
          <Zap className="w-4 h-4 mr-1 text-yellow-500" />
          <span>{skill.advantage}</span>
        </div>
        <div className="mt-3 flex space-x-2">
          <Button 
            variant="default" 
            className="flex-1 bg-[#0A66C2] hover:bg-blue-700 text-white text-sm"
            onClick={handleExploreCourses}
          >
            Explore Courses
          </Button>
          <Button 
            variant="outline" 
            size="icon" 
            className="border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm"
            onClick={handleSave}
          >
            <Bookmark className={`h-4 w-4 ${isSaved ? "fill-current" : ""}`} />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
