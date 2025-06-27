import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const FooterComponent = () => {
  return (
    <View style={styles.footer}>
      <Text>All rights reserved 2025 by Build Beyond</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    padding: 20,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderColor: '#ccc',
    alignItems: 'center',
  },
});
