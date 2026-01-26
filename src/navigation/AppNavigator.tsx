import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './TabNavigator';

import ServiceDetailScreen from '../screens/Services/ServiceDetailScreen';
import StatisticsScreen from '../screens/Services/StatisticsScreen';
import PolicyLawScreen from '../screens/Services/PolicyLawScreen';
import EmergencyContactScreen from '../screens/Services/EmergencyContactScreen';
//import InitiativesScreen from '../screens/Services/InitiativesScreen';
import ComplaintScreen from '../screens/Services/ComplaintScreen';
import NewsMediaScreen from '../screens/Services/NewsMediaScreen';
import PreventiveMeasuresScreen from '../screens/Services/PreventiveMeasuresScreen';
import QuickLinkScreen from '../screens/Services/QuickLinkScreen';
import TraffickerInfoScreen from '../screens/Services/TraffickerInfoScreen';
import ServiceSearchScreen from '../screens/Services/ServiceSearchScreen';
import RehabilitationScreen from '../screens/Services/RehabilitationScreen';
import RepatriationScreen from '../screens/Services/RepatriationScreen';
import ShelterHomeScreen from '../screens/Services/ShelterHomeScreen';
import Initiatives from '../screens/Initiative/Initiatives';
import PolicyAndLawScreen from '../screens/Services/PolicyAndLawScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainTabs" component={TabNavigator} />
      {/* Kept as fallback or example */}
      <Stack.Screen name="ServiceDetails" component={ServiceDetailScreen} />

      {/* New Service Screens */}
      <Stack.Screen name="Statistics" component={StatisticsScreen} />
      <Stack.Screen name="PolicyLaw" component={PolicyAndLawScreen} />
      <Stack.Screen
        name="EmergencyContact"
        component={EmergencyContactScreen}
      />
      <Stack.Screen name="Initiatives" component={Initiatives} />
      <Stack.Screen name="Complaint" component={ComplaintScreen} />
      <Stack.Screen name="NewsMedia" component={NewsMediaScreen} />
      <Stack.Screen
        name="PreventiveMeasures"
        component={PreventiveMeasuresScreen}
      />
      <Stack.Screen name="QuickLink" component={QuickLinkScreen} />
      <Stack.Screen name="TraffickerInfo" component={TraffickerInfoScreen} />
      <Stack.Screen name="ServiceSearch" component={ServiceSearchScreen} />
      <Stack.Screen name="Rehabilitation" component={RehabilitationScreen} />
      <Stack.Screen name="Repatriation" component={RepatriationScreen} />
      <Stack.Screen name="ShelterHome" component={ShelterHomeScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
