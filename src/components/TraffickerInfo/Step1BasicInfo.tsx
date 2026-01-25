import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Upload } from 'lucide-react-native';
import { moderateScale } from 'react-native-size-matters';

interface Props {
    formData: any;
    setFormData: (data: any) => void;
}

const Step1BasicInfo = ({ formData, setFormData }: Props) => (
    <View className="px-4 py-8">
        <Text className="text-gray-900 dark:text-gray-100 font-bold text-lg mb-1">পাচারকারীর প্রাথমিক তথ্য</Text>
        <Text className="text-gray-400 dark:text-gray-500 text-sm mb-6">যতটুকু জানেন ততটুকু দিন</Text>

        <TouchableOpacity className="bg-gray-50 dark:bg-zinc-900 border border-dashed border-gray-300 dark:border-zinc-700 rounded-3xl p-10 items-center justify-center mb-8">
            <View className="bg-white dark:bg-zinc-800 p-4 rounded-full mb-3 shadow-sm">
                <Upload size={moderateScale(32)} color="#9CA3AF" />
            </View>
            <Text className="text-gray-600 dark:text-gray-400 font-bold text-base">ছবি আপলোড</Text>
            <Text className="text-gray-400 dark:text-gray-500 text-xs mt-1">(ঐচ্ছিক)</Text>
        </TouchableOpacity>

        <View className="space-y-4">
            <TextInput
                placeholder="পাচারকারীর নাম (যদি জানা থাকে)"
                className="bg-white dark:bg-zinc-900 rounded-2xl px-6 py-4 border border-gray-200 dark:border-zinc-800 text-gray-800 dark:text-gray-100"
                placeholderTextColor="#9CA3AF"
                value={formData.name}
                onChangeText={(val) => setFormData({ ...formData, name: val })}
            />
            <TextInput
                placeholder="ডাকনাম / পরিচিত নাম"
                className="bg-white dark:bg-zinc-900 rounded-2xl px-6 py-4 border border-gray-200 dark:border-zinc-800 text-gray-800 dark:text-gray-100"
                placeholderTextColor="#9CA3AF"
                value={formData.nickname}
                onChangeText={(val) => setFormData({ ...formData, nickname: val })}
            />
            <TextInput
                placeholder="আনুমানিক বয়স"
                keyboardType="numeric"
                className="bg-white dark:bg-zinc-900 rounded-2xl px-6 py-4 border border-gray-200 dark:border-zinc-800 text-gray-800 dark:text-gray-100"
                placeholderTextColor="#9CA3AF"
                value={formData.age}
                onChangeText={(val) => setFormData({ ...formData, age: val })}
            />
        </View>

        <Text className="text-gray-700 dark:text-gray-300 font-bold text-base mt-8 mb-4">লিঙ্গ</Text>
        <View className="flex-row space-x-3">
            {['পুরুষ', 'মহিলা', 'অন্যান্য'].map((item) => (
                <TouchableOpacity
                    key={item}
                    onPress={() => setFormData({ ...formData, gender: item })}
                    className={`px-8 py-3 rounded-xl border ${formData.gender === item ? 'bg-[#EEF2FF] border-[#2563EB]' : 'bg-white dark:bg-zinc-900 border-gray-200 dark:border-zinc-800'}`}
                >
                    <Text className={`font-bold text-sm ${formData.gender === item ? 'text-[#2563EB]' : 'text-gray-600 dark:text-gray-400'}`}>
                        {item}
                    </Text>
                </TouchableOpacity>
            ))}
        </View>
    </View>
);

export default Step1BasicInfo;
