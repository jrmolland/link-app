import React, { useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing, fontSizes } from '@/constants/colors';
import { useAppStore } from '@/store/app-store';
import { useAuthStore } from '@/store/auth-store';
import { Button } from '@/components/ui/Button';
import { Link, Redirect } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Heart, Briefcase, Link as LinkIcon, ShieldCheck } from 'lucide-react-native';

export default function WelcomeScreen() {
  const theme = useAppStore(state => state.theme);
  const colorScheme = colors[theme];
  
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  const login = useAuthStore(state => state.login);
  
  // Auto-login for demo purposes
  useEffect(() => {
    if (!isAuthenticated) {
      login('demo@example.com', 'password');
    }
  }, []);
  
  if (isAuthenticated) {
    return <Redirect href="/(tabs)" />;
  }
  
  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#1A1A1A', '#2A2A2A']}
        style={styles.background}
      />
      
      <View style={styles.logoContainer}>
        <LinkIcon size={60} color="#D4AF37" />
        <Text style={styles.logoText}>Link</Text>
      </View>
      
      <View style={styles.content}>
        <Text style={styles.title}>Connect Meaningfully</Text>
        <Text style={styles.subtitle}>
          One app for both personal and professional connections
        </Text>
        
        <View style={styles.featuresContainer}>
          <View style={styles.featureItem}>
            <View style={styles.featureIcon}>
              <Heart size={24} color="#D4AF37" />
            </View>
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>Dating</Text>
              <Text style={styles.featureDescription}>
                Find meaningful connections based on shared interests and values
              </Text>
            </View>
          </View>
          
          <View style={styles.featureItem}>
            <View style={styles.featureIcon}>
              <Briefcase size={24} color="#D4AF37" />
            </View>
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>Networking</Text>
              <Text style={styles.featureDescription}>
                Connect with professionals in your industry to grow your career
              </Text>
            </View>
          </View>
          
          <View style={styles.featureItem}>
            <View style={styles.featureIcon}>
              <ShieldCheck size={24} color="#D4AF37" />
            </View>
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>Verified Profiles</Text>
              <Text style={styles.featureDescription}>
                Trust and safety with our comprehensive verification system
              </Text>
            </View>
          </View>
        </View>
      </View>
      
      <View style={styles.actionsContainer}>
        <Button
          title="Sign In"
          variant="primary"
          style={styles.signInButton}
          onPress={() => login('demo@example.com', 'password')}
        />
        
        <Link href="/signup" asChild>
          <TouchableOpacity>
            <Text style={styles.signUpText}>
              {"Don't have an account? "}
              <Text style={styles.signUpLink}>Sign Up</Text>
            </Text>
          </TouchableOpacity>
        </Link>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: spacing.xxl,
  },
  logoText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#D4AF37',
    marginTop: spacing.sm,
  },
  content: {
    flex: 1,
    padding: spacing.xl,
    justifyContent: 'center',
  },
  title: {
    fontSize: fontSizes.xxxl,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  subtitle: {
    fontSize: fontSizes.lg,
    color: '#CCCCCC',
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
  featuresContainer: {
    marginTop: spacing.xl,
  },
  featureItem: {
    flexDirection: 'row',
    marginBottom: spacing.lg,
  },
  featureIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(212, 175, 55, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: fontSizes.lg,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: spacing.xs,
  },
  featureDescription: {
    fontSize: fontSizes.md,
    color: '#CCCCCC',
  },
  actionsContainer: {
    padding: spacing.xl,
  },
  signInButton: {
    marginBottom: spacing.md,
  },
  signUpText: {
    fontSize: fontSizes.md,
    color: '#CCCCCC',
    textAlign: 'center',
  },
  signUpLink: {
    color: '#D4AF37',
    fontWeight: '600',
  },
});