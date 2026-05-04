import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home, UserCircle, FilePenLine, Search } from 'lucide-react-native';
import { useColorScheme } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import HomeScreen from '../screens/Home/HomeScreen';
import ProfileScreen from '../screens/Profile/ProfileScreen';
import StatisticsScreen from '../screens/Services/StatisticsScreen';
import EmergencyContactScreen from '../screens/Services/EmergencyContactScreen';
import Initiatives from '../screens/Services/Initiatives';
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
import ServiceListScreen from '../screens/Services/ServiceListScreen';
import SocialIntegrationScreen from '../screens/Services/SocialIntegrationScreen';
import TrainingScreen from '../screens/Services/TrainingScreen';
import AwarenessScreen from '../screens/Services/AwarenessScreen';
import PolicyLawScreen from '../screens/Services/PolicyLawScreen';
import ServiceAidScreen from '../screens/Services/ServiceAidScreen';
import PdfViewerScreen from '../screens/Services/PdfViewerScreen';

import NewsDetailsScreen from '../screens/Services/NewsDetailsScreen';

const Tab = createBottomTabNavigator();

const HomeStack = createNativeStackNavigator();

const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="HomeScreen" component={HomeScreen} />
      <HomeStack.Screen name="Statistics" component={StatisticsScreen} />
      <HomeStack.Screen name="PolicyLaw" component={PolicyLawScreen} />
      <HomeStack.Screen name="EmergencyContact" component={EmergencyContactScreen} />
      <HomeStack.Screen name="Initiatives" component={Initiatives} />
      <HomeStack.Screen name="Complaint" component={ComplaintScreen} />
      <HomeStack.Screen name="NewsMedia" component={NewsMediaScreen} />
      <HomeStack.Screen name="NewsDetails" component={NewsDetailsScreen} />
      <HomeStack.Screen name="PreventiveMeasures" component={PreventiveMeasuresScreen} />
      <HomeStack.Screen name="QuickLink" component={QuickLinkScreen} />
      <HomeStack.Screen name="TraffickerInfo" component={TraffickerInfoScreen} />
      <HomeStack.Screen name="ServiceSearch" component={ServiceSearchScreen} />
      <HomeStack.Screen name="Rehabilitation" component={RehabilitationScreen} />
      <HomeStack.Screen name="Repatriation" component={RepatriationScreen} />
      <HomeStack.Screen name="ShelterHome" component={ShelterHomeScreen} />
      <HomeStack.Screen name="AboutTrafficking" component={AboutTraffickingScreen} />
      <HomeStack.Screen name="ServiceDetails" component={ServiceDetailScreen} />
      <HomeStack.Screen name="ServiceList" component={ServiceListScreen} />
      <HomeStack.Screen name="ServiceAid" component={ServiceAidScreen} />
      <HomeStack.Screen name="SocialIntegration" component={SocialIntegrationScreen} />
      <HomeStack.Screen name="Training" component={TrainingScreen} />
      <HomeStack.Screen name="Awareness" component={AwarenessScreen} />
      <HomeStack.Screen name="PdfViewer" component={PdfViewerScreen} />
    </HomeStack.Navigator>
  );
};

import { verticalScale, moderateScale } from 'react-native-size-matters';


const TabNavigator = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const languageMode = useSelector((state: RootState) => state.language.mode);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarHideOnKeyboard: true,
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
          height: verticalScale(60),
          paddingBottom: verticalScale(5),
          paddingTop: verticalScale(5),
        },
        tabBarLabelPosition: 'below-icon',
        tabBarActiveTintColor: '#009689',
        tabBarInactiveTintColor: '#8696BB',
        tabBarLabelStyle: {
          fontSize: moderateScale(11),
          fontWeight: '500',
          marginTop: verticalScale(8),
          fontFamily: 'July-Bold',
        },
        tabBarIcon: ({ color, size }) => {
          const iconSize = moderateScale(size);
          if (route.name === 'Home') {
            return <Home color={color} size={iconSize} />;
          } else if (route.name === 'Complaint') {
            return <FilePenLine color={color} size={iconSize} />;
          } else if (route.name === 'TraffickerInfo') {
            return <Search color={color} size={iconSize} />;
          } else if (route.name === 'Profile') {
            return <UserCircle color={color} size={iconSize} />;
          }
          return null;
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeStackNavigator}
        options={{ title: languageMode === 'bn' ? 'হোম' : 'Home' }}
      />
      <Tab.Screen
        name="Complaint"
        component={ComplaintScreen}
        options={{ title: languageMode === 'bn' ? 'অভিযোগ করুন' : 'Complaint' }}
      />
      <Tab.Screen
        name="TraffickerInfo"
        component={TraffickerInfoScreen}
        options={{ title: languageMode === 'bn' ? 'পাচারকারীর তথ্য' : 'Trafficker Info' }}
      />
      {/* <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ title: languageMode === 'bn' ? 'প্রোফাইল' : 'Profile' }}
      /> */}
    </Tab.Navigator>
  );
};

export default TabNavigator;
