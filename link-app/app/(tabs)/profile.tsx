import React from 'react';
import { View, StyleSheet, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing, fontSizes, borderRadius } from '@/constants/colors';
import { useAppStore } from '@/store/app-store';
import { useAuthStore } from '@/store/auth-store';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { VerificationBadge } from '@/components/ui/VerificationBadge';
import { ProfilePrompt } from '@/components/profile/ProfilePrompt';
import { Link } from 'expo-router';
import { 
  Settings, 
  Edit, 
  Shield, 
  CreditCard, 
  Heart, 
  Briefcase,
  MapPin,
  Calendar,
  LogOut,
  Moon,
  Sun
} from 'lucide-react-native';

export default function ProfileScreen() {
  const theme = useAppStore(state => state.theme);
  const setTheme = useAppStore(state => state.setTheme);
  const appMode = useAppStore(state => state.appMode);
  const colorScheme = colors[theme];
  
  const user = useAuthStore(state => state.user);
  const logout = useAuthStore(state => state.logout);
  
  if (!user) return null;
  
  const profilePhoto = user.photos.find(photo => photo.isProfile) || user.photos[0];
  
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };
  
  const renderDatingProfile = () => {
    return (
      <View style={styles.profileSection}>
        <View style={styles.sectionHeader}>
          <Heart size={20} color={colorScheme.primary} />
          <Text style={{ color: colorScheme.text, ...styles.sectionTitle }}>
            Dating Profile
          </Text>
        </View>
        
        <Card style={styles.bioCard}>
          <Text style={{ color: colorScheme.text, ...styles.bioText }}>
            {user.datingProfile.bio}
          </Text>
        </Card>
        
        <View style={styles.detailsContainer}>
          <View style={styles.detailItem}>
            <Text style={{ color: colorScheme.placeholder, ...styles.detailLabel }}>
              Looking for
            </Text>
            <Text style={{ color: colorScheme.text, ...styles.detailValue }}>
              {user.datingProfile.relationshipGoals.charAt(0).toUpperCase() + 
                user.datingProfile.relationshipGoals.slice(1)}
            </Text>
          </View>
          
          <View style={styles.detailItem}>
            <Text style={{ color: colorScheme.placeholder, ...styles.detailLabel }}>
              Education
            </Text>
            <Text style={{ color: colorScheme.text, ...styles.detailValue }}>
              {user.datingProfile.education || 'Not specified'}
            </Text>
          </View>
        </View>
        
        <View style={styles.interestsContainer}>
          <Text style={{ color: colorScheme.text, ...styles.interestsLabel }}>
            Interests
          </Text>
          <View style={styles.interestsList}>
            {user.datingProfile.interests.map((interest, index) => (
              <View 
                key={index}
                style={{
                  backgroundColor: colorScheme.secondary,
                  borderColor: colorScheme.border,
                  ...styles.interestBadge
                }}
              >
                <Text style={{ color: colorScheme.text, ...styles.interestText }}>
                  {interest}
                </Text>
              </View>
            ))}
          </View>
        </View>
        
        <View style={styles.promptsContainer}>
          <Text style={{ color: colorScheme.text, ...styles.promptsLabel }}>
            Prompts
          </Text>
          {user.datingProfile.prompts.map((prompt, index) => (
            <ProfilePrompt 
              key={index}
              prompt={prompt}
              showCommentButton={false}
            />
          ))}
        </View>
      </View>
    );
  };
  
  const renderNetworkingProfile = () => {
    return (
      <View style={styles.profileSection}>
        <View style={styles.sectionHeader}>
          <Briefcase size={20} color={colorScheme.primary} />
          <Text style={{ color: colorScheme.text, ...styles.sectionTitle }}>
            Professional Profile
          </Text>
        </View>
        
        <Card style={styles.bioCard}>
          <Text style={{ color: colorScheme.text, ...styles.bioText }}>
            {user.networkingProfile.professionalSummary}
          </Text>
        </Card>
        
        <View style={styles.detailsContainer}>
          <View style={styles.detailItem}>
            <Text style={{ color: colorScheme.placeholder, ...styles.detailLabel }}>
              Job Title
            </Text>
            <Text style={{ color: colorScheme.text, ...styles.detailValue }}>
              {user.networkingProfile.jobTitle}
            </Text>
          </View>
          
          <View style={styles.detailItem}>
            <Text style={{ color: colorScheme.placeholder, ...styles.detailLabel }}>
              Company
            </Text>
            <Text style={{ color: colorScheme.text, ...styles.detailValue }}>
              {user.networkingProfile.company}
            </Text>
          </View>
          
          <View style={styles.detailItem}>
            <Text style={{ color: colorScheme.placeholder, ...styles.detailLabel }}>
              Industry
            </Text>
            <Text style={{ color: colorScheme.text, ...styles.detailValue }}>
              {user.networkingProfile.industry}
            </Text>
          </View>
        </View>
        
        <View style={styles.skillsContainer}>
          <Text style={{ color: colorScheme.text, ...styles.skillsLabel }}>
            Skills
          </Text>
          <View style={styles.skillsList}>
            {user.networkingProfile.skills.map((skill, index) => (
              <View 
                key={index}
                style={{
                  backgroundColor: colorScheme.secondary,
                  borderColor: colorScheme.border,
                  ...styles.skillBadge
                }}
              >
                <Text style={{ color: colorScheme.text, ...styles.skillText }}>
                  {skill}
                </Text>
              </View>
            ))}
          </View>
        </View>
        
        <View style={styles.contactContainer}>
          <Text style={{ color: colorScheme.text, ...styles.contactLabel }}>
            Contact Preferences
          </Text>
          <View style={styles.contactList}>
            {user.networkingProfile.contactPreferences.map((preference, index) => (
              <Text 
                key={index}
                style={{ color: colorScheme.text, ...styles.contactItem }}
              >
                • {preference}
              </Text>
            ))}
          </View>
        </View>
      </View>
    );
  };
  
  return (
    <SafeAreaView style={{ backgroundColor: colorScheme.background, ...styles.container }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.headerActions}>
            <Link href="/settings" asChild>
              <TouchableOpacity>
                <Settings size={24} color={colorScheme.text} />
              </TouchableOpacity>
            </Link>
            <Link href="/edit-profile" asChild>
              <TouchableOpacity>
                <Edit size={24} color={colorScheme.text} />
              </TouchableOpacity>
            </Link>
          </View>
          
          <View style={styles.profileImageContainer}>
            <Image
              source={{ uri: profilePhoto.url }}
              style={styles.profileImage}
            />
            <View style={styles.verificationBadge}>
              <VerificationBadge 
                status={user.verificationStatus} 
                size="medium"
                showLabel
              />
            </View>
          </View>
          
          <Text style={{ color: colorScheme.text, ...styles.userName }}>
            {user.name}, {user.age}
          </Text>
          
          <View style={styles.userDetails}>
            <View style={styles.userDetailItem}>
              <MapPin size={16} color={colorScheme.primary} />
              <Text style={{ color: colorScheme.text, ...styles.userDetailText }}>
                {user.location.city}, {user.location.state}
              </Text>
            </View>
            
            <View style={styles.userDetailItem}>
              <Calendar size={16} color={colorScheme.primary} />
              <Text style={{ color: colorScheme.text, ...styles.userDetailText }}>
                Member since {new Date(user.createdAt).toLocaleDateString()}
              </Text>
            </View>
          </View>
          
          <View style={styles.subscriptionBadge}>
            <Text style={styles.subscriptionText}>
              {user.premium.tier === 'free' 
                ? 'Free Account' 
                : user.premium.tier === 'dating'
                  ? 'Link+ Member'
                  : 'Link Pro Member'}
            </Text>
          </View>
          
          {user.premium.tier !== 'networking' && (
            <Link href="/subscription" asChild>
              <Button
                title={user.premium.tier === 'free' 
                  ? 'Upgrade to Premium' 
                  : 'Upgrade to Link Pro'}
                variant="primary"
                style={styles.upgradeButton}
              />
            </Link>
          )}
        </View>
        
        <View style={styles.tabsContainer}>
          <TouchableOpacity
            style={{
              ...styles.tab,
              ...(appMode === 'dating' ? { ...styles.activeTab, borderColor: colorScheme.primary } : {})
            }}
            onPress={() => useAppStore.setState({ appMode: 'dating' })}
          >
            <Heart size={20} color={appMode === 'dating' ? colorScheme.primary : colorScheme.text} />
            <Text
              style={{
                ...styles.tabText,
                color: appMode === 'dating' ? colorScheme.primary : colorScheme.text
              }}
            >
              Dating
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={{
              ...styles.tab,
              ...(appMode === 'networking' ? { ...styles.activeTab, borderColor: colorScheme.primary } : {})
            }}
            onPress={() => useAppStore.setState({ appMode: 'networking' })}
            disabled={user.premium.tier !== 'networking'}
          >
            <Briefcase 
              size={20} 
              color={appMode === 'networking' 
                ? colorScheme.primary 
                : user.premium.tier === 'networking'
                  ? colorScheme.text
                  : colorScheme.inactive
              } 
            />
            <Text
              style={{
                ...styles.tabText,
                color: appMode === 'networking' 
                  ? colorScheme.primary 
                  : user.premium.tier === 'networking'
                    ? colorScheme.text
                    : colorScheme.inactive
              }}
            >
              Networking
            </Text>
          </TouchableOpacity>
        </View>
        
        {appMode === 'dating' ? renderDatingProfile() : renderNetworkingProfile()}
        
        <View style={styles.actionsContainer}>
          <TouchableOpacity
            style={{
              backgroundColor: colorScheme.card,
              borderColor: colorScheme.border,
              ...styles.actionButton
            }}
            onPress={toggleTheme}
          >
            {theme === 'light' ? (
              <Moon size={20} color={colorScheme.primary} />
            ) : (
              <Sun size={20} color={colorScheme.primary} />
            )}
            <Text style={{ color: colorScheme.text, ...styles.actionText }}>
              {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
            </Text>
          </TouchableOpacity>
          
          <Link href="/verification" asChild>
            <TouchableOpacity
              style={{
                backgroundColor: colorScheme.card,
                borderColor: colorScheme.border,
                ...styles.actionButton
              }}
            >
              <Shield size={20} color={colorScheme.primary} />
              <Text style={{ color: colorScheme.text, ...styles.actionText }}>
                Verification
              </Text>
            </TouchableOpacity>
          </Link>
          
          <Link href="/subscription" asChild>
            <TouchableOpacity
              style={{
                backgroundColor: colorScheme.card,
                borderColor: colorScheme.border,
                ...styles.actionButton
              }}
            >
              <CreditCard size={20} color={colorScheme.primary} />
              <Text style={{ color: colorScheme.text, ...styles.actionText }}>
                Subscription
              </Text>
            </TouchableOpacity>
          </Link>
          
          <TouchableOpacity
            style={{
              backgroundColor: colorScheme.card,
              borderColor: colorScheme.border,
              ...styles.actionButton
            }}
            onPress={logout}
          >
            <LogOut size={20} color={colorScheme.error} />
            <Text style={{ color: colorScheme.error, ...styles.actionText }}>
              Log Out
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    padding: spacing.lg,
  },
  headerActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: spacing.lg,
  },
  profileImageContainer: {
    position: 'relative',
    marginBottom: spacing.md,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  verificationBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 4,
  },
  userName: {
    fontSize: fontSizes.xxl,
    fontWeight: 'bold',
    marginBottom: spacing.sm,
  },
  userDetails: {
    marginBottom: spacing.md,
  },
  userDetailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  userDetailText: {
    marginLeft: spacing.xs,
    fontSize: fontSizes.md,
  },
  subscriptionBadge: {
    backgroundColor: '#D4AF37',
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.md,
    borderRadius: 20,
    marginBottom: spacing.md,
  },
  subscriptionText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: fontSizes.sm,
  },
  upgradeButton: {
    width: '100%',
  },
  tabsContainer: {
    flexDirection: 'row',
    marginBottom: spacing.lg,
    paddingHorizontal: spacing.lg,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.md,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomWidth: 2,
  },
  tabText: {
    fontSize: fontSizes.md,
    fontWeight: '500',
    marginLeft: spacing.xs,
  },
  profileSection: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontSize: fontSizes.lg,
    fontWeight: '600',
    marginLeft: spacing.xs,
  },
  bioCard: {
    marginBottom: spacing.lg,
  },
  bioText: {
    fontSize: fontSizes.md,
    lineHeight: 24,
  },
  detailsContainer: {
    marginBottom: spacing.lg,
  },
  detailItem: {
    marginBottom: spacing.md,
  },
  detailLabel: {
    fontSize: fontSizes.sm,
    marginBottom: spacing.xs,
  },
  detailValue: {
    fontSize: fontSizes.md,
    fontWeight: '500',
  },
  interestsContainer: {
    marginBottom: spacing.lg,
  },
  interestsLabel: {
    fontSize: fontSizes.md,
    fontWeight: '600',
    marginBottom: spacing.sm,
  },
  interestsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  interestBadge: {
    borderRadius: borderRadius.sm,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
    marginRight: spacing.xs,
    marginBottom: spacing.xs,
    borderWidth: 1,
  },
  interestText: {
    fontSize: fontSizes.sm,
  },
  promptsContainer: {
    marginBottom: spacing.lg,
  },
  promptsLabel: {
    fontSize: fontSizes.md,
    fontWeight: '600',
    marginBottom: spacing.sm,
  },
  skillsContainer: {
    marginBottom: spacing.lg,
  },
  skillsLabel: {
    fontSize: fontSizes.md,
    fontWeight: '600',
    marginBottom: spacing.sm,
  },
  skillsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  skillBadge: {
    borderRadius: borderRadius.sm,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
    marginRight: spacing.xs,
    marginBottom: spacing.xs,
    borderWidth: 1,
  },
  skillText: {
    fontSize: fontSizes.sm,
  },
  contactContainer: {
    marginBottom: spacing.lg,
  },
  contactLabel: {
    fontSize: fontSizes.md,
    fontWeight: '600',
    marginBottom: spacing.sm,
  },
  contactList: {
    marginLeft: spacing.sm,
  },
  contactItem: {
    fontSize: fontSizes.md,
    marginBottom: spacing.xs,
  },
  actionsContainer: {
    padding: spacing.lg,
    marginBottom: spacing.xl,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    borderRadius: borderRadius.md,
    marginBottom: spacing.md,
    borderWidth: 1,
  },
  actionText: {
    fontSize: fontSizes.md,
    fontWeight: '500',
    marginLeft: spacing.md,
  },
});