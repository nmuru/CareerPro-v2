import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { UserInterests } from '@/types';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';

export function useInterests() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  // Fetch interests data
  const { 
    data: interests, 
    isLoading: isLoadingInterests,
    error: interestsError
  } = useQuery<UserInterests>({
    queryKey: ['/api/interests'],
    staleTime: Infinity,
  });

  // Save interests mutation
  const interestsMutation = useMutation({
    mutationFn: async (interestsData: { topics: string[], skills: string[] }) => {
      const response = await apiRequest('POST', '/api/interests', interestsData);
      return response.json();
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['/api/interests'], data);
      toast({
        title: "Interests saved",
        description: "Your career interests have been updated successfully",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error saving interests",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Handle saving interests
  const saveInterests = async (interestsData: { topics: string[], skills: string[] }) => {
    await interestsMutation.mutateAsync(interestsData);
  };

  return {
    interests: interests || { topics: [], skills: [] },
    isLoading: isLoadingInterests || interestsMutation.isPending,
    error: interestsError,
    saveInterests,
  };
}
