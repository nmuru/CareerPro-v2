import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNetworkingRecommendations } from "@/hooks/useRecommendations";
import RecommendationCard from "@/components/ui/recommendation-card";
import PostCard from "@/components/ui/post-card";
import RefreshButton from "@/components/ui/refresh-button";
import ShowMoreButton from "@/components/ui/show-more-button";
import { Person } from "@/types";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

interface NetworkingTabProps {
  onBack: () => void;
  onNext: () => void;
}

export default function NetworkingTab({ onBack, onNext }: NetworkingTabProps) {
  const { 
    recommendations, 
    isLoading,
    refreshRecommendations
  } = useNetworkingRecommendations();
  
  const [visibleFollowCount, setVisibleFollowCount] = useState(3);
  const [visibleConnectCount, setVisibleConnectCount] = useState(3);
  const [visiblePostCount, setVisiblePostCount] = useState(2);
  
  const { toast } = useToast();

  const handleFollow = (person: Person) => {
    toast({
      title: "Following",
      description: `You are now following ${person.name}`,
    });
  };

  const handleConnect = (person: Person) => {
    toast({
      title: "Connection request sent",
      description: `Your connection request to ${person.name} has been sent`,
    });
  };

  const handleShowMoreFollows = () => {
    setVisibleFollowCount(prev => Math.min(prev + 3, recommendations.peopleToFollow.length));
  };

  const handleShowMoreConnects = () => {
    setVisibleConnectCount(prev => Math.min(prev + 3, recommendations.peopleToConnect.length));
  };

  const handleShowMorePosts = () => {
    setVisiblePostCount(prev => Math.min(prev + 2, recommendations.trendingPosts.length));
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <Loader2 className="w-12 h-12 text-[#0077B5] animate-spin mb-4" />
        <p className="text-lg font-medium">Loading recommendations...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Networking Recommendations</h2>
          <RefreshButton onClick={() => refreshRecommendations()} />
        </div>
        
        {/* People to Follow */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">People to Follow</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {recommendations.peopleToFollow
              .slice(0, visibleFollowCount)
              .map((person) => (
                <RecommendationCard
                  key={person.id}
                  person={person}
                  actionLabel="Follow"
                  onAction={handleFollow}
                />
              ))}
          </div>
          {visibleFollowCount < recommendations.peopleToFollow.length && (
            <ShowMoreButton onClick={handleShowMoreFollows} />
          )}
        </div>
        
        {/* People to Connect With */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">People to Connect With</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {recommendations.peopleToConnect
              .slice(0, visibleConnectCount)
              .map((person) => (
                <RecommendationCard
                  key={person.id}
                  person={person}
                  actionLabel="Connect"
                  onAction={handleConnect}
                />
              ))}
          </div>
          {visibleConnectCount < recommendations.peopleToConnect.length && (
            <ShowMoreButton onClick={handleShowMoreConnects} />
          )}
        </div>
        
        {/* Trending Posts */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Trending Posts</h3>
          <div className="space-y-4">
            {recommendations.trendingPosts
              .slice(0, visiblePostCount)
              .map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
          </div>
          {visiblePostCount < recommendations.trendingPosts.length && (
            <ShowMoreButton onClick={handleShowMorePosts} />
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
            onClick={onNext}
            className="bg-[#0A66C2] hover:bg-blue-700 text-white font-medium"
          >
            Continue to Jobs
          </Button>
        </div>
      </Card>
    </div>
  );
}
