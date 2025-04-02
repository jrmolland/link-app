import React, { useState, useRef, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  TouchableOpacity, 
  Dimensions, 
  ScrollView,
  Animated
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { User } from '@/types/user';
import { colors, spacing, fontSizes, borderRadius } from '@/constants/colors';
import { useAppStore } from '@/store/app-store';
import { VerificationBadge } from '@/components/ui/VerificationBadge';
import { MapPin, Briefcase, Heart, MessageCircle, X, ChevronDown } from 'lucide-react-native';
import { ProfilePrompt } from './ProfilePrompt';

interface ProfileCardProps {
  user: User;
  onLike?: () => void;
  onPass?: () => void;
  onComment?: (type: 'photo' | 'prompt', id: string) => void;
  showActions?: boolean;
  animateIn?: boolean;
}

const { width, height } = Dimensions.get('window');
const SCREEN_WIDTH = width;
const SCREEN_HEIGHT = height;

export const ProfileCard: React.FC<ProfileCardProps> = ({
  user,
  onLike,
  onPass,
  onComment,
  showActions = true,
  animateIn = false,
}) => {
  const theme = useAppStore(state => state.theme);
  const appMode = useAppStore(state => state.appMode);
  const colorScheme = colors[theme];
  
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [showDetails, setShowDetails] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);
  
  // Animation values
  const slideAnim = useRef(new Animated.Value(animateIn ? SCREEN_WIDTH : 0)).current;
  const opacityAnim = useRef(new Animated.Value(animateIn ? 0 : 1)).current;
  
  useEffect(() => {
    if (animateIn) {
      // Animate the card sliding in from the right
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [animateIn]);
  
  const handleNextPhoto = () => {
    if (currentPhotoIndex < user.photos.length - 1) {
      setCurrentPhotoIndex(currentPhotoIndex + 1);
    }
  };
  
  const handlePrevPhoto = () => {
    if (currentPhotoIndex > 0) {
      setCurrentPhotoIndex(currentPhotoIndex - 1);
    }
  };
  
  const handlePhotoIndicatorPress = (index: number) => {
    setCurrentPhotoIndex(index);
  };
  
  const toggleDetails = () => {
    setShowDetails(!showDetails);
    if (!showDetails && scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ y: 300, animated: true });
    } else if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ y: 0, animated: true });
    }
  };
  
  const renderPhotoIndicators = () => {
    return (
      <View style={styles.photoIndicators}>
        {user.photos.map((_, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.photoIndicator,
              index === currentPhotoIndex && { backgroundColor: colorScheme.primary }
            ]}
            onPress={() => handlePhotoIndicatorPress(index)}
          />
        ))}
      </View>
    );
  };
  
  const renderProfilePhoto = () => {
    const currentPhoto = user.photos[currentPhotoIndex];
    
    return (
      <View style={styles.photoContainer}>
        <Image
          source={{ uri: currentPhoto.url }}
          style={styles.photo}
          resizeMode="cover"
        />
        
        <TouchableOpacity
          style={[styles.photoNavButton, styles.leftPhotoNav]}
          onPress={handlePrevPhoto}
          disabled={currentPhotoIndex === 0}
        >
          <View style={[styles.photoNavIndicator, currentPhotoIndex === 0 && { opacity: 0 }]} />
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.photoNavButton, styles.rightPhotoNav]}
          onPress={handleNextPhoto}
          disabled={currentPhotoIndex === user.photos.length - 1}
        >
          <View style={[styles.photoNavIndicator, currentPhotoIndex === user.photos.length - 1 && { opacity: 0 }]} />
        </TouchableOpacity>
        
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.7)']}
          style={styles.photoGradient}
        />
        
        <View style={styles.photoContent}>
          <View style={styles.userInfo}>
            <View style={styles.nameRow}>
              <Text style={styles.name}>{user.name}</Text>
              {appMode === 'dating' && user.age && (
                <Text style={styles.age}>, {user.age}</Text>
              )}
              <View style={styles.verificationBadge}>
                <VerificationBadge status={user.verificationStatus} size="small" />
              </View>
            </View>
            
            <View style={styles.detailsRow}>
              <View style={styles.locationContainer}>
                <MapPin size={16} color="#FFFFFF" />
                <Text style={styles.location}>
                  {user.location.city}, {user.location.distance && `${user.location.distance} km`}
                </Text>
              </View>
              
              {appMode === 'networking' && (
                <View style={styles.jobContainer}>
                  <Briefcase size={16} color="#FFFFFF" />
                  <Text style={styles.job}>
                    {user.networkingProfile.jobTitle} at {user.networkingProfile.company}
                  </Text>
                </View>
              )}
            </View>
          </View>
          
          <TouchableOpacity 
            style={styles.showMoreButton}
            onPress={toggleDetails}
          >
            <ChevronDown size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
        
        {renderPhotoIndicators()}
      </View>
    );
  };

  const renderPrompts = () => {
    if (appMode === 'dating' && user.datingProfile.prompts.length > 0) {
      return (
        <View style={styles.promptsContainer}>
          {user.datingProfile.prompts.map((prompt, index) => (
            <ProfilePrompt
              key={index}
              prompt={prompt}
              onComment={() => onComment && onComment('prompt', index.toString())}
              showCommentButton={!!onComment}
            />
          ))}
        </View>
      );
    }
    
    if (appMode === 'networking') {
      return (
        <View style={styles.promptsContainer}>
          <View
            style={[
              styles.promptCard,
              { backgroundColor: colorScheme.card, borderColor: colorScheme.border }
            ]}
          >
            <Text style={[styles.promptQuestion, { color: colorScheme.primary }]}>
              Professional Summary
            </Text>
            <Text style={[styles.promptAnswer, { color: colorScheme.text }]}>
              {user.networkingProfile.professionalSummary}
            </Text>
          </View>
          
          <View
            style={[
              styles.promptCard,
              { backgroundColor: colorScheme.card, borderColor: colorScheme.border }
            ]}
          >
            <Text style={[styles.promptQuestion, { color: colorScheme.primary }]}>
              Skills
            </Text>
            <View style={styles.skillsContainer}>
              {user.networkingProfile.skills.map((skill, index) => (
                <View 
                  key={index}
                  style={[
                    styles.skillBadge,
                    { backgroundColor: colorScheme.secondary, borderColor: colorScheme.border }
                  ]}
                >
                  <Text style={[styles.skillText, { color: colorScheme.text }]}>
                    {skill}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      );
    }
    
    return null;
  };

  const renderActions = () => {
    if (!showActions) return null;
    
    return (
      <View style={styles.actionsContainer}>
        <TouchableOpacity
          style={[styles.actionButton, styles.passButton]}
          onPress={onPass}
        >
          <X size={24} color="#FF3B30" />
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.actionButton, styles.commentButton]}
          onPress={() => onComment && onComment('photo', user.photos[currentPhotoIndex].id)}
        >
          <MessageCircle size={24} color={colorScheme.primary} />
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.actionButton, styles.likeButton]}
          onPress={onLike}
        >
          <Heart size={24} color="#34C759" />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <Animated.View
      style={[
        styles.animatedContainer,
        {
          transform: [{ translateX: slideAnim }],
          opacity: opacityAnim,
        },
      ]}
    >
      <ScrollView
        ref={scrollViewRef}
        style={[styles.container, { backgroundColor: colorScheme.background }]}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        {renderProfilePhoto()}
        
        <View style={[styles.detailsContainer, { backgroundColor: colorScheme.background }]}>
          {appMode === 'dating' && (
            <View style={styles.bioContainer}>
              <Text style={[styles.bioTitle, { color: colorScheme.text }]}>About</Text>
              <Text style={[styles.bioText, { color: colorScheme.text }]}>
                {user.datingProfile.bio}
              </Text>
              
              <View style={styles.interestsContainer}>
                <Text style={[styles.interestsTitle, { color: colorScheme.text }]}>Interests</Text>
                <View style={styles.interestsList}>
                  {user.datingProfile.interests.map((interest, index) => (
                    <View 
                      key={index}
                      style={[
                        styles.interestBadge,
                        { backgroundColor: colorScheme.secondary, borderColor: colorScheme.border }
                      ]}
                    >
                      <Text style={[styles.interestText, { color: colorScheme.text }]}>
                        {interest}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
              
              <View style={styles.basicInfoContainer}>
                <View style={styles.infoItem}>
                  <Text style={[styles.infoLabel, { color: colorScheme.placeholder }]}>
                    Looking for
                  </Text>
                  <Text style={[styles.infoValue, { color: colorScheme.text }]}>
                    {user.datingProfile.relationshipGoals.charAt(0).toUpperCase() + 
                      user.datingProfile.relationshipGoals.slice(1)}
                  </Text>
                </View>
                
                {user.datingProfile.education && (
                  <View style={styles.infoItem}>
                    <Text style={[styles.infoLabel, { color: colorScheme.placeholder }]}>
                      Education
                    </Text>
                    <Text style={[styles.infoValue, { color: colorScheme.text }]}>
                      {user.datingProfile.education}
                    </Text>
                  </View>
                )}
                
                {user.datingProfile.height && (
                  <View style={styles.infoItem}>
                    <Text style={[styles.infoLabel, { color: colorScheme.placeholder }]}>
                      Height
                    </Text>
                    <Text style={[styles.infoValue, { color: colorScheme.text }]}>
                      {Math.floor(user.datingProfile.height / 100)}'{Math.round((user.datingProfile.height % 100) * 0.393701)}"
                    </Text>
                  </View>
                )}
              </View>
            </View>
          )}
          
          {renderPrompts()}
          {renderActions()}
        </View>
      </ScrollView>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  animatedContainer: {
    flex: 1,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  },
  container: {
    flex: 1,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  },
  photoContainer: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT * 0.7,
    position: 'relative',
  },
  photo: {
    width: '100%',
    height: '100%',
  },
  photoNavButton: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: '30%',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  leftPhotoNav: {
    left: 0,
  },
  rightPhotoNav: {
    right: 0,
  },
  photoNavIndicator: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    opacity: 0.5,
  },
  photoGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '40%',
  },
  photoContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: spacing.md,
  },
  userInfo: {
    marginBottom: spacing.md,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  name: {
    fontSize: fontSizes.xxl,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  age: {
    fontSize: fontSizes.xxl,
    color: '#FFFFFF',
  },
  verificationBadge: {
    marginLeft: spacing.sm,
  },
  detailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: spacing.md,
    marginBottom: spacing.xs,
  },
  location: {
    fontSize: fontSizes.md,
    color: '#FFFFFF',
    marginLeft: spacing.xs,
  },
  jobContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  job: {
    fontSize: fontSizes.md,
    color: '#FFFFFF',
    marginLeft: spacing.xs,
  },
  photoIndicators: {
    position: 'absolute',
    top: spacing.lg,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  photoIndicator: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255,255,255,0.5)',
    marginHorizontal: 3,
  },
  showMoreButton: {
    alignSelf: 'center',
    padding: spacing.sm,
  },
  detailsContainer: {
    padding: spacing.lg,
    paddingBottom: 100, // Extra padding at bottom for actions
  },
  bioContainer: {
    marginBottom: spacing.lg,
  },
  bioTitle: {
    fontSize: fontSizes.lg,
    fontWeight: '600',
    marginBottom: spacing.sm,
  },
  bioText: {
    fontSize: fontSizes.md,
    lineHeight: 24,
    marginBottom: spacing.md,
  },
  interestsContainer: {
    marginBottom: spacing.md,
  },
  interestsTitle: {
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
  basicInfoContainer: {
    marginTop: spacing.md,
  },
  infoItem: {
    marginBottom: spacing.sm,
  },
  infoLabel: {
    fontSize: fontSizes.sm,
    marginBottom: spacing.xs / 2,
  },
  infoValue: {
    fontSize: fontSizes.md,
    fontWeight: '500',
  },
  promptsContainer: {
    marginBottom: spacing.lg,
  },
  promptCard: {
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderWidth: 1,
  },
  promptQuestion: {
    fontSize: fontSizes.md,
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  promptAnswer: {
    fontSize: fontSizes.md,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: spacing.xs,
  },
  skillBadge: {
    borderRadius: borderRadius.sm,
    paddingVertical: spacing.xs / 2,
    paddingHorizontal: spacing.sm,
    marginRight: spacing.xs,
    marginBottom: spacing.xs,
    borderWidth: 1,
  },
  skillText: {
    fontSize: fontSizes.sm,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: spacing.md,
  },
  actionButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    backgroundColor: '#FFFFFF',
  },
  passButton: {
    borderWidth: 1,
    borderColor: '#FF3B30',
  },
  commentButton: {
    borderWidth: 1,
    borderColor: '#D4AF37',
  },
  likeButton: {
    borderWidth: 1,
    borderColor: '#34C759',
  },
});