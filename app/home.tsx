import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Colors from '../constants/Colors';
import { router } from 'expo-router';
import ListAlum from '../app/ListAlum';
import AlumniSearch from '../app/AlumniSearch';
import { Platform } from 'react-native';
import { FooterComponent } from './components/FooterComponent';
export default function HomeScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Alumverse Dashboard</Text>
      
      <View style={styles.welcomeContainer}>
        <Text style={styles.welcomeText}>Welcome to Alumverse!</Text>
        <Text style={styles.subtitle}>Connect with your alumni community</Text>
      
      <TouchableOpacity 
        style={styles.getStartedButton}
        onPress={() => router.push({ pathname: '/auth', params: { form: 'signup' }})}
      >
        <Text style={styles.getStartedText}>Get Started</Text>
      </TouchableOpacity>
      </View>
      <AlumniSearch />
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Recent Activity</Text>
      </View>
      
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Alumni Network</Text>
      </View>
      
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Upcoming Events</Text>
      </View>
        {/* Add ListAlum here */}
  
  <ListAlum />
    </ScrollView>
  
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: Colors.WHITE,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.PRIMARY,
    marginBottom: 20,
  },
  welcomeContainer: {
    backgroundColor: Colors.PRIMARY_LIGHT,
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.PRIMARY,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.GRAY_DARK,
    marginBottom: 20,
    textAlign: 'center',
  },
  getStartedButton: {
    backgroundColor: Colors.PRIMARY,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  getStartedText: {
    color: Colors.WHITE,
    fontWeight: 'bold',
    fontSize: 16,
  },
  card: {
    backgroundColor: Colors.WHITE,
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.GRAY_LIGHT,
    elevation: 3,
    boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.1)'
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.PRIMARY,
  },
});
