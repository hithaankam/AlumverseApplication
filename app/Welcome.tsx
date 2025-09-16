import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  SafeAreaView,
  FlatList,
  Animated
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors'; // Import Colors from constants
import { getAllAlumni } from '../services/AlumService'; // Import getAllAlumni

interface Alumni {
  id: string;
  fullName: string;
  email: string;
}

const { width } = Dimensions.get('window');

const WelcomeScreen = () => {
  const [query, setQuery] = useState("");
  const [allAlumni, setAllAlumni] = useState<Alumni[]>([]); // Initialize with empty array
  const [filteredAlumni, setFilteredAlumni] = useState<Alumni[]>([]);
  const fadeAnim = useState(new Animated.Value(0))[0];

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  // Fetch real alumni data on component mount
  const loadAlumni = () => {
    // setLoading(true); // Removed loading state for simplicity, can be added back
    getAllAlumni()
      .then((response) => {
        setAllAlumni(response.data);
      })
      .catch((err) => {
        console.error("Could not load alumni:", err);
        // setError("Could not load alumni."); // Removed error state for simplicity
        setAllAlumni([]);
      });
      // .finally(() => {
      //   setLoading(false);
      // });
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
    console.log('Navigate to profile of:', alumId);
  };

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Header with logo */}
          <View style={styles.header}>
            <Image 
              source={require('../assets/images/logo.png')} 
              style={styles.logo}
              resizeMode="contain"
            />
            <View>
              <Text style={styles.headerTitle}>ALUMVERSE</Text>
              <Text style={styles.headerTagline}>Celebrating the past, shaping the future.</Text>
            </View>
          </View>

          <View style={styles.content}>
            <Text style={styles.subtitle}>Connect with alumni, discover mentors, and explore career paths.</Text>

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

          {/* Stats section */}
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>10,000+</Text>
              <Text style={styles.statLabel}>Alumni Network</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>5,000+</Text>
              <Text style={styles.statLabel}>Opportunities</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>2,000+</Text>
              <Text style={styles.statLabel}>Mentors</Text>
            </View>
          </View>
        </View>

        {/* Decorative shapes in Google colors */}
        <View style={[styles.shape, styles.shapeBlue]} />
        <View style={[styles.shape, styles.shapeRed]} />
        <View style={[styles.shape, styles.shapeYellow]} />
        <View style={[styles.shape, styles.shapeGreen]} />
      </ScrollView>
    </SafeAreaView>
  </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: Colors.white,
  },
  logo: {
    width: 70,   // increase or decrease for size
    height: 70,
    marginRight: 30,
  },
  headerTitle: {
    fontSize: 50,
    fontWeight: '700',
    color: Colors.primaryDark,
    letterSpacing: 1,
  },
  headerTagline: {
    fontSize: 18,
    color: Colors.primaryLight,
    marginTop: 4,
  },
  content: {
    padding: 24,
    alignItems: 'center',
  },
  mainTitle: {
    fontSize: 36,
    fontWeight: '400',
    color: Colors.black,
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 44,
    maxWidth: 500,
  },
  subtitle: {
    fontSize: 18,
    color: Colors.grayText,
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 24,
    maxWidth: 500,
  },
  searchContainer: {
    width: '100%',
    maxWidth: 650,
    marginBottom: 40,
    alignItems: 'center',
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 28,
    height: 56,
    borderWidth: 1,
    borderColor: Colors.subtleBorder,
    width: '100%',
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: Colors.black,
    marginLeft: 12,
    marginRight: 15,
  },
  resultsList: {
    width: '100%',
    backgroundColor: Colors.white,
    borderRadius: 12,
    marginTop: 8,
    maxHeight: 300,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 3,
  },
  resultItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.subtleBorder,
  },
  resultName: {
    fontWeight: '500',
    color: Colors.black,
    fontSize: 16,
    marginBottom: 4,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    maxWidth: 650,
    paddingVertical: 24,
    borderTopWidth: 1,
    borderTopColor: Colors.subtleBorder,
  },
  statItem: {
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  statNumber: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: Colors.grayText,
  },
  shape: {
    position: 'absolute',
    width: 80,
    height: 80,
    borderRadius: 40,
    zIndex: -1,
  },
  shapeBlue: {
    backgroundColor: 'rgba(43, 108, 176, 0.1)',
    top: '15%',
    left: -40,
  },
  shapeRed: {
    backgroundColor: 'rgba(211, 47, 47, 0.1)',
    top: '40%',
    right: -40,
    width: 60,
    height: 60,
  },
  shapeYellow: {
    backgroundColor: 'rgba(255, 193, 7, 0.1)',
    bottom: '20%',
    left: -30,
    width: 100,
    height: 100,
  },
  shapeGreen: {
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
    bottom: '10%',
    right: -20,
    width: 70,
    height: 70,
  },
});

export default WelcomeScreen;