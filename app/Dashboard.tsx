import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Colors from '../constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import Feed from './feed'; // Import the actual Feed component

// Placeholder Screens for other Tabs
const JobPortalScreen = () => (
  <View style={styles.tabContent}>
    <Text style={styles.tabContentText}>Job Portal Content</Text>
  </View>
);

const DirectoryScreen = () => (
  <View style={styles.tabContent}>
    <Text style={styles.tabContentText}>Directory Content</Text>
  </View>
);

const OpportunitiesScreen = () => (
  <View style={styles.tabContent}>
    <Text style={styles.tabContentText}>Opportunities Content</Text>
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

  const handleProfileClick = () => {
    router.push('/ViewProfile');
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header with small profile icon */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Alumverse</Text>
        <TouchableOpacity onPress={handleProfileClick} style={styles.profileIconContainer}>
          <Image source={require('../assets/images/icon.png')} style={styles.profileIcon} />
        </TouchableOpacity>
      </View>

      {/* Horizontal Top Tab Navigation */}
        <Tab.Navigator
          screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: Colors.primary,
            tabBarInactiveTintColor: Colors.grayText,
            tabBarStyle: styles.tabBar,
            tabBarLabelStyle: styles.tabBarLabel,
            tabBarItemStyle: styles.tabBarItem,
            tabBarIndicatorStyle: styles.tabBarIndicator,
            tabBarScrollEnabled: true,
          }}>
          <Tab.Screen name="Feed" component={Feed} />
          <Tab.Screen name="Job Portal" component={JobPortalScreen} />
          <Tab.Screen name="Directory" component={DirectoryScreen} />
          <Tab.Screen name="Opportunities" component={OpportunitiesScreen} />
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
    backgroundColor: Colors.lightBackground,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.subtleBorder,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.black,
  },
  profileIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.primary,
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
    fontSize: 11,
    fontWeight: 'bold',
  },
  tabBarItem: {
    width: 'auto',
  },
  tabBarIndicator: {
    backgroundColor: Colors.primary,
    height: 3,
    borderRadius: 2,
  },
  tabContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.lightBackground,
  },
  tabContentText: {
    color: Colors.black,
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default Dashboard;
