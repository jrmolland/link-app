import React from 'react';
import { 
  TouchableOpacity, 
  Text, 
  StyleSheet, 
  ActivityIndicator,
  ViewStyle,
  TextStyle,
  TouchableOpacityProps
} from 'react-native';
import { colors, borderRadius, spacing } from '@/constants/colors';
import { useAppStore } from '@/store/app-store';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'text';
  size?: 'small' | 'medium' | 'large';
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  variant = 'primary',
  size = 'medium',
  loading = false,
  disabled = false,
  style,
  textStyle,
  leftIcon,
  rightIcon,
  ...props
}) => {
  const theme = useAppStore(state => state.theme);
  const colorScheme = colors[theme];

  const getButtonStyles = () => {
    const baseStyle: ViewStyle = {
      borderRadius: borderRadius.md,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
    };

    // Size styles
    const sizeStyles: Record<string, ViewStyle> = {
      small: {
        paddingVertical: spacing.xs,
        paddingHorizontal: spacing.md,
        minHeight: 36,
      },
      medium: {
        paddingVertical: spacing.sm,
        paddingHorizontal: spacing.lg,
        minHeight: 44,
      },
      large: {
        paddingVertical: spacing.md,
        paddingHorizontal: spacing.xl,
        minHeight: 52,
      },
    };

    // Variant styles
    const variantStyles: Record<string, ViewStyle> = {
      primary: {
        backgroundColor: colorScheme.primary,
        borderWidth: 0,
      },
      secondary: {
        backgroundColor: colorScheme.secondary,
        borderWidth: 0,
      },
      outline: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: colorScheme.primary,
      },
      text: {
        backgroundColor: 'transparent',
        borderWidth: 0,
        paddingHorizontal: 0,
      },
    };

    // State styles
    const stateStyles: ViewStyle = disabled
      ? { opacity: 0.5 }
      : {};

    return [
      baseStyle,
      sizeStyles[size],
      variantStyles[variant],
      stateStyles,
      style,
    ];
  };

  const getTextStyles = () => {
    const baseStyle: TextStyle = {
      fontWeight: '600',
    };

    // Size styles
    const sizeStyles: Record<string, TextStyle> = {
      small: {
        fontSize: 14,
      },
      medium: {
        fontSize: 16,
      },
      large: {
        fontSize: 18,
      },
    };

    // Variant styles
    const variantStyles: Record<string, TextStyle> = {
      primary: {
        color: '#FFFFFF',
      },
      secondary: {
        color: colorScheme.text,
      },
      outline: {
        color: colorScheme.primary,
      },
      text: {
        color: colorScheme.primary,
      },
    };

    return [
      baseStyle,
      sizeStyles[size],
      variantStyles[variant],
      textStyle,
    ];
  };

  return (
    <TouchableOpacity
      style={getButtonStyles()}
      disabled={disabled || loading}
      activeOpacity={0.7}
      {...props}
    >
      {loading ? (
        <ActivityIndicator 
          size="small" 
          color={variant === 'primary' ? '#FFFFFF' : colorScheme.primary} 
        />
      ) : (
        <>
          {leftIcon && <React.Fragment>{leftIcon}</React.Fragment>}
          <Text style={[getTextStyles(), leftIcon && { marginLeft: spacing.sm }, rightIcon && { marginRight: spacing.sm }]}>
            {title}
          </Text>
          {rightIcon && <React.Fragment>{rightIcon}</React.Fragment>}
        </>
      )}
    </TouchableOpacity>
  );
};