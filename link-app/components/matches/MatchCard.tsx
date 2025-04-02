import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { colors, spacing, fontSizes, borderRadius } from '@/constants/colors';
import { useAppStore } from '@/store/app-store';
import { Match, User } from '@/types/user';
import { VerificationBadge } from '@/components/ui/VerificationBadge';
import { MessageCircle } from 'lucide-react-native';

interface MatchCardProps {
  match: Match;
  user: User;
  onPress: () => void;
  unreadCount?: number;
}

export const MatchCard: React.FC<MatchCardProps> = ({
  match,
  user,
  onPress,
  unreadCount = 0,
}) => {
  const theme = useAppStore(state => state.theme);
  const colorScheme = colors[theme];

  const profilePhoto = user.photos.find(photo => photo.isProfile) || user.photos[0];
  
  const formatLastActive = (dateString?: string) => {
    if (!dateString) return '';
    
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);
    
    if (diffMins < 60) {
      return `${diffMins}m`;
    } else if (diffHours < 24) {
      return `${diffHours}h`;
    } else {
      return `${diffDays}d`;
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.container,
        { 
          backgroundColor: colorScheme.card,
          borderColor: unreadCount > 0 ? colorScheme.primary : 'transparent',
        }
      ]}
      onPress={onPress}
    >
      <View style={styles.avatarContainer}>
        <Image
          source={{ uri: profilePhoto.url }}
          style={styles.avatar}
        />
        {user.verificationStatus !== 'unverified' && (
          <View style={styles.verificationBadge}>
            <VerificationBadge status={user.verificationStatus} size="small" />
          </View>
        )}
      </View>
      
      <View style={styles.contentContainer}>
        <View style={styles.headerRow}>
          <Text style={[styles.name, { color: colorScheme.text }]}>
            {user.name}
          </Text>
          <Text style={[styles.time, { color: colorScheme.placeholder }]}>
            {formatLastActive(match.lastMessageAt)}
          </Text>
        </View>
        
        <View style={styles.detailsRow}>
          {match.interactionItem?.comment ? (
            <Text 
              style={[styles.lastMessage, { color: colorScheme.text }]}
              numberOfLines={1}
            >
              {match.interactionItem.comment}
            </Text>
          ) : (
            <Text 
              style={[styles.lastMessage, { color: colorScheme.placeholder }]}
              numberOfLines={1}
            >
              {match.matchType === 'dating' 
                ? "You matched on dating" 
                : "You connected for networking"}
            </Text>
          )}
          
          {unreadCount > 0 && (
            <View style={[styles.unreadBadge, { backgroundColor: colorScheme.primary }]}>
              <Text style={styles.unreadCount}>{unreadCount}</Text>
            </View>
          )}
        </View>
      </View>
      
      <TouchableOpacity
        style={[styles.messageButton, { backgroundColor: colorScheme.secondary }]}
        onPress={onPress}
      >
        <MessageCircle size={20} color={colorScheme.primary} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: spacing.md,
    borderRadius: borderRadius.md,
    marginBottom: spacing.md,
    borderWidth: 2,
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  verificationBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 2,
  },
  contentContainer: {
    flex: 1,
    marginLeft: spacing.md,
    justifyContent: 'center',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  name: {
    fontSize: fontSizes.md,
    fontWeight: '600',
  },
  time: {
    fontSize: fontSizes.xs,
  },
  detailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  lastMessage: {
    fontSize: fontSizes.sm,
    flex: 1,
  },
  unreadBadge: {
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: spacing.sm,
  },
  unreadCount: {
    fontSize: fontSizes.xs,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  messageButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginLeft: spacing.sm,
  },
});