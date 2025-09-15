import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import { searchAlumniByquery } from '@/services/AlumService';
import Colors from '../constants/Colors'; 

interface Alumni {
  id: string;
  fullName: string;
  email: string;
}

const AlumniSearch = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Alumni[]>([]);
  const [error, setError] = useState("");

  const handleSearch = () => {
    if (!query) {
      setError("Please enter a name");
      return;
    }

    searchAlumniByquery(query)
      .then((response) => {
        setResults(response.data);
        setError("");
      })
      .catch(() => {
        setError("Search Not Found");
        setResults([]);
      });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.gray50 }}>
      <View style={styles.container}>
      <Text style={styles.title}>Search Alumni</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter name"
        value={query}
        onChangeText={setQuery}
      />
      <TouchableOpacity style={styles.button} onPress={handleSearch}>
        <Text style={styles.buttonText}>Search</Text>
      </TouchableOpacity>

      {error && <Text style={styles.errorText}>{error}</Text>}

      <FlatList
        data={results}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.resultItem}>
            <Text style={styles.resultName}>{item.fullName}</Text>
            <Text style={{ color: Colors.gray500 }}>{item.email}</Text>
          </View>
        )}
      />
    </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // Make container take full height
    padding: 16,
    backgroundColor: Colors.gray50, // Use light gray background
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: Colors.gray600, // Darker gray for title
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.gray200, // Softer border color
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    backgroundColor: Colors.white,
    color: Colors.gray600, // Input text color
  },
  button: {
    backgroundColor: Colors.primary, // Use primary color for button
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: Colors.WHITE,
    fontWeight: 'bold',
  },
  errorText: {
    color: Colors.error, // Use error color
    marginTop: 10,
  },
  resultItem: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray100, // Light gray for border
    paddingVertical: 10,
  },
  resultName: {
    fontWeight: 'bold',
    color: Colors.gray600, // Darker gray for result name
  },
});

export default AlumniSearch;