import React from 'react';
import { View, StyleSheet, Image, ViewStyle } from 'react-native';
import { colors, borderRadius } from '@/constants/colors';
import { useAppStore } from '@/store/app-store';

interface AvatarProps {
  source: { uri: string } | number;
  size?: number;
  style?: ViewStyle;
  borderColor?: string;
  borderWidth?: number;
  verified?: boolean;
}

export const Avatar: React.FC<AvatarProps> = ({
  source,
  size = 40,
  style,
  borderColor,
  borderWidth = 0,
  verified = false,
}) => {
  const theme = useAppStore(state => state.theme);
  const colorScheme = colors[theme];

  return (
    <View style={style}>
      <View
        style={[
          styles.container,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
            borderWidth,
            borderColor: borderColor || colorScheme.border,
          },
        ]}
      >
        <Image
          source={source}
          style={[
            styles.image,
            {
              width: size - borderWidth * 2,
              height: size - borderWidth * 2,
              borderRadius: (size - borderWidth * 2) / 2,
            },
          ]}
        />
      </View>
      {verified && (
        <View
          style={[
            styles.verifiedBadge,
            {
              right: 0,
              bottom: 0,
              backgroundColor: colorScheme.primary,
              borderColor: colorScheme.background,
            },
          ]}
        >
          {/* Checkmark icon would go here */}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  image: {
    resizeMode: 'cover',
  },
  verifiedBadge: {
    position: 'absolute',
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
});