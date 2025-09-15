import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '../../constants/Colors'; // Import Colors

export const FooterComponent = () => {
  return (
    <View style={styles.footer}>
      <Text style={styles.footerText}>All rights reserved 2025 by Build Beyond</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    padding: 20,
    backgroundColor: Colors.white, // Use white for the footer background
    borderTopWidth: 1,
    borderColor: Colors.gray100, // Use a light gray for the border
    alignItems: 'center',
    shadowColor: Colors.black, // Add subtle shadow
    shadowOffset: { width: 0, height: -2 }, // Shadow upwards
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2, // For Android shadow
  },
  footerText: {
    color: Colors.gray400, // Use a medium gray for footer text
    fontSize: 12,
  },
});
