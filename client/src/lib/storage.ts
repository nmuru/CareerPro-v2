import { SavedItem } from "@/types";

// Save data to local storage
export function saveToLocalStorage<T>(key: string, data: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving to local storage:', error);
  }
}

// Get data from local storage
export function getFromLocalStorage<T>(key: string, defaultValue: T): T {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : defaultValue;
  } catch (error) {
    console.error('Error retrieving from local storage:', error);
    return defaultValue;
  }
}

// Remove data from local storage
export function removeFromLocalStorage(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error('Error removing from local storage:', error);
  }
}

// Local storage keys
export const STORAGE_KEYS = {
  PROFILE: 'networkpro-profile',
  INTERESTS: 'networkpro-interests',
  SAVED_ITEMS: 'networkpro-saved-items',
  CAREER_GOALS: 'networkpro-career-goals',
  DARK_MODE: 'networkpro-dark-mode',
};

// Save an item to the saved items storage
export function saveItem(
  itemType: string, 
  itemId: string, 
  itemData: any
): SavedItem | null {
  try {
    // Get existing saved items
    const savedItems = getFromLocalStorage<SavedItem[]>(STORAGE_KEYS.SAVED_ITEMS, []);
    
    // Create new saved item
    const savedItem: SavedItem = {
      id: Date.now(),
      userId: 1, // Fixed userId for demo
      itemType: itemType as any,
      itemId,
      itemData,
      createdAt: new Date(),
    };
    
    // Add to saved items
    savedItems.push(savedItem);
    
    // Save back to storage
    saveToLocalStorage(STORAGE_KEYS.SAVED_ITEMS, savedItems);
    
    return savedItem;
  } catch (error) {
    console.error('Error saving item:', error);
    return null;
  }
}

// Remove an item from saved items
export function removeSavedItem(itemType: string, itemId: string): boolean {
  try {
    // Get existing saved items
    const savedItems = getFromLocalStorage<SavedItem[]>(STORAGE_KEYS.SAVED_ITEMS, []);
    
    // Find item index
    const itemIndex = savedItems.findIndex(
      item => item.itemType === itemType && item.itemId === itemId
    );
    
    if (itemIndex === -1) {
      return false;
    }
    
    // Remove item
    savedItems.splice(itemIndex, 1);
    
    // Save back to storage
    saveToLocalStorage(STORAGE_KEYS.SAVED_ITEMS, savedItems);
    
    return true;
  } catch (error) {
    console.error('Error removing saved item:', error);
    return false;
  }
}

// Check if an item is saved
export function isItemSaved(itemType: string, itemId: string): boolean {
  try {
    // Get existing saved items
    const savedItems = getFromLocalStorage<SavedItem[]>(STORAGE_KEYS.SAVED_ITEMS, []);
    
    // Check if item exists
    return savedItems.some(
      item => item.itemType === itemType && item.itemId === itemId
    );
  } catch (error) {
    console.error('Error checking saved item:', error);
    return false;
  }
}

// Get all saved items
export function getSavedItems(itemType?: string): SavedItem[] {
  try {
    // Get existing saved items
    const savedItems = getFromLocalStorage<SavedItem[]>(STORAGE_KEYS.SAVED_ITEMS, []);
    
    // Filter by type if specified
    return itemType 
      ? savedItems.filter(item => item.itemType === itemType)
      : savedItems;
  } catch (error) {
    console.error('Error getting saved items:', error);
    return [];
  }
}
