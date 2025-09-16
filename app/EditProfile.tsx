import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Image,
  Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import Colors from '../constants/Colors';
import { Ionicons } from '@expo/vector-icons';

const EditProfile = () => {
  const insets = useSafeAreaInsets();
  const [fullName, setFullName] = useState('John Doe');
  const [headline, setHeadline] = useState('Software Engineer at Google | Class of 2020');
  const [location, setLocation] = useState('San Francisco, CA');
  const [about, setAbout] = useState(
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
  );
  const [education, setEducation] = useState('University of Example - B.S. Computer Science (2016-2020)');
  const [experience, setExperience] = useState(
    'Software Engineer at Google (2020-Present)\nIntern at Microsoft (Summer 2019)'
  );
  const [skills, setSkills] = useState('React Native, JavaScript, Python, AWS, UI/UX Design');

  const handleSave = () => {
    // Here you would typically send the updated data to your backend
    Alert.alert('Profile Saved', 'Your profile has been updated successfully!');
    router.back(); // Go back to ViewProfile after saving
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="close-outline" size={28} color={Colors.black} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Profile</Text>
        <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {/* Profile Picture */}
        <View style={styles.profilePictureContainer}>
          <Image source={require('../assets/images/icon.png')} style={styles.profilePicture} />
          <TouchableOpacity style={styles.changePhotoOverlay}>
            <Ionicons name="camera-outline" size={30} color={Colors.white} />
          </TouchableOpacity>
        </View>

        {/* Basic Info Fields */}
        <View style={styles.sectionCard}>
          <Text style={styles.label}>Full Name</Text>
          <TextInput style={styles.input} value={fullName} onChangeText={setFullName} />

          <Text style={styles.label}>Headline</Text>
          <TextInput style={styles.input} value={headline} onChangeText={setHeadline} />

          <Text style={styles.label}>Location</Text>
          <TextInput style={styles.input} value={location} onChangeText={setLocation} />
        </View>

        {/* About Section */}
        <View style={styles.sectionCard}>
          <Text style={styles.label}>About</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={about}
            onChangeText={setAbout}
            multiline
            numberOfLines={4}
          />
        </View>

        {/* Education Section */}
        <View style={styles.sectionCard}>
          <Text style={styles.label}>Education</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={education}
            onChangeText={setEducation}
            multiline
            numberOfLines={3}
          />
        </View>

        {/* Experience Section */}
        <View style={styles.sectionCard}>
          <Text style={styles.label}>Experience</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={experience}
            onChangeText={setExperience}
            multiline
            numberOfLines={5}
          />
        </View>

        {/* Skills Section */}
        <View style={styles.sectionCard}>
          <Text style={styles.label}>Skills</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={skills}
            onChangeText={setSkills}
            multiline
            numberOfLines={2}
          />
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
  saveButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  saveButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  scrollViewContent: {
    padding: 15,
  },
  profilePictureContainer: {
    alignItems: 'center',
    marginBottom: 20,
    position: 'relative',
  },
  profilePicture: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: Colors.primary,
  },
  changePhotoOverlay: {
    position: 'absolute',
    bottom: 0,
    right: '35%', // Adjust to center over the bottom right of the image
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 20,
    padding: 8,
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
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.black,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.subtleBorder,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: Colors.black,
    marginBottom: 15,
  },
  textArea: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
});

export default EditProfile;
