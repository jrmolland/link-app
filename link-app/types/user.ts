export type VerificationStatus = 'unverified' | 'basic' | 'verified' | 'professionally-verified';

export type RelationshipGoal = 'casual' | 'dating' | 'relationship' | 'marriage';

export type UserPrompt = {
  question: string;
  answer: string;
};

export type UserPhoto = {
  id: string;
  url: string;
  isProfile: boolean;
};

export type UserVideo = {
  id: string;
  url: string;
  thumbnail: string;
};

export type UserDatingProfile = {
  interests: string[];
  bio: string;
  relationshipGoals: RelationshipGoal;
  prompts: UserPrompt[];
  height?: number; // in cm
  education?: string;
  drinking?: 'never' | 'rarely' | 'socially' | 'regularly';
  smoking?: 'never' | 'socially' | 'regularly';
};

export type UserNetworkingProfile = {
  jobTitle: string;
  company: string;
  industry: string;
  skills: string[];
  professionalSummary: string;
  services?: string[];
  contactPreferences: string[];
  isVerified: boolean;
};

export type User = {
  id: string;
  name: string;
  age?: number; // Only shown in dating mode
  gender: 'male' | 'female' | 'non-binary' | 'other';
  email?: string;
  location: {
    city: string;
    state?: string;
    country: string;
    coordinates?: {
      latitude: number;
      longitude: number;
    };
    distance?: number; // in km
  };
  photos: UserPhoto[];
  videos: UserVideo[];
  verificationStatus: VerificationStatus;
  datingProfile: UserDatingProfile;
  networkingProfile: UserNetworkingProfile;
  premium: {
    isActive: boolean;
    tier: 'free' | 'dating' | 'networking';
    expiresAt?: string;
  };
  createdAt: string;
  lastActive: string;
};

export type Match = {
  id: string;
  userId: string;
  matchedUserId: string;
  matchType: 'dating' | 'networking';
  status: 'pending' | 'matched' | 'rejected';
  interactionItem?: {
    type: 'photo' | 'prompt' | 'profile';
    id?: string;
    comment?: string;
  };
  createdAt: string;
  lastMessageAt?: string;
};

export type Message = {
  id: string;
  matchId: string;
  senderId: string;
  receiverId: string;
  content: string;
  contentType: 'text' | 'image' | 'gif' | 'voice' | 'video';
  mediaUrl?: string;
  isRead: boolean;
  createdAt: string;
};

export type Subscription = {
  tier: 'free' | 'dating' | 'networking';
  price: number;
  features: string[];
};