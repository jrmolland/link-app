import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing, fontSizes, borderRadius } from '@/constants/colors';
import { useAppStore } from '@/store/app-store';
import { useAuthStore } from '@/store/auth-store';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Stack, useRouter } from 'expo-router';
import { VerificationStatus } from '@/types/user';
import { 
  Shield, 
  ShieldCheck, 
  Camera, 
  Upload, 
  Briefcase,
  CheckCircle,
  AlertCircle
} from 'lucide-react-native';

export default function VerificationScreen() {
  const theme = useAppStore(state => state.theme);
  const colorScheme = colors[theme];
  const router = useRouter();
  
  const user = useAuthStore(state => state.user);
  const updateUser = useAuthStore(state => state.updateUser);
  
  const [loading, setLoading] = useState(false);
  
  const handleVerify = (status: VerificationStatus) => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      if (user) {
        updateUser({
          verificationStatus: status,
        });
        setLoading(false);
      }
    }, 1500);
  };
  
  const renderVerificationStatus = () => {
    if (!user) return null;
    
    switch (user.verificationStatus) {
      case 'unverified':
        return (
          <View style={styles.statusContainer}>
            <AlertCircle size={60} color={colorScheme.error} />
            <Text style={[styles.statusTitle, { color: colorScheme.text }]}>
              Not Verified
            </Text>
            <Text style={[styles.statusDescription, { color: colorScheme.placeholder }]}>
              Your profile is not verified. Complete verification to build trust with other users.
            </Text>
          </View>
        );
      
      case 'basic':
        return (
          <View style={styles.statusContainer}>
            <Shield size={60} color={colorScheme.inactive} />
            <Text style={[styles.statusTitle, { color: colorScheme.text }]}>
              Basic Verification
            </Text>
            <Text style={[styles.statusDescription, { color: colorScheme.placeholder }]}>
              Your profile has basic verification. Complete ID verification for full trust.
            </Text>
          </View>
        );
      
      case 'verified':
        return (
          <View style={styles.statusContainer}>
            <ShieldCheck size={60} color={colorScheme.success} />
            <Text style={[styles.statusTitle, { color: colorScheme.text }]}>
              Fully Verified
            </Text>
            <Text style={[styles.statusDescription, { color: colorScheme.placeholder }]}>
              Your profile is fully verified. You can now complete professional verification.
            </Text>
          </View>
        );
      
      case 'professionally-verified':
        return (
          <View style={styles.statusContainer}>
            <ShieldCheck size={60} color={colorScheme.primary} />
            <Text style={[styles.statusTitle, { color: colorScheme.text }]}>
              Professionally Verified
            </Text>
            <Text style={[styles.statusDescription, { color: colorScheme.placeholder }]}>
              Your profile is fully verified including professional credentials.
            </Text>
          </View>
        );
    }
  };
  
  return (
    <>
      <Stack.Screen 
        options={{
          title: 'Verification',
          headerStyle: {
            backgroundColor: colorScheme.background,
          },
          headerTintColor: colorScheme.text,
        }}
      />
      <SafeAreaView style={[styles.container, { backgroundColor: colorScheme.background }]}>
        <View style={styles.content}>
          {renderVerificationStatus()}
          
          <View style={styles.verificationOptions}>
            <Card style={styles.verificationCard}>
              <View style={styles.verificationHeader}>
                <Shield size={24} color={colorScheme.primary} />
                <Text style={[styles.verificationTitle, { color: colorScheme.text }]}>
                  Identity Verification
                </Text>
              </View>
              
              <Text style={[styles.verificationDescription, { color: colorScheme.placeholder }]}>
                Verify your identity with a government-issued ID and a selfie. This helps build trust with other users.
              </Text>
              
              <View style={styles.verificationActions}>
                <TouchableOpacity
                  style={[
                    styles.verificationAction,
                    { backgroundColor: colorScheme.secondary, borderColor: colorScheme.border }
                  ]}
                >
                  <Camera size={20} color={colorScheme.primary} />
                  <Text style={[styles.actionText, { color: colorScheme.text }]}>
                    Take Photo
                  </Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  style={[
                    styles.verificationAction,
                    { backgroundColor: colorScheme.secondary, borderColor: colorScheme.border }
                  ]}
                >
                  <Upload size={20} color={colorScheme.primary} />
                  <Text style={[styles.actionText, { color: colorScheme.text }]}>
                    Upload ID
                  </Text>
                </TouchableOpacity>
              </View>
              
              <Button
                title="Complete Verification"
                variant="primary"
                style={styles.verifyButton}
                loading={loading}
                onPress={() => handleVerify('verified')}
                disabled={user?.verificationStatus === 'verified' || user?.verificationStatus === 'professionally-verified'}
              />
              
              {(user?.verificationStatus === 'verified' || user?.verificationStatus === 'professionally-verified') && (
                <View style={styles.completedContainer}>
                  <CheckCircle size={20} color={colorScheme.success} />
                  <Text style={[styles.completedText, { color: colorScheme.success }]}>
                    Verification Complete
                  </Text>
                </View>
              )}
            </Card>
            
            <Card style={styles.verificationCard}>
              <View style={styles.verificationHeader}>
                <Briefcase size={24} color={colorScheme.primary} />
                <Text style={[styles.verificationTitle, { color: colorScheme.text }]}>
                  Professional Verification
                </Text>
              </View>
              
              <Text style={[styles.verificationDescription, { color: colorScheme.placeholder }]}>
                Verify your professional credentials to build credibility in the networking section. This includes job title and company verification.
              </Text>
              
              <View style={styles.verificationActions}>
                <TouchableOpacity
                  style={[
                    styles.verificationAction,
                    { backgroundColor: colorScheme.secondary, borderColor: colorScheme.border }
                  ]}
                >
                  <Upload size={20} color={colorScheme.primary} />
                  <Text style={[styles.actionText, { color: colorScheme.text }]}>
                    Upload Proof
                  </Text>
                </TouchableOpacity>
              </View>
              
              <Button
                title="Verify Professional Status"
                variant="primary"
                style={styles.verifyButton}
                loading={loading}
                onPress={() => handleVerify('professionally-verified')}
                disabled={user?.verificationStatus !== 'verified'}
              />
              
              {user?.verificationStatus === 'professionally-verified' && (
                <View style={styles.completedContainer}>
                  <CheckCircle size={20} color={colorScheme.success} />
                  <Text style={[styles.completedText, { color: colorScheme.success }]}>
                    Verification Complete
                  </Text>
                </View>
              )}
            </Card>
          </View>
        </View>
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
  statusContainer: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  statusTitle: {
    fontSize: fontSizes.xl,
    fontWeight: 'bold',
    marginTop: spacing.md,
    marginBottom: spacing.sm,
  },
  statusDescription: {
    fontSize: fontSizes.md,
    textAlign: 'center',
  },
  verificationOptions: {
    marginBottom: spacing.xl,
  },
  verificationCard: {
    marginBottom: spacing.lg,
  },
  verificationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  verificationTitle: {
    fontSize: fontSizes.lg,
    fontWeight: '600',
    marginLeft: spacing.sm,
  },
  verificationDescription: {
    fontSize: fontSizes.md,
    marginBottom: spacing.lg,
  },
  verificationActions: {
    flexDirection: 'row',
    marginBottom: spacing.lg,
  },
  verificationAction: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    borderRadius: borderRadius.md,
    marginRight: spacing.md,
    borderWidth: 1,
  },
  actionText: {
    fontSize: fontSizes.sm,
    fontWeight: '500',
    marginLeft: spacing.xs,
  },
  verifyButton: {
    marginBottom: spacing.md,
  },
  completedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  completedText: {
    fontSize: fontSizes.md,
    fontWeight: '500',
    marginLeft: spacing.xs,
  },
});