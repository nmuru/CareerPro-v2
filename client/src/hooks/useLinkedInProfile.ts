import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { LinkedInProfile } from '@/types';
import { apiRequest } from '@/lib/queryClient';
import { parsePDF } from '@/lib/pdf-parser';
import { useToast } from '@/hooks/use-toast';

export function useLinkedInProfile() {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const queryClient = useQueryClient();
  const { toast } = useToast();

  // Fetch profile data
  const { 
    data: profile, 
    isLoading: isLoadingProfile,
    error: profileError,
  } = useQuery({
    queryKey: ['/api/profile'],
    staleTime: Infinity,
  });

  // Process uploaded PDF
  const uploadMutation = useMutation({
    mutationFn: async (file: File) => {
      setIsProcessing(true);
      try {
        return await parsePDF(file);
      } finally {
        setIsProcessing(false);
      }
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['/api/profile'], data);
      toast({
        title: "Profile uploaded successfully",
        description: "Your LinkedIn profile has been processed successfully",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error processing PDF",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Update profile
  const updateMutation = useMutation({
    mutationFn: async (updatedProfile: Partial<LinkedInProfile>) => {
      const response = await apiRequest('PUT', '/api/profile', updatedProfile);
      return response.json();
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['/api/profile'], data);
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error updating profile",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Handle file upload
  const handleFileUpload = (file: File) => {
    setFile(file);
    uploadMutation.mutate(file);
  };

  // Update profile
  const updateProfile = (updatedProfile: Partial<LinkedInProfile>) => {
    updateMutation.mutate(updatedProfile);
  };

  return {
    profile,
    file,
    isLoading: isLoadingProfile || isProcessing,
    isProcessing,
    error: profileError,
    handleFileUpload,
    updateProfile,
  };
}
