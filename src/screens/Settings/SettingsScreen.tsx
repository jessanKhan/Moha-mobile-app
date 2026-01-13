import React from 'react';
import { Text, View } from 'react-native';

const SettingsScreen = () => {
  return (
    <View className="flex-1 items-center justify-center bg-white dark:bg-black">
      <Text className="text-2xl font-bold text-orange-600 dark:text-orange-400">
        Settings Screen
      </Text>
      <Text className="text-gray-500 mt-2">
        Configure your app preferences.
      </Text>
    </View>
  );
};

export default SettingsScreen;
