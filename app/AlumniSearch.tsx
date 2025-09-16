import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import { getAllAlumni } from '../services/AlumService'; // Assuming search is client-side now
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
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.gray50 }}>
      <View style={styles.container}>
        <Text style={styles.title}>Alumni Directory</Text>
        <TextInput
          style={styles.input}
          placeholder="Search by name or email"
          value={query}
          onChangeText={setQuery}
        />

        {error && <Text style={styles.errorText}>{error}</Text>}

        <FlatList
          data={filteredAlumni}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.resultItem}>
              <Text style={styles.resultName}>{item.fullName}</Text>
              <Text style={{ color: Colors.gray500 }}>{item.email}</Text>
            </View>
          )}
          onRefresh={loadAlumni}
          refreshing={loading}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: Colors.gray50,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: Colors.gray600,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.gray200,
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    backgroundColor: Colors.white,
    color: Colors.gray600,
  },
  errorText: {
    color: Colors.error,
    marginTop: 10,
    textAlign: 'center',
  },
  resultItem: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray100,
    paddingVertical: 10,
  },
  resultName: {
    fontWeight: 'bold',
    color: Colors.gray600,
  },
});

export default AlumniSearch;
