import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
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
            <Text>{item.email}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    marginVertical: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    backgroundColor: Colors.WHITE,
  },
  button: {
    backgroundColor: Colors.PRIMARY,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: Colors.WHITE,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    marginTop: 10,
  },
  resultItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingVertical: 10,
  },
  resultName: {
    fontWeight: 'bold',
  },
});

export default AlumniSearch;