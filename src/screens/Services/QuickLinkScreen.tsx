import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import Header from '../../components/Header';

const QuickLinkScreen = () => {
    return (
        <View className="flex-1 bg-white dark:bg-black">
            <Header title="দ্রুত লিংক" showBackButton={true} />
            <ScrollView className="flex-1 p-4">
                <View className="bg-gray-50 dark:bg-zinc-900 p-6 rounded-2xl border border-gray-100 dark:border-zinc-800">
                    <Text className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">দ্রুত লিংক</Text>
                    <Text className="text-gray-600 dark:text-gray-300 leading-6">This screen will contain quick links.</Text>
                </View>
            </ScrollView>
        </View>
    );
};

export default QuickLinkScreen;
