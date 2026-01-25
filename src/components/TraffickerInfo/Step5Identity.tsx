import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { UserX, UserPlus, Check } from 'lucide-react-native';
import { moderateScale } from 'react-native-size-matters';

interface Props {
    formData: any;
    setFormData: (data: any) => void;
}

const Step5Identity = ({ formData, setFormData }: Props) => (
    <View className="px-4 py-8">
        <Text className="text-gray-900 dark:text-gray-100 font-bold text-lg mb-1">আপনার পরিচয়</Text>
        <Text className="text-gray-400 dark:text-gray-500 text-sm mb-8">সম্পূর্ণ ঐচ্ছিক</Text>

        <View className="space-y-4">
            <TouchableOpacity
                onPress={() => setFormData({ ...formData, identityPreference: 'anonymous' })}
                className={`p-6 rounded-3xl border ${formData.identityPreference === 'anonymous' ? 'bg-[#EEF2FF] border-[#2563EB]' : 'bg-white dark:bg-zinc-900 border-gray-100 dark:border-zinc-800'} flex-row items-center justify-between`}
            >
                <View className="flex-row items-center flex-1">
                    <View className={`p-4 rounded-2xl mr-4 ${formData.identityPreference === 'anonymous' ? 'bg-[#2563EB]' : 'bg-[#E5E7EB]'}`}>
                        <UserX size={moderateScale(24)} color="white" />
                    </View>
                    <View className="flex-1">
                        <Text className={`font-bold text-sm mb-1 ${formData.identityPreference === 'anonymous' ? 'text-blue-900' : 'text-gray-800'}`}>পরিচয় গোপন রেখে জমা দেব</Text>
                        <Text className="text-gray-500 text-[10px] leading-4">আপনার পরিচয় সম্পূর্ণ গোপন থাকবে। কর্তৃপক্ষ আপনার সাথে যোগাযোগ করতে পারবে না।</Text>
                    </View>
                </View>
                {formData.identityPreference === 'anonymous' && (
                    <View className="bg-[#2563EB] rounded-full p-1">
                        <Check size={moderateScale(14)} color="white" />
                    </View>
                )}
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => setFormData({ ...formData, identityPreference: 'contact' })}
                className={`p-6 rounded-3xl border ${formData.identityPreference === 'contact' ? 'bg-[#EEF2FF] border-[#2563EB]' : 'bg-white dark:bg-zinc-900 border-gray-100 dark:border-zinc-800'} flex-row items-center justify-between`}
            >
                <View className="flex-row items-center flex-1">
                    <View className={`p-4 rounded-2xl mr-4 ${formData.identityPreference === 'contact' ? 'bg-[#2563EB]' : 'bg-[#E5E7EB]'}`}>
                        <UserPlus size={moderateScale(24)} color="white" />
                    </View>
                    <View className="flex-1">
                        <Text className={`font-bold text-sm mb-1 ${formData.identityPreference === 'contact' ? 'text-blue-900' : 'text-gray-800'}`}>যোগাযোগ তথ্য দিতে চাই</Text>
                        <Text className="text-gray-500 text-[10px] leading-4">প্রয়োজনে কর্তৃপক্ষ আরও তথ্যের জন্য আপনার সাথে যোগাযোগ করতে পারবে।</Text>
                    </View>
                </View>
                {formData.identityPreference === 'contact' && (
                    <View className="bg-[#2563EB] rounded-full p-1">
                        <Check size={moderateScale(14)} color="white" />
                    </View>
                )}
            </TouchableOpacity>
        </View>
    </View>
);

export default Step5Identity;
