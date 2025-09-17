import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, ActivityIndicator } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import Colors from '../constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';

const ViewProfile = () => {
  const insets = useSafeAreaInsets();
  const { user } = useAuth();
  const params = useLocalSearchParams();
  const [profileUser, setProfileUser] = useState(null);
  const [loading, setLoading] = useState(false);

  console.log('=== ViewProfile Debug ===');
  console.log('user from useAuth:', user);
  console.log('user?.fullName:', user?.fullName);
  console.log('user?.email:', user?.email);

  // Check if viewing own profile or another user's profile
  const isOwnProfile = !params.userId || params.userId === user?.id;

  console.log('ViewProfile Debug:');
  console.log('params.userId:', params.userId);
  console.log('user?.id:', user?.id);
  console.log('isOwnProfile:', isOwnProfile);
  console.log('user object:', user);

  useEffect(() => {
    if (!isOwnProfile && params.userId) {
      // We know email and name from the search results
      setProfileUser({
        id: params.userId,
        fullName: params.userName || '-',
        email: params.userEmail || '-',
        headline: '-',
        location: '-'
      });
    }
  }, [params.userId, params.userName, params.userEmail, isOwnProfile]);

  const displayUser = isOwnProfile ? user : profileUser;

  // Debug: Let's see what's in the user object
  console.log('Current user data:', user);
  console.log('Display user data:', displayUser);
  console.log('Is own profile:', isOwnProfile);

  const handleEditProfile = () => {
    if (isOwnProfile) {
      router.push('/EditProfile');
    }
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={Colors.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
        {isOwnProfile && (
          <TouchableOpacity onPress={handleEditProfile} style={styles.editButton}>
            <Ionicons name="create-outline" size={24} color={Colors.primary} />
            <Text style={styles.editButtonText}>Edit</Text>
          </TouchableOpacity>
        )}
      </View>

      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {/* Profile Picture and Basic Info */}
        <View style={styles.profileHeader}>
          <Image source={require('../assets/images/icon.png')} style={styles.profilePicture} />
          <Text style={styles.profileName}>{user?.fullName || 'No Name'}</Text>
          <Text style={styles.profileEmail}>{user?.email || 'No Email'}</Text>
          <Text style={styles.profileHeadline}>{user?.headline || '-'}</Text>
          <Text style={styles.profileLocation}>{user?.location || '-'}</Text>
        </View>

        {/* About Section */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>About</Text>
          <Text style={styles.sectionContent}>
            {user?.about || '-'}
          </Text>
        </View>

        {/* Education Section */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Education</Text>
          <Text style={styles.sectionContent}>{user?.education || '-'}</Text>
        </View>

        {/* Experience Section */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Experience</Text>
          <Text style={styles.sectionContent}>{user?.experience || '-'}</Text>
        </View>

        {/* Skills Section */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Skills</Text>
          <Text style={styles.sectionContent}>{user?.skills || '-'}</Text>
        </View>

        {/* Rewards Section (moved here) */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Rewards & Badges</Text>
          <View style={styles.rewardsContainer}>
            <Ionicons name="trophy" size={24} color={Colors.primary} style={styles.rewardIcon} />
            <Text style={styles.sectionContent}>5 Badges Earned</Text>
          </View>
          <View style={styles.rewardsContainer}>
            <Ionicons name="star" size={24} color={Colors.primary} style={styles.rewardIcon} />
            <Text style={styles.sectionContent}>Top Contributor 2023</Text>
          </View>
        </View>

      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.lightBackground,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.subtleBorder,
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.black,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
  },
  editButtonText: {
    color: Colors.primary,
    fontSize: 16,
    marginLeft: 5,
  },
  scrollViewContent: {
    padding: 15,
  },
  profileHeader: {
    alignItems: 'center',
    backgroundColor: Colors.white,
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.subtleBorder,
    marginBottom: 20,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 3,
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: Colors.primary,
    marginBottom: 15,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.black,
    marginBottom: 5,
  },
  profileEmail: {
    fontSize: 16,
    color: Colors.gray500,
    marginBottom: 5,
  },
  profileHeadline: {
    fontSize: 16,
    color: Colors.grayText,
    textAlign: 'center',
    marginBottom: 5,
  },
  profileLocation: {
    fontSize: 14,
    color: Colors.grayText,
    marginBottom: 15,
  },
  sectionCard: {
    backgroundColor: Colors.white,
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.subtleBorder,
    marginBottom: 15,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.black,
    marginBottom: 10,
  },
  sectionContent: {
    fontSize: 16,
    color: Colors.grayText,
    marginBottom: 5,
    lineHeight: 24,
  },
  rewardsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  rewardIcon: {
    marginRight: 10,
  },
});

export default ViewProfile;
