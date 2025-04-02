import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, spacing, fontSizes, borderRadius } from '@/constants/colors';
import { useAppStore } from '@/store/app-store';
import { Check } from 'lucide-react-native';

interface PricingCardProps {
  title: string;
  price: number;
  features: string[];
  isPopular?: boolean;
  onSelect: () => void;
  isSelected?: boolean;
}

export const PricingCard: React.FC<PricingCardProps> = ({
  title,
  price,
  features,
  isPopular = false,
  onSelect,
  isSelected = false,
}) => {
  const theme = useAppStore(state => state.theme);
  const colorScheme = colors[theme];

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colorScheme.card,
          borderColor: isSelected ? colorScheme.primary : colorScheme.border,
        },
      ]}
    >
      {isPopular && (
        <View
          style={[
            styles.popularBadge,
            { backgroundColor: colorScheme.primary },
          ]}
        >
          <Text style={styles.popularText}>Most Popular</Text>
        </View>
      )}

      <View style={styles.header}>
        <Text
          style={[
            styles.title,
            { color: isPopular ? colorScheme.primary : colorScheme.text },
          ]}
        >
          {title}
        </Text>
        <View style={styles.priceContainer}>
          <Text
            style={[
              styles.price,
              { color: colorScheme.text },
            ]}
          >
            ${price}
          </Text>
          <Text
            style={[
              styles.period,
              { color: colorScheme.placeholder },
            ]}
          >
            /month
          </Text>
        </View>
      </View>

      <View style={styles.featuresContainer}>
        {features.map((feature, index) => (
          <View key={index} style={styles.featureRow}>
            <Check size={16} color={colorScheme.primary} />
            <Text
              style={[
                styles.featureText,
                { color: colorScheme.text },
              ]}
            >
              {feature}
            </Text>
          </View>
        ))}
      </View>

      <TouchableOpacity
        style={[
          styles.selectButton,
          {
            backgroundColor: isSelected
              ? colorScheme.primary
              : colorScheme.secondary,
          },
        ]}
        onPress={onSelect}
      >
        <Text
          style={[
            styles.selectButtonText,
            {
              color: isSelected ? '#FFFFFF' : colorScheme.primary,
            },
          ]}
        >
          {isSelected ? 'Selected' : 'Select Plan'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: borderRadius.lg,
    borderWidth: 2,
    overflow: 'hidden',
    marginBottom: spacing.lg,
  },
  popularBadge: {
    paddingVertical: spacing.xs,
    alignItems: 'center',
  },
  popularText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: fontSizes.sm,
  },
  header: {
    padding: spacing.lg,
    alignItems: 'center',
  },
  title: {
    fontSize: fontSizes.lg,
    fontWeight: 'bold',
    marginBottom: spacing.sm,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  price: {
    fontSize: fontSizes.xxxl,
    fontWeight: 'bold',
  },
  period: {
    fontSize: fontSizes.md,
    marginBottom: spacing.xs,
  },
  featuresContainer: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  featureText: {
    marginLeft: spacing.sm,
    fontSize: fontSizes.md,
  },
  selectButton: {
    paddingVertical: spacing.md,
    alignItems: 'center',
  },
  selectButtonText: {
    fontSize: fontSizes.md,
    fontWeight: '600',
  },
});