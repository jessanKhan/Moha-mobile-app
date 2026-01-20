import React from 'react';
import { View, Text, ImageBackground, TouchableOpacity } from 'react-native';
import { ShieldAlert } from 'lucide-react-native';

const BottomBanner = () => {
    return (
        <View className="mx-4 mb-24 mt-4 rounded-xl overflow-hidden h-32">
            <ImageBackground
                source={{ uri: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' }}
                className="flex-1 justify-center items-center"
            >
                <View className="absolute inset-0 bg-black/50" />
                <View className="items-center z-10">
                    <View className="bg-[#009689]/80 p-2 rounded-full mb-2">
                        <ShieldAlert size={24} color="white" />
                    </View>
                    <Text className="text-white font-bold text-lg">মানবপাচার সম্পর্কে জানুন</Text>
                </View>
            </ImageBackground>
        </View>
    );
};

export default BottomBanner;
