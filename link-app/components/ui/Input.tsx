import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  TextInputProps,
  TouchableOpacity,
} from 'react-native';
import { colors, borderRadius, spacing, fontSizes } from '@/constants/colors';
import { useAppStore } from '@/store/app-store';
import { Eye, EyeOff } from 'lucide-react-native';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  helper?: string;
  containerStyle?: ViewStyle;
  inputStyle?: ViewStyle;
  labelStyle?: TextStyle;
  errorStyle?: TextStyle;
  helperStyle?: TextStyle;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  secure?: boolean;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  helper,
  containerStyle,
  inputStyle,
  labelStyle,
  errorStyle,
  helperStyle,
  leftIcon,
  rightIcon,
  secure = false,
  ...props
}) => {
  const theme = useAppStore(state => state.theme);
  const colorScheme = colors[theme];
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(!secure);

  const handleFocus = () => {
    setIsFocused(true);
    if (props.onFocus) {
      props.onFocus(new Event('focus') as any);
    }
  };

  const handleBlur = () => {
    setIsFocused(false);
    if (props.onBlur) {
      props.onBlur(new Event('blur') as any);
    }
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const getBorderColor = () => {
    if (error) return colorScheme.error;
    if (isFocused) return colorScheme.primary;
    return colorScheme.border;
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <Text style={[styles.label, { color: colorScheme.text }, labelStyle]}>
          {label}
        </Text>
      )}
      <View
        style={[
          styles.inputContainer,
          {
            borderColor: getBorderColor(),
            backgroundColor: colorScheme.card,
          },
          inputStyle,
        ]}
      >
        {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}
        <TextInput
          style={[
            styles.input,
            {
              color: colorScheme.text,
              paddingLeft: leftIcon ? 0 : spacing.md,
              paddingRight: (rightIcon || secure) ? 0 : spacing.md,
            },
          ]}
          placeholderTextColor={colorScheme.placeholder}
          onFocus={handleFocus}
          onBlur={handleBlur}
          secureTextEntry={secure && !isPasswordVisible}
          {...props}
        />
        {secure ? (
          <TouchableOpacity
            style={styles.rightIcon}
            onPress={togglePasswordVisibility}
          >
            {isPasswordVisible ? (
              <Eye size={20} color={colorScheme.placeholder} />
            ) : (
              <EyeOff size={20} color={colorScheme.placeholder} />
            )}
          </TouchableOpacity>
        ) : (
          rightIcon && <View style={styles.rightIcon}>{rightIcon}</View>
        )}
      </View>
      {error && (
        <Text style={[styles.error, { color: colorScheme.error }, errorStyle]}>
          {error}
        </Text>
      )}
      {helper && !error && (
        <Text
          style={[styles.helper, { color: colorScheme.placeholder }, helperStyle]}
        >
          {helper}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.md,
  },
  label: {
    marginBottom: spacing.xs,
    fontSize: fontSizes.sm,
    fontWeight: '500',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: borderRadius.md,
    overflow: 'hidden',
  },
  input: {
    flex: 1,
    height: 48,
    paddingVertical: spacing.sm,
    fontSize: fontSizes.md,
  },
  leftIcon: {
    paddingLeft: spacing.md,
    paddingRight: spacing.xs,
  },
  rightIcon: {
    paddingRight: spacing.md,
    paddingLeft: spacing.xs,
  },
  error: {
    marginTop: spacing.xs,
    fontSize: fontSizes.sm,
  },
  helper: {
    marginTop: spacing.xs,
    fontSize: fontSizes.sm,
  },
});