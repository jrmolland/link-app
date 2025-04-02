import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { colors, spacing, fontSizes, borderRadius } from '@/constants/colors';
import { useAppStore } from '@/store/app-store';
import { Message } from '@/types/user';
import { Check, CheckCheck, Play } from 'lucide-react-native';

interface MessageBubbleProps {
  message: Message;
  isCurrentUser: boolean;
  showTime?: boolean;
  onMediaPress?: () => void;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({
  message,
  isCurrentUser,
  showTime = true,
  onMediaPress,
}) => {
  const theme = useAppStore(state => state.theme);
  const colorScheme = colors[theme];

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const renderContent = () => {
    switch (message.contentType) {
      case 'text':
        return (
          <Text style={[
            styles.messageText,
            { color: isCurrentUser ? '#FFFFFF' : colorScheme.text }
          ]}>
            {message.content}
          </Text>
        );
      
      case 'image':
        return (
          <TouchableOpacity
            onPress={onMediaPress}
            disabled={!onMediaPress}
          >
            <Image
              source={{ uri: message.mediaUrl }}
              style={styles.mediaImage}
              resizeMode="cover"
            />
          </TouchableOpacity>
        );
      
      case 'gif':
        return (
          <TouchableOpacity
            onPress={onMediaPress}
            disabled={!onMediaPress}
          >
            <Image
              source={{ uri: message.mediaUrl }}
              style={styles.mediaImage}
              resizeMode="cover"
            />
          </TouchableOpacity>
        );
      
      case 'voice':
        return (
          <TouchableOpacity
            style={[
              styles.voiceContainer,
              { backgroundColor: isCurrentUser ? 'rgba(255,255,255,0.2)' : colorScheme.secondary }
            ]}
            onPress={onMediaPress}
            disabled={!onMediaPress}
          >
            <Play size={16} color={isCurrentUser ? '#FFFFFF' : colorScheme.primary} />
            <Text style={[
              styles.voiceText,
              { color: isCurrentUser ? '#FFFFFF' : colorScheme.text }
            ]}>
              Voice message
            </Text>
          </TouchableOpacity>
        );
      
      default:
        return (
          <Text style={[
            styles.messageText,
            { color: isCurrentUser ? '#FFFFFF' : colorScheme.text }
          ]}>
            {message.content}
          </Text>
        );
    }
  };

  return (
    <View style={[
      styles.container,
      isCurrentUser ? styles.currentUserContainer : styles.otherUserContainer
    ]}>
      <View style={[
        styles.bubble,
        isCurrentUser
          ? [styles.currentUserBubble, { backgroundColor: colorScheme.primary }]
          : [styles.otherUserBubble, { backgroundColor: colorScheme.card, borderColor: colorScheme.border }]
      ]}>
        {renderContent()}
        
        {showTime && (
          <View style={styles.timeContainer}>
            <Text style={[
              styles.timeText,
              { color: isCurrentUser ? 'rgba(255,255,255,0.7)' : colorScheme.placeholder }
            ]}>
              {formatTime(message.createdAt)}
            </Text>
            
            {isCurrentUser && (
              <View style={styles.readStatus}>
                {message.isRead ? (
                  <CheckCheck size={12} color="rgba(255,255,255,0.7)" />
                ) : (
                  <Check size={12} color="rgba(255,255,255,0.7)" />
                )}
              </View>
            )}
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: spacing.xs,
    maxWidth: '80%',
  },
  currentUserContainer: {
    alignSelf: 'flex-end',
  },
  otherUserContainer: {
    alignSelf: 'flex-start',
  },
  bubble: {
    borderRadius: borderRadius.lg,
    padding: spacing.sm,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  currentUserBubble: {
    borderBottomRightRadius: 0,
  },
  otherUserBubble: {
    borderBottomLeftRadius: 0,
  },
  messageText: {
    fontSize: fontSizes.md,
  },
  mediaImage: {
    width: 200,
    height: 150,
    borderRadius: borderRadius.sm,
  },
  voiceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
    borderRadius: borderRadius.sm,
  },
  voiceText: {
    marginLeft: spacing.xs,
    fontSize: fontSizes.sm,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: spacing.xs,
  },
  timeText: {
    fontSize: fontSizes.xs,
  },
  readStatus: {
    marginLeft: spacing.xs,
  },
});