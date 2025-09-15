import { View, Text, Image, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import Colors from '../constants/Colors';
import { router } from 'expo-router';
// HeaderComponent and FooterComponent are not used in this file, so they can be removed if not needed elsewhere.
// import { HeaderComponent } from './components/HeaderComponent';
// import { FooterComponent } from './components/FooterComponent';

export default function LandingPage() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Image 
          source={require('../assets/images/logo.png')} 
          style={styles.logo}
        />
        
        <Text style={styles.title}>Welcome to Alumverse</Text>
        
        <View style={styles.featuresContainer}>
          <View style={styles.featureCard}>
            <Text style={styles.featureTitle}>10,000+ Alumni</Text>
            <Text style={styles.featureText}>Connect with graduates from your institution</Text>
          </View>
          
          <View style={styles.featureCard}>
            <Text style={styles.featureTitle}>500+ Mentors</Text>
            <Text style={styles.featureText}>Get guidance from experienced professionals</Text>
          </View>
          
          <View style={styles.featureCard}>
            <Text style={styles.featureTitle}>100+ Events</Text>
            <Text style={styles.featureText}>Networking opportunities every month</Text>
          </View>
        </View>
        
        <TouchableOpacity 
          style={styles.primaryButton}
          onPress={() => router.push({ pathname: '/auth', params: { form: 'signup' }})}
        >
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={() => router.push('/auth')}>
          <Text style={styles.linkText}>Already have an account? Login</Text>
        </TouchableOpacity>
        
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.primaryDark, // Use the new primaryDark for the background
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 30,
    tintColor: Colors.white, // Make logo white for contrast
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.white, // Use white for the title
    marginBottom: 40,
    textAlign: 'center',
  },
  featuresContainer: {
    width: '100%',
    marginBottom: 40,
  },
  featureCard: {
    backgroundColor: Colors.white, // White background for cards
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    shadowColor: Colors.black, // Add subtle shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // For Android shadow
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.primaryDark, // Use primaryDark for feature titles
    marginBottom: 8,
  },
  featureText: {
    fontSize: 14,
    color: Colors.gray500, // Use a darker gray for feature text
  },
  primaryButton: {
    width: '100%',
    height: 50,
    borderRadius: 12,
    backgroundColor: Colors.secondary, // Use secondary color for the main button
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    color: Colors.white, // White text for the primary button
    fontWeight: 'bold',
    fontSize: 16,
  },
  linkText: {
    color: Colors.white, // White for the link text
    textAlign: 'center',
    fontWeight: '500',
  },
});
