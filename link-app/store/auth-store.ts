import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '@/types/user';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (userData: Partial<User>, password: string) => Promise<void>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
}

// Mock current user for demo purposes
const currentUser: User = {
  id: 'current-user',
  name: 'Alex',
  age: 29,
  gender: 'non-binary',
  location: {
    city: 'San Francisco',
    state: 'CA',
    country: 'USA',
  },
  photos: [
    {
      id: 'cu-1',
      url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
      isProfile: true,
    },
    {
      id: 'cu-2',
      url: 'https://images.unsplash.com/photo-1496440737103-cd596325d314',
      isProfile: false,
    },
  ],
  videos: [],
  verificationStatus: 'verified',
  datingProfile: {
    interests: ['Technology', 'Travel', 'Photography', 'Food'],
    bio: "Product manager who loves exploring new places and trying new foods. Looking for someone to share adventures with.",
    relationshipGoals: 'relationship',
    prompts: [
      {
        question: "My most irrational fear...",
        answer: "That my plants are judging my life choices when I talk to them."
      },
      {
        question: "A perfect first date would be...",
        answer: "A food truck crawl followed by a sunset hike with city views."
      },
      {
        question: "I'm looking for...",
        answer: "Someone who's curious about the world and isn't afraid to be silly sometimes."
      }
    ],
    education: "UC Berkeley",
    drinking: "socially",
    smoking: "never",
  },
  networkingProfile: {
    jobTitle: "Senior Product Manager",
    company: "Spotify",
    industry: "Technology",
    skills: ["Product Strategy", "User Research", "Data Analysis", "Team Leadership"],
    professionalSummary: "Product leader with experience in consumer tech and music streaming. Passionate about creating products that bring joy to people's daily lives.",
    contactPreferences: ["Coffee chats", "Industry events", "Mentoring"],
    isVerified: true,
  },
  premium: {
    isActive: true,
    tier: 'networking',
    expiresAt: '2023-12-31',
  },
  createdAt: '2022-11-15',
  lastActive: '2023-06-03',
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: currentUser, // Pre-populated for demo
      isAuthenticated: true, // Pre-authenticated for demo
      isLoading: false,
      error: null,
      login: async (email, password) => {
        set({ isLoading: true, error: null });
        try {
          // Mock login - in a real app, this would call an API
          await new Promise(resolve => setTimeout(resolve, 1000));
          set({ 
            user: currentUser,
            isAuthenticated: true,
            isLoading: false 
          });
        } catch (error) {
          set({ 
            error: "Login failed. Please check your credentials.",
            isLoading: false 
          });
        }
      },
      signup: async (userData, password) => {
        set({ isLoading: true, error: null });
        try {
          // Mock signup - in a real app, this would call an API
          await new Promise(resolve => setTimeout(resolve, 1000));
          const newUser = { ...currentUser, ...userData };
          set({ 
            user: newUser,
            isAuthenticated: true,
            isLoading: false 
          });
        } catch (error) {
          set({ 
            error: "Signup failed. Please try again.",
            isLoading: false 
          });
        }
      },
      logout: () => {
        set({ 
          user: null,
          isAuthenticated: false 
        });
      },
      updateUser: (userData) => {
        set((state) => ({
          user: state.user ? { ...state.user, ...userData } : null
        }));
      },
    }),
    {
      name: 'link-auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);