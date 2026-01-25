import React from 'react';
import { View, Text, TextInput } from 'react-native';

interface Props {
    formData: any;
    setFormData: (data: any) => void;
}

const Step3Location = ({ formData, setFormData }: Props) => (
    <View className="px-4 py-8">
        <Text className="text-gray-900 dark:text-gray-100 font-bold text-lg mb-1">স্থান ও সময়</Text>
        <Text className="text-gray-400 dark:text-gray-500 text-sm mb-6">ঘটনার বিবরণ দিন</Text>

        <View className="space-y-4">
            <TextInput
                placeholder="ঘটনার স্থান"
                className="bg-white dark:bg-zinc-900 rounded-2xl px-6 py-4 border border-gray-200 dark:border-zinc-800 text-gray-800 dark:text-gray-100"
                placeholderTextColor="#9CA3AF"
                value={formData.eventPlace}
                onChangeText={(val) => setFormData({ ...formData, eventPlace: val })}
            />
            <TextInput
                placeholder="স্থান নির্বাচন করুন"
                className="bg-white dark:bg-zinc-900 rounded-2xl px-6 py-4 border border-gray-200 dark:border-zinc-800 text-gray-800 dark:text-gray-100"
                placeholderTextColor="#9CA3AF"
                value={formData.selectPlace}
                onChangeText={(val) => setFormData({ ...formData, selectPlace: val })}
            />
            <TextInput
                placeholder="ঠিকানা লিখুন"
                className="bg-white dark:bg-zinc-900 rounded-2xl px-6 py-4 border border-gray-200 dark:border-zinc-800 text-gray-800 dark:text-gray-100"
                placeholderTextColor="#9CA3AF"
                value={formData.address}
                onChangeText={(val) => setFormData({ ...formData, address: val })}
            />
            <TextInput
                placeholder="ঘটনার সংক্ষিপ্ত বিবরণ"
                multiline
                numberOfLines={4}
                textAlignVertical="top"
                className="bg-white dark:bg-zinc-900 rounded-2xl px-6 py-4 border border-gray-200 dark:border-zinc-800 text-gray-800 dark:text-gray-100 min-h-[120px]"
                placeholderTextColor="#9CA3AF"
                value={formData.description}
                onChangeText={(val) => setFormData({ ...formData, description: val })}
            />
        </View>
    </View>
);

export default Step3Location;
