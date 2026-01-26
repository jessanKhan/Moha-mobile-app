import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home, User, Settings } from 'lucide-react-native';
import { useColorScheme } from 'react-native';
import HomeScreen from '../screens/Home/HomeScreen';
import ProfileScreen from '../screens/Profile/ProfileScreen';
import SettingsScreen from '../screens/Settings/SettingsScreen';
import StatisticsScreen from '../screens/Services/StatisticsScreen';
import PolicyAndLawScreen from '../screens/Services/PolicyAndLawScreen';
import EmergencyContactScreen from '../screens/Services/EmergencyContactScreen';
import Initiatives from '../screens/Initiative/Initiatives';
import ComplaintScreen from '../screens/Services/ComplaintScreen';
import NewsMediaScreen from '../screens/Services/NewsMediaScreen';
import PreventiveMeasuresScreen from '../screens/Services/PreventiveMeasuresScreen';
import QuickLinkScreen from '../screens/Services/QuickLinkScreen';
import TraffickerInfoScreen from '../screens/Services/TraffickerInfoScreen';
import ServiceSearchScreen from '../screens/Services/ServiceSearchScreen';
import RehabilitationScreen from '../screens/Services/RehabilitationScreen';
import RepatriationScreen from '../screens/Services/RepatriationScreen';
import ShelterHomeScreen from '../screens/Services/ShelterHomeScreen';
import AboutTraffickingScreen from '../screens/Services/AboutTraffickingScreen';
import ServiceDetailScreen from '../screens/Services/ServiceDetailScreen';

const Tab = createBottomTabNavigator();

const HomeStack = createNativeStackNavigator();

const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="HomeScreen" component={HomeScreen} />
      <HomeStack.Screen name="Statistics" component={StatisticsScreen} />
      <HomeStack.Screen name="PolicyLaw" component={PolicyAndLawScreen} />
      <HomeStack.Screen name="EmergencyContact" component={EmergencyContactScreen} />
      <HomeStack.Screen name="Initiatives" component={Initiatives} />
      <HomeStack.Screen name="Complaint" component={ComplaintScreen} />
      <HomeStack.Screen name="NewsMedia" component={NewsMediaScreen} />
      <HomeStack.Screen name="PreventiveMeasures" component={PreventiveMeasuresScreen} />
      <HomeStack.Screen name="QuickLink" component={QuickLinkScreen} />
      <HomeStack.Screen name="TraffickerInfo" component={TraffickerInfoScreen} />
      <HomeStack.Screen name="ServiceSearch" component={ServiceSearchScreen} />
      <HomeStack.Screen name="Rehabilitation" component={RehabilitationScreen} />
      <HomeStack.Screen name="Repatriation" component={RepatriationScreen} />
      <HomeStack.Screen name="ShelterHome" component={ShelterHomeScreen} />
      <HomeStack.Screen name="AboutTrafficking" component={AboutTraffickingScreen} />
      <HomeStack.Screen name="ServiceDetails" component={ServiceDetailScreen} />
    </HomeStack.Navigator>
  );
};

import { verticalScale, moderateScale } from 'react-native-size-matters';

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
          shadowOffset: { width: 0, height: verticalScale(-2) },
          shadowOpacity: 0.1,
          shadowRadius: moderateScale(4),
          height: verticalScale(64),
          paddingBottom: verticalScale(10),
          paddingTop: verticalScale(5),
        },
        tabBarActiveTintColor: '#2563eb', // Blue-600
        tabBarInactiveTintColor: isDarkMode ? '#9ca3af' : '#6b7280',
        tabBarLabelStyle: {
          fontSize: moderateScale(11),
          fontWeight: '500',
          marginBottom: verticalScale(5),
        },
        tabBarIcon: ({ color, size }) => {
          const iconSize = moderateScale(size);
          if (route.name === 'Home') {
            return <Home color={color} size={iconSize} />;
          } else if (route.name === 'Profile') {
            return <User color={color} size={iconSize} />;
          } else if (route.name === 'Settings') {
            return <Settings color={color} size={iconSize} />;
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
