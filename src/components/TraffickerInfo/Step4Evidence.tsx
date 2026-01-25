import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Image as ImageIcon, Video, Mic, AlertCircle } from 'lucide-react-native';
import { moderateScale } from 'react-native-size-matters';

const Step4Evidence = () => (
    <View className="px-4 py-8">
        <Text className="text-gray-900 dark:text-gray-100 font-bold text-lg mb-1">প্রমাণ</Text>
        <Text className="text-gray-400 dark:text-gray-500 text-sm mb-6">ঐচ্ছিক কিন্তু সহায়ক</Text>

        <View className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-6 mb-8 border border-blue-100 dark:border-blue-800">
            <Text className="text-blue-700 dark:text-blue-300 text-xs leading-5">
                যদি আপনার কাছে কোনো ছবি, ভিডিও বা অডিও রেকর্ডিং থাকে যা প্রমাণ হিসেবে কাজ করতে পারে, তাহলে সেগুলো আপলোড করুন। এটি ঐচ্ছিক কিন্তু তদন্তে সহায়ক হবে।
            </Text>
        </View>

        <View className="flex-row justify-between mb-8">
            {[
                { label: 'ছবি', icon: ImageIcon, color: 'bg-blue-50', iconColor: '#3B82F6' },
                { label: 'ভিডিও', icon: Video, color: 'bg-teal-50', iconColor: '#14B8A6' },
                { label: 'অডিও', icon: Mic, color: 'bg-purple-50', iconColor: '#8B5CF6' }
            ].map((item) => (
                <TouchableOpacity
                    key={item.label}
                    className={`${item.color} dark:bg-zinc-900 w-[30%] aspect-square rounded-2xl items-center justify-center border border-gray-100 dark:border-zinc-800`}
                >
                    <item.icon size={moderateScale(24)} color={item.iconColor} />
                    <Text className="text-gray-700 dark:text-gray-300 font-bold text-xs mt-2">{item.label}</Text>
                </TouchableOpacity>
            ))}
        </View>

        <View className="bg-yellow-50 dark:bg-yellow-900/20 rounded-2xl p-6 border border-yellow-100 dark:border-yellow-800 flex-row items-start">
            <AlertCircle size={moderateScale(20)} color="#EAB308" className="mt-1" />
            <View className="flex-1 ml-3">
                <Text className="text-yellow-800 dark:text-yellow-400 font-bold text-xs mb-1">ফাইল নিরাপত্তা:</Text>
                <Text className="text-yellow-800/80 dark:text-yellow-400/80 text-[10px] leading-4">
                    আপনার আপলোড করা সকল ফাইল এনক্রিপ্ট করে সংরক্ষণ করা হবে এবং শুধুমাত্র অনুমোদিত কর্তৃপক্ষ দেখতে পারবে।
                </Text>
            </View>
        </View>
    </View>
);

export default Step4Evidence;
