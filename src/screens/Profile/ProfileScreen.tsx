import React from 'react';
import { Text, View } from 'react-native';

const ProfileScreen = () => {
  return (
    <View className="flex-1 items-center justify-center bg-white dark:bg-black">
      <Text className="text-2xl font-bold text-green-600 dark:text-green-400">
        Profile Screen
      </Text>
      <Text className="text-gray-500 mt-2">
        Manage your personal information.
      </Text>
    </View>
  );
};

export default ProfileScreen;
