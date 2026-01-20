import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Phone } from 'lucide-react-native';
import { ScaledSheet, moderateScale } from 'react-native-size-matters';

const HotlineBar = () => {
    return (
        <View
            className="absolute bg-[#1E293B] rounded-2xl flex-row items-center justify-between shadow-lg"
            style={styles.container}
        >
            <View className="flex-row items-center" style={styles.leftContainer}>
                <View className="bg-[#EF4444] rounded-full" style={styles.iconContainer}>
                    <Phone size={moderateScale(24)} color="white" fill="white" />
                </View>
                <View>
                    <Text className="text-gray-400" style={styles.label}>২৪/৭ জরুরি হটলাইন</Text>
                    <Text className="text-white font-bold tracking-widest" style={styles.number}>১৯১৯</Text>
                </View>
            </View>

            <TouchableOpacity
                className="bg-white/10 rounded-lg border border-white/20"
                style={styles.button}
            >
                <Text className="text-white font-medium" style={styles.buttonText}>কল করুন</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = ScaledSheet.create({
    container: {
        bottom: '16@vs',
        left: '16@s',
        right: '16@s',
        padding: '16@s'
    },
    leftContainer: {
        gap: '16@s'
    },
    iconContainer: {
        padding: '12@s'
    },
    label: {
        fontSize: '12@ms'
    },
    number: {
        fontSize: '20@ms'
    },
    button: {
        paddingHorizontal: '16@s',
        paddingVertical: '8@vs'
    },
    buttonText: {
        fontSize: '14@ms'
    }
});

export default HotlineBar;
