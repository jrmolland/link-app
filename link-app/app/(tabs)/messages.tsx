import React, { useState } from 'react';
import { View, StyleSheet, FlatList, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing, fontSizes } from '@/constants/colors';
import { useAppStore } from '@/store/app-store';
import { MatchCard } from '@/components/matches/MatchCard';
import { Link, useRouter } from 'expo-router';
import { Match, User } from '@/types/user';

export default function MessagesScreen() {
  const theme = useAppStore(state => state.theme);
  const appMode = useAppStore(state => state.appMode);
  const colorScheme = colors[theme];
  const router = useRouter();
  
  const matches = useAppStore(state => state.matches);
  const messages = useAppStore(state => state.messages);
  const users = useAppStore(state => state.users);
  
  const [activeTab, setActiveTab] = useState<'all' | 'dating' | 'networking'>('all');
  
  const filteredMatches = matches.filter(match => {
    if (activeTab === 'all') return true;
    return match.matchType === activeTab;
  });
  
  const sortedMatches = [...filteredMatches].sort((a, b) => {
    if (!a.lastMessageAt && !b.lastMessageAt) return 0;
    if (!a.lastMessageAt) return 1;
    if (!b.lastMessageAt) return -1;
    return new Date(b.lastMessageAt).getTime() - new Date(a.lastMessageAt).getTime();
  });
  
  const getUnreadCount = (matchId: string) => {
    return messages.filter(
      msg => msg.matchId === matchId && !msg.isRead && msg.receiverId === 'current-user'
    ).length;
  };
  
  const getUserForMatch = (match: Match): User | undefined => {
    return users.find(user => user.id === match.matchedUserId);
  };
  
  const handleMatchPress = (match: Match) => {
    router.push(`/chat/${match.id}`);
  };
  
  const renderEmptyState = () => {
    return (
      <View style={styles.emptyContainer}>
        <Text style={[styles.emptyTitle, { color: colorScheme.text }]}>
          No matches yet
        </Text>
        <Text style={[styles.emptyDescription, { color: colorScheme.placeholder }]}>
          {activeTab === 'networking' 
            ? "Start connecting with professionals to grow your network"
            : "Start liking profiles to make connections"}
        </Text>
        <Link href="/" asChild>
          <TouchableOpacity
            style={[styles.emptyButton, { backgroundColor: colorScheme.primary }]}
          >
            <Text style={styles.emptyButtonText}>
              Discover People
            </Text>
          </TouchableOpacity>
        </Link>
      </View>
    );
  };
  
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colorScheme.background }]}>
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'all' && [styles.activeTab, { borderColor: colorScheme.primary }]
          ]}
          onPress={() => setActiveTab('all')}
        >
          <Text
            style={[
              styles.tabText,
              { color: activeTab === 'all' ? colorScheme.primary : colorScheme.text }
            ]}
          >
            All
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'dating' && [styles.activeTab, { borderColor: colorScheme.primary }]
          ]}
          onPress={() => setActiveTab('dating')}
        >
          <Text
            style={[
              styles.tabText,
              { color: activeTab === 'dating' ? colorScheme.primary : colorScheme.text }
            ]}
          >
            Dating
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'networking' && [styles.activeTab, { borderColor: colorScheme.primary }]
          ]}
          onPress={() => setActiveTab('networking')}
        >
          <Text
            style={[
              styles.tabText,
              { color: activeTab === 'networking' ? colorScheme.primary : colorScheme.text }
            ]}
          >
            Networking
          </Text>
        </TouchableOpacity>
      </View>
      
      <FlatList
        data={sortedMatches}
        keyExtractor={item => item.id}
        renderItem={({ item }) => {
          const user = getUserForMatch(item);
          if (!user) return null;
          
          return (
            <MatchCard
              match={item}
              user={user}
              onPress={() => handleMatchPress(item)}
              unreadCount={getUnreadCount(item.id)}
            />
          );
        }}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={renderEmptyState}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  tab: {
    flex: 1,
    paddingVertical: spacing.sm,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomWidth: 2,
  },
  tabText: {
    fontSize: fontSizes.md,
    fontWeight: '500',
  },
  listContent: {
    padding: spacing.lg,
    flexGrow: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.xxl,
  },
  emptyTitle: {
    fontSize: fontSizes.xl,
    fontWeight: 'bold',
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  emptyDescription: {
    fontSize: fontSizes.md,
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
  emptyButton: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    borderRadius: 25,
  },
  emptyButtonText: {
    color: '#FFFFFF',
    fontSize: fontSizes.md,
    fontWeight: '600',
  },
});