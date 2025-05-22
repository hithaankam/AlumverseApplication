import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Colors from '../constants/Colors';
import { router } from 'expo-router';

export default function LandingPage() {
  return (
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
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    backgroundColor: Colors.PRIMARY,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.WHITE,
    marginBottom: 40,
    textAlign: 'center',
  },
  featuresContainer: {
    width: '100%',
    marginBottom: 40,
  },
  featureCard: {
    backgroundColor: Colors.WHITE,
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.PRIMARY,
    marginBottom: 8,
  },
  featureText: {
    fontSize: 14,
    color: Colors.GRAY_DARK,
  },
  primaryButton: {
    width: '100%',
    height: 50,
    borderRadius: 12,
    backgroundColor: Colors.WHITE,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonText: {
    color: Colors.PRIMARY,
    fontWeight: 'bold',
    fontSize: 16,
  },
  linkText: {
    color: Colors.WHITE,
    textAlign: 'center',
    fontWeight: '500',
  },
});