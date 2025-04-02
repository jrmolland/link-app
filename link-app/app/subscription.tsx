import React, { useState } from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing, fontSizes } from '@/constants/colors';
import { useAppStore } from '@/store/app-store';
import { useAuthStore } from '@/store/auth-store';
import { PricingCard } from '@/components/subscription/PricingCard';
import { Button } from '@/components/ui/Button';
import { Stack, useRouter } from 'expo-router';
import { subscriptionTiers } from '@/mocks/users';

export default function SubscriptionScreen() {
  const theme = useAppStore(state => state.theme);
  const colorScheme = colors[theme];
  const router = useRouter();
  
  const user = useAuthStore(state => state.user);
  const updateUser = useAuthStore(state => state.updateUser);
  
  const [selectedTier, setSelectedTier] = useState<'free' | 'dating' | 'networking'>(
    user?.premium.tier || 'free'
  );
  
  const handleSubscribe = () => {
    // In a real app, this would handle payment processing
    if (user) {
      updateUser({
        premium: {
          isActive: true,
          tier: selectedTier,
          expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days from now
        },
      });
      
      router.back();
    }
  };
  
  return (
    <>
      <Stack.Screen 
        options={{
          title: 'Subscription Plans',
          headerStyle: {
            backgroundColor: colorScheme.background,
          },
          headerTintColor: colorScheme.text,
        }}
      />
      <SafeAreaView style={[styles.container, { backgroundColor: colorScheme.background }]}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.content}>
            <Text style={[styles.title, { color: colorScheme.text }]}>
              Choose Your Plan
            </Text>
            <Text style={[styles.subtitle, { color: colorScheme.placeholder }]}>
              Upgrade your experience with premium features
            </Text>
            
            {subscriptionTiers.map((tier, index) => (
              <PricingCard
                key={index}
                title={tier.tier === 'free' 
                  ? 'Free' 
                  : tier.tier === 'dating'
                    ? 'Link+'
                    : 'Link Pro'}
                price={tier.price}
                features={tier.features}
                isPopular={tier.tier === 'dating'}
                onSelect={() => setSelectedTier(tier.tier as 'free' | 'dating' | 'networking')}
                isSelected={selectedTier === tier.tier}
              />
            ))}
            
            <Button
              title={selectedTier === user?.premium.tier 
                ? 'Continue with Current Plan' 
                : 'Subscribe Now'}
              variant="primary"
              style={styles.subscribeButton}
              onPress={handleSubscribe}
            />
            
            <Text style={[styles.disclaimer, { color: colorScheme.placeholder }]}>
              By subscribing, you agree to our Terms of Service and Privacy Policy. 
              Subscriptions automatically renew unless auto-renew is turned off at least 24 hours before the end of the current period.
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: spacing.lg,
  },
  title: {
    fontSize: fontSizes.xxl,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  subtitle: {
    fontSize: fontSizes.md,
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
  subscribeButton: {
    marginBottom: spacing.md,
  },
  disclaimer: {
    fontSize: fontSizes.xs,
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
});