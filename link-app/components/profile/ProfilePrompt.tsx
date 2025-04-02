import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, spacing, fontSizes, borderRadius } from '@/constants/colors';
import { useAppStore } from '@/store/app-store';
import { UserPrompt } from '@/types/user';
import { MessageCircle } from 'lucide-react-native';

interface ProfilePromptProps {
  prompt: UserPrompt;
  onComment?: () => void;
  showCommentButton?: boolean;
}

export const ProfilePrompt: React.FC<ProfilePromptProps> = ({
  prompt,
  onComment,
  showCommentButton = true,
}) => {
  const theme = useAppStore(state => state.theme);
  const colorScheme = colors[theme];

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colorScheme.card,
          borderColor: colorScheme.border,
        },
      ]}
    >
      <Text style={[styles.question, { color: colorScheme.primary }]}>
        {prompt.question}
      </Text>
      <Text style={[styles.answer, { color: colorScheme.text }]}>
        {prompt.answer}
      </Text>
      
      {showCommentButton && onComment && (
        <TouchableOpacity
          style={[
            styles.commentButton,
            { backgroundColor: colorScheme.secondary },
          ]}
          onPress={onComment}
        >
          <MessageCircle size={16} color={colorScheme.primary} />
          <Text style={[styles.commentText, { color: colorScheme.primary }]}>
            Comment
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderWidth: 1,
  },
  question: {
    fontSize: fontSizes.md,
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  answer: {
    fontSize: fontSizes.md,
    marginBottom: spacing.sm,
  },
  commentButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
    borderRadius: borderRadius.sm,
  },
  commentText: {
    fontSize: fontSizes.sm,
    fontWeight: '500',
    marginLeft: spacing.xs,
  },
});