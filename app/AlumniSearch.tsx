import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList, SafeAreaView, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getAllAlumni } from '../services/AlumService';
import Colors from '../constants/Colors';

interface Alumni {
  id: string;
  fullName: string;
  email: string;
}

const AlumniSearch = () => {
  const [query, setQuery] = useState("");
  const [allAlumni, setAllAlumni] = useState<Alumni[]>([]);
  const [filteredAlumni, setFilteredAlumni] = useState<Alumni[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const fadeAnim = useState(new Animated.Value(0))[0];

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, []);

  const loadAlumni = () => {
    setLoading(true);
    getAllAlumni()
      .then((response) => {
        setAllAlumni(response.data);
        setFilteredAlumni(response.data);
        setError("");
      })
      .catch(() => {
        setError("Could not load alumni.");
        setAllAlumni([]);
        setFilteredAlumni([]);
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
      setFilteredAlumni(allAlumni);
    }
  }, [query, allAlumni]);

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.title}>Alumni Directory</Text>
          <Text style={styles.subtitle}>Connect with mentors, buddy, and gurus from your college.</Text>
          <View style={styles.countPill}>
            <Text style={styles.countText}>{allAlumni.length} Alumni</Text>
          </View>
        </View>
      </View>

      {/* Filters */}
      <View style={styles.filtersContainer}>
        <Text style={styles.filterLabel}>Filter by:</Text>
        <View style={styles.filterChips}>
          <View style={styles.filterChip}>
            <Text style={styles.filterChipText}>Batch</Text>
          </View>
          <View style={styles.filterChip}>
            <Text style={styles.filterChipText}>Department</Text>
          </View>
          <View style={styles.filterChip}>
            <Text style={styles.filterChipText}>Company</Text>
          </View>
        </View>
      </View>

      {/* Search Input */}
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Ionicons name="search" size={20} color={Colors.gray400} style={styles.searchIcon} />
          <TextInput
            style={styles.input}
            placeholder="Search alumni by name, email, or company"
            placeholderTextColor="#9AA0A6"
            value={query}
            onChangeText={setQuery}
          />
        </View>
      </View>

      {error && <Text style={styles.errorText}>{error}</Text>}

      <FlatList
        data={filteredAlumni}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.resultItem}>
            <View style={styles.avatarContainer}>
              <Text style={styles.avatarText}>
                {item.fullName ? item.fullName.charAt(0).toUpperCase() : '?'}
              </Text>
            </View>
            <View style={styles.userInfo}>
              <Text style={styles.resultName}>
                {item.fullName || 'Profile coming soon...'}
              </Text>
              <Text style={styles.resultEmail}>{item.email}</Text>
            </View>
          </View>
        )}
        onRefresh={loadAlumni}
        refreshing={loading}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />

      {/* Decorative shapes */}
      <View style={[styles.shape, styles.shapeBlue]} />
      <View style={[styles.shape, styles.shapeRed]} />
      <View style={[styles.shape, styles.shapeYellow]} />
      <View style={[styles.shape, styles.shapeGreen]} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.gray50,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray100,
  },
  headerContent: {
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.black,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.gray500,
    marginBottom: 12,
    lineHeight: 20,
  },
  countPill: {
    backgroundColor: Colors.gray100,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  countText: {
    fontSize: 12,
    color: Colors.gray600,
    fontWeight: '600',
  },
  filtersContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray100,
  },
  filterLabel: {
    fontSize: 12,
    color: Colors.gray500,
    marginBottom: 8,
    fontWeight: '500',
  },
  filterChips: {
    flexDirection: 'row',
    gap: 8,
  },
  filterChip: {
    backgroundColor: Colors.gray50,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.gray200,
  },
  filterChipText: {
    fontSize: 12,
    color: Colors.gray600,
    fontWeight: '500',
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 24,
    paddingHorizontal: 20,
    paddingVertical: 16,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: Colors.black,
  },
  listContent: {
    paddingHorizontal: 16,
  },
  resultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  avatarContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    color: Colors.white,
    fontSize: 20,
    fontWeight: 'bold',
  },
  userInfo: {
    flex: 1,
  },
  resultName: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.black,
    marginBottom: 4,
  },
  resultEmail: {
    fontSize: 14,
    color: '#70757A',
  },
  errorText: {
    color: Colors.error,
    textAlign: 'center',
    marginHorizontal: 16,
    marginBottom: 16,
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

export default AlumniSearch;
