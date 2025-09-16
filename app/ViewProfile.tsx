import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import Colors from '../constants/Colors';
import { Ionicons } from '@expo/vector-icons';

const ViewProfile = () => {
  const insets = useSafeAreaInsets();

  const handleEditProfile = () => {
    router.push('/EditProfile');
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={Colors.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
        <TouchableOpacity onPress={handleEditProfile} style={styles.editButton}>
          <Ionicons name="create-outline" size={24} color={Colors.primary} />
          <Text style={styles.editButtonText}>Edit</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {/* Profile Picture and Basic Info */}
        <View style={styles.profileHeader}>
          <Image source={require('../assets/images/icon.png')} style={styles.profilePicture} />
          <Text style={styles.profileName}>John Doe</Text>
          <Text style={styles.profileHeadline}>Software Engineer at Google | Class of 2020</Text>
          <Text style={styles.profileLocation}>San Francisco, CA</Text>
        </View>

        {/* About Section */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>About</Text>
          <Text style={styles.sectionContent}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </Text>
        </View>

        {/* Education Section */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Education</Text>
          <Text style={styles.sectionContent}>University of Example - B.S. Computer Science (2016-2020)</Text>
        </View>

        {/* Experience Section */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Experience</Text>
          <Text style={styles.sectionContent}>Software Engineer at Google (2020-Present)</Text>
          <Text style={styles.sectionContent}>Intern at Microsoft (Summer 2019)</Text>
        </View>

        {/* Skills Section */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Skills</Text>
          <Text style={styles.sectionContent}>React Native, JavaScript, Python, AWS, UI/UX Design</Text>
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
