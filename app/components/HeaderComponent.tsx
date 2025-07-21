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
    backgroundColor: Colors.PRIMARY,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    color: Colors.WHITE,
    fontSize: 20,
    fontWeight: 'bold',
  },
});