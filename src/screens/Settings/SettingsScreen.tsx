import React from 'react';
import { Text, View } from 'react-native';
import Header from '../../components/Header';

const SettingsScreen = () => {
  return (
    <View className="flex-1 bg-white dark:bg-black">
      <Header
        variant="default"
        title="সেটিংস"
        showBackButton={true}
      />
      <View className="flex-1 items-center justify-center">
        <Text className="text-2xl font-bold text-orange-600 dark:text-orange-400">
          Settings Screen
        </Text>
        <Text className="text-gray-500 mt-2">
          Configure your app preferences.
        </Text>
      </View>
    </View>
  );
};

export default SettingsScreen;
