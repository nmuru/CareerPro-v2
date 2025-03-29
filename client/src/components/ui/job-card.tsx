import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bookmark, X, Clock, Users } from 'lucide-react';
import { Job } from "@/types";
import { useSavedItems } from '@/hooks/useSavedItems';
import { useToast } from '@/hooks/use-toast';

interface JobCardProps {
  job: Job;
}

export default function JobCard({ job }: JobCardProps) {
  const { saveItem, isItemSaved, removeSavedItem } = useSavedItems();
  const [isSaved, setIsSaved] = useState(() => isItemSaved('job', job.id));
  const [isIgnored, setIsIgnored] = useState(false);
  const { toast } = useToast();

  if (isIgnored) {
    return null;
  }

  const handleSave = async () => {
    if (isSaved) {
      await removeSavedItem('job', job.id);
      setIsSaved(false);
      toast({
        title: "Removed from saved jobs",
        description: `${job.title} at ${job.company} has been removed from your saved jobs`,
      });
    } else {
      await saveItem('job', job.id, job);
      setIsSaved(true);
      toast({
        title: "Job saved for later",
        description: `${job.title} at ${job.company} has been added to your saved jobs`,
      });
    }
  };

  const handleIgnore = () => {
    setIsIgnored(true);
    toast({
      title: "Job ignored",
      description: `${job.title} at ${job.company} has been removed from your recommendations`,
    });
  };

  const handleApply = () => {
    toast({
      title: "Application initiated",
      description: `You've started the application process for ${job.title} at ${job.company}`,
    });
  };

  // Calculate badge color based on match percentage
  const getBadgeColor = (percentage: string) => {
    const value = parseInt(percentage);
    if (value >= 90) return "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200";
    if (value >= 80) return "bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200";
    if (value >= 70) return "bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200";
    return "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200";
  };

  return (
    <Card className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition">
      <CardContent className="p-0">
        <div className="flex items-start">
          <div className="w-12 h-12 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded p-2 mr-4 flex-shrink-0">
            {job.logoUrl ? (
              <img 
                src={job.logoUrl} 
                alt={`${job.company} logo`} 
                className="w-full h-full object-contain"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-700">
                <span className="text-gray-500 dark:text-gray-400 font-bold">
                  {job.company.charAt(0)}
                </span>
              </div>
            )}
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-lg">{job.title}</h4>
            <p className="text-[#0A66C2]">{job.company}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">{job.location}</p>
            <div className="flex items-center mt-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="flex items-center mr-4">
                <Clock className="w-4 h-4 mr-1" />
                {job.timePosted}
              </span>
              <span className="flex items-center">
                <Users className="w-4 h-4 mr-1" />
                {job.applicants} applicants
              </span>
            </div>
          </div>
          <div className="ml-4 flex flex-col space-y-2">
            <span className="text-sm font-medium text-gray-800 dark:text-gray-200">{job.salaryRange}</span>
            <Badge className={getBadgeColor(job.matchPercentage)}>
              {job.matchPercentage}% match
            </Badge>
          </div>
        </div>
        <div className="mt-4 flex space-x-2">
          <Button 
            variant="default" 
            className="flex-1 bg-[#0A66C2] hover:bg-blue-700 text-white text-sm"
            onClick={handleApply}
          >
            Apply Now
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
