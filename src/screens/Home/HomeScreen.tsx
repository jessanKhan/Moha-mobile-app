import React from 'react';
import { Text, View, Image } from 'react-native';
import Header from '../../components/Header';

const HomeScreen = () => {
  return (
    <View className="flex-1 bg-white dark:bg-black">
      <Header
        variant="home"
        title="জাতীয় মানব পাচার দমন সংস্থা"
        subtitle="মানবপাচার মোকাবিলায় জাতীয় পর্যায়ে সমন্বিত উদ্যোগ"
        rightComponent={
          <View className="h-10 w-10 rounded-full bg-white/20 items-center justify-center border border-white/30">
            <Text className="text-white font-bold">U</Text>
          </View>
        }
      />
      <View className="flex-1 items-center justify-center">
        <Text className="text-2xl font-bold text-blue-600 dark:text-blue-400">
          Home Screen
        </Text>
        <Text className="text-gray-500 mt-2">
          Welcome to your dashboard!
        </Text>
      </View>
    </View>
  );
};

export default HomeScreen;
