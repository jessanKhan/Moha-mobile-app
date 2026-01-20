import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Phone } from 'lucide-react-native';

const HotlineBar = () => {
    return (
        <View className="absolute bottom-4 left-4 right-4 bg-[#1E293B] rounded-2xl p-4 flex-row items-center justify-between shadow-lg">
            <View className="flex-row items-center space-x-4">
                <View className="bg-[#EF4444] p-3 rounded-full">
                    <Phone size={24} color="white" fill="white" />
                </View>
                <View>
                    <Text className="text-gray-400 text-xs">২৪/৭ জরুরি হটলাইন</Text>
                    <Text className="text-white text-xl font-bold tracking-widest">১৯১৯</Text>
                </View>
            </View>

            <TouchableOpacity className="bg-white/10 px-4 py-2 rounded-lg border border-white/20">
                <Text className="text-white font-medium">কল করুন</Text>
            </TouchableOpacity>
        </View>
    );
};

export default HotlineBar;
