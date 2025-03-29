import { useQuery } from '@tanstack/react-query';
import { NetworkingRecommendations, JobRecommendations, InterestSuggestions } from '@/types';

export function useNetworkingRecommendations() {
  const { 
    data, 
    isLoading, 
    error,
    refetch
  } = useQuery<NetworkingRecommendations>({
    queryKey: ['/api/recommendations/networking'],
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
  
  return {
    recommendations: data ?? {
      peopleToFollow: [],
      peopleToConnect: [],
      trendingPosts: []
    },
    isLoading,
    error,
    refreshRecommendations: refetch
  };
}

export function useJobRecommendations() {
  const { 
    data, 
    isLoading, 
    error,
    refetch
  } = useQuery<JobRecommendations>({
    queryKey: ['/api/recommendations/jobs'],
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
  
  return {
    recommendations: data ?? {
      jobOpenings: [],
      recommendedCourses: [],
      skillsToDevelop: []
    },
    isLoading,
    error,
    refreshRecommendations: refetch
  };
}

export function useInterestSuggestions() {
  const { 
    data, 
    isLoading, 
    error
  } = useQuery<InterestSuggestions>({
    queryKey: ['/api/interests/suggestions'],
  });
  
  return {
    suggestions: data ?? {
      suggestedTopics: [],
      suggestedSkills: []
    },
    isLoading,
    error
  };
}
