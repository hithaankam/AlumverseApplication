import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import Colors from '../constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const WelcomeScreen = () => {
  const navigation = useNavigation();

  return (
    <ScrollView style={styles.container}>
      {/* Hero Section */}
      <View style={styles.heroSection}>
        <Image
          source={require('../assets/images/splash-icon.png')} // Placeholder image
          style={styles.heroImage}
        />
        <View style={styles.heroTextContainer}>
          <Text style={styles.heroTitle}>Welcome to Alumverse</Text>
          <Text style={styles.heroSubtitle}>Your alumni community awaits.</Text>
        </View>
      </View>

      {/* Central Search Bar */}
      <TouchableOpacity onPress={() => navigation.navigate('Directory')}>
        <View style={styles.searchContainer}>
          <View style={styles.searchInput}>
            <Ionicons name="search" size={20} color={Colors.grayText} style={{ marginRight: 10 }} />
            <Text style={{ color: Colors.grayText }}>Search your buddy, mentor or guru...</Text>
          </View>
        </View>
      </TouchableOpacity>

      {/* Community Gallery */}
      <View style={styles.galleryContainer}>
        <Text style={styles.galleryTitle}>Community Gallery</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {/* Replace with actual images */}
          <Image source={require('../assets/images/logo.png')} style={styles.galleryImage} />
          <Image source={require('../assets/images/icon.png')} style={styles.galleryImage} />
          <Image source={require('../assets/images/splash-icon.png')} style={styles.galleryImage} />
        </ScrollView>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.lightBackground,
  },
  heroSection: {
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.gray100, // Placeholder background
  },
  heroImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  heroTextContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 20,
    borderRadius: 10,
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.white,
    textAlign: 'center',
  },
  heroSubtitle: {
    fontSize: 18,
    color: Colors.white,
    textAlign: 'center',
    marginTop: 8,
  },
  searchContainer: {
    padding: 20,
  },
  searchInput: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.subtleBorder,
    borderRadius: 25,
    paddingHorizontal: 20,
    backgroundColor: Colors.white,
  },
  galleryContainer: {
    padding: 20,
  },
  galleryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: Colors.black,
  },
  galleryImage: {
    width: 150,
    height: 150,
    borderRadius: 10,
    marginRight: 10,
  },
});

export default WelcomeScreen;