import React, { useState } from 'react';
import { View, StyleSheet, Text, ScrollView, Switch, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing, fontSizes, borderRadius } from '@/constants/colors';
import { useAppStore } from '@/store/app-store';
import { useAuthStore } from '@/store/auth-store';
import { Stack, useRouter } from 'expo-router';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { 
  Bell, 
  Lock, 
  Eye, 
  HelpCircle, 
  FileText, 
  LogOut,
  ChevronRight,
  Moon,
  Sun,
  Trash2,
  Globe,
  MessageCircle,
  Heart
} from 'lucide-react-native';

export default function SettingsScreen() {
  const theme = useAppStore(state => state.theme);
  const setTheme = useAppStore(state => state.setTheme);
  const colorScheme = colors[theme];
  const router = useRouter();
  
  const user = useAuthStore(state => state.user);
  const logout = useAuthStore(state => state.logout);
  
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [emailNotificationsEnabled, setEmailNotificationsEnabled] = useState(true);
  const [locationEnabled, setLocationEnabled] = useState(true);
  const [showOnlineStatus, setShowOnlineStatus] = useState(true);
  const [showReadReceipts, setShowReadReceipts] = useState(true);
  const [showDistanceInProfile, setShowDistanceInProfile] = useState(true);
  
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };
  
  const handleLogout = () => {
    logout();
    router.replace('/');
  };
  
  return (
    <>
      <Stack.Screen 
        options={{
          title: 'Settings',
          headerStyle: {
            backgroundColor: colorScheme.background,
          },
          headerTintColor: colorScheme.text,
        }}
      />
      <SafeAreaView style={[styles.container, { backgroundColor: colorScheme.background }]}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colorScheme.text }]}>
              Account
            </Text>
            
            <Card style={styles.card}>
              <TouchableOpacity style={styles.settingItem}>
                <View style={styles.settingInfo}>
                  <Text style={[styles.settingTitle, { color: colorScheme.text }]}>
                    Edit Profile
                  </Text>
                  <Text style={[styles.settingDescription, { color: colorScheme.placeholder }]}>
                    Update your photos and information
                  </Text>
                </View>
                <ChevronRight size={20} color={colorScheme.placeholder} />
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.settingItem}>
                <View style={styles.settingInfo}>
                  <Text style={[styles.settingTitle, { color: colorScheme.text }]}>
                    Phone Number
                  </Text>
                  <Text style={[styles.settingDescription, { color: colorScheme.placeholder }]}>
                    Verify or change your phone number
                  </Text>
                </View>
                <ChevronRight size={20} color={colorScheme.placeholder} />
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.settingItem}>
                <View style={styles.settingInfo}>
                  <Text style={[styles.settingTitle, { color: colorScheme.text }]}>
                    Email
                  </Text>
                  <Text style={[styles.settingDescription, { color: colorScheme.placeholder }]}>
                    {user?.email || 'demo@example.com'}
                  </Text>
                </View>
                <ChevronRight size={20} color={colorScheme.placeholder} />
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.settingItem, styles.settingItemLast]}
                onPress={toggleTheme}
              >
                <View style={styles.settingInfo}>
                  <Text style={[styles.settingTitle, { color: colorScheme.text }]}>
                    {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
                  </Text>
                  <Text style={[styles.settingDescription, { color: colorScheme.placeholder }]}>
                    {theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme'}
                  </Text>
                </View>
                {theme === 'light' ? (
                  <Moon size={20} color={colorScheme.primary} />
                ) : (
                  <Sun size={20} color={colorScheme.primary} />
                )}
              </TouchableOpacity>
            </Card>
          </View>
          
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colorScheme.text }]}>
              Notifications
            </Text>
            
            <Card style={styles.card}>
              <View style={styles.settingItem}>
                <View style={styles.settingInfo}>
                  <Text style={[styles.settingTitle, { color: colorScheme.text }]}>
                    Push Notifications
                  </Text>
                  <Text style={[styles.settingDescription, { color: colorScheme.placeholder }]}>
                    Receive notifications on your device
                  </Text>
                </View>
                <Switch
                  value={notificationsEnabled}
                  onValueChange={setNotificationsEnabled}
                  trackColor={{ false: colorScheme.inactive, true: colorScheme.primary }}
                  thumbColor="#FFFFFF"
                />
              </View>
              
              <View style={styles.settingItem}>
                <View style={styles.settingInfo}>
                  <Text style={[styles.settingTitle, { color: colorScheme.text }]}>
                    Email Notifications
                  </Text>
                  <Text style={[styles.settingDescription, { color: colorScheme.placeholder }]}>
                    Receive updates via email
                  </Text>
                </View>
                <Switch
                  value={emailNotificationsEnabled}
                  onValueChange={setEmailNotificationsEnabled}
                  trackColor={{ false: colorScheme.inactive, true: colorScheme.primary }}
                  thumbColor="#FFFFFF"
                />
              </View>
              
              <TouchableOpacity style={[styles.settingItem, styles.settingItemLast]}>
                <View style={styles.settingInfo}>
                  <Text style={[styles.settingTitle, { color: colorScheme.text }]}>
                    Notification Preferences
                  </Text>
                  <Text style={[styles.settingDescription, { color: colorScheme.placeholder }]}>
                    Choose which events trigger notifications
                  </Text>
                </View>
                <ChevronRight size={20} color={colorScheme.placeholder} />
              </TouchableOpacity>
            </Card>
          </View>
          
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colorScheme.text }]}>
              Privacy
            </Text>
            
            <Card style={styles.card}>
              <View style={styles.settingItem}>
                <View style={styles.settingInfo}>
                  <Text style={[styles.settingTitle, { color: colorScheme.text }]}>
                    Location Services
                  </Text>
                  <Text style={[styles.settingDescription, { color: colorScheme.placeholder }]}>
                    Allow app to access your location
                  </Text>
                </View>
                <Switch
                  value={locationEnabled}
                  onValueChange={setLocationEnabled}
                  trackColor={{ false: colorScheme.inactive, true: colorScheme.primary }}
                  thumbColor="#FFFFFF"
                />
              </View>
              
              <View style={styles.settingItem}>
                <View style={styles.settingInfo}>
                  <Text style={[styles.settingTitle, { color: colorScheme.text }]}>
                    Show Online Status
                  </Text>
                  <Text style={[styles.settingDescription, { color: colorScheme.placeholder }]}>
                    Let others see when you're active
                  </Text>
                </View>
                <Switch
                  value={showOnlineStatus}
                  onValueChange={setShowOnlineStatus}
                  trackColor={{ false: colorScheme.inactive, true: colorScheme.primary }}
                  thumbColor="#FFFFFF"
                />
              </View>
              
              <View style={styles.settingItem}>
                <View style={styles.settingInfo}>
                  <Text style={[styles.settingTitle, { color: colorScheme.text }]}>
                    Read Receipts
                  </Text>
                  <Text style={[styles.settingDescription, { color: colorScheme.placeholder }]}>
                    Let others know when you've read their messages
                  </Text>
                </View>
                <Switch
                  value={showReadReceipts}
                  onValueChange={setShowReadReceipts}
                  trackColor={{ false: colorScheme.inactive, true: colorScheme.primary }}
                  thumbColor="#FFFFFF"
                />
              </View>
              
              <View style={[styles.settingItem, styles.settingItemLast]}>
                <View style={styles.settingInfo}>
                  <Text style={[styles.settingTitle, { color: colorScheme.text }]}>
                    Show Distance in Profile
                  </Text>
                  <Text style={[styles.settingDescription, { color: colorScheme.placeholder }]}>
                    Display approximate distance on your profile
                  </Text>
                </View>
                <Switch
                  value={showDistanceInProfile}
                  onValueChange={setShowDistanceInProfile}
                  trackColor={{ false: colorScheme.inactive, true: colorScheme.primary }}
                  thumbColor="#FFFFFF"
                />
              </View>
            </Card>
          </View>
          
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colorScheme.text }]}>
              Support & Legal
            </Text>
            
            <Card style={styles.card}>
              <TouchableOpacity style={styles.settingItem}>
                <View style={styles.settingItemWithIcon}>
                  <HelpCircle size={20} color={colorScheme.primary} />
                  <Text style={[styles.settingTitle, { color: colorScheme.text, marginLeft: spacing.sm }]}>
                    Help & Support
                  </Text>
                </View>
                <ChevronRight size={20} color={colorScheme.placeholder} />
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.settingItem}>
                <View style={styles.settingItemWithIcon}>
                  <FileText size={20} color={colorScheme.primary} />
                  <Text style={[styles.settingTitle, { color: colorScheme.text, marginLeft: spacing.sm }]}>
                    Terms of Service
                  </Text>
                </View>
                <ChevronRight size={20} color={colorScheme.placeholder} />
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.settingItem}>
                <View style={styles.settingItemWithIcon}>
                  <Lock size={20} color={colorScheme.primary} />
                  <Text style={[styles.settingTitle, { color: colorScheme.text, marginLeft: spacing.sm }]}>
                    Privacy Policy
                  </Text>
                </View>
                <ChevronRight size={20} color={colorScheme.placeholder} />
              </TouchableOpacity>
              
              <TouchableOpacity style={[styles.settingItem, styles.settingItemLast]}>
                <View style={styles.settingItemWithIcon}>
                  <Bell size={20} color={colorScheme.primary} />
                  <Text style={[styles.settingTitle, { color: colorScheme.text, marginLeft: spacing.sm }]}>
                    Community Guidelines
                  </Text>
                </View>
                <ChevronRight size={20} color={colorScheme.placeholder} />
              </TouchableOpacity>
            </Card>
          </View>
          
          <View style={styles.section}>
            <Card style={styles.card}>
              <TouchableOpacity 
                style={styles.settingItem}
                onPress={handleLogout}
              >
                <View style={styles.settingItemWithIcon}>
                  <LogOut size={20} color={colorScheme.error} />
                  <Text style={[styles.settingTitle, { color: colorScheme.error, marginLeft: spacing.sm }]}>
                    Log Out
                  </Text>
                </View>
              </TouchableOpacity>
              
              <TouchableOpacity style={[styles.settingItem, styles.settingItemLast]}>
                <View style={styles.settingItemWithIcon}>
                  <Trash2 size={20} color={colorScheme.error} />
                  <Text style={[styles.settingTitle, { color: colorScheme.error, marginLeft: spacing.sm }]}>
                    Delete Account
                  </Text>
                </View>
              </TouchableOpacity>
            </Card>
          </View>
          
          <View style={styles.versionContainer}>
            <Text style={[styles.versionText, { color: colorScheme.placeholder }]}>
              Link v1.0.0
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
  section: {
    marginBottom: spacing.lg,
    paddingHorizontal: spacing.lg,
  },
  sectionTitle: {
    fontSize: fontSizes.md,
    fontWeight: '600',
    marginBottom: spacing.sm,
    marginLeft: spacing.xs,
  },
  card: {
    padding: 0,
    overflow: 'hidden',
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  settingItemLast: {
    borderBottomWidth: 0,
  },
  settingInfo: {
    flex: 1,
    marginRight: spacing.md,
  },
  settingTitle: {
    fontSize: fontSizes.md,
    fontWeight: '500',
    marginBottom: 2,
  },
  settingDescription: {
    fontSize: fontSizes.sm,
  },
  settingItemWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  versionContainer: {
    alignItems: 'center',
    marginVertical: spacing.xl,
  },
  versionText: {
    fontSize: fontSizes.sm,
  },
});