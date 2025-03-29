import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { 
  X, 
  Plus, 
  ChevronRight, 
  ChevronLeft, 
  Sparkles, 
  BookMarked, 
  BrainCircuit, 
  Briefcase, 
  Lightbulb, 
  CheckCircle2, 
  Loader2
} from "lucide-react";
import { useLinkedInProfile } from "@/hooks/useLinkedInProfile";
import { useInterests } from "@/hooks/useInterests";
import { useInterestSuggestions } from "@/hooks/useRecommendations";
import { Topic, Skill } from "@/types";
import { useToast } from "@/hooks/use-toast";
import InterestCheckbox from "@/components/ui/interest-checkbox";

interface InterestsTabProps {
  onBack: () => void;
  onNext: () => void;
}

// Animated section title component
const SectionTitle = ({ 
  icon: Icon, 
  title, 
  description 
}: { 
  icon: React.ElementType; 
  title: string; 
  description?: string;
}) => (
  <div className="mb-6">
    <div className="flex items-center gap-2 mb-2">
      <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg">
        <Icon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
      </div>
      <h3 className="text-xl font-bold">{title}</h3>
    </div>
    {description && (
      <p className="text-gray-600 dark:text-gray-400 pl-9">{description}</p>
    )}
  </div>
);

// Enhanced interest checkbox with animation
const EnhancedInterestCheckbox = ({ 
  id, 
  label, 
  checked, 
  onChange,
  isPopular = false,
  trending = false,
  index = 0
}: { 
  id: string; 
  label: string; 
  checked: boolean; 
  onChange: (checked: boolean) => void;
  isPopular?: boolean;
  trending?: boolean;
  index?: number;
}) => {
  return (
    <div 
      className={`relative group bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-3 transition-all duration-300 hover:shadow-md ${
        checked ? "border-blue-500 dark:border-blue-500 bg-blue-50 dark:bg-blue-900/10" : ""
      } animate-fade-in`}
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <InterestCheckbox
        id={id}
        label={label}
        checked={checked}
        onChange={onChange}
      />
      
      <div className="absolute right-3 top-3 flex space-x-1">
        {isPopular && (
          <Badge variant="outline" className="text-xs bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800">
            Popular
          </Badge>
        )}
        {trending && (
          <Badge variant="outline" className="text-xs bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 border-purple-200 dark:border-purple-800">
            Trending
          </Badge>
        )}
      </div>
    </div>
  );
};

export default function InterestsTab({ onBack, onNext }: InterestsTabProps) {
  const { profile } = useLinkedInProfile();
  const { suggestions, isLoading: isLoadingSuggestions } = useInterestSuggestions();
  const { interests, saveInterests, isLoading: isSavingInterests } = useInterests();
  
  const [topics, setTopics] = useState<Topic[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [customInterest, setCustomInterest] = useState("");
  const [customInterests, setCustomInterests] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<"topics" | "skills">("topics");
  const [selectedCount, setSelectedCount] = useState({ topics: 0, skills: 0 });
  const { toast } = useToast();

  // Initialize topics and skills from suggestions
  useEffect(() => {
    if (suggestions.suggestedTopics.length > 0) {
      setTopics(suggestions.suggestedTopics);
    }
    
    if (suggestions.suggestedSkills.length > 0) {
      setSkills(suggestions.suggestedSkills);
    }
  }, [suggestions]);

  // Set topics and skills from existing interests if available
  useEffect(() => {
    if (interests?.topics?.length > 0) {
      // Map existing interests to selected topics
      const updatedTopics = topics.map(topic => ({
        ...topic,
        selected: interests.topics.includes(topic.name)
      }));
      setTopics(updatedTopics);
      
      // Add custom interests that weren't in the suggestions
      const customFromSaved = interests.topics.filter(
        topic => !topics.some(t => t.name === topic)
      );
      setCustomInterests(customFromSaved);
    }
    
    if (interests?.skills?.length > 0) {
      // Map existing interests to selected skills
      const updatedSkills = skills.map(skill => ({
        ...skill,
        selected: interests.skills.includes(skill.name)
      }));
      setSkills(updatedSkills);
    }
  }, [interests, topics, skills]);

  // Update selected count whenever topics or skills change
  useEffect(() => {
    setSelectedCount({
      topics: topics.filter(t => t.selected).length + customInterests.length,
      skills: skills.filter(s => s.selected).length
    });
  }, [topics, skills, customInterests]);

  const handleTopicChange = (id: string, checked: boolean) => {
    setTopics(
      topics.map(topic => {
        if (topic.id === id) {
          return { ...topic, selected: checked };
        }
        return topic;
      })
    );
  };

  const handleSkillChange = (id: string, checked: boolean) => {
    setSkills(
      skills.map(skill => {
        if (skill.id === id) {
          return { ...skill, selected: checked };
        }
        return skill;
      })
    );
  };

  const addCustomInterest = () => {
    if (!customInterest.trim()) return;
    
    if (customInterests.includes(customInterest.trim())) {
      toast({
        title: "Interest already exists",
        description: "This interest has already been added",
        variant: "destructive",
      });
      return;
    }
    
    setCustomInterests([...customInterests, customInterest.trim()]);
    toast({
      title: "Interest added",
      description: `"${customInterest.trim()}" has been added to your interests`,
      variant: "default",
    });
    setCustomInterest("");
  };

  const removeCustomInterest = (interest: string) => {
    setCustomInterests(customInterests.filter(i => i !== interest));
  };

  const handleSaveAndContinue = async () => {
    const selectedTopics = [
      ...topics.filter(topic => topic.selected).map(topic => topic.name),
      ...customInterests
    ];
    
    const selectedSkills = skills
      .filter(skill => skill.selected)
      .map(skill => skill.name);
    
    await saveInterests({
      topics: selectedTopics,
      skills: selectedSkills
    });
    
    onNext();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addCustomInterest();
    }
  };
  
  // Mark popular and trending items (for UI enhancement)
  const getPopularStatus = (id: string) => {
    // Simulating popular interests for the demo
    const popularIds = ["topic1", "topic3", "skill1", "skill3"];
    return popularIds.includes(id);
  };
  
  const getTrendingStatus = (id: string) => {
    // Simulating trending interests for the demo
    const trendingIds = ["topic2", "skill2", "skill4"];
    return trendingIds.includes(id);
  };

  if (isLoadingSuggestions) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4">
        <div className="w-full max-w-xl bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 text-center">
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 border-4 border-blue-100 dark:border-blue-900/30 rounded-full"></div>
            </div>
            <Loader2 className="w-16 h-16 text-blue-600 dark:text-blue-400 animate-spin relative" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Analyzing Your Profile</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            We're finding the perfect interest areas based on your professional background
          </p>
          <div className="w-full bg-gray-100 dark:bg-gray-700 h-2 rounded-full overflow-hidden mb-2">
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-full animate-pulse-gradient" style={{ width: '60%' }}></div>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">This may take a few moments</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-12">
      {/* Header with step indicator */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-6">
        <div className="flex items-center mb-6">
          <div className="bg-blue-100 dark:bg-blue-900/30 w-10 h-10 rounded-full flex items-center justify-center mr-4">
            <span className="text-blue-600 dark:text-blue-400 font-bold">2</span>
          </div>
          <div>
            <h1 className="text-2xl font-bold">Discover Your Career Interests</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Select the topics and skills that align with your professional goals
            </p>
          </div>
        </div>
        
        {/* Progress bar */}
        <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 h-full rounded-full" style={{ width: '50%' }}></div>
        </div>
      </div>
      
      {/* Main content card */}
      <Card className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
        {/* Card header with gradient accent */}
        <div className="h-2 bg-gradient-to-r from-blue-500 to-indigo-600"></div>
        
        <CardContent className="p-6">
          {/* Tab navigation */}
          <div className="flex border-b border-gray-200 dark:border-gray-700 mb-6">
            <button
              className={`px-4 py-3 font-medium border-b-2 transition-colors ${
                activeTab === "topics"
                  ? "border-blue-500 text-blue-600 dark:text-blue-400"
                  : "border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              }`}
              onClick={() => setActiveTab("topics")}
            >
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                <span>Interest Areas</span>
                <Badge variant="outline" className="ml-1 bg-blue-50 dark:bg-blue-900/10">
                  {selectedCount.topics}
                </Badge>
              </div>
            </button>
            <button
              className={`px-4 py-3 font-medium border-b-2 transition-colors ${
                activeTab === "skills"
                  ? "border-blue-500 text-blue-600 dark:text-blue-400"
                  : "border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              }`}
              onClick={() => setActiveTab("skills")}
            >
              <div className="flex items-center gap-2">
                <BrainCircuit className="w-4 h-4" />
                <span>Skills</span>
                <Badge variant="outline" className="ml-1 bg-blue-50 dark:bg-blue-900/10">
                  {selectedCount.skills}
                </Badge>
              </div>
            </button>
          </div>
          
          {/* Topics Tab */}
          {activeTab === "topics" && (
            <>
              <SectionTitle 
                icon={Sparkles} 
                title="Interest Areas" 
                description="Select professional domains you'd like to explore and grow in"
              />
              
              {/* Suggested Topics */}
              <div className="mb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {topics.map((topic, index) => (
                    <EnhancedInterestCheckbox
                      key={topic.id}
                      id={topic.id}
                      label={topic.name}
                      checked={topic.selected}
                      onChange={(checked) => handleTopicChange(topic.id, checked)}
                      isPopular={getPopularStatus(topic.id)}
                      trending={getTrendingStatus(topic.id)}
                      index={index}
                    />
                  ))}
                </div>
              </div>
              
              {/* Custom Interests */}
              <div className="bg-gray-50 dark:bg-gray-900/30 rounded-xl p-6 mb-6">
                <SectionTitle 
                  icon={Plus} 
                  title="Add Custom Interests" 
                  description="Add any other professional interests not listed above"
                />
                
                <div className="flex items-center">
                  <Input
                    type="text"
                    placeholder="Enter a professional interest (e.g., Blockchain, UX Research)..."
                    value={customInterest}
                    onChange={(e) => setCustomInterest(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="flex-1 border border-gray-300 dark:border-gray-600 rounded-l-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800"
                  />
                  <Button 
                    onClick={addCustomInterest}
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-4 py-2 rounded-r-md transition-all"
                  >
                    <span className="sr-only md:not-sr-only md:inline-block">Add</span>
                    <span className="md:hidden">
                      <Plus className="h-5 w-5" />
                    </span>
                  </Button>
                </div>
                
                {/* Custom tags display */}
                {customInterests.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {customInterests.map((interest, index) => (
                      <div 
                        key={index} 
                        className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full px-3 py-1 text-sm flex items-center animate-fade-in"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        {interest}
                        <button 
                          className="ml-2 focus:outline-none hover:bg-white/20 rounded-full p-1 transition-colors" 
                          onClick={() => removeCustomInterest(interest)}
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
          
          {/* Skills Tab */}
          {activeTab === "skills" && (
            <>
              <SectionTitle 
                icon={BrainCircuit} 
                title="Professional Skills" 
                description="Select skills you want to develop or showcase in your career"
              />
              
              {/* Skills Selection */}
              <div className="mb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {skills.map((skill, index) => (
                    <EnhancedInterestCheckbox
                      key={skill.id}
                      id={skill.id}
                      label={skill.name}
                      checked={skill.selected}
                      onChange={(checked) => handleSkillChange(skill.id, checked)}
                      isPopular={getPopularStatus(skill.id)}
                      trending={getTrendingStatus(skill.id)}
                      index={index}
                    />
                  ))}
                </div>
              </div>
              
              {/* Skill Development Tips */}
              <div className="bg-blue-50 dark:bg-blue-900/10 rounded-xl p-6 border border-blue-100 dark:border-blue-800/30">
                <div className="flex items-start">
                  <div className="bg-blue-100 dark:bg-blue-800/50 p-2 rounded-lg mr-4">
                    <Lightbulb className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h4 className="font-bold text-blue-800 dark:text-blue-300 mb-1">Pro Tip</h4>
                    <p className="text-blue-700 dark:text-blue-400 text-sm">
                      Select 3-5 key skills to focus on developing. Our AI will recommend resources and 
                      courses to help you master these skills and stand out in your industry.
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}
          
          {/* Navigation buttons */}
          <div className="flex justify-between mt-8">
            <Button 
              variant="outline"
              onClick={onBack}
              className="border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 font-medium flex items-center gap-1"
            >
              <ChevronLeft className="w-4 h-4" />
              Back to Profile
            </Button>
            <Button 
              onClick={handleSaveAndContinue}
              disabled={isSavingInterests}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium px-6 py-2 flex items-center gap-1 group"
            >
              {isSavingInterests ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  Saving...
                </>
              ) : (
                <>
                  <span>Continue to Networking</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
      
      {/* Animation styles */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes pulse-gradient {
          0%, 100% { width: 60%; }
          50% { width: 65%; }
        }
        
        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
          opacity: 0;
        }
        
        .animate-pulse-gradient {
          animation: pulse-gradient 2s ease-in-out infinite;
        }
      `}} />
    </div>
  );
}
