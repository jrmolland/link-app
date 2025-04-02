import { User } from '@/types/user';

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Emma',
    age: 28,
    gender: 'female',
    location: {
      city: 'San Francisco',
      state: 'CA',
      country: 'USA',
      distance: 5,
    },
    photos: [
      {
        id: '1-1',
        url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
        isProfile: true,
      },
      {
        id: '1-2',
        url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb',
        isProfile: false,
      },
      {
        id: '1-3',
        url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9',
        isProfile: false,
      },
    ],
    videos: [],
    verificationStatus: 'verified',
    datingProfile: {
      interests: ['Photography', 'Hiking', 'Travel', 'Reading'],
      bio: "Product designer by day, photographer by weekend. Looking for someone who enjoys the outdoors as much as I do. Let's explore the city together!",
      relationshipGoals: 'relationship',
      prompts: [
        {
          question: "Two truths and a lie...",
          answer: "I've climbed Mt. Kilimanjaro, I speak three languages, I once had dinner with Bill Gates."
        },
        {
          question: "A life goal of mine...",
          answer: "To photograph the northern lights in all Arctic countries."
        },
        {
          question: "I'm looking for...",
          answer: "Someone who challenges me intellectually and shares my sense of adventure."
        }
      ],
      education: "Stanford University",
      drinking: "socially",
      smoking: "never",
    },
    networkingProfile: {
      jobTitle: "Senior Product Designer",
      company: "Airbnb",
      industry: "Technology",
      skills: ["UX Design", "UI Design", "Product Strategy", "User Research"],
      professionalSummary: "Passionate product designer with 6+ years of experience creating intuitive digital experiences. Specialized in consumer products with a focus on travel and hospitality.",
      contactPreferences: ["Coffee meetings", "Virtual mentoring"],
      isVerified: true,
    },
    premium: {
      isActive: true,
      tier: 'dating',
      expiresAt: '2023-12-31',
    },
    createdAt: '2023-01-15',
    lastActive: '2023-06-01',
  },
  {
    id: '2',
    name: 'James',
    age: 32,
    gender: 'male',
    location: {
      city: 'San Francisco',
      state: 'CA',
      country: 'USA',
      distance: 8,
    },
    photos: [
      {
        id: '2-1',
        url: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6',
        isProfile: true,
      },
      {
        id: '2-2',
        url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
        isProfile: false,
      },
    ],
    videos: [],
    verificationStatus: 'verified',
    datingProfile: {
      interests: ['Cooking', 'Fitness', 'Travel', 'Music'],
      bio: "Software engineer who loves to cook almost as much as I love to code. Looking for someone to share meals and adventures with.",
      relationshipGoals: 'relationship',
      prompts: [
        {
          question: "My most controversial opinion...",
          answer: "Pineapple absolutely belongs on pizza, and I'm willing to debate this for hours."
        },
        {
          question: "A perfect day would be...",
          answer: "Morning hike, afternoon cooking class, evening concert, and late-night conversations."
        },
        {
          question: "You should leave a comment if...",
          answer: "You have a favorite recipe you'd like to share or a hiking trail I should try."
        }
      ],
      education: "MIT",
      drinking: "socially",
      smoking: "never",
    },
    networkingProfile: {
      jobTitle: "Senior Software Engineer",
      company: "Google",
      industry: "Technology",
      skills: ["JavaScript", "React", "Node.js", "Cloud Architecture"],
      professionalSummary: "Full-stack engineer with expertise in building scalable web applications. Passionate about clean code and user-centric design.",
      contactPreferences: ["Technical mentoring", "Career advice"],
      isVerified: true,
    },
    premium: {
      isActive: false,
      tier: 'free',
    },
    createdAt: '2023-02-10',
    lastActive: '2023-06-02',
  },
  {
    id: '3',
    name: 'Sophia',
    age: 30,
    gender: 'female',
    location: {
      city: 'San Francisco',
      state: 'CA',
      country: 'USA',
      distance: 3,
    },
    photos: [
      {
        id: '3-1',
        url: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04',
        isProfile: true,
      },
      {
        id: '3-2',
        url: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1',
        isProfile: false,
      },
      {
        id: '3-3',
        url: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e',
        isProfile: false,
      },
    ],
    videos: [],
    verificationStatus: 'professionally-verified',
    datingProfile: {
      interests: ['Art', 'Wine tasting', 'Theater', 'Yoga'],
      bio: "Art curator with a passion for discovering new artists. Looking for someone who appreciates culture and isn't afraid of deep conversations.",
      relationshipGoals: 'dating',
      prompts: [
        {
          question: "My simple pleasures...",
          answer: "Morning coffee on my balcony, finding a new artist I love, and late-night walks through the city."
        },
        {
          question: "I'll know it's time to delete this app when...",
          answer: "I find someone who makes gallery visits feel like adventures."
        },
        {
          question: "The key to my heart is...",
          answer: "Thoughtful conversations, artistic sensibility, and a good sense of humor."
        }
      ],
      education: "Parsons School of Design",
      drinking: "socially",
      smoking: "never",
    },
    networkingProfile: {
      jobTitle: "Senior Art Curator",
      company: "SFMOMA",
      industry: "Arts & Culture",
      skills: ["Curation", "Artist Relations", "Exhibition Design", "Art History"],
      professionalSummary: "Experienced curator specializing in contemporary art. Passionate about connecting emerging artists with new audiences and creating immersive exhibition experiences.",
      services: ["Art consultation", "Collection management"],
      contactPreferences: ["Gallery visits", "Industry events"],
      isVerified: true,
    },
    premium: {
      isActive: true,
      tier: 'networking',
      expiresAt: '2023-12-15',
    },
    createdAt: '2023-01-05',
    lastActive: '2023-06-03',
  },
  {
    id: '4',
    name: 'Michael',
    age: 34,
    gender: 'male',
    location: {
      city: 'San Francisco',
      state: 'CA',
      country: 'USA',
      distance: 10,
    },
    photos: [
      {
        id: '4-1',
        url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
        isProfile: true,
      },
      {
        id: '4-2',
        url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
        isProfile: false,
      },
    ],
    videos: [],
    verificationStatus: 'verified',
    datingProfile: {
      interests: ['Entrepreneurship', 'Fitness', 'Travel', 'Food'],
      bio: "Startup founder who believes in work-life balance. Looking for someone ambitious who also knows how to unwind and enjoy life's simple pleasures.",
      relationshipGoals: 'relationship',
      prompts: [
        {
          question: "My biggest risk that paid off...",
          answer: "Quitting my corporate job to start my own company with just an idea and some savings."
        },
        {
          question: "A non-negotiable for me is...",
          answer: "Ambition and kindness. I believe you can be driven while still being compassionate."
        },
        {
          question: "I'm weirdly attracted to...",
          answer: "People who are passionate about something niche - whatever it is, I love seeing that spark."
        }
      ],
      education: "Harvard Business School",
      drinking: "socially",
      smoking: "never",
    },
    networkingProfile: {
      jobTitle: "Founder & CEO",
      company: "TechStart",
      industry: "Technology",
      skills: ["Leadership", "Fundraising", "Product Strategy", "Team Building"],
      professionalSummary: "Serial entrepreneur with two successful exits. Currently building a platform that helps small businesses leverage AI for customer service.",
      contactPreferences: ["Investor connections", "Mentoring early-stage founders"],
      isVerified: true,
    },
    premium: {
      isActive: true,
      tier: 'networking',
      expiresAt: '2023-11-30',
    },
    createdAt: '2023-02-20',
    lastActive: '2023-06-01',
  },
  {
    id: '5',
    name: 'Olivia',
    age: 27,
    gender: 'female',
    location: {
      city: 'San Francisco',
      state: 'CA',
      country: 'USA',
      distance: 7,
    },
    photos: [
      {
        id: '5-1',
        url: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f',
        isProfile: true,
      },
      {
        id: '5-2',
        url: 'https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453',
        isProfile: false,
      },
    ],
    videos: [],
    verificationStatus: 'basic',
    datingProfile: {
      interests: ['Music', 'Film', 'Writing', 'Coffee'],
      bio: "Music journalist who spends too much time at concerts and not enough time sleeping. Looking for someone who appreciates art in all its forms.",
      relationshipGoals: 'dating',
      prompts: [
        {
          question: "My favorite topic to debate...",
          answer: "Whether albums should be listened to in order or if shuffle is acceptable (it's not)."
        },
        {
          question: "I guarantee you that...",
          answer: "I'll introduce you to at least three bands you'll love but have never heard of."
        },
        {
          question: "The way to win me over is...",
          answer: "Make me a thoughtful playlist. Bonus points if it tells a story."
        }
      ],
      education: "NYU",
      drinking: "socially",
      smoking: "never",
    },
    networkingProfile: {
      jobTitle: "Senior Music Journalist",
      company: "Rolling Stone",
      industry: "Media & Entertainment",
      skills: ["Music Criticism", "Interviewing", "Feature Writing", "Content Strategy"],
      professionalSummary: "Award-winning journalist covering emerging music trends and artists. Specialized in discovering underground talent and cultural analysis.",
      contactPreferences: ["Industry events", "Coffee meetings"],
      isVerified: false,
    },
    premium: {
      isActive: false,
      tier: 'free',
    },
    createdAt: '2023-03-10',
    lastActive: '2023-06-02',
  },
];

export const mockMatches = [
  {
    id: 'm1',
    userId: 'current-user',
    matchedUserId: '1',
    matchType: 'dating' as 'dating' | 'networking',
    status: 'matched' as 'pending' | 'matched' | 'rejected',
    interactionItem: {
      type: 'prompt' as 'photo' | 'prompt' | 'profile',
      id: '1',
      comment: "I've also climbed Kilimanjaro! When did you go?",
    },
    createdAt: '2023-05-28',
    lastMessageAt: '2023-06-01',
  },
  {
    id: 'm2',
    userId: 'current-user',
    matchedUserId: '3',
    matchType: 'networking' as 'dating' | 'networking',
    status: 'matched' as 'pending' | 'matched' | 'rejected',
    interactionItem: {
      type: 'profile' as 'photo' | 'prompt' | 'profile',
      comment: "I'd love to connect about art curation opportunities.",
    },
    createdAt: '2023-05-30',
    lastMessageAt: '2023-05-31',
  },
  {
    id: 'm3',
    userId: 'current-user',
    matchedUserId: '2',
    matchType: 'dating' as 'dating' | 'networking',
    status: 'pending' as 'pending' | 'matched' | 'rejected',
    interactionItem: {
      type: 'photo' as 'photo' | 'prompt' | 'profile',
      id: '2-1',
      comment: "Great photo! Where was this taken?",
    },
    createdAt: '2023-06-01',
  },
];

export const mockMessages = [
  {
    id: 'msg1',
    matchId: 'm1',
    senderId: 'current-user',
    receiverId: '1',
    content: "I've also climbed Kilimanjaro! When did you go?",
    contentType: 'text' as 'text' | 'image' | 'gif' | 'voice' | 'video',
    isRead: true,
    createdAt: '2023-05-28T14:30:00Z',
  },
  {
    id: 'msg2',
    matchId: 'm1',
    senderId: '1',
    receiverId: 'current-user',
    content: "I went last summer! It was an incredible experience. Which route did you take?",
    contentType: 'text' as 'text' | 'image' | 'gif' | 'voice' | 'video',
    isRead: true,
    createdAt: '2023-05-28T15:45:00Z',
  },
  {
    id: 'msg3',
    matchId: 'm1',
    senderId: 'current-user',
    receiverId: '1',
    content: "I took the Machame route. It was challenging but so worth it for the views!",
    contentType: 'text' as 'text' | 'image' | 'gif' | 'voice' | 'video',
    isRead: true,
    createdAt: '2023-05-29T09:15:00Z',
  },
  {
    id: 'msg4',
    matchId: 'm1',
    senderId: '1',
    receiverId: 'current-user',
    content: "Same here! The Barranco Wall was quite the adventure. Would you like to grab coffee sometime and share travel stories?",
    contentType: 'text' as 'text' | 'image' | 'gif' | 'voice' | 'video',
    isRead: false,
    createdAt: '2023-06-01T11:20:00Z',
  },
  {
    id: 'msg5',
    matchId: 'm2',
    senderId: 'current-user',
    receiverId: '3',
    content: "I'd love to connect about art curation opportunities. I've been following your work at SFMOMA.",
    contentType: 'text' as 'text' | 'image' | 'gif' | 'voice' | 'video',
    isRead: true,
    createdAt: '2023-05-30T10:00:00Z',
  },
  {
    id: 'msg6',
    matchId: 'm2',
    senderId: '3',
    receiverId: 'current-user',
    content: "Thanks for reaching out! I'd be happy to chat about curation. Are you currently working in the art world?",
    contentType: 'text' as 'text' | 'image' | 'gif' | 'voice' | 'video',
    isRead: true,
    createdAt: '2023-05-31T09:30:00Z',
  },
];

export const subscriptionTiers = [
  {
    tier: 'free',
    price: 0,
    features: [
      'Access to Dating Mode',
      '10 likes per day',
      'Basic filters',
      'Create your profile',
      'Message your matches',
    ],
  },
  {
    tier: 'dating',
    price: 99.99,
    features: [
      'Unlimited likes in Dating Mode',
      'Advanced Dating Filters',
      'See who liked you',
      'Travel Mode (change your location)',
      'Read Receipts',
      'Ad-free experience',
    ],
  },
  {
    tier: 'networking',
    price: 199.99,
    features: [
      'Full access to Networking Mode',
      'Advanced Professional Filters',
      'Enhanced profile visibility',
      'Priority in search results',
      'All Link+ (Dating Premium) features',
    ],
  },
];