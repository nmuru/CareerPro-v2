import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bookmark, Star, StarHalf } from 'lucide-react';
import { Course } from "@/types";
import { useSavedItems } from '@/hooks/useSavedItems';
import { useToast } from '@/hooks/use-toast';

interface CourseCardProps {
  course: Course;
}

export default function CourseCard({ course }: CourseCardProps) {
  const { saveItem, isItemSaved, removeSavedItem } = useSavedItems();
  const [isSaved, setIsSaved] = useState(() => isItemSaved('course', course.id));
  const { toast } = useToast();

  const handleSave = async () => {
    if (isSaved) {
      await removeSavedItem('course', course.id);
      setIsSaved(false);
      toast({
        title: "Removed from saved courses",
        description: `${course.title} has been removed from your saved courses`,
      });
    } else {
      await saveItem('course', course.id, course);
      setIsSaved(true);
      toast({
        title: "Course saved for later",
        description: `${course.title} has been added to your saved courses`,
      });
    }
  };

  const handleEnroll = () => {
    toast({
      title: "Enrollment initiated",
      description: `You're being redirected to enroll in ${course.title}`,
    });
  };

  // Render star rating
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`star-${i}`} className="w-4 h-4 fill-current text-yellow-400" />);
    }
    
    if (hasHalfStar) {
      stars.push(<StarHalf key="half-star" className="w-4 h-4 fill-current text-yellow-400" />);
    }
    
    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="w-4 h-4 text-yellow-400" />);
    }
    
    return stars;
  };

  return (
    <Card className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden hover:shadow-md transition">
      <div className="h-32 bg-gray-200 dark:bg-gray-700 relative">
        {course.imageUrl ? (
          <img 
            src={course.imageUrl} 
            alt={course.title} 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-r from-blue-400 to-purple-500">
            <span className="text-white font-bold text-lg">{course.provider}</span>
          </div>
        )}
      </div>
      <CardContent className="p-4">
        <h4 className="font-semibold line-clamp-2">{course.title}</h4>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{course.provider}</p>
        <div className="flex items-center mt-2">
          <div className="flex">
            {renderStars(course.rating)}
          </div>
          <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">({course.reviewCount})</span>
        </div>
        <div className="mt-3 flex space-x-2">
          <Button 
            variant="default" 
            className="flex-1 bg-[#0A66C2] hover:bg-blue-700 text-white text-sm"
            onClick={handleEnroll}
          >
            Enroll
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
