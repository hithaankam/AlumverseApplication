// home.tsx
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import Colors from '../constants/Colors';
import { router } from 'expo-router';
import ListAlum from '../app/ListAlum';
import AlumniSearch from '../app/AlumniSearch';
import { Platform } from 'react-native';
import { FooterComponent } from './components/FooterComponent';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      {/* Search Bar at Top */}
      <View style={styles.searchContainer}>
        <AlumniSearch />
      </View>
      
      {/* Main Content */}
      <View style={styles.contentContainer}>
        {/* Left Sidebar - Dashboard */}
        <View style={styles.sidebar}>
          <View style={styles.sidebarCard}>
            <Text style={styles.sidebarTitle}>Your Network</Text>
            {/* Add network stats/connections here */}
          </View>
          
          <View style={styles.sidebarCard}>
            <Text style={styles.sidebarTitle}>Upcoming Events</Text>
            {/* Add events list here */}
          </View>
        </View>
        
        {/* Main Feed */}
        <ScrollView style={styles.feedContainer}>
          <Text style={styles.title}>Alumverse Dashboard</Text>
          
          <View style={styles.welcomeContainer}>
            <Text style={styles.welcomeText}>Welcome to Alumverse!</Text>
            <Text style={styles.subtitle}>Connect with your alumni community</Text>
          </View>

          <TouchableOpacity onPress={() => router.push({pathname: '/feed'})}>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>View Community Feed</Text>
              <Text style={styles.cardSubtitle}>See updates from your network →</Text>
            </View>
          </TouchableOpacity>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Recent Activity</Text>
          </View>
          
          <ListAlum />
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  searchContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.GRAY_LIGHT,
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  sidebar: {
    width: 300,
    padding: 10,
    borderRightWidth: 1,
    borderRightColor: Colors.GRAY_LIGHT,
  },
  sidebarCard: {
    backgroundColor: Colors.WHITE,
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    elevation: 2,
  },
  sidebarTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.PRIMARY,
    marginBottom: 10,
  },
  feedContainer: {
    flex: 1,
    padding: 15,
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
  },
  card: {
    backgroundColor: Colors.WHITE,
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.PRIMARY,
  },
  cardSubtitle: {
    fontSize: 14,
    color: Colors.GRAY_DARK,
    marginTop: 5,
  },
});