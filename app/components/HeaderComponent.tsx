import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import Colors from '../../constants/Colors';

export const HeaderComponent = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>Alumverse</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: '100%',
    padding: 15,
    // Add extra padding at the top for the device's status bar
    paddingTop: Platform.OS === 'ios' ? 50 : 30, 
    backgroundColor: Colors.primary, // Use the new primary color
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.black, // Add subtle shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // For Android shadow
  },
  headerText: {
    color: Colors.white, // Use white for the header text
    fontSize: 20,
    fontWeight: 'bold',
  },
});