import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TextInput, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import Colors from '../constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { getAllAlumni } from '../services/AlumService';

interface Alumni {
  id: string;
  fullName: string;
  email: string;
}

const WelcomeScreen = () => {
  const navigation = useNavigation();
  const [query, setQuery] = useState("");
  const [allAlumni, setAllAlumni] = useState<Alumni[]>([]);
  const [filteredAlumni, setFilteredAlumni] = useState<Alumni[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const loadAlumni = () => {
    setLoading(true);
    getAllAlumni()
      .then((response) => {
        setAllAlumni(response.data);
        setError("");
      })
      .catch(() => {
        setError("Could not load alumni.");
        setAllAlumni([]);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    loadAlumni();
  }, []);

  useEffect(() => {
    if (query) {
      const lowercasedQuery = query.toLowerCase();
      const filteredData = allAlumni.filter(item =>
        (item.fullName && item.fullName.toLowerCase().includes(lowercasedQuery)) ||
        (item.email && item.email.toLowerCase().includes(lowercasedQuery))
      );
      setFilteredAlumni(filteredData);
    } else {
      setFilteredAlumni([]);
    }
  }, [query, allAlumni]);

  const handleProfileClick = (alumId) => {
    // TODO: Implement navigation to user profile screen
    // Example: navigation.navigate('ViewProfile', { userId: alumId });
    console.log('Navigate to profile of:', alumId);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Hero Section */}
      <View style={styles.heroSection}>
        <Image
          source={require('../assets/images/logo.png')}
          style={styles.heroIcon}
        />
        <Text style={styles.heroTitle}>AlumnVerse</Text>
        <Text style={styles.heroSubtitle}>Celebrating the past, shaping the future.</Text>
      </View>

      {/* Central Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Ionicons name="search" size={20} color={Colors.grayText} style={{ marginLeft: 15 }} />
          <TextInput
            style={styles.searchInput}
            placeholder="Find your mentor. Build your future."
            placeholderTextColor={Colors.grayText}
            value={query}
            onChangeText={setQuery}
          />
        </View>
        {query.length > 0 && (
          <FlatList
            data={filteredAlumni}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleProfileClick(item.id)}>
                <View style={styles.resultItem}>
                  <Text style={styles.resultName}>{item.fullName}</Text>
                  <Text style={{ color: Colors.gray500 }}>{item.email}</Text>
                </View>
              </TouchableOpacity>
            )}
            style={styles.resultsList}
          />
        )}
      </View>

      {/* Community Gallery */}
      {query.length === 0 && (
        <View style={styles.galleryContainer}>
          <Text style={styles.galleryTitle}>Community Gallery</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <Image source={require('../assets/images/logo.png')} style={styles.galleryImage} />
            <Image source={require('../assets/images/icon.png')} style={styles.galleryImage} />
            <Image source={require('../assets/images/splash-icon.png')} style={styles.galleryImage} />
          </ScrollView>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.lightBackground,
  },
  heroSection: {
    paddingVertical: 60,
    alignItems: 'center',
    backgroundColor: Colors.white,
  },
  heroIcon: {
    width: 80,
    height: 80,
    marginBottom: 20,
  },
  heroTitle: {
    fontSize: 40,
    fontWeight: 'bold',
    color: Colors.black,
  },
  heroSubtitle: {
    fontSize: 18,
    color: Colors.grayText,
    marginTop: 10,
  },
  searchContainer: {
    padding: 20,
    marginTop: -30,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 25,
    height: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  searchInput: {
    flex: 1,
    paddingLeft: 10,
    fontSize: 16,
    color: Colors.black,
  },
  resultsList: {
    marginTop: 10,
    backgroundColor: Colors.white,
    borderRadius: 8,
  },
  resultItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: Colors.subtleBorder,
  },
  resultName: {
    fontWeight: 'bold',
    color: Colors.black,
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
