import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, fontSizes, borderRadius } from '@/constants/colors';
import { useAppStore } from '@/store/app-store';
import { VerificationStatus } from '@/types/user';
import { Shield, ShieldCheck, ShieldAlert } from 'lucide-react-native';

interface VerificationBadgeProps {
  status: VerificationStatus;
  size?: 'small' | 'medium' | 'large';
  showLabel?: boolean;
}

export const VerificationBadge: React.FC<VerificationBadgeProps> = ({
  status,
  size = 'medium',
  showLabel = false,
}) => {
  const theme = useAppStore(state => state.theme);
  const colorScheme = colors[theme];

  const getStatusConfig = () => {
    const configs = {
      'unverified': {
        icon: <ShieldAlert size={getIconSize()} color={colorScheme.error} />,
        label: 'Unverified',
        color: colorScheme.error,
      },
      'basic': {
        icon: <Shield size={getIconSize()} color={colorScheme.inactive} />,
        label: 'Basic Verification',
        color: colorScheme.inactive,
      },
      'verified': {
        icon: <ShieldCheck size={getIconSize()} color={colorScheme.success} />,
        label: 'Verified',
        color: colorScheme.success,
      },
      'professionally-verified': {
        icon: <ShieldCheck size={getIconSize()} color={colorScheme.primary} />,
        label: 'Pro Verified',
        color: colorScheme.primary,
      },
    };

    return configs[status];
  };

  const getIconSize = () => {
    const sizes = {
      small: 16,
      medium: 20,
      large: 24,
    };
    return sizes[size];
  };

  const getLabelSize = () => {
    const sizes = {
      small: fontSizes.xs,
      medium: fontSizes.sm,
      large: fontSizes.md,
    };
    return sizes[size];
  };

  const config = getStatusConfig();

  return (
    <View style={styles.container}>
      {config.icon}
      {showLabel && (
        <Text
          style={[
            styles.label,
            {
              color: config.color,
              fontSize: getLabelSize(),
              marginLeft: spacing.xs,
            },
          ]}
        >
          {config.label}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    fontWeight: '500',
  },
});