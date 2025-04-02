import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Dimensions, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppStore } from '@/store/app-store';
import { useAuthStore } from '@/store/auth-store';
import { ProfileCard } from '@/components/profile/ProfileCard';
import { colors } from '@/constants/colors';
import { router } from 'expo-router';

const { width, height } = Dimensions.get('window');

export default function DiscoverScreen() {
  const theme = useAppStore(state => state.theme);
  const appMode = useAppStore(state => state.appMode);
  const users = useAppStore(state => state.users);
  const currentUserIndex = useAppStore(state => state.currentUserIndex);
  const likeUser = useAppStore(state => state.likeUser);
  const passUser = useAppStore(state => state.passUser);
  const nextUser = useAppStore(state => state.nextUser);
  const colorScheme = colors[theme];
  const user = useAuthStore(state => state.user);
  
  const [animateIn, setAnimateIn] = useState(false);
  const prevAppMode = useRef(appMode);
  const prevUserIndex = useRef(currentUserIndex);
  
  useEffect(() => {
    // Check if app mode changed or user index changed
    if (prevAppMode.current !== appMode || prevUserIndex.current !== currentUserIndex) {
      // Trigger animation when switching modes or profiles
      setAnimateIn(true);
      
      // Update refs
      prevAppMode.current = appMode;
      prevUserIndex.current = currentUserIndex;
    }
  }, [appMode, currentUserIndex]);
  
  // Reset animation state after animation completes
  useEffect(() => {
    if (animateIn) {
      const timer = setTimeout(() => {
        setAnimateIn(false);
      }, 500); // Animation duration + small buffer
      
      return () => clearTimeout(timer);
    }
  }, [animateIn]);
  
  const handleLike = () => {
    const currentUser = users[currentUserIndex];
    likeUser(currentUser.id);
  };
  
  const handlePass = () => {
    const currentUser = users[currentUserIndex];
    passUser(currentUser.id);
  };
  
  const handleComment = (type: 'photo' | 'prompt', id: string) => {
    const currentUser = users[currentUserIndex];
    
    // Create a temporary match for commenting
    const interactionItem = {
      type,
      id
    };
    
    likeUser(currentUser.id, interactionItem);
    
    // Navigate to chat with this user
    router.push(`/chat/${currentUser.id}`);
  };
  
  if (!users.length) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colorScheme.background }]}>
        <View style={styles.cardContainer}>
          {/* Empty state or loading indicator */}
        </View>
      </SafeAreaView>
    );
  }
  
  const currentUser = users[currentUserIndex];
  
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colorScheme.background }]} edges={['bottom']}>
      <View style={styles.cardContainer}>
        <ProfileCard
          user={currentUser}
          onLike={handleLike}
          onPass={handlePass}
          onComment={handleComment}
          animateIn={animateIn}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});