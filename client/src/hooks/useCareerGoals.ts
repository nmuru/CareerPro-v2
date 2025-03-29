import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { CareerGoals } from '@/types';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';

export function useCareerGoals() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  // Fetch career goals data
  const { 
    data: careerGoals, 
    isLoading: isLoadingGoals,
    error: goalsError
  } = useQuery<CareerGoals>({
    queryKey: ['/api/career-goals'],
    staleTime: Infinity,
  });

  // Save career goals mutation
  const goalsMutation = useMutation({
    mutationFn: async (goalsData: Partial<CareerGoals>) => {
      const response = await apiRequest('POST', '/api/career-goals', goalsData);
      return response.json();
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['/api/career-goals'], data);
      toast({
        title: "Career goals updated",
        description: "Your career goals have been saved successfully",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error saving career goals",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Handle saving career goals
  const saveCareerGoals = async (goalsData: Partial<CareerGoals>) => {
    await goalsMutation.mutateAsync(goalsData);
  };

  return {
    careerGoals,
    isLoading: isLoadingGoals || goalsMutation.isPending,
    error: goalsError,
    saveCareerGoals,
  };
}
