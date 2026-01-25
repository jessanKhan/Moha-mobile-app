import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Check } from 'lucide-react-native';
import { moderateScale } from 'react-native-size-matters';

interface Props {
    formData: any;
    setFormData: (data: any) => void;
}

const Step2Details = ({ formData, setFormData }: Props) => (
    <View className="px-4 py-8">
        <Text className="text-gray-900 dark:text-gray-100 font-bold text-lg mb-1">পরিচয় ও কার্যকলাপ</Text>
        <Text className="text-gray-400 dark:text-gray-500 text-sm mb-6">বিস্তারিত তথ্য প্রদান করুন</Text>

        <View className="space-y-4">
            <TextInput
                placeholder="মোবাইল নম্বর (যদি জানা থাকে)"
                keyboardType="phone-pad"
                className="bg-white dark:bg-zinc-900 rounded-2xl px-6 py-4 border border-gray-200 dark:border-zinc-800 text-gray-800 dark:text-gray-100"
                placeholderTextColor="#9CA3AF"
                value={formData.mobile}
                onChangeText={(val) => setFormData({ ...formData, mobile: val })}
            />
            <TextInput
                placeholder="সোশ্যাল মিডিয়া লিংক (ঐচ্ছিক)"
                className="bg-white dark:bg-zinc-900 rounded-2xl px-6 py-4 border border-gray-200 dark:border-zinc-800 text-gray-800 dark:text-gray-100"
                placeholderTextColor="#9CA3AF"
                value={formData.socialLink}
                onChangeText={(val) => setFormData({ ...formData, socialLink: val })}
            />
            <TextInput
                placeholder="কোথায় দেখা গেছে"
                className="bg-white dark:bg-zinc-900 rounded-2xl px-6 py-4 border border-gray-200 dark:border-zinc-800 text-gray-800 dark:text-gray-100"
                placeholderTextColor="#9CA3AF"
                value={formData.lastSeen}
                onChangeText={(val) => setFormData({ ...formData, lastSeen: val })}
            />
        </View>

        <Text className="text-gray-700 dark:text-gray-300 font-bold text-base mt-8 mb-2">কী ধরনের কার্যকলাপ</Text>
        <Text className="text-gray-400 dark:text-gray-500 text-xs mb-6">(একাধিক নির্বাচন করতে পারবেন)</Text>

        <View className="space-y-3">
            {['কাজের প্রলোভন', 'বিদেশে পাঠানোর কথা', 'বলপূর্বক চলাচল', 'মিথ্যা বিবাহের প্রস্তাব', 'শিশু পাচার'].map((item) => {
                const isSelected = formData.activities.includes(item);
                return (
                    <TouchableOpacity
                        key={item}
                        onPress={() => {
                            const newActivities = isSelected
                                ? formData.activities.filter((a: string) => a !== item)
                                : [...formData.activities, item];
                            setFormData({ ...formData, activities: newActivities });
                        }}
                        className={`flex-row items-center justify-between px-6 py-4 rounded-2xl border ${isSelected ? 'bg-teal-50 border-teal-500' : 'bg-white dark:bg-zinc-900 border-gray-200 dark:border-zinc-800'}`}
                    >
                        <Text className={`font-bold text-sm ${isSelected ? 'text-teal-700' : 'text-gray-600 dark:text-gray-400'}`}>
                            {item}
                        </Text>
                        {isSelected && (
                            <View className="bg-teal-500 rounded-full p-1">
                                <Check size={moderateScale(12)} color="white" />
                            </View>
                        )}
                    </TouchableOpacity>
                );
            })}
        </View>
    </View>
);

export default Step2Details;
