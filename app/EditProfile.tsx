import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Colors from '../constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { authService } from '../services/AlumService'; // Assuming a service for profile management

interface UserProfile {
  fullName: string;
  email: string;
  // Add other profile fields as needed
}

const EditProfile = () => {
  const [formData, setFormData] = useState<UserProfile>({
    fullName: '',
    email: '',
  });
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Dummy userId for now, replace with actual user ID from auth context
  const userId = 'dummyUserId'; 

  // Fetch user details
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        // Replace with actual API call to get user profile
        // const response = await authService.getProfile(userId); 
        // setFormData(response.data);
        // Simulating API call
        setTimeout(() => {
          setFormData({
            fullName: 'John Doe',
            email: 'john.doe@example.com',
          });
          setLoading(false);
        }, 1000);
      } catch (err) {
        setError('Failed to load profile.');
        setLoading(false);
        console.error('Error fetching profile:', err);
      }
    };
    fetchProfile();
  }, [userId]);

  const handleChange = (name: keyof UserProfile, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setMessage('');
    setError('');

    try {
      // Replace with actual API call to update user profile
      // await authService.updateProfile(userId, formData);
      // Simulating API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setMessage('Profile updated successfully!');
      Alert.alert('Success', 'Profile updated successfully!');
    } catch (err) {
      setError('Error updating profile.');
      Alert.alert('Error', 'Failed to update profile.');
      console.error('Error updating profile:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
        <Text style={styles.loadingText}>Loading profile...</Text>
      </SafeAreaView>
    );
  }

  if (error && !message) {
    return (
      <SafeAreaView style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={() => { /* retry logic */ }}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
        <View style={styles.container}>
          <Text style={styles.title}>Edit Profile</Text>

          {message && <Text style={styles.successMessage}>{message}</Text>}
          {error && <Text style={styles.errorMessage}>{error}</Text>}

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Full Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Full Name"
              placeholderTextColor={Colors.gray400}
              value={formData.fullName}
              onChangeText={(text) => handleChange('fullName', text)}
              editable={!isSubmitting}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor={Colors.gray400}
              value={formData.email}
              onChangeText={(text) => handleChange('email', text)}
              keyboardType="email-address"
              autoCapitalize="none"
              editable={!isSubmitting}
            />
          </View>

          {/* Add more profile fields here */}

          <TouchableOpacity
            style={[styles.button, isSubmitting && styles.buttonDisabled]}
            onPress={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <ActivityIndicator color={Colors.white} />
            ) : (
              <Text style={styles.buttonText}>Update Profile</Text>
            )}
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.gray50,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.gray50,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.gray50,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: Colors.gray500,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.gray600,
    marginBottom: 25,
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    color: Colors.gray600,
    marginBottom: 8,
    fontWeight: '500',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: Colors.gray200,
    borderRadius: 10,
    paddingHorizontal: 15,
    backgroundColor: Colors.white,
    fontSize: 16,
    color: Colors.gray600,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  button: {
    backgroundColor: Colors.primary,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonDisabled: {
    backgroundColor: Colors.gray300,
  },
  buttonText: {
    color: Colors.white,
    fontWeight: 'bold',
    fontSize: 18,
  },
  successMessage: {
    color: Colors.success,
    textAlign: 'center',
    marginBottom: 15,
    fontSize: 16,
  },
  errorMessage: {
    color: Colors.error,
    textAlign: 'center',
    marginBottom: 15,
    fontSize: 16,
  },
  retryButton: {
    backgroundColor: Colors.primaryLight,
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
  },
  retryButtonText: {
    color: Colors.primary,
    fontWeight: 'bold',
  },
});

export default EditProfile;