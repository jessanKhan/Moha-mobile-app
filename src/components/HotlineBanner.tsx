import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Phone } from 'lucide-react-native';
import { ScaledSheet, moderateScale } from 'react-native-size-matters';

interface HotlineBannerProps {
    title?: string;
    number?: string;
    onPress?: () => void;
}

const HotlineBanner = ({ title = "২৪/৭ জরুরি হটলাইন", number = "৯৯৯", onPress }: HotlineBannerProps) => {
    return (
        <View className="bg-[#101929] flex-row items-center justify-between" style={styles.container}>
            <View className="flex-row items-center">
                <View className="bg-[#EF4444] rounded-full" style={styles.iconContainer}>
                    <Phone size={moderateScale(24)} color="white" fill="white" />
                </View>
                <View>
                    <Text className="text-gray-400" style={styles.label}>{title}</Text>
                    <Text className="text-white font-bold tracking-widest" style={styles.number}>{number}</Text>
                </View>
            </View>
            <TouchableOpacity
                className="bg-white/10 border border-white/10"
                style={styles.button}
                onPress={onPress}
            >
                <Text className="text-white font-medium" style={styles.buttonText}>কল করুন</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = ScaledSheet.create({
    container: {
        borderRadius: '16@ms',
        padding: '20@ms',
        marginBottom: '32@vs'
    },
    iconContainer: {
        padding: '12@ms',
        marginRight: '16@s'
    },
    label: {
        fontSize: '12@ms',
        marginBottom: '4@vs'
    },
    number: {
        fontSize: '24@ms'
    },
    button: {
        paddingHorizontal: '16@s',
        paddingVertical: '8@vs',
        borderRadius: '8@ms'
    },
    buttonText: {
        fontSize: '12@ms'
    }
});

export default HotlineBanner;
