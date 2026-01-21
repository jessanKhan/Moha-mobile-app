import InitiativesComponent from '../../components/initiativesComponent/InitiativesComponent';
import CustomCommonIcon from '../../components/customCommonIconComponent/CustomCommonIcon';
import { Building, ChartColumn } from 'lucide-react-native';
import React from 'react';
import { Text, View } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import Initiatives from '../Initiative/Initiatives';
import PolicyAndLawComponent from '../../components/policyAndLawComponent/PolicyAndLawComponent';
import PolicyAndLawScreen from '../PolicyAndLaw/PolicyAndLawScreen';

const HomeScreen = () => {
  return (
    //className="flex-1 items-center justify-center bg-white dark:bg-black"
    <View className="flex-1 bg-white dark:bg-black">
      {/* <ServiceComponent /> */}
      {/* <CustomCommonIcon
        icon={ChartColumn}
        bgColor="#d32b2b"
        iconColor="#fff"
        size={moderateScale(28)}
      /> */}
      {/* <InitiativesComponent /> */}
      {/* <Initiatives /> */}
      <PolicyAndLawScreen />
      {/* <Text className="text-2xl font-bold text-blue-600 dark:text-blue-400">
        Home Screen
      </Text>
      <Text className="text-gray-500 mt-2">Welcome to your dashboard!</Text> */}
    </View>
  );
};

export default HomeScreen;
