import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useJobRecommendations } from "@/hooks/useRecommendations";
import JobCard from "@/components/ui/job-card";
import CourseCard from "@/components/ui/course-card";
import SkillCard from "@/components/ui/skill-card";
import RefreshButton from "@/components/ui/refresh-button";
import ShowMoreButton from "@/components/ui/show-more-button";
import { useCareerGoals } from "@/hooks/useCareerGoals";
import { Loader2 } from "lucide-react";

interface JobsTabProps {
  onBack: () => void;
  onHome: () => void;
}

export default function JobsTab({ onBack, onHome }: JobsTabProps) {
  const { 
    recommendations, 
    isLoading: isLoadingRecommendations,
    refreshRecommendations
  } = useJobRecommendations();
  
  const {
    careerGoals,
    saveCareerGoals,
    isLoading: isSavingGoals
  } = useCareerGoals();
  
  const [desiredRole, setDesiredRole] = useState(careerGoals?.desiredRole || "Product Manager");
  const [industry, setIndustry] = useState(careerGoals?.industry || "Technology");
  const [location, setLocation] = useState(careerGoals?.location || "San Francisco, CA");
  const [salaryRange, setSalaryRange] = useState(careerGoals?.salaryRange || "$120,000 - $150,000");
  
  const [visibleJobCount, setVisibleJobCount] = useState(3);
  const [visibleCourseCount, setVisibleCourseCount] = useState(3);
  const [visibleSkillCount, setVisibleSkillCount] = useState(3);

  const handleShowMoreJobs = () => {
    setVisibleJobCount(prev => Math.min(prev + 3, recommendations.jobOpenings.length));
  };

  const handleShowMoreCourses = () => {
    setVisibleCourseCount(prev => Math.min(prev + 3, recommendations.recommendedCourses.length));
  };

  const handleShowMoreSkills = () => {
    setVisibleSkillCount(prev => Math.min(prev + 3, recommendations.skillsToDevelop.length));
  };

  const handleUpdateGoals = async () => {
    await saveCareerGoals({
      desiredRole,
      industry,
      location,
      salaryRange
    });
    
    // Refresh recommendations based on updated goals
    refreshRecommendations();
  };

  if (isLoadingRecommendations) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <Loader2 className="w-12 h-12 text-[#0077B5] animate-spin mb-4" />
        <p className="text-lg font-medium">Loading job recommendations...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Job Recommendations</h2>
          <RefreshButton onClick={() => refreshRecommendations()} />
        </div>
        
        {/* Career Goals */}
        <div className="mb-8 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <h3 className="text-lg font-semibold mb-3">Your Career Goals</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Desired Role
              </Label>
              <Select value={desiredRole} onValueChange={setDesiredRole}>
                <SelectTrigger className="w-full border border-gray-300 dark:border-gray-600 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#0A66C2] dark:bg-gray-800">
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Product Manager">Product Manager</SelectItem>
                  <SelectItem value="Senior Product Manager">Senior Product Manager</SelectItem>
                  <SelectItem value="Director of Product">Director of Product</SelectItem>
                  <SelectItem value="VP of Product">VP of Product</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Industry
              </Label>
              <Select value={industry} onValueChange={setIndustry}>
                <SelectTrigger className="w-full border border-gray-300 dark:border-gray-600 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#0A66C2] dark:bg-gray-800">
                  <SelectValue placeholder="Select an industry" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Technology">Technology</SelectItem>
                  <SelectItem value="Healthcare">Healthcare</SelectItem>
                  <SelectItem value="Finance">Finance</SelectItem>
                  <SelectItem value="Education">Education</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Location
              </Label>
              <Select value={location} onValueChange={setLocation}>
                <SelectTrigger className="w-full border border-gray-300 dark:border-gray-600 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#0A66C2] dark:bg-gray-800">
                  <SelectValue placeholder="Select a location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="San Francisco, CA">San Francisco, CA</SelectItem>
                  <SelectItem value="Remote">Remote</SelectItem>
                  <SelectItem value="New York, NY">New York, NY</SelectItem>
                  <SelectItem value="Seattle, WA">Seattle, WA</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Salary Range
              </Label>
              <Select value={salaryRange} onValueChange={setSalaryRange}>
                <SelectTrigger className="w-full border border-gray-300 dark:border-gray-600 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#0A66C2] dark:bg-gray-800">
                  <SelectValue placeholder="Select a salary range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="$120,000 - $150,000">$120,000 - $150,000</SelectItem>
                  <SelectItem value="$150,000 - $180,000">$150,000 - $180,000</SelectItem>
                  <SelectItem value="$180,000 - $210,000">$180,000 - $210,000</SelectItem>
                  <SelectItem value="$210,000+">$210,000+</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button 
            onClick={handleUpdateGoals}
            disabled={isSavingGoals}
            className="mt-4 bg-[#0A66C2] hover:bg-blue-700 text-white font-medium"
          >
            {isSavingGoals ? 'Updating...' : 'Update Goals'}
          </Button>
        </div>
        
        {/* Job Openings */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Top Job Openings</h3>
          <div className="space-y-4">
            {recommendations.jobOpenings
              .slice(0, visibleJobCount)
              .map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
          </div>
          {visibleJobCount < recommendations.jobOpenings.length && (
            <ShowMoreButton onClick={handleShowMoreJobs} />
          )}
        </div>
        
        {/* Recommended Courses */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Recommended Courses</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {recommendations.recommendedCourses
              .slice(0, visibleCourseCount)
              .map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
          </div>
          {visibleCourseCount < recommendations.recommendedCourses.length && (
            <ShowMoreButton onClick={handleShowMoreCourses} />
          )}
        </div>
        
        {/* Skills to Develop */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Skills to Develop</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {recommendations.skillsToDevelop
              .slice(0, visibleSkillCount)
              .map((skill) => (
                <SkillCard key={skill.id} skill={skill} />
              ))}
          </div>
          {visibleSkillCount < recommendations.skillsToDevelop.length && (
            <ShowMoreButton onClick={handleShowMoreSkills} />
          )}
        </div>
        
        <div className="flex justify-between mt-8">
          <Button 
            variant="outline"
            onClick={onBack}
            className="border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 font-medium"
          >
            Back
          </Button>
          <Button 
            onClick={onHome}
            className="bg-[#0A66C2] hover:bg-blue-700 text-white font-medium"
          >
            Return to Home
          </Button>
        </div>
      </Card>
    </div>
  );
}
