import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { SavedItem } from '@/types';
import { apiRequest } from '@/lib/queryClient';

export function useSavedItems(itemType?: string) {
  const queryClient = useQueryClient();
  const queryKey = itemType ? ['/api/saved-items', { type: itemType }] : ['/api/saved-items'];
  
  // Fetch saved items
  const { 
    data: savedItems, 
    isLoading, 
    error 
  } = useQuery<SavedItem[]>({
    queryKey,
  });
  
  // Save item mutation
  const saveMutation = useMutation({
    mutationFn: async ({ itemType, itemId, itemData }: { itemType: string, itemId: string, itemData: any }) => {
      const response = await apiRequest('POST', '/api/saved-items', {
        itemType,
        itemId,
        itemData,
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/saved-items'] });
    },
  });
  
  // Remove saved item mutation
  const removeMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await apiRequest('DELETE', `/api/saved-items/${id}`);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/saved-items'] });
    },
  });
  
  // Check if an item is saved
  const isItemSaved = (type: string, id: string): boolean => {
    if (!savedItems) return false;
    return savedItems.some(item => item.itemType === type && item.itemId === id);
  };
  
  // Save an item
  const saveItem = async (type: string, id: string, data: any) => {
    return saveMutation.mutateAsync({
      itemType: type,
      itemId: id,
      itemData: data,
    });
  };
  
  // Remove a saved item
  const removeSavedItem = async (type: string, id: string) => {
    const item = savedItems?.find(item => item.itemType === type && item.itemId === id);
    if (!item) return false;
    
    await removeMutation.mutateAsync(item.id);
    return true;
  };
  
  return {
    savedItems: savedItems || [],
    isLoading,
    error,
    isItemSaved,
    saveItem,
    removeSavedItem,
    isSaving: saveMutation.isPending,
    isRemoving: removeMutation.isPending,
  };
}
