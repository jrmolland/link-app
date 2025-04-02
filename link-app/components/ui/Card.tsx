import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { colors, borderRadius, spacing } from '@/constants/colors';
import { useAppStore } from '@/store/app-store';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  elevation?: 'none' | 'small' | 'medium' | 'large';
  padding?: 'none' | 'small' | 'medium' | 'large';
}

export const Card: React.FC<CardProps> = ({
  children,
  style,
  elevation = 'medium',
  padding = 'medium',
}) => {
  const theme = useAppStore(state => state.theme);
  const colorScheme = colors[theme];

  const getElevationStyle = () => {
    if (theme === 'dark') {
      // For dark theme, use border instead of shadow
      return {
        borderWidth: elevation === 'none' ? 0 : 1,
        borderColor: colorScheme.border,
      };
    }

    // For light theme, use shadow
    const elevationStyles: Record<string, ViewStyle> = {
      none: {},
      small: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 1,
      },
      medium: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
      },
      large: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
      },
    };

    return elevationStyles[elevation];
  };

  const getPaddingStyle = () => {
    const paddingStyles: Record<string, ViewStyle> = {
      none: { padding: 0 },
      small: { padding: spacing.sm },
      medium: { padding: spacing.md },
      large: { padding: spacing.lg },
    };

    return paddingStyles[padding];
  };

  return (
    <View
      style={[
        styles.card,
        { backgroundColor: colorScheme.card },
        getElevationStyle(),
        getPaddingStyle(),
        style,
      ]}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: borderRadius.md,
    overflow: 'hidden',
  },
});