import { View, Text, Image, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import Colors from '../constants/Colors';
import { router } from 'expo-router';

export default function LandingPage() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Image 
          source={require('../assets/images/logo.png')} 
          style={styles.logo}
          tintColor={Colors.primary}
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
    backgroundColor: Colors.lightBackground,
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
    tintColor: Colors.primary,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.black,
    marginBottom: 40,
    textAlign: 'center',
  },
  featuresContainer: {
    width: '100%',
    marginBottom: 40,
  },
  featureCard: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 3,
    borderWidth: 1,
    borderColor: Colors.subtleBorder,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: 8,
  },
  featureText: {
    fontSize: 14,
    color: Colors.grayText,
  },
  primaryButton: {
    width: '100%',
    height: 50,
    borderRadius: 12,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    color: Colors.white,
    fontWeight: 'bold',
    fontSize: 16,
  },
  linkText: {
    color: Colors.primary,
    textAlign: 'center',
    fontWeight: '500',
  },
});
