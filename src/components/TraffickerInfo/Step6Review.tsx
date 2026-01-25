import React from 'react';
import { View, Text } from 'react-native';
import { User, MapPin, FileText } from 'lucide-react-native';
import { moderateScale } from 'react-native-size-matters';

interface Props {
    formData: any;
}

const Step6Review = ({ formData }: Props) => (
    <View className="px-4 py-8">
        <Text className="text-gray-900 dark:text-gray-100 font-bold text-lg mb-1">পর্যালোচনা ও জমা</Text>
        <Text className="text-gray-400 dark:text-gray-500 text-sm mb-8">তথ্য যাচাই করুন</Text>

        <View className="space-y-4">
            <View className="bg-white dark:bg-zinc-900 rounded-3xl p-6 border border-gray-100 dark:border-zinc-800 shadow-sm">
                <View className="flex-row items-center mb-4">
                    <View className="bg-blue-50 dark:bg-blue-900/20 p-2 rounded-xl mr-3">
                        <User size={moderateScale(20)} color="#2196F3" />
                    </View>
                    <Text className="text-gray-400 font-bold text-[10px]">পাচারকারীর তথ্য</Text>
                </View>
                <Text className="text-gray-800 dark:text-gray-100 font-bold text-xs mb-1">নাম: {formData.name}</Text>
                <Text className="text-gray-800 dark:text-gray-100 font-bold text-xs mb-1">ডাকনাম: {formData.nickname}</Text>
                <Text className="text-gray-800 dark:text-gray-100 font-bold text-xs mb-1">বয়স: {formData.age}</Text>
                <Text className="text-gray-800 dark:text-gray-100 font-bold text-xs mb-4">লিঙ্গ: {formData.gender}</Text>
                <View className="h-[1px] bg-gray-50 dark:bg-zinc-800 mb-4" />
                <Text className="text-gray-400 font-bold text-[10px] mb-2">কার্যকলাপ:</Text>
                <View className="flex-row flex-wrap">
                    {formData.activities.map((act: string) => (
                        <View key={act} className="bg-red-50 dark:bg-red-900/20 px-3 py-1 rounded-full mr-2 mb-2">
                            <Text className="text-red-500 font-bold text-[10px]">{act}</Text>
                        </View>
                    ))}
                </View>
            </View>

            <View className="bg-white dark:bg-zinc-900 rounded-3xl p-6 border border-gray-100 dark:border-zinc-800 shadow-sm">
                <View className="flex-row items-center mb-4">
                    <View className="bg-teal-50 dark:bg-teal-900/20 p-2 rounded-xl mr-3">
                        <MapPin size={moderateScale(20)} color="#00897B" />
                    </View>
                    <Text className="text-gray-400 font-bold text-[10px]">ঘটনার স্থান ও সময়</Text>
                </View>
                <Text className="text-gray-800 dark:text-gray-100 font-bold text-xs mb-1">{formData.eventPlace}</Text>
                <Text className="text-gray-800 dark:text-gray-100 font-bold text-xs mb-1">তারিখ: ১৯/১/২০২৬</Text>
                <Text className="text-gray-800 dark:text-gray-100 font-bold text-xs">সময়: ০২:২৪</Text>
            </View>

            <View className="bg-white dark:bg-zinc-900 rounded-3xl p-6 border border-gray-100 dark:border-zinc-800 shadow-sm">
                <View className="flex-row items-center mb-4">
                    <View className="bg-purple-50 dark:bg-purple-900/20 p-2 rounded-xl mr-3">
                        <FileText size={moderateScale(20)} color="#8B5CF6" />
                    </View>
                    <Text className="text-gray-400 font-bold text-[10px]">বিবরণ</Text>
                </View>
                <Text className="text-gray-800 dark:text-gray-100 font-bold text-xs">{formData.description}</Text>
            </View>

            <View className="bg-[#E0F2F1] dark:bg-zinc-900 rounded-3xl p-6 border border-[#B2DFDB] dark:border-zinc-800 shadow-sm">
                <Text className="text-gray-800 dark:text-gray-100 font-bold text-xs">আপনার পরিচয়</Text>
                <Text className="text-[#00897B] font-bold text-[10px] mt-1">
                    {formData.identityPreference === 'anonymous' ? 'পরিচয় গোপন রেখে জমা দেওয়া হচ্ছে' : 'যোগাযোগ তথ্য প্রদান করা হচ্ছে'}
                </Text>
            </View>
        </View>
    </View>
);

export default Step6Review;
