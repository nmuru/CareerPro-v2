import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import multer from 'multer';
import path from 'path';

// Set up multer for file uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== 'application/pdf') {
      return cb(new Error('Only PDF files are allowed'));
    }
    cb(null, true);
  }
});

// Mock recommendations generator functions
const generatePeopleToFollow = (keywords: string[] = []) => {
  const people = [
    {
      id: "p1",
      name: "David Chen",
      position: "Product Director at InnovateTech",
      connection: "500+ mutual connections",
      imageUrl: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
      id: "p2", 
      name: "Sarah Johnson",
      position: "VP of Product at TechSolutions",
      connection: "Shared alma mater: Stanford",
      imageUrl: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
      id: "p3",
      name: "Michael Torres",
      position: "Chief Product Officer at SaaS Global",
      connection: "Product Management expert",
      imageUrl: "https://randomuser.me/api/portraits/men/67.jpg"
    },
    {
      id: "p4",
      name: "Jennifer Wilson",
      position: "Senior UX Designer at DesignFirst",
      connection: "Mutual interest in UX Design",
      imageUrl: "https://randomuser.me/api/portraits/women/17.jpg"
    },
    {
      id: "p5",
      name: "Robert Kim",
      position: "Head of Product Innovation at TechCorp",
      connection: "Same industry",
      imageUrl: "https://randomuser.me/api/portraits/men/22.jpg"
    }
  ];
  return people;
};

const generatePeopleToConnect = () => {
  const people = [
    {
      id: "c1",
      name: "James Wilson",
      position: "Engineering Manager at TechCorp",
      connection: "Works at your company",
      imageUrl: "https://randomuser.me/api/portraits/men/52.jpg"
    },
    {
      id: "c2",
      name: "Alex Rodriguez",
      position: "Product Manager at InnoTech",
      connection: "Similar background",
      imageUrl: "https://randomuser.me/api/portraits/men/91.jpg"
    },
    {
      id: "c3",
      name: "Emily Chang",
      position: "UX Director at DesignHub",
      connection: "Relevant to your interests",
      imageUrl: "https://randomuser.me/api/portraits/women/33.jpg"
    },
    {
      id: "c4",
      name: "Thomas Wright",
      position: "Technical Lead at DataSystems",
      connection: "Alumni connection",
      imageUrl: "https://randomuser.me/api/portraits/men/41.jpg"
    },
    {
      id: "c5",
      name: "Sophia Martinez",
      position: "Growth Strategist at MarketBoost",
      connection: "Recommended by your network",
      imageUrl: "https://randomuser.me/api/portraits/women/28.jpg"
    }
  ];
  return people;
};

const generateTrendingPosts = () => {
  const posts = [
    {
      id: "post1",
      author: "Rachel Kim",
      position: "Director of Product Strategy",
      timePosted: "2d",
      content: "The future of product management is becoming increasingly data-driven. Here are 5 key metrics every PM should track to make better decisions...",
      reactions: "1,245",
      comments: "83",
      authorImage: "https://randomuser.me/api/portraits/women/56.jpg"
    },
    {
      id: "post2",
      author: "Mark Jensen",
      position: "Chief Innovation Officer",
      timePosted: "1d",
      content: "Excited to announce our new AI-powered product suite that's transforming how teams collaborate across time zones. #ProductInnovation #AITools",
      reactions: "3,872",
      comments: "256",
      authorImage: "https://randomuser.me/api/portraits/men/76.jpg"
    },
    {
      id: "post3",
      author: "Vanessa Wu",
      position: "Product Lead at TechGrowth",
      timePosted: "3d",
      content: "User research is not just about validating your ideas. It's about discovering what you don't know you don't know. #UXResearch #ProductDevelopment",
      reactions: "928",
      comments: "71",
      authorImage: "https://randomuser.me/api/portraits/women/60.jpg"
    },
    {
      id: "post4",
      author: "Jason Mitchell",
      position: "VP Engineering at CloudScale",
      timePosted: "5h",
      content: "Just published: '5 Microservices Patterns That Scale'. Link in comments. Would love your feedback! #Engineering #Microservices",
      reactions: "562",
      comments: "47",
      authorImage: "https://randomuser.me/api/portraits/men/82.jpg"
    },
    {
      id: "post5",
      author: "Priya Sharma",
      position: "Data Science Manager",
      timePosted: "1d",
      content: "The gap between data science and product is closing. Here's how we're embedding ML capabilities directly into our product development lifecycle...",
      reactions: "1,105",
      comments: "93",
      authorImage: "https://randomuser.me/api/portraits/women/74.jpg"
    }
  ];
  return posts;
};

const generateJobOpenings = () => {
  const jobs = [
    {
      id: "job1",
      title: "Senior Product Manager",
      company: "Google",
      location: "Mountain View, CA (Hybrid)",
      timePosted: "2 days ago",
      applicants: "78",
      salaryRange: "$140K - $180K",
      matchPercentage: "95",
      logoUrl: "https://logo.clearbit.com/google.com"
    },
    {
      id: "job2",
      title: "Product Manager, AI Solutions",
      company: "Salesforce",
      location: "San Francisco, CA (On-site)",
      timePosted: "5 days ago",
      applicants: "125",
      salaryRange: "$130K - $160K",
      matchPercentage: "88",
      logoUrl: "https://logo.clearbit.com/salesforce.com"
    },
    {
      id: "job3",
      title: "Senior Product Manager, Growth",
      company: "Airbnb",
      location: "Remote (US)",
      timePosted: "1 day ago",
      applicants: "43",
      salaryRange: "$150K - $190K",
      matchPercentage: "92",
      logoUrl: "https://logo.clearbit.com/airbnb.com"
    },
    {
      id: "job4",
      title: "Product Manager - Machine Learning",
      company: "Microsoft",
      location: "Redmond, WA (Hybrid)",
      timePosted: "3 days ago",
      applicants: "89",
      salaryRange: "$145K - $175K",
      matchPercentage: "85",
      logoUrl: "https://logo.clearbit.com/microsoft.com"
    },
    {
      id: "job5",
      title: "Director of Product Management",
      company: "Netflix",
      location: "Los Angeles, CA (Flexible)",
      timePosted: "4 days ago",
      applicants: "62",
      salaryRange: "$180K - $220K",
      matchPercentage: "80",
      logoUrl: "https://logo.clearbit.com/netflix.com"
    }
  ];
  return jobs;
};

const generateCourses = () => {
  const courses = [
    {
      id: "course1",
      title: "Advanced Product Management: Strategy to Execution",
      provider: "LinkedIn Learning",
      rating: 4.5,
      reviewCount: "1,245",
      imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?fit=crop&w=500&h=200"
    },
    {
      id: "course2",
      title: "Data-Driven Product Decisions",
      provider: "Coursera",
      rating: 4.0,
      reviewCount: "843",
      imageUrl: "https://images.unsplash.com/photo-1553877522-43269d4ea984?fit=crop&w=500&h=200"
    },
    {
      id: "course3",
      title: "AI for Product Managers",
      provider: "Udemy",
      rating: 5.0,
      reviewCount: "2,156",
      imageUrl: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?fit=crop&w=500&h=200"
    },
    {
      id: "course4",
      title: "UX Research Fundamentals",
      provider: "edX",
      rating: 4.3,
      reviewCount: "976",
      imageUrl: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?fit=crop&w=500&h=200"
    },
    {
      id: "course5",
      title: "Product Analytics and Growth Metrics",
      provider: "Coursera",
      rating: 4.7,
      reviewCount: "1,532",
      imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?fit=crop&w=500&h=200"
    }
  ];
  return courses;
};

const generateSkills = () => {
  const skills = [
    {
      id: "skill1",
      name: "AI & Machine Learning",
      badge: "High Demand",
      description: "Understanding AI fundamentals and applications is becoming essential for product managers in tech.",
      advantage: "+35% job opportunities with this skill"
    },
    {
      id: "skill2",
      name: "Data Analytics",
      badge: "Trending",
      description: "Strengthen your ability to make data-driven decisions and derive insights from complex datasets.",
      advantage: "+28% higher salary with this skill"
    },
    {
      id: "skill3",
      name: "Product Strategy",
      badge: "Essential",
      description: "Develop advanced strategic thinking to position products for sustainable growth and market leadership.",
      advantage: "Required for 85% of senior PM roles"
    },
    {
      id: "skill4",
      name: "UX Design Principles",
      badge: "Valuable",
      description: "Learn to collaborate effectively with designers and understand user-centered design principles.",
      advantage: "+22% more interview calls with this skill"
    },
    {
      id: "skill5",
      name: "Agile Leadership",
      badge: "In Demand",
      description: "Master leading agile teams and implementing agile methodologies across diverse product functions.",
      advantage: "Listed in 74% of product leadership roles"
    }
  ];
  return skills;
};

// Simulated PDF text extraction (no actual parsing, just returns mock data)
const extractTextFromPdf = async (buffer: Buffer) => {
  try {
    console.log('Simulating PDF extraction, returning sample LinkedIn profile text');
    // Return demo LinkedIn text
    return `Name: John Doe
Headline: Product Manager | Tech Enthusiast | Digital Transformation
Location: San Francisco, California
Industry: Technology
Current Company: TechCorp Industries
Current Role: Senior Product Manager

Experience:
TechCorp Industries
Senior Product Manager
Jan 2020 - Present

PrevCompany Inc.
Product Manager
Jan 2018 - Dec 2019

Education:
Stanford University
Master of Business Administration
2015 - 2017

University of California, Berkeley
Bachelor of Science, Computer Science
2011 - 2015

Skills:
Product Management
Strategic Planning
Team Leadership
User Experience
Agile Methodologies
Data Analysis
Product Strategy
Market Research
A/B Testing
Project Management`;
  } catch (error) {
    console.error('Error in PDF simulation:', error);
    // Even if there's an error, we'll return some basic profile info
    return `Name: LinkedIn User
Headline: Professional Profile
Skills: Various Professional Skills`;
  }
};

// Simple LinkedIn profile data extraction from text
const extractProfileFromText = (text: string) => {
  // This is a very simplistic extraction for demo purposes
  // A real implementation would use NLP or more sophisticated regex patterns

  const nameMatch = text.match(/(?:Name:|Profile:)\s*([^\n]+)/i);
  const headlineMatch = text.match(/(?:Headline:|Title:)\s*([^\n]+)/i);
  const locationMatch = text.match(/(?:Location:|Address:)\s*([^\n]+)/i);
  const industryMatch = text.match(/(?:Industry:|Sector:)\s*([^\n]+)/i);
  const companyMatch = text.match(/(?:Company:|Current Company:)\s*([^\n]+)/i);
  const jobTitleMatch = text.match(/(?:Job Title:|Position:|Current Role:)\s*([^\n]+)/i);

  // Extract skills - find a skills section and grab listed items
  const skillsSection = text.match(/Skills(?:\s|\n|&|and Endorsements).*?(?:\n\n|\n\w+:)/is);
  let skills: string[] = [];

  if (skillsSection) {
    const skillsText = skillsSection[0];
    // Try to extract individual skills - this is very basic
    skills = skillsText
      .split(/\n/)
      .filter(line => line.trim() && !line.match(/^skills|^endorsements/i))
      .map(s => s.trim())
      .filter(s => s.length > 0 && s.length < 50) // Basic filtering to remove non-skill lines
      .slice(0, 10); // Limit to 10 skills
  }

  // Extract education
  const educationSection = text.match(/Education(?:\s|\n).*?(?:\n\n|\n\w+:)/is);
  let education: any[] = [];

  if (educationSection) {
    const eduText = educationSection[0];
    // Try to extract school names
    const schoolMatches = eduText.match(/(?:University|College|School|Institute)(?:\s\w+){1,5}/ig);
    if (schoolMatches) {
      education = schoolMatches.map(school => ({
        institution: school.trim(),
        degree: "Degree extracted from PDF",
        years: "Date range extracted from PDF"
      }));
    }
  }

  // Extract experience (very simplified)
  const experienceSection = text.match(/Experience(?:\s|\n).*?(?:\n\n|\n\w+:)/is);
  let experience: any[] = [];

  if (experienceSection) {
    const expText = experienceSection[0];
    // Try to extract company names and roles
    const roleMatches = expText.match(/(?:Manager|Director|Lead|Engineer|Developer|Designer)(?:\s\w+){1,5}/ig);
    if (roleMatches && roleMatches.length > 0) {
      experience = roleMatches.map(role => ({
        title: role.trim(),
        company: "Company from PDF",
        duration: "Duration from PDF"
      }));
    }
  }

  return {
    name: nameMatch ? nameMatch[1].trim() : "LinkedIn User",
    headline: headlineMatch ? headlineMatch[1].trim() : "Professional on LinkedIn",
    location: locationMatch ? locationMatch[1].trim() : "Location from LinkedIn",
    industry: industryMatch ? industryMatch[1].trim() : "Industry from LinkedIn",
    currentJobTitle: jobTitleMatch ? jobTitleMatch[1].trim() : "Role from LinkedIn",
    currentCompany: companyMatch ? companyMatch[1].trim() : "Company from LinkedIn",
    skills: skills.length > 0 ? skills : ["Skill 1", "Skill 2", "Skill 3", "Skill 4", "Skill 5"],
    education: education.length > 0 ? education : [
      {
        institution: "University Name from PDF",
        degree: "Degree Program from PDF",
        years: "Years of attendance from PDF"
      }
    ],
    experience: experience.length > 0 ? experience : [
      {
        title: "Job Title from PDF",
        company: "Company Name from PDF",
        duration: "Employment duration from PDF"
      }
    ]
  };
};

// Helper for suggested interests based on profile
const suggestInterests = (profile: any) => {
  // This would normally use NLP or ML to suggest relevant interests
  // For demo, we'll return fixed suggestions based on simple patterns

  const suggestedTopics = [
    {
      id: "topic1",
      name: "Product Management",
      selected: true
    },
    {
      id: "topic2",
      name: "Digital Transformation",
      selected: true
    },
    {
      id: "topic3",
      name: "Artificial Intelligence",
      selected: false
    },
    {
      id: "topic4",
      name: "User Experience Design",
      selected: false
    },
    {
      id: "topic5",
      name: "Tech Leadership",
      selected: false
    }
  ];

  const suggestedSkills = [
    {
      id: "skill1",
      name: "Data Science",
      selected: true
    },
    {
      id: "skill2",
      name: "Machine Learning",
      selected: false
    },
    {
      id: "skill3",
      name: "Strategic Business Development",
      selected: true
    },
    {
      id: "skill4",
      name: "Cloud Architecture",
      selected: false
    },
    {
      id: "skill5",
      name: "Project Management",
      selected: false
    }
  ];

  return {
    suggestedTopics,
    suggestedSkills
  };
};

export async function registerRoutes(app: Express): Promise<Server> {
  // Upload and process LinkedIn PDF
  app.post('/api/profile/upload', upload.single('pdf'), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
      }

      // Extract text from PDF
      const text = await extractTextFromPdf(req.file.buffer);

      // Extract profile data from text
      const profileData = extractProfileFromText(text);

      // For demo, we'll use userId 1
      const userId = 1;

      // Check if profile already exists
      let profile = await storage.getProfile(userId);

      if (profile) {
        // Update existing profile
        profile = await storage.updateProfile(profile.id, {
          ...profileData,
          userId
        });
      } else {
        // Create new profile
        profile = await storage.createProfile({
          ...profileData,
          userId
        });
      }

      res.json(profile);
    } catch (error) {
      console.error('Error processing PDF:', error);
      res.status(500).json({ message: 'Error processing PDF file' });
    }
  });

  // Get user profile
  app.get('/api/profile', async (req, res) => {
    try {
      // For demo, we'll use userId 1
      const userId = 1;
      const profile = await storage.getProfile(userId);

      if (!profile) {
        return res.status(404).json({ message: 'Profile not found' });
      }

      res.json(profile);
    } catch (error) {
      console.error('Error fetching profile:', error);
      res.status(500).json({ message: 'Error fetching profile' });
    }
  });

  // Update profile
  app.put('/api/profile', async (req, res) => {
    try {
      // For demo, we'll use userId 1
      const userId = 1;
      const profileData = req.body;

      let profile = await storage.getProfile(userId);

      if (!profile) {
        return res.status(404).json({ message: 'Profile not found' });
      }

      profile = await storage.updateProfile(profile.id, profileData);
      res.json(profile);
    } catch (error) {
      console.error('Error updating profile:', error);
      res.status(500).json({ message: 'Error updating profile' });
    }
  });

  // Get suggested interests based on profile
  app.get('/api/interests/suggestions', async (req, res) => {
    try {
      // For demo, we'll use userId 1
      const userId = 1;
      const profile = await storage.getProfile(userId);

      if (!profile) {
        return res.status(404).json({ message: 'Profile not found' });
      }

      const suggestions = suggestInterests(profile);
      res.json(suggestions);
    } catch (error) {
      console.error('Error generating interests:', error);
      res.status(500).json({ message: 'Error generating interests' });
    }
  });

  // Save or update user interests
  app.post('/api/interests', async (req, res) => {
    try {
      // For demo, we'll use userId 1
      const userId = 1;
      const interestsData = req.body;

      // Check if interests already exist
      let interests = await storage.getInterests(userId);

      if (interests) {
        // Update existing interests
        interests = await storage.updateInterests(interests.id, {
          ...interestsData,
          userId
        });
      } else {
        // Create new interests
        interests = await storage.createInterests({
          ...interestsData,
          userId
        });
      }

      res.json(interests);
    } catch (error) {
      console.error('Error saving interests:', error);
      res.status(500).json({ message: 'Error saving interests' });
    }
  });

  // Get user interests
  app.get('/api/interests', async (req, res) => {
    try {
      // For demo, we'll use userId 1
      const userId = 1;
      const interests = await storage.getInterests(userId);

      if (!interests) {
        return res.json({ topics: [], skills: [] });
      }

      res.json(interests);
    } catch (error) {
      console.error('Error fetching interests:', error);
      res.status(500).json({ message: 'Error fetching interests' });
    }
  });

  // Get recommendations for networking
  app.get('/api/recommendations/networking', async (req, res) => {
    try {
      // Generate mock recommendations
      const peopleToFollow = generatePeopleToFollow();
      const peopleToConnect = generatePeopleToConnect();
      const trendingPosts = generateTrendingPosts();

      res.json({
        peopleToFollow,
        peopleToConnect,
        trendingPosts
      });
    } catch (error) {
      console.error('Error generating recommendations:', error);
      res.status(500).json({ message: 'Error generating recommendations' });
    }
  });

  // Get recommendations for jobs
  app.get('/api/recommendations/jobs', async (req, res) => {
    try {
      // Generate mock recommendations
      const jobOpenings = generateJobOpenings();
      const recommendedCourses = generateCourses();
      const skillsToDevelop = generateSkills();

      res.json({
        jobOpenings,
        recommendedCourses,
        skillsToDevelop
      });
    } catch (error) {
      console.error('Error generating job recommendations:', error);
      res.status(500).json({ message: 'Error generating job recommendations' });
    }
  });

  // Save career goals
  app.post('/api/career-goals', async (req, res) => {
    try {
      // For demo, we'll use userId 1
      const userId = 1;
      const goalsData = req.body;

      // Check if goals already exist
      let goals = await storage.getCareerGoals(userId);

      if (goals) {
        // Update existing goals
        goals = await storage.updateCareerGoals(goals.id, {
          ...goalsData,
          userId
        });
      } else {
        // Create new goals
        goals = await storage.createCareerGoals({
          ...goalsData,
          userId
        });
      }

      res.json(goals);
    } catch (error) {
      console.error('Error saving career goals:', error);
      res.status(500).json({ message: 'Error saving career goals' });
    }
  });

  // Get career goals
  app.get('/api/career-goals', async (req, res) => {
    try {
      // For demo, we'll use userId 1
      const userId = 1;
      const goals = await storage.getCareerGoals(userId);

      if (!goals) {
        return res.json({
          desiredRole: "Product Manager",
          industry: "Technology", 
          location: "San Francisco, CA",
          salaryRange: "$120,000 - $150,000"
        });
      }

      res.json(goals);
    } catch (error) {
      console.error('Error fetching career goals:', error);
      res.status(500).json({ message: 'Error fetching career goals' });
    }
  });

  // Save items (bookmarking functionality)
  app.post('/api/saved-items', async (req, res) => {
    try {
      // For demo, we'll use userId 1
      const userId = 1;
      const itemData = req.body;

      const savedItem = await storage.createSavedItem({
        ...itemData,
        userId
      });

      res.json(savedItem);
    } catch (error) {
      console.error('Error saving item:', error);
      res.status(500).json({ message: 'Error saving item' });
    }
  });

  // Delete saved item
  app.delete('/api/saved-items/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.deleteSavedItem(id);

      if (!success) {
        return res.status(404).json({ message: 'Saved item not found' });
      }

      res.json({ success: true });
    } catch (error) {
      console.error('Error deleting saved item:', error);
      res.status(500).json({ message: 'Error deleting saved item' });
    }
  });

  // Get all saved items
  app.get('/api/saved-items', async (req, res) => {
    try {
      // For demo, we'll use userId 1
      const userId = 1;
      const itemType = req.query.type as string | undefined;

      const items = await storage.getSavedItems(userId, itemType);
      res.json(items);
    } catch (error) {
      console.error('Error fetching saved items:', error);
      res.status(500).json({ message: 'Error fetching saved items' });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}