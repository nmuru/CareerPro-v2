import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import FileUploader from '@/components/ui/file-uploader';
import ProfileCard from '@/components/ui/profile-card';
import { useLinkedInProfile } from '@/hooks/useLinkedInProfile';
import { Loader2, ChevronRight, BarChart3, Network, BriefcaseBusiness, LightbulbIcon, UserCircle2, CheckCircle2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface HomeTabProps {
  onProceed: () => void;
}

// Animated gradient text component
const GradientText = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
  <span className={`bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 animate-gradient ${className}`}>
    {children}
  </span>
);

// Progress step component
const ProgressStep = ({ 
  step, 
  title, 
  description, 
  isActive, 
  isComplete 
}: { 
  step: number; 
  title: string; 
  description: string; 
  isActive: boolean; 
  isComplete: boolean;
}) => (
  <div className={`flex items-start space-x-3 ${isActive ? 'opacity-100' : 'opacity-70'}`}>
    <div className={`flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full ${
      isComplete ? 'bg-green-100 text-green-600' : 
      isActive ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-400'
    }`}>
      {isComplete ? <CheckCircle2 className="w-6 h-6" /> : <span className="font-bold">{step}</span>}
    </div>
    <div>
      <h3 className={`font-medium ${isActive ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}>
        {title}
      </h3>
      <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
    </div>
  </div>
);

// Feature card component
const FeatureCard = ({ 
  icon: Icon, 
  title, 
  description,
  highlight
}: { 
  icon: React.ElementType; 
  title: string; 
  description: string;
  highlight: string;
}) => (
  <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 group">
    <CardContent className="p-6">
      <div className="flex items-center space-x-3 mb-3">
        <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg group-hover:bg-blue-200 dark:group-hover:bg-blue-800/40 transition-colors">
          <Icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
        </div>
        <h3 className="font-semibold">{title}</h3>
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-300">{description}</p>
      <Badge variant="outline" className="mt-3 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400">
        {highlight}
      </Badge>
    </CardContent>
  </Card>
);

// Testimonial component
const Testimonial = ({ quote, author, position }: { quote: string; author: string; position: string }) => (
  <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-100 dark:border-gray-700">
    <p className="text-sm text-gray-600 dark:text-gray-300 italic mb-4">"{quote}"</p>
    <div className="flex items-center">
      <div className="bg-gray-200 dark:bg-gray-700 rounded-full w-8 h-8 flex items-center justify-center mr-2">
        <UserCircle2 className="w-6 h-6 text-gray-500 dark:text-gray-400" />
      </div>
      <div>
        <p className="text-sm font-medium">{author}</p>
        <p className="text-xs text-gray-500 dark:text-gray-400">{position}</p>
      </div>
    </div>
  </div>
);

export default function HomeTab({ onProceed }: HomeTabProps) {
  const { 
    profile, 
    isLoading, 
    handleFileUpload,
    updateProfile
  } = useLinkedInProfile();
  
  const [showEditForm, setShowEditForm] = useState(false);
  const [animationPlayed, setAnimationPlayed] = useState(false);
  
  useEffect(() => {
    // Set animation played after initial render
    if (!animationPlayed) {
      setAnimationPlayed(true);
    }
  }, [animationPlayed]);
  
  const handleEditProfile = () => {
    setShowEditForm(true);
  };
  
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4">
        <div className="w-full max-w-xl bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 text-center">
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 border-4 border-blue-100 dark:border-blue-900/30 rounded-full"></div>
            </div>
            <Loader2 className="w-16 h-16 text-blue-600 dark:text-blue-400 animate-spin relative" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Analyzing Your Professional Profile</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Our AI is processing your LinkedIn data to provide personalized recommendations
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
    <div className="space-y-8 pb-12">
      {/* Hero Section */}
      <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-50 via-indigo-50 to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-8 ${animationPlayed ? 'slide-in-from-left-animation' : ''}`}>
        <div className="relative z-10">
          <h1 className="text-4xl font-bold mb-3">
            Welcome to <GradientText>NetworkPro</GradientText>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-xl mb-6">
            Elevate your career with AI-powered networking insights, personalized job matches, and skills development recommendations.
          </p>
          
          {/* Features summary */}
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex items-center space-x-2 text-sm font-medium">
              <Network className="w-4 h-4 text-blue-500" />
              <span>Smart Networking</span>
            </div>
            <div className="flex items-center space-x-2 text-sm font-medium">
              <BriefcaseBusiness className="w-4 h-4 text-blue-500" />
              <span>Job Matching</span>
            </div>
            <div className="flex items-center space-x-2 text-sm font-medium">
              <LightbulbIcon className="w-4 h-4 text-blue-500" />
              <span>Skills Growth</span>
            </div>
            <div className="flex items-center space-x-2 text-sm font-medium">
              <BarChart3 className="w-4 h-4 text-blue-500" />
              <span>Career Analytics</span>
            </div>
          </div>
        </div>
        
        {/* Background decorative elements */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-200 dark:bg-blue-900/20 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute top-1/2 -right-12 w-40 h-40 bg-indigo-300 dark:bg-indigo-900/30 rounded-full opacity-20 blur-3xl"></div>
      </div>
      
      {!profile ? (
        <>
          {/* Progress Steps */}
          <div className="mb-8 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
            <h2 className="text-xl font-semibold mb-4">Your Journey to Career Success</h2>
            <div className="space-y-6">
              <ProgressStep 
                step={1} 
                title="Upload Your LinkedIn Profile" 
                description="Share your professional experience to get personalized guidance"
                isActive={true}
                isComplete={false}
              />
              <ProgressStep 
                step={2} 
                title="Discover Your Interests" 
                description="Tell us about your career aspirations and professional interests"
                isActive={false}
                isComplete={false}
              />
              <ProgressStep 
                step={3} 
                title="Expand Your Network" 
                description="Connect with professionals who can help you grow"
                isActive={false}
                isComplete={false}
              />
              <ProgressStep 
                step={4} 
                title="Explore Opportunities" 
                description="Find jobs and skills that match your profile and goals"
                isActive={false}
                isComplete={false}
              />
            </div>
          </div>
          
          {/* Enhanced File Uploader */}
          <FileUploader onFileUpload={handleFileUpload} isLoading={isLoading} />
          
          {/* Feature highlights */}
          <div className="my-12">
            <h2 className="text-2xl font-semibold mb-6 text-center">Why Use NetworkPro?</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <FeatureCard 
                icon={Network}
                title="Smart Connection Insights"
                description="Discover professionals who can accelerate your career growth with our AI matching algorithm."
                highlight="95% match accuracy"
              />
              <FeatureCard 
                icon={BriefcaseBusiness}
                title="Personalized Job Recommendations"
                description="Find opportunities that perfectly align with your skills, experience, and career aspirations."
                highlight="2x more relevant matches"
              />
              <FeatureCard 
                icon={LightbulbIcon}
                title="Skills Development Paths"
                description="Learn what skills to develop next based on your career goals and current market trends."
                highlight="Trending skills updated weekly"
              />
            </div>
          </div>
          
          {/* Testimonials */}
          <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">What Our Users Say</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <Testimonial 
                quote="NetworkPro helped me find connections I wouldn't have discovered otherwise. I've already received two job offers!"
                author="Emma Thompson"
                position="UX Designer"
              />
              <Testimonial 
                quote="The skill recommendations were spot-on. I focused on learning exactly what I needed to land my dream job."
                author="Michael Chen"
                position="Data Scientist"
              />
            </div>
          </div>
        </>
      ) : (
        // Profile Display Section (After Upload)
        <>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 mb-8">
            <div className="flex items-center mb-4">
              <CheckCircle2 className="w-6 h-6 text-green-500 mr-2" />
              <h2 className="text-xl font-semibold">Profile Successfully Analyzed</h2>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              We've analyzed your professional background and prepared personalized recommendations for you.
              Continue to set your interests and career goals for even more tailored results.
            </p>
            
            {/* Progress Steps - Updated */}
            <div className="my-8">
              <div className="space-y-6">
                <ProgressStep 
                  step={1} 
                  title="Upload Your LinkedIn Profile" 
                  description="Profile successfully analyzed!"
                  isActive={false}
                  isComplete={true}
                />
                <ProgressStep 
                  step={2} 
                  title="Discover Your Interests" 
                  description="Tell us about your career aspirations and professional interests"
                  isActive={true}
                  isComplete={false}
                />
                <ProgressStep 
                  step={3} 
                  title="Expand Your Network" 
                  description="Connect with professionals who can help you grow"
                  isActive={false}
                  isComplete={false}
                />
                <ProgressStep 
                  step={4} 
                  title="Explore Opportunities" 
                  description="Find jobs and skills that match your profile and goals"
                  isActive={false}
                  isComplete={false}
                />
              </div>
            </div>
          </div>
          
          {/* Profile Display */}
          <ProfileCard profile={profile} onEdit={handleEditProfile} />
          
          {/* Continue Button */}
          <div className="flex justify-center mt-8">
            <Button 
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium py-4 px-8 rounded-md transition group"
              onClick={onProceed}
              size="lg"
            >
              <span>Continue to Career Interests</span>
              <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </>
      )}
      
      {/* CSS for animations */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
        
        @keyframes pulse-gradient {
          0%, 100% { width: 60%; }
          50% { width: 65%; }
        }
        
        .animate-pulse-gradient {
          animation: pulse-gradient 2s ease-in-out infinite;
        }
        
        @keyframes slide-in-from-left {
          0% { transform: translateX(-10%); opacity: 0; }
          100% { transform: translateX(0); opacity: 1; }
        }
        
        .slide-in-from-left-animation {
          animation: slide-in-from-left 0.6s ease-out forwards;
        }
      `}} />
    </div>
  );
}
