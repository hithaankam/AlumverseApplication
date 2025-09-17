import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Colors from '../constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useAuth } from '../context/AuthContext';
import WelcomeScreen from './Welcome';
import Feed from './feed'; // Import the actual Feed component
import AlumniSearch from './AlumniSearch';

// Placeholder Screens for other Tabs
const JobPortalScreen = () => (
  <View style={styles.tabContent}>
    <Text style={styles.tabContentText}>Job Portal Content</Text>
  </View>
);

const EventsScreen = () => (
  <View style={styles.tabContent}>
    <Text style={styles.tabContentText}>Events Content</Text>
  </View>
);

const GivingBackScreen = () => (
  <View style={styles.tabContent}>
    <Text style={styles.tabContentText}>Giving Back Content</Text>
  </View>
);

const FeedbackPollsScreen = () => (
  <View style={styles.tabContent}>
    <Text style={styles.tabContentText}>Feedback & Polls Content</Text>
  </View>
);

const Tab = createMaterialTopTabNavigator();

const Dashboard = () => {
  const insets = useSafeAreaInsets();
  const { user } = useAuth();

  console.log('=== Dashboard Debug ===');
  console.log('user in Dashboard:', user);

  const handleProfileClick = () => {
    router.push('/ViewProfile');
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header with user name and profile icon */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Image source={require('../assets/images/logo.png')} style={styles.logo} />
          <View>
            <Text style={styles.headerTitle}>Welcome, {user?.fullName || 'User'}!</Text>
            <Text style={styles.headerSubtitle}>Alumverse</Text>
          </View>
        </View>
        <TouchableOpacity onPress={handleProfileClick} style={styles.profileIconContainer}>
          <Image source={require('../assets/images/icon.png')} style={styles.profileIcon} />
        </TouchableOpacity>
      </View>

      {/* Horizontal Top Tab Navigation */}
        <Tab.Navigator
          screenOptions={{
            tabBarActiveTintColor: Colors.primary,
            tabBarInactiveTintColor: Colors.grayText,
            tabBarStyle: styles.tabBar,
            tabBarLabelStyle: styles.tabBarLabel,
            tabBarItemStyle: styles.tabBarItem,
            tabBarIndicatorStyle: styles.tabBarIndicator,
            tabBarScrollEnabled: true,
          }}>
          <Tab.Screen name="Home" component={WelcomeScreen} />
          <Tab.Screen name="Feed" component={Feed} />
          <Tab.Screen name="Job Portal" component={JobPortalScreen} />
          <Tab.Screen name="Directory" component={AlumniSearch} />
          <Tab.Screen name="Events" component={EventsScreen} />
          <Tab.Screen name="Giving Back" component={GivingBackScreen} />
          <Tab.Screen name="Feedback & Polls" component={FeedbackPollsScreen} />
        </Tab.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 2,
    borderBottomColor: '#e2e8f0',
    shadowColor: '#64748b',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 50,
    height: 50,
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
    fontFamily: 'monospace',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#64748b',
    fontFamily: 'monospace',
  },
  profileIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#3b82f6',
  },
  profileIcon: {
    width: '100%',
    height: '100%',
  },
  tabBar: {
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.subtleBorder,
    elevation: 0,
    shadowOpacity: 0,
  },
  tabBarLabel: {
    fontSize: 25,
    fontWeight: 'bold',
    fontFamily: 'monospace',
  },
  tabBarItem: {
    width: 'auto',
  },
  tabBarIndicator: {
    backgroundColor: '#ffe66d',
    height: 4,
    borderRadius: 0,
  },
  tabContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.lightBackground,
  },
  tabContentText: {
    color: Colors.black,
    fontSize: 35,
    fontWeight: 'bold',
    fontFamily: 'monospace',
    textShadow: '2px 2px 0px #ff6b9d',
  },
});

export default Dashboard;
