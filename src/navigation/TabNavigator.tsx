import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home, User, Settings } from 'lucide-react-native';
import { useColorScheme } from 'react-native';
import HomeScreen from '../screens/Home/HomeScreen';
import ProfileScreen from '../screens/Profile/ProfileScreen';
import SettingsScreen from '../screens/Settings/SettingsScreen';
import StatisticsScreen from '../screens/Services/StatisticsScreen';
import PolicyLawScreen from '../screens/Services/PolicyLawScreen';
import EmergencyContactScreen from '../screens/Services/EmergencyContactScreen';
import InitiativesScreen from '../screens/Services/InitiativesScreen';
import ComplaintScreen from '../screens/Services/ComplaintScreen';
import NewsMediaScreen from '../screens/Services/NewsMediaScreen';
import PreventiveMeasuresScreen from '../screens/Services/PreventiveMeasuresScreen';
import QuickLinkScreen from '../screens/Services/QuickLinkScreen';
import TraffickerInfoScreen from '../screens/Services/TraffickerInfoScreen';
import ServiceSearchScreen from '../screens/Services/ServiceSearchScreen';
import ServiceDetailScreen from '../screens/Services/ServiceDetailScreen';

const Tab = createBottomTabNavigator();

const HomeStack = createNativeStackNavigator();

const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="HomeScreen" component={HomeScreen} />
      <HomeStack.Screen name="Statistics" component={StatisticsScreen} />
      <HomeStack.Screen name="PolicyLaw" component={PolicyLawScreen} />
      <HomeStack.Screen name="EmergencyContact" component={EmergencyContactScreen} />
      <HomeStack.Screen name="Initiatives" component={InitiativesScreen} />
      <HomeStack.Screen name="Complaint" component={ComplaintScreen} />
      <HomeStack.Screen name="NewsMedia" component={NewsMediaScreen} />
      <HomeStack.Screen name="PreventiveMeasures" component={PreventiveMeasuresScreen} />
      <HomeStack.Screen name="QuickLink" component={QuickLinkScreen} />
      <HomeStack.Screen name="TraffickerInfo" component={TraffickerInfoScreen} />
      <HomeStack.Screen name="ServiceSearch" component={ServiceSearchScreen} />
      <HomeStack.Screen name="ServiceDetails" component={ServiceDetailScreen} />
    </HomeStack.Navigator>
  );
};

const TabNavigator = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        headerStyle: {
          backgroundColor: isDarkMode ? '#1a1a1a' : '#ffffff',
        },
        headerTintColor: isDarkMode ? '#ffffff' : '#000000',
        tabBarStyle: {
          backgroundColor: isDarkMode ? '#1a1a1a' : '#ffffff',
          borderTopWidth: 0,
          elevation: 8,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          height: 60,
          paddingBottom: 8,
        },
        tabBarActiveTintColor: '#2563eb', // Blue-600
        tabBarInactiveTintColor: isDarkMode ? '#9ca3af' : '#6b7280',
        tabBarIcon: ({ color, size }) => {
          if (route.name === 'Home') {
            return <Home color={color} size={size} />;
          } else if (route.name === 'Profile') {
            return <User color={color} size={size} />;
          } else if (route.name === 'Settings') {
            return <Settings color={color} size={size} />;
          }
          return null;
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeStackNavigator}
        options={{ title: 'Home' }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ title: 'Profile' }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ title: 'Settings' }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
