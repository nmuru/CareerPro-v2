import { 
  users, 
  type User, 
  type InsertUser,
  profiles,
  type Profile,
  type InsertProfile,
  interests,
  type Interest,
  type InsertInterest,
  savedItems,
  type SavedItem,
  type InsertSavedItem,
  careerGoals,
  type CareerGoal,
  type InsertCareerGoal 
} from "@shared/schema";

// Interface for all storage operations
export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Profile operations
  getProfile(userId: number): Promise<Profile | undefined>;
  createProfile(profile: InsertProfile): Promise<Profile>;
  updateProfile(id: number, profile: Partial<InsertProfile>): Promise<Profile>;
  
  // Interests operations
  getInterests(userId: number): Promise<Interest | undefined>;
  createInterests(interests: InsertInterest): Promise<Interest>;
  updateInterests(id: number, interests: Partial<InsertInterest>): Promise<Interest>;
  
  // Saved items operations
  getSavedItems(userId: number, itemType?: string): Promise<SavedItem[]>;
  createSavedItem(item: InsertSavedItem): Promise<SavedItem>;
  deleteSavedItem(id: number): Promise<boolean>;
  
  // Career goals operations
  getCareerGoals(userId: number): Promise<CareerGoal | undefined>;
  createCareerGoals(goals: InsertCareerGoal): Promise<CareerGoal>;
  updateCareerGoals(id: number, goals: Partial<InsertCareerGoal>): Promise<CareerGoal>;
}

// Memory storage implementation
export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private profiles: Map<number, Profile>;
  private interestsList: Map<number, Interest>;
  private savedItemsList: Map<number, SavedItem>;
  private careerGoalsList: Map<number, CareerGoal>;
  private currentIds: {
    user: number;
    profile: number;
    interest: number;
    savedItem: number;
    careerGoal: number;
  };

  constructor() {
    this.users = new Map();
    this.profiles = new Map();
    this.interestsList = new Map();
    this.savedItemsList = new Map();
    this.careerGoalsList = new Map();
    this.currentIds = {
      user: 1,
      profile: 1,
      interest: 1,
      savedItem: 1,
      careerGoal: 1
    };
    
    // Create initial demo user
    this.createUser({ username: "demo", password: "password" });
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentIds.user++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Profile methods
  async getProfile(userId: number): Promise<Profile | undefined> {
    return Array.from(this.profiles.values()).find(
      (profile) => profile.userId === userId,
    );
  }

  async createProfile(insertProfile: InsertProfile): Promise<Profile> {
    const id = this.currentIds.profile++;
    const now = new Date();
    const profile: Profile = { 
      ...insertProfile, 
      id, 
      createdAt: now
    };
    this.profiles.set(id, profile);
    return profile;
  }

  async updateProfile(id: number, updateData: Partial<InsertProfile>): Promise<Profile> {
    const profile = this.profiles.get(id);
    if (!profile) {
      throw new Error(`Profile with id ${id} not found`);
    }
    
    const updatedProfile: Profile = { ...profile, ...updateData };
    this.profiles.set(id, updatedProfile);
    return updatedProfile;
  }

  // Interests methods
  async getInterests(userId: number): Promise<Interest | undefined> {
    return Array.from(this.interestsList.values()).find(
      (interest) => interest.userId === userId,
    );
  }

  async createInterests(insertInterests: InsertInterest): Promise<Interest> {
    const id = this.currentIds.interest++;
    const now = new Date();
    const interest: Interest = { 
      ...insertInterests, 
      id, 
      createdAt: now
    };
    this.interestsList.set(id, interest);
    return interest;
  }

  async updateInterests(id: number, updateData: Partial<InsertInterest>): Promise<Interest> {
    const interest = this.interestsList.get(id);
    if (!interest) {
      throw new Error(`Interest with id ${id} not found`);
    }
    
    const updatedInterest: Interest = { ...interest, ...updateData };
    this.interestsList.set(id, updatedInterest);
    return updatedInterest;
  }

  // Saved items methods
  async getSavedItems(userId: number, itemType?: string): Promise<SavedItem[]> {
    return Array.from(this.savedItemsList.values()).filter(
      (item) => item.userId === userId && (!itemType || item.itemType === itemType),
    );
  }

  async createSavedItem(insertItem: InsertSavedItem): Promise<SavedItem> {
    const id = this.currentIds.savedItem++;
    const now = new Date();
    const item: SavedItem = { 
      ...insertItem, 
      id, 
      createdAt: now
    };
    this.savedItemsList.set(id, item);
    return item;
  }

  async deleteSavedItem(id: number): Promise<boolean> {
    return this.savedItemsList.delete(id);
  }

  // Career goals methods
  async getCareerGoals(userId: number): Promise<CareerGoal | undefined> {
    return Array.from(this.careerGoalsList.values()).find(
      (goal) => goal.userId === userId,
    );
  }

  async createCareerGoals(insertGoals: InsertCareerGoal): Promise<CareerGoal> {
    const id = this.currentIds.careerGoal++;
    const now = new Date();
    const goals: CareerGoal = { 
      ...insertGoals, 
      id, 
      createdAt: now
    };
    this.careerGoalsList.set(id, goals);
    return goals;
  }

  async updateCareerGoals(id: number, updateData: Partial<InsertCareerGoal>): Promise<CareerGoal> {
    const goals = this.careerGoalsList.get(id);
    if (!goals) {
      throw new Error(`Career goals with id ${id} not found`);
    }
    
    const updatedGoals: CareerGoal = { ...goals, ...updateData };
    this.careerGoalsList.set(id, updatedGoals);
    return updatedGoals;
  }
}

// Export storage instance
export const storage = new MemStorage();
