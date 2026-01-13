import React from 'react';
import { Text, View } from 'react-native';

const HomeScreen = () => {
  return (
    <View className="flex-1 items-center justify-center bg-white dark:bg-black">
      <Text className="text-2xl font-bold text-blue-600 dark:text-blue-400">
        Home Screen
      </Text>
      <Text className="text-gray-500 mt-2">
        Welcome to your dashboard!
      </Text>
    </View>
  );
};

export default HomeScreen;
