import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Match, Message, User } from '@/types/user';
import { mockUsers, mockMatches, mockMessages } from '@/mocks/users';

interface Preferences {
  gender: 'male' | 'female' | 'all';
  ageRange: [number, number];
  distance: number;
  languages?: string[];
  education?: string[];
  industries?: string[];
  jobTitles?: string[];
  relationshipGoals?: string[];
  experienceLevels?: string[];
  connectionGoals?: string[];
}

interface AppState {
  // App mode
  appMode: 'dating' | 'networking';
  setAppMode: (mode: 'dating' | 'networking') => void;
  
  // Theme
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
  
  // Users
  users: User[];
  currentUserIndex: number;
  remainingLikes: number;
  mostCompatibleUserId: string | null;
  
  // Preferences
  datingPreferences: Preferences;
  networkingPreferences: Preferences;
  updateDatingPreferences: (preferences: Partial<Preferences>) => void;
  updateNetworkingPreferences: (preferences: Partial<Preferences>) => void;
  
  // Matches and messages
  matches: Match[];
  messages: Message[];
  
  // Actions
  likeUser: (userId: string, interactionItem?: Match['interactionItem']) => void;
  passUser: (userId: string) => void;
  nextUser: () => void;
  sendMessage: (matchId: string, content: string, contentType: Message['contentType'], mediaUrl?: string) => void;
  markMessageAsRead: (messageId: string) => void;
  resetLikes: () => void;
  refreshProfiles: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // App mode
      appMode: 'dating',
      setAppMode: (mode) => {
        // Reset to first user when switching modes to avoid showing the same profile
        set({ 
          appMode: mode,
          currentUserIndex: 0
        });
        
        // Refresh profiles to ensure they meet the current preferences
        get().refreshProfiles();
      },
      
      // Theme
      theme: 'dark', // Default to dark theme
      setTheme: (theme) => set({ theme }),
      
      // Users
      users: mockUsers,
      currentUserIndex: 0,
      remainingLikes: 10, // Free tier daily limit
      mostCompatibleUserId: '3', // Mock most compatible user
      
      // Preferences
      datingPreferences: {
        gender: 'female',
        ageRange: [25, 35],
        distance: 25,
        languages: ['English', 'Spanish'],
        education: ["Bachelor's degree or higher"],
        relationshipGoals: ['dating', 'relationship']
      },
      networkingPreferences: {
        gender: 'all',
        ageRange: [21, 65],
        distance: 50,
        languages: ['English', 'Spanish', 'Mandarin'],
        industries: ['Technology', 'Design', 'Marketing'],
        jobTitles: ['Product Manager', 'Designer', 'Developer'],
        experienceLevels: ['Mid-level', 'Senior'],
        connectionGoals: ['Mentorship', 'Collaboration']
      },
      updateDatingPreferences: (preferences) => {
        set((state) => ({
          datingPreferences: {
            ...state.datingPreferences,
            ...preferences
          }
        }));
        
        // Refresh profiles to ensure they meet the new preferences
        get().refreshProfiles();
      },
      updateNetworkingPreferences: (preferences) => {
        set((state) => ({
          networkingPreferences: {
            ...state.networkingPreferences,
            ...preferences
          }
        }));
        
        // Refresh profiles to ensure they meet the new preferences
        get().refreshProfiles();
      },
      
      // Matches and messages
      matches: mockMatches as unknown as Match[],
      messages: mockMessages as unknown as Message[],
      
      // Actions
      likeUser: (userId, interactionItem) => {
        const { appMode, remainingLikes, matches } = get();
        
        // Check if user has remaining likes
        if (remainingLikes <= 0) {
          // In a real app, show upgrade prompt
          return;
        }
        
        // Create a new match
        const newMatch: Match = {
          id: `m${Date.now()}`,
          userId: 'current-user',
          matchedUserId: userId,
          matchType: appMode,
          status: 'pending', // Initially pending until the other user responds
          interactionItem,
          createdAt: new Date().toISOString(),
        };
        
        set((state) => ({
          matches: [...state.matches, newMatch],
          remainingLikes: state.remainingLikes - 1,
        }));
        
        // Move to next user
        get().nextUser();
        
        // In a real app, this would trigger a notification to the other user
      },
      
      passUser: (userId) => {
        // In a real app, this would update the backend to not show this user again
        get().nextUser();
      },
      
      nextUser: () => {
        set((state) => {
          const { appMode, users, datingPreferences, networkingPreferences } = state;
          const preferences = appMode === 'dating' ? datingPreferences : networkingPreferences;
          
          // Start from the next user
          let nextIndex = (state.currentUserIndex + 1) % users.length;
          let attempts = 0;
          
          // Find the next user that meets the current preferences
          // Limit attempts to avoid infinite loop
          while (attempts < users.length) {
            const nextUser = users[nextIndex];
            
            // Check if user meets preferences
            const meetsPreferences = appMode === 'dating' 
              ? (
                  // For dating mode
                  (preferences.gender === 'all' || nextUser.gender === preferences.gender) &&
                  (nextUser.age && nextUser.age >= preferences.ageRange[0] && nextUser.age <= preferences.ageRange[1]) &&
                  (nextUser.location.distance && nextUser.location.distance <= preferences.distance)
                )
              : (
                  // For networking mode
                  (preferences.gender === 'all' || nextUser.gender === preferences.gender) &&
                  (nextUser.location.distance && nextUser.location.distance <= preferences.distance) &&
                  nextUser.networkingProfile.isVerified
                );
            
            if (meetsPreferences) {
              break;
            }
            
            // Try the next user
            nextIndex = (nextIndex + 1) % users.length;
            attempts++;
          }
          
          // In a real app, we would filter users based on preferences
          // For now, just ensure we don't show the same profile in both modes at once
          return {
            currentUserIndex: nextIndex,
          };
        });
      },
      
      refreshProfiles: () => {
        // Reset to first user and find one that meets preferences
        set((state) => {
          const { appMode, users, datingPreferences, networkingPreferences } = state;
          const preferences = appMode === 'dating' ? datingPreferences : networkingPreferences;
          
          // Start from the first user
          let nextIndex = 0;
          let attempts = 0;
          
          // Find the next user that meets the current preferences
          // Limit attempts to avoid infinite loop
          while (attempts < users.length) {
            const nextUser = users[nextIndex];
            
            // Check if user meets preferences
            const meetsPreferences = appMode === 'dating' 
              ? (
                  // For dating mode
                  (preferences.gender === 'all' || nextUser.gender === preferences.gender) &&
                  (nextUser.age && nextUser.age >= preferences.ageRange[0] && nextUser.age <= preferences.ageRange[1]) &&
                  (nextUser.location.distance && nextUser.location.distance <= preferences.distance)
                )
              : (
                  // For networking mode
                  (preferences.gender === 'all' || nextUser.gender === preferences.gender) &&
                  (nextUser.location.distance && nextUser.location.distance <= preferences.distance) &&
                  nextUser.networkingProfile.isVerified
                );
            
            if (meetsPreferences) {
              break;
            }
            
            // Try the next user
            nextIndex = (nextIndex + 1) % users.length;
            attempts++;
          }
          
          return {
            currentUserIndex: nextIndex,
          };
        });
      },
      
      sendMessage: (matchId, content, contentType, mediaUrl) => {
        const { matches, messages } = get();
        
        // Find the match
        const match = matches.find(m => m.id === matchId);
        if (!match) return;
        
        // Create a new message
        const newMessage: Message = {
          id: `msg${Date.now()}`,
          matchId,
          senderId: 'current-user',
          receiverId: match.matchedUserId,
          content,
          contentType,
          mediaUrl,
          isRead: false,
          createdAt: new Date().toISOString(),
        };
        
        // Update the match's lastMessageAt
        const updatedMatches = matches.map(m => 
          m.id === matchId 
            ? { ...m, lastMessageAt: new Date().toISOString() } 
            : m
        );
        
        set((state) => ({
          messages: [...state.messages, newMessage],
          matches: updatedMatches,
        }));
        
        // In a real app, this would send the message to the backend
      },
      
      markMessageAsRead: (messageId) => {
        set((state) => ({
          messages: state.messages.map(msg => 
            msg.id === messageId 
              ? { ...msg, isRead: true } 
              : msg
          ),
        }));
        
        // In a real app, this would update the message status in the backend
      },
      
      resetLikes: () => {
        // This would be called daily to reset the like count
        set({ remainingLikes: 10 });
      },
    }),
    {
      name: 'link-app-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        appMode: state.appMode,
        theme: state.theme,
        matches: state.matches,
        messages: state.messages,
        remainingLikes: state.remainingLikes,
        datingPreferences: state.datingPreferences,
        networkingPreferences: state.networkingPreferences,
      }),
    }
  )
);