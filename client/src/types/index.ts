// Profile Types
export interface LinkedInProfile {
  id?: number;
  name: string;
  headline?: string;
  location?: string;
  industry?: string;
  currentJobTitle?: string;
  currentCompany?: string;
  summary?: string;
  experience: Array<{
    title: string;
    company: string;
    duration: string;
  }>;
  education: Array<{
    institution: string;
    degree: string;
    years: string;
  }>;
  skills: string[];
  certifications?: string[];
  avatarUrl?: string;
}

// Interest Types
export interface Topic {
  id: string;
  name: string;
  selected: boolean;
}

export interface Skill {
  id: string;
  name: string;
  selected: boolean;
}

export interface InterestSuggestions {
  suggestedTopics: Topic[];
  suggestedSkills: Skill[];
}

export interface UserInterests {
  topics: string[];
  skills: string[];
}

// Networking Types
export interface Person {
  id: string;
  name: string;
  position: string;
  connection: string;
  imageUrl: string;
}

export interface Post {
  id: string;
  author: string;
  position: string;
  timePosted: string;
  content: string;
  reactions: string;
  comments: string;
  authorImage: string;
}

export interface NetworkingRecommendations {
  peopleToFollow: Person[];
  peopleToConnect: Person[];
  trendingPosts: Post[];
}

// Job Types
export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  timePosted: string;
  applicants: string;
  salaryRange: string;
  matchPercentage: string;
  logoUrl: string;
}

export interface Course {
  id: string;
  title: string;
  provider: string;
  rating: number;
  reviewCount: string;
  imageUrl: string;
}

export interface SkillToLearn {
  id: string;
  name: string;
  badge: string;
  description: string;
  advantage: string;
}

export interface JobRecommendations {
  jobOpenings: Job[];
  recommendedCourses: Course[];
  skillsToDevelop: SkillToLearn[];
}

export interface CareerGoals {
  id?: number;
  desiredRole: string;
  industry: string;
  location: string;
  salaryRange: string;
}

// Saved Item Types
export interface SavedItem {
  id: number;
  userId: number;
  itemType: 'person' | 'job' | 'course' | 'post' | 'skill';
  itemId: string;
  itemData: any;
  createdAt?: Date;
}

// Common Types
export type TabType = 'home' | 'interests' | 'networking' | 'jobs';
