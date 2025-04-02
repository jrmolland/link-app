import React, { useState, useRef } from 'react';
import { Tabs } from 'expo-router';
import { StyleSheet, TouchableOpacity, View, Text, Modal, Switch, ScrollView } from 'react-native';
import { colors, spacing, fontSizes } from '@/constants/colors';
import { useAppStore } from '@/store/app-store';
import { useAuthStore } from '@/store/auth-store';
import Slider from '@react-native-community/slider';
import { 
  Heart, 
  Briefcase, 
  MessageCircle, 
  User,
  Sliders,
  X,
  MapPin,
  Calendar,
  Users,
  Globe,
  Building,
  GraduationCap,
  Languages,
  Sparkles
} from 'lucide-react-native';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export default function TabLayout() {
  const theme = useAppStore(state => state.theme);
  const appMode = useAppStore(state => state.appMode);
  const setAppMode = useAppStore(state => state.setAppMode);
  const colorScheme = colors[theme];
  const user = useAuthStore(state => state.user);
  
  const datingPreferences = useAppStore(state => state.datingPreferences);
  const networkingPreferences = useAppStore(state => state.networkingPreferences);
  const updateDatingPreferences = useAppStore(state => state.updateDatingPreferences);
  const updateNetworkingPreferences = useAppStore(state => state.updateNetworkingPreferences);
  
  const [showPreferences, setShowPreferences] = useState(false);
  const [advancedFilters, setAdvancedFilters] = useState(false);
  const [tempPreferences, setTempPreferences] = useState({
    dating: { ...datingPreferences },
    networking: { ...networkingPreferences }
  });
  
  const scrollViewRef = useRef(null);

  const renderHeaderRight = () => {
    return (
      <TouchableOpacity
        style={styles.preferencesButton}
        onPress={() => {
          setTempPreferences({
            dating: { ...datingPreferences },
            networking: { ...networkingPreferences }
          });
          setShowPreferences(true);
        }}
      >
        <Sliders size={24} color={colorScheme.text} />
      </TouchableOpacity>
    );
  };

  const renderHeaderTitle = () => {
    return (
      <View style={styles.headerTitleContainer}>
        <Text style={[styles.headerTitle, { color: colorScheme.text }]}>
          Link
        </Text>
        <View style={[styles.modeSwitcher, { backgroundColor: colorScheme.secondary }]}>
          <TouchableOpacity
            style={{
              ...styles.modeButton,
              ...(appMode === 'dating' ? { backgroundColor: colorScheme.primary } : {})
            }}
            onPress={() => setAppMode('dating')}
          >
            <Text
              style={{
                ...styles.modeButtonText,
                color: appMode === 'dating' ? '#FFFFFF' : colorScheme.text
              }}
            >
              Dating
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              ...styles.modeButton,
              ...(appMode === 'networking' ? { backgroundColor: colorScheme.primary } : {})
            }}
            onPress={() => setAppMode('networking')}
            disabled={user?.premium.tier !== 'networking'}
          >
            <Text
              style={{
                ...styles.modeButtonText,
                color: appMode === 'networking' 
                  ? '#FFFFFF' 
                  : user?.premium.tier === 'networking'
                    ? colorScheme.text
                    : colorScheme.inactive
              }}
            >
              Networking
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderDatingPreferences = () => {
    return (
      <>
        <View style={styles.preferencesSection}>
          <View style={styles.preferencesRow}>
            <View style={styles.preferencesIconContainer}>
              <MapPin size={20} color={colorScheme.primary} />
            </View>
            <View style={styles.preferencesTextContainer}>
              <Text style={[styles.preferencesLabel, { color: colorScheme.text }]}>
                Location
              </Text>
              <Text style={[styles.preferencesValue, { color: colorScheme.placeholder }]}>
                San Francisco, CA
              </Text>
            </View>
          </View>
          
          <View style={styles.preferencesRow}>
            <View style={styles.preferencesIconContainer}>
              <Users size={20} color={colorScheme.primary} />
            </View>
            <View style={styles.preferencesTextContainer}>
              <Text style={[styles.preferencesLabel, { color: colorScheme.text }]}>
                Show Me
              </Text>
              <View style={styles.genderSelector}>
                <TouchableOpacity
                  style={[
                    styles.genderOption,
                    tempPreferences.dating.gender === 'female' && {
                      backgroundColor: colorScheme.primary
                    }
                  ]}
                  onPress={() => setTempPreferences({
                    ...tempPreferences,
                    dating: {
                      ...tempPreferences.dating,
                      gender: 'female'
                    }
                  })}
                >
                  <Text
                    style={{
                      color: tempPreferences.dating.gender === 'female'
                        ? '#FFFFFF'
                        : colorScheme.text
                    }}
                  >
                    Women
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.genderOption,
                    tempPreferences.dating.gender === 'male' && {
                      backgroundColor: colorScheme.primary
                    }
                  ]}
                  onPress={() => setTempPreferences({
                    ...tempPreferences,
                    dating: {
                      ...tempPreferences.dating,
                      gender: 'male'
                    }
                  })}
                >
                  <Text
                    style={{
                      color: tempPreferences.dating.gender === 'male'
                        ? '#FFFFFF'
                        : colorScheme.text
                    }}
                  >
                    Men
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.genderOption,
                    tempPreferences.dating.gender === 'all' && {
                      backgroundColor: colorScheme.primary
                    }
                  ]}
                  onPress={() => setTempPreferences({
                    ...tempPreferences,
                    dating: {
                      ...tempPreferences.dating,
                      gender: 'all'
                    }
                  })}
                >
                  <Text
                    style={{
                      color: tempPreferences.dating.gender === 'all'
                        ? '#FFFFFF'
                        : colorScheme.text
                    }}
                  >
                    Everyone
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          
          <View style={styles.preferencesRow}>
            <View style={styles.preferencesIconContainer}>
              <Calendar size={20} color={colorScheme.primary} />
            </View>
            <View style={styles.preferencesTextContainer}>
              <Text style={[styles.preferencesLabel, { color: colorScheme.text }]}>
                Age Range: {tempPreferences.dating.ageRange[0]}-{tempPreferences.dating.ageRange[1]} years
              </Text>
              <View style={styles.sliderContainer}>
                <Slider
                  style={styles.slider}
                  minimumValue={18}
                  maximumValue={70}
                  step={1}
                  value={tempPreferences.dating.ageRange[0]}
                  onValueChange={(value) => setTempPreferences({
                    ...tempPreferences,
                    dating: {
                      ...tempPreferences.dating,
                      ageRange: [value, tempPreferences.dating.ageRange[1]]
                    }
                  })}
                  minimumTrackTintColor={colorScheme.primary}
                  maximumTrackTintColor={colorScheme.inactive}
                  thumbTintColor={colorScheme.primary}
                />
                <Slider
                  style={styles.slider}
                  minimumValue={18}
                  maximumValue={70}
                  step={1}
                  value={tempPreferences.dating.ageRange[1]}
                  onValueChange={(value) => setTempPreferences({
                    ...tempPreferences,
                    dating: {
                      ...tempPreferences.dating,
                      ageRange: [tempPreferences.dating.ageRange[0], value]
                    }
                  })}
                  minimumTrackTintColor={colorScheme.primary}
                  maximumTrackTintColor={colorScheme.inactive}
                  thumbTintColor={colorScheme.primary}
                />
              </View>
            </View>
          </View>
          
          <View style={styles.preferencesRow}>
            <View style={styles.preferencesIconContainer}>
              <Globe size={20} color={colorScheme.primary} />
            </View>
            <View style={styles.preferencesTextContainer}>
              <Text style={[styles.preferencesLabel, { color: colorScheme.text }]}>
                Distance: Up to {tempPreferences.dating.distance} miles
              </Text>
              <Slider
                style={styles.slider}
                minimumValue={1}
                maximumValue={100}
                step={1}
                value={tempPreferences.dating.distance}
                onValueChange={(value) => setTempPreferences({
                  ...tempPreferences,
                  dating: {
                    ...tempPreferences.dating,
                    distance: value
                  }
                })}
                minimumTrackTintColor={colorScheme.primary}
                maximumTrackTintColor={colorScheme.inactive}
                thumbTintColor={colorScheme.primary}
              />
            </View>
          </View>
        </View>
        
        {advancedFilters && (
          <View style={styles.preferencesSection}>
            <Text style={[styles.sectionTitle, { color: colorScheme.text }]}>
              Advanced Filters
            </Text>
            
            <View style={styles.preferencesRow}>
              <View style={styles.preferencesIconContainer}>
                <Languages size={20} color={colorScheme.primary} />
              </View>
              <View style={styles.preferencesTextContainer}>
                <Text style={[styles.preferencesLabel, { color: colorScheme.text }]}>
                  Languages Spoken
                </Text>
                <View style={styles.chipContainer}>
                  {['English', 'Spanish', 'French', 'Mandarin', 'Japanese'].map((language) => (
                    <TouchableOpacity
                      key={language}
                      style={[
                        styles.chip,
                        tempPreferences.dating.languages?.includes(language) && {
                          backgroundColor: colorScheme.primary
                        }
                      ]}
                      onPress={() => {
                        const currentLanguages = tempPreferences.dating.languages || [];
                        const newLanguages = currentLanguages.includes(language)
                          ? currentLanguages.filter(l => l !== language)
                          : [...currentLanguages, language];
                        
                        setTempPreferences({
                          ...tempPreferences,
                          dating: {
                            ...tempPreferences.dating,
                            languages: newLanguages
                          }
                        });
                      }}
                    >
                      <Text
                        style={{
                          color: tempPreferences.dating.languages?.includes(language)
                            ? '#FFFFFF'
                            : colorScheme.text
                        }}
                      >
                        {language}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </View>
            
            <View style={styles.preferencesRow}>
              <View style={styles.preferencesIconContainer}>
                <GraduationCap size={20} color={colorScheme.primary} />
              </View>
              <View style={styles.preferencesTextContainer}>
                <Text style={[styles.preferencesLabel, { color: colorScheme.text }]}>
                  Education Level
                </Text>
                <View style={styles.chipContainer}>
                  {['High School', "Bachelor's degree", "Master's degree", 'PhD'].map((education) => (
                    <TouchableOpacity
                      key={education}
                      style={[
                        styles.chip,
                        tempPreferences.dating.education?.includes(education) && {
                          backgroundColor: colorScheme.primary
                        }
                      ]}
                      onPress={() => {
                        const currentEducation = tempPreferences.dating.education || [];
                        const newEducation = currentEducation.includes(education)
                          ? currentEducation.filter(e => e !== education)
                          : [...currentEducation, education];
                        
                        setTempPreferences({
                          ...tempPreferences,
                          dating: {
                            ...tempPreferences.dating,
                            education: newEducation
                          }
                        });
                      }}
                    >
                      <Text
                        style={{
                          color: tempPreferences.dating.education?.includes(education)
                            ? '#FFFFFF'
                            : colorScheme.text
                        }}
                      >
                        {education}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </View>
            
            <View style={styles.preferencesRow}>
              <View style={styles.preferencesIconContainer}>
                <Sparkles size={20} color={colorScheme.primary} />
              </View>
              <View style={styles.preferencesTextContainer}>
                <Text style={[styles.preferencesLabel, { color: colorScheme.text }]}>
                  Relationship Goals
                </Text>
                <View style={styles.chipContainer}>
                  {['Casual', 'Dating', 'Relationship', 'Marriage'].map((goal) => (
                    <TouchableOpacity
                      key={goal}
                      style={[
                        styles.chip,
                        tempPreferences.dating.relationshipGoals?.includes(goal.toLowerCase()) && {
                          backgroundColor: colorScheme.primary
                        }
                      ]}
                      onPress={() => {
                        const currentGoals = tempPreferences.dating.relationshipGoals || [];
                        const newGoals = currentGoals.includes(goal.toLowerCase())
                          ? currentGoals.filter(g => g !== goal.toLowerCase())
                          : [...currentGoals, goal.toLowerCase()];
                        
                        setTempPreferences({
                          ...tempPreferences,
                          dating: {
                            ...tempPreferences.dating,
                            relationshipGoals: newGoals
                          }
                        });
                      }}
                    >
                      <Text
                        style={{
                          color: tempPreferences.dating.relationshipGoals?.includes(goal.toLowerCase())
                            ? '#FFFFFF'
                            : colorScheme.text
                        }}
                      >
                        {goal}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </View>
          </View>
        )}
        
        <View style={styles.advancedFiltersToggle}>
          <Text style={[styles.advancedFiltersText, { color: colorScheme.text }]}>
            Advanced Filters
          </Text>
          <Switch
            value={advancedFilters}
            onValueChange={setAdvancedFilters}
            trackColor={{ false: colorScheme.inactive, true: colorScheme.primary }}
            thumbColor="#FFFFFF"
          />
        </View>
        
        {!user?.premium.isActive && (
          <View style={[styles.premiumBanner, { backgroundColor: colorScheme.highlight }]}>
            <Text style={[styles.premiumText, { color: colorScheme.text }]}>
              Unlock all filters with Link+
            </Text>
            <Button
              title="Upgrade"
              variant="primary"
              size="small"
              style={styles.upgradeButton}
            />
          </View>
        )}
      </>
    );
  };

  const renderNetworkingPreferences = () => {
    return (
      <>
        <View style={styles.preferencesSection}>
          <View style={styles.preferencesRow}>
            <View style={styles.preferencesIconContainer}>
              <MapPin size={20} color={colorScheme.primary} />
            </View>
            <View style={styles.preferencesTextContainer}>
              <Text style={[styles.preferencesLabel, { color: colorScheme.text }]}>
                Location
              </Text>
              <Text style={[styles.preferencesValue, { color: colorScheme.placeholder }]}>
                San Francisco, CA
              </Text>
            </View>
          </View>
          
          <View style={styles.preferencesRow}>
            <View style={styles.preferencesIconContainer}>
              <Users size={20} color={colorScheme.primary} />
            </View>
            <View style={styles.preferencesTextContainer}>
              <Text style={[styles.preferencesLabel, { color: colorScheme.text }]}>
                Show Me
              </Text>
              <View style={styles.genderSelector}>
                <TouchableOpacity
                  style={[
                    styles.genderOption,
                    tempPreferences.networking.gender === 'female' && {
                      backgroundColor: colorScheme.primary
                    }
                  ]}
                  onPress={() => setTempPreferences({
                    ...tempPreferences,
                    networking: {
                      ...tempPreferences.networking,
                      gender: 'female'
                    }
                  })}
                >
                  <Text
                    style={{
                      color: tempPreferences.networking.gender === 'female'
                        ? '#FFFFFF'
                        : colorScheme.text
                    }}
                  >
                    Women
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.genderOption,
                    tempPreferences.networking.gender === 'male' && {
                      backgroundColor: colorScheme.primary
                    }
                  ]}
                  onPress={() => setTempPreferences({
                    ...tempPreferences,
                    networking: {
                      ...tempPreferences.networking,
                      gender: 'male'
                    }
                  })}
                >
                  <Text
                    style={{
                      color: tempPreferences.networking.gender === 'male'
                        ? '#FFFFFF'
                        : colorScheme.text
                    }}
                  >
                    Men
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.genderOption,
                    tempPreferences.networking.gender === 'all' && {
                      backgroundColor: colorScheme.primary
                    }
                  ]}
                  onPress={() => setTempPreferences({
                    ...tempPreferences,
                    networking: {
                      ...tempPreferences.networking,
                      gender: 'all'
                    }
                  })}
                >
                  <Text
                    style={{
                      color: tempPreferences.networking.gender === 'all'
                        ? '#FFFFFF'
                        : colorScheme.text
                    }}
                  >
                    All Genders
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          
          <View style={styles.preferencesRow}>
            <View style={styles.preferencesIconContainer}>
              <Building size={20} color={colorScheme.primary} />
            </View>
            <View style={styles.preferencesTextContainer}>
              <Text style={[styles.preferencesLabel, { color: colorScheme.text }]}>
                Industries
              </Text>
              <View style={styles.chipContainer}>
                {['Technology', 'Finance', 'Healthcare', 'Education', 'Design', 'Marketing'].map((industry) => (
                  <TouchableOpacity
                    key={industry}
                    style={[
                      styles.chip,
                      tempPreferences.networking.industries?.includes(industry) && {
                        backgroundColor: colorScheme.primary
                      }
                    ]}
                    onPress={() => {
                      const currentIndustries = tempPreferences.networking.industries || [];
                      const newIndustries = currentIndustries.includes(industry)
                        ? currentIndustries.filter(i => i !== industry)
                        : [...currentIndustries, industry];
                      
                      setTempPreferences({
                        ...tempPreferences,
                        networking: {
                          ...tempPreferences.networking,
                          industries: newIndustries
                        }
                      });
                    }}
                  >
                    <Text
                      style={{
                        color: tempPreferences.networking.industries?.includes(industry)
                          ? '#FFFFFF'
                          : colorScheme.text
                      }}
                    >
                      {industry}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
          
          <View style={styles.preferencesRow}>
            <View style={styles.preferencesIconContainer}>
              <Briefcase size={20} color={colorScheme.primary} />
            </View>
            <View style={styles.preferencesTextContainer}>
              <Text style={[styles.preferencesLabel, { color: colorScheme.text }]}>
                Job Titles
              </Text>
              <View style={styles.chipContainer}>
                {['Developer', 'Designer', 'Product Manager', 'Marketing', 'Sales', 'Executive'].map((title) => (
                  <TouchableOpacity
                    key={title}
                    style={[
                      styles.chip,
                      tempPreferences.networking.jobTitles?.includes(title) && {
                        backgroundColor: colorScheme.primary
                      }
                    ]}
                    onPress={() => {
                      const currentTitles = tempPreferences.networking.jobTitles || [];
                      const newTitles = currentTitles.includes(title)
                        ? currentTitles.filter(t => t !== title)
                        : [...currentTitles, title];
                      
                      setTempPreferences({
                        ...tempPreferences,
                        networking: {
                          ...tempPreferences.networking,
                          jobTitles: newTitles
                        }
                      });
                    }}
                  >
                    <Text
                      style={{
                        color: tempPreferences.networking.jobTitles?.includes(title)
                          ? '#FFFFFF'
                          : colorScheme.text
                      }}
                    >
                      {title}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
          
          <View style={styles.preferencesRow}>
            <View style={styles.preferencesIconContainer}>
              <Globe size={20} color={colorScheme.primary} />
            </View>
            <View style={styles.preferencesTextContainer}>
              <Text style={[styles.preferencesLabel, { color: colorScheme.text }]}>
                Distance: Up to {tempPreferences.networking.distance} miles
              </Text>
              <Slider
                style={styles.slider}
                minimumValue={1}
                maximumValue={100}
                step={1}
                value={tempPreferences.networking.distance}
                onValueChange={(value) => setTempPreferences({
                  ...tempPreferences,
                  networking: {
                    ...tempPreferences.networking,
                    distance: value
                  }
                })}
                minimumTrackTintColor={colorScheme.primary}
                maximumTrackTintColor={colorScheme.inactive}
                thumbTintColor={colorScheme.primary}
              />
            </View>
          </View>
        </View>
        
        {advancedFilters && (
          <View style={styles.preferencesSection}>
            <Text style={[styles.sectionTitle, { color: colorScheme.text }]}>
              Advanced Filters
            </Text>
            
            <View style={styles.preferencesRow}>
              <View style={styles.preferencesIconContainer}>
                <Languages size={20} color={colorScheme.primary} />
              </View>
              <View style={styles.preferencesTextContainer}>
                <Text style={[styles.preferencesLabel, { color: colorScheme.text }]}>
                  Languages Spoken
                </Text>
                <View style={styles.chipContainer}>
                  {['English', 'Spanish', 'French', 'Mandarin', 'Japanese'].map((language) => (
                    <TouchableOpacity
                      key={language}
                      style={[
                        styles.chip,
                        tempPreferences.networking.languages?.includes(language) && {
                          backgroundColor: colorScheme.primary
                        }
                      ]}
                      onPress={() => {
                        const currentLanguages = tempPreferences.networking.languages || [];
                        const newLanguages = currentLanguages.includes(language)
                          ? currentLanguages.filter(l => l !== language)
                          : [...currentLanguages, language];
                        
                        setTempPreferences({
                          ...tempPreferences,
                          networking: {
                            ...tempPreferences.networking,
                            languages: newLanguages
                          }
                        });
                      }}
                    >
                      <Text
                        style={{
                          color: tempPreferences.networking.languages?.includes(language)
                            ? '#FFFFFF'
                            : colorScheme.text
                        }}
                      >
                        {language}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </View>
            
            <View style={styles.preferencesRow}>
              <View style={styles.preferencesIconContainer}>
                <GraduationCap size={20} color={colorScheme.primary} />
              </View>
              <View style={styles.preferencesTextContainer}>
                <Text style={[styles.preferencesLabel, { color: colorScheme.text }]}>
                  Experience Level
                </Text>
                <View style={styles.chipContainer}>
                  {['Entry-level', 'Mid-level', 'Senior', 'Executive'].map((level) => (
                    <TouchableOpacity
                      key={level}
                      style={[
                        styles.chip,
                        tempPreferences.networking.experienceLevels?.includes(level) && {
                          backgroundColor: colorScheme.primary
                        }
                      ]}
                      onPress={() => {
                        const currentLevels = tempPreferences.networking.experienceLevels || [];
                        const newLevels = currentLevels.includes(level)
                          ? currentLevels.filter(l => l !== level)
                          : [...currentLevels, level];
                        
                        setTempPreferences({
                          ...tempPreferences,
                          networking: {
                            ...tempPreferences.networking,
                            experienceLevels: newLevels
                          }
                        });
                      }}
                    >
                      <Text
                        style={{
                          color: tempPreferences.networking.experienceLevels?.includes(level)
                            ? '#FFFFFF'
                            : colorScheme.text
                        }}
                      >
                        {level}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </View>
            
            <View style={styles.preferencesRow}>
              <View style={styles.preferencesIconContainer}>
                <Sparkles size={20} color={colorScheme.primary} />
              </View>
              <View style={styles.preferencesTextContainer}>
                <Text style={[styles.preferencesLabel, { color: colorScheme.text }]}>
                  Connection Goals
                </Text>
                <View style={styles.chipContainer}>
                  {['Mentorship', 'Collaboration', 'Hiring', 'Investment', 'Networking'].map((goal) => (
                    <TouchableOpacity
                      key={goal}
                      style={[
                        styles.chip,
                        tempPreferences.networking.connectionGoals?.includes(goal) && {
                          backgroundColor: colorScheme.primary
                        }
                      ]}
                      onPress={() => {
                        const currentGoals = tempPreferences.networking.connectionGoals || [];
                        const newGoals = currentGoals.includes(goal)
                          ? currentGoals.filter(g => g !== goal)
                          : [...currentGoals, goal];
                        
                        setTempPreferences({
                          ...tempPreferences,
                          networking: {
                            ...tempPreferences.networking,
                            connectionGoals: newGoals
                          }
                        });
                      }}
                    >
                      <Text
                        style={{
                          color: tempPreferences.networking.connectionGoals?.includes(goal)
                            ? '#FFFFFF'
                            : colorScheme.text
                        }}
                      >
                        {goal}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </View>
          </View>
        )}
        
        <View style={styles.advancedFiltersToggle}>
          <Text style={[styles.advancedFiltersText, { color: colorScheme.text }]}>
            Advanced Filters
          </Text>
          <Switch
            value={advancedFilters}
            onValueChange={setAdvancedFilters}
            trackColor={{ false: colorScheme.inactive, true: colorScheme.primary }}
            thumbColor="#FFFFFF"
          />
        </View>
      </>
    );
  };

  const renderPreferencesModal = () => {
    return (
      <Modal
        visible={showPreferences}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowPreferences(false)}
      >
        <View style={styles.modalOverlay}>
          <Card style={[styles.preferencesCard, { backgroundColor: colorScheme.card }]}>
            <View style={styles.preferencesHeader}>
              <Text style={[styles.preferencesTitle, { color: colorScheme.text }]}>
                {appMode === 'dating' ? 'Dating Preferences' : 'Networking Preferences'}
              </Text>
              <TouchableOpacity onPress={() => setShowPreferences(false)}>
                <X size={24} color={colorScheme.text} />
              </TouchableOpacity>
            </View>
            
            <ScrollView 
              style={styles.preferencesContent} 
              showsVerticalScrollIndicator={false}
              ref={scrollViewRef}
            >
              {appMode === 'dating' ? renderDatingPreferences() : renderNetworkingPreferences()}
            </ScrollView>
            
            <TouchableOpacity 
              style={[styles.editButton, { backgroundColor: colorScheme.primary }]}
              onPress={() => {
                // Save the preferences
                if (appMode === 'dating') {
                  updateDatingPreferences(tempPreferences.dating);
                } else {
                  updateNetworkingPreferences(tempPreferences.networking);
                }
                
                setShowPreferences(false);
                
                // Refresh profiles to match new preferences
                useAppStore.getState().refreshProfiles();
              }}
            >
              <Text style={styles.editButtonText}>
                Apply Preferences
              </Text>
            </TouchableOpacity>
          </Card>
        </View>
      </Modal>
    );
  };

  return (
    <>
      {renderPreferencesModal()}
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: colorScheme.primary,
          tabBarInactiveTintColor: colorScheme.inactive,
          tabBarStyle: {
            backgroundColor: colorScheme.card,
            borderTopColor: colorScheme.border,
          },
          headerStyle: {
            backgroundColor: colorScheme.background,
          },
          headerTitleStyle: {
            color: colorScheme.text,
          },
          headerRight: renderHeaderRight,
          headerTitle: renderHeaderTitle,
          headerTitleAlign: 'center',
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Discover',
            tabBarIcon: ({ color, size }) => (
              <Heart size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="messages"
          options={{
            title: 'Messages',
            tabBarIcon: ({ color, size }) => (
              <MessageCircle size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: 'Profile',
            tabBarIcon: ({ color, size }) => (
              <User size={size} color={color} />
            ),
          }}
        />
      </Tabs>
    </>
  );
}

const styles = StyleSheet.create({
  preferencesButton: {
    marginRight: spacing.md,
  },
  headerTitleContainer: {
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: fontSizes.xl,
    fontWeight: 'bold',
    marginBottom: spacing.xs,
  },
  modeSwitcher: {
    flexDirection: 'row',
    borderRadius: 20,
    overflow: 'hidden',
  },
  modeButton: {
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.md,
  },
  modeButtonText: {
    fontSize: fontSizes.sm,
    fontWeight: '500',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
  },
  preferencesCard: {
    width: '90%',
    maxHeight: '80%',
    borderRadius: 16,
    padding: spacing.lg,
  },
  preferencesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  preferencesTitle: {
    fontSize: fontSizes.xl,
    fontWeight: 'bold',
  },
  preferencesContent: {
    marginBottom: spacing.xl,
  },
  preferencesSection: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    fontSize: fontSizes.md,
    fontWeight: '600',
    marginBottom: spacing.md,
  },
  preferencesRow: {
    flexDirection: 'row',
    marginBottom: spacing.md,
  },
  preferencesIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.sm,
  },
  preferencesTextContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  preferencesLabel: {
    fontSize: fontSizes.md,
    fontWeight: '600',
    marginBottom: spacing.xs / 2,
  },
  preferencesValue: {
    fontSize: fontSizes.md,
  },
  genderSelector: {
    flexDirection: 'row',
    marginTop: spacing.xs,
  },
  genderOption: {
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
    borderRadius: spacing.sm,
    marginRight: spacing.xs,
  },
  sliderContainer: {
    marginTop: spacing.sm,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: spacing.xs,
  },
  chip: {
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
    borderRadius: spacing.sm,
    marginRight: spacing.xs,
    marginBottom: spacing.xs,
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  advancedFiltersToggle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  advancedFiltersText: {
    fontSize: fontSizes.md,
    fontWeight: '600',
  },
  premiumBanner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.md,
    borderRadius: spacing.sm,
    marginBottom: spacing.lg,
  },
  premiumText: {
    fontSize: fontSizes.sm,
    fontWeight: '500',
    flex: 1,
  },
  upgradeButton: {
    marginLeft: spacing.sm,
  },
  editButton: {
    paddingVertical: spacing.md,
    borderRadius: 8,
    alignItems: 'center',
  },
  editButtonText: {
    color: '#FFFFFF',
    fontSize: fontSizes.md,
    fontWeight: '600',
  },
});