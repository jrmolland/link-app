import React from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { colors, borderRadius, spacing, fontSizes } from '@/constants/colors';
import { useAppStore } from '@/store/app-store';

interface BadgeProps {
  label: string;
  variant?: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info';
  size?: 'small' | 'medium' | 'large';
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const Badge: React.FC<BadgeProps> = ({
  label,
  variant = 'primary',
  size = 'medium',
  style,
  textStyle,
}) => {
  const theme = useAppStore(state => state.theme);
  const colorScheme = colors[theme];

  const getVariantStyle = () => {
    const variantStyles: Record<string, { bg: string; text: string }> = {
      primary: {
        bg: colorScheme.primary,
        text: '#FFFFFF',
      },
      secondary: {
        bg: colorScheme.secondary,
        text: colorScheme.text,
      },
      success: {
        bg: colorScheme.success,
        text: '#FFFFFF',
      },
      error: {
        bg: colorScheme.error,
        text: '#FFFFFF',
      },
      warning: {
        bg: '#FFC107',
        text: '#000000',
      },
      info: {
        bg: '#2196F3',
        text: '#FFFFFF',
      },
    };

    return variantStyles[variant];
  };

  const getSizeStyle = () => {
    const sizeStyles: Record<string, { container: ViewStyle; text: TextStyle }> = {
      small: {
        container: {
          paddingVertical: spacing.xs / 2,
          paddingHorizontal: spacing.xs,
          borderRadius: borderRadius.sm,
        },
        text: {
          fontSize: fontSizes.xs,
        },
      },
      medium: {
        container: {
          paddingVertical: spacing.xs,
          paddingHorizontal: spacing.sm,
          borderRadius: borderRadius.md,
        },
        text: {
          fontSize: fontSizes.sm,
        },
      },
      large: {
        container: {
          paddingVertical: spacing.sm,
          paddingHorizontal: spacing.md,
          borderRadius: borderRadius.lg,
        },
        text: {
          fontSize: fontSizes.md,
        },
      },
    };

    return sizeStyles[size];
  };

  const variantStyle = getVariantStyle();
  const sizeStyle = getSizeStyle();

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: variantStyle.bg },
        sizeStyle.container,
        style,
      ]}
    >
      <Text
        style={[
          styles.text,
          { color: variantStyle.text },
          sizeStyle.text,
          textStyle,
        ]}
        numberOfLines={1}
      >
        {label}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-start',
  },
  text: {
    fontWeight: '600',
  },
});