import React from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import Header from '../../components/Header';
import { Lock, Upload, Send } from 'lucide-react-native';
import { moderateScale } from 'react-native-size-matters';
import HotlineBanner from '../../components/HotlineBanner';

const ComplaintScreen = () => {
    return (
        <View className="flex-1 bg-[#F8F9FA] dark:bg-black">
            <Header title="অভিযোগ করুন" subtitle='আপনার তথ্য সম্পূর্ণ সুরক্ষিত থাকবে' showBackButton={true} />
            <ScrollView className="flex-1 px-4 py-4" showsVerticalScrollIndicator={false}>

                {/* Privacy Warning Banner */}
                <View className="bg-[#00897B] rounded-xl p-4 mb-4 flex-row items-start shadow-sm">
                    <View className="mr-3 mt-1">
                        <Lock size={moderateScale(20)} color="white" />
                    </View>
                    <View className="flex-1">
                        <Text className="text-white font-bold text-base mb-1">গোপনীয়তা নিশ্চিত করা হবে</Text>
                        <Text className="text-white/90 text-xs leading-5">
                            আপনার পরিচয় এবং সকল তথ্য সম্পূর্ণ গোপন রাখা হবে। আপনার নিরাপত্তা আমাদের প্রথম অগ্রাধিকার।
                        </Text>
                    </View>
                </View>

                {/* Name Input */}
                <View className="bg-white dark:bg-zinc-900 rounded-xl p-4 mb-4 shadow-sm border border-gray-100 dark:border-zinc-800">
                    <View className="flex-row items-center mb-3">
                        <Text className="text-gray-700 dark:text-gray-300 font-bold text-base">অভিযোগকারীর নাম</Text>
                        <Text className="text-gray-400 dark:text-gray-500 text-xs ml-2">(ঐচ্ছিক)</Text>
                    </View>
                    <TextInput
                        placeholder="আপনার নাম লিখুন"
                        className="bg-gray-50 dark:bg-zinc-800 rounded-lg px-4 py-3 text-gray-800 dark:text-gray-100 border border-gray-200 dark:border-zinc-700"
                        placeholderTextColor="#9CA3AF"
                    />
                    <Text className="text-gray-400 dark:text-gray-500 text-xs mt-2">নাম না দিলেও অভিযোগ গ্রহণ করা হবে</Text>
                </View>

                {/* Mobile Input */}
                <View className="bg-white dark:bg-zinc-900 rounded-xl p-4 mb-4 shadow-sm border border-gray-100 dark:border-zinc-800">
                    <Text className="text-gray-700 dark:text-gray-300 font-bold text-base mb-3">মোবাইল নম্বর</Text>
                    <TextInput
                        placeholder="০১৭XXXXXXXX"
                        keyboardType="phone-pad"
                        className="bg-gray-50 dark:bg-zinc-800 rounded-lg px-4 py-3 text-gray-800 dark:text-gray-100 border border-gray-200 dark:border-zinc-700"
                        placeholderTextColor="#9CA3AF"
                    />
                </View>

                {/* Location Input */}
                <View className="bg-white dark:bg-zinc-900 rounded-xl p-4 mb-4 shadow-sm border border-gray-100 dark:border-zinc-800">
                    <Text className="text-gray-700 dark:text-gray-300 font-bold text-base mb-3">ঘটনার স্থান</Text>
                    <TextInput
                        placeholder="এলাকা, থানা, জেলা"
                        className="bg-gray-50 dark:bg-zinc-800 rounded-lg px-4 py-3 text-gray-800 dark:text-gray-100 border border-gray-200 dark:border-zinc-700"
                        placeholderTextColor="#9CA3AF"
                    />
                </View>

                {/* Description Input */}
                <View className="bg-white dark:bg-zinc-900 rounded-xl p-4 mb-4 shadow-sm border border-gray-100 dark:border-zinc-800">
                    <Text className="text-gray-700 dark:text-gray-300 font-bold text-base mb-3">ঘটনার বিবরণ</Text>
                    <TextInput
                        placeholder="ঘটনা সম্পর্কে বিস্তারিত লিখুন..."
                        multiline
                        textAlignVertical="top"
                        numberOfLines={4}
                        className="bg-gray-50 dark:bg-zinc-800 rounded-lg px-4 py-3 text-gray-800 dark:text-gray-100 border border-gray-200 dark:border-zinc-700 min-h-[120px]"
                        placeholderTextColor="#9CA3AF"
                    />
                </View>

                {/* File Upload */}
                <View className="bg-white dark:bg-zinc-900 rounded-xl p-4 mb-8 shadow-sm border border-gray-100 dark:border-zinc-800">
                    <View className="flex-row items-center mb-3">
                        <Text className="text-gray-700 dark:text-gray-300 font-bold text-base">ছবি / ডকুমেন্ট সংযুক্তি</Text>
                        <Text className="text-gray-400 dark:text-gray-500 text-xs ml-2">(ঐচ্ছিক)</Text>
                    </View>
                    <TouchableOpacity className="border border-dashed border-gray-300 dark:border-zinc-700 rounded-xl p-8 items-center justify-center bg-gray-50 dark:bg-zinc-800">
                        <Upload size={moderateScale(32)} color="#9CA3AF" />
                        <Text className="text-gray-600 dark:text-gray-400 font-medium mt-3">ফাইল আপলোড করুন</Text>
                        <Text className="text-gray-400 dark:text-gray-500 text-xs mt-1">JPG, PNG, PDF (সর্বোচ্চ ৫MB)</Text>
                    </TouchableOpacity>
                </View>

                {/* Submit Button */}
                <TouchableOpacity className="bg-[#E64A19] rounded-xl py-4 flex-row items-center justify-center mb-8 shadow-lg shadow-orange-200">
                    <Send size={moderateScale(20)} color="white" className="mr-2" />
                    <Text className="text-white font-bold text-lg ml-2">অভিযোগ জমা দিন</Text>
                </TouchableOpacity>

                {/* Hotline Banner */}
                <HotlineBanner />
                <View className="h-4" />
            </ScrollView>
        </View>
    );
};

export default ComplaintScreen;
