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
        <View style={styles.container}>
            <View style={styles.content}>
                <View style={styles.iconContainer}>
                    <Phone size={moderateScale(24)} color="white" fill="white" />
                </View>
                <View>
                    <Text style={styles.label}>{title}</Text>
                    <Text style={styles.number}>{number}</Text>
                </View>
            </View>
            <TouchableOpacity
                activeOpacity={0.8}
                style={styles.button}
                onPress={onPress}
            >
                <Text style={styles.buttonText}>কল করুন</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = ScaledSheet.create({
    container: {
        backgroundColor: '#101929',
        borderRadius: '16@ms',
        padding: '20@ms',
        marginBottom: '32@vs',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconContainer: {
        backgroundColor: '#EF4444',
        borderRadius: '24@ms',
        padding: '12@ms',
        marginRight: '16@ms'
    },
    label: {
        color: '#9CA3AF',
        fontSize: '12@ms',
        marginBottom: '4@vs'
    },
    number: {
        color: 'white',
        fontWeight: 'bold',
        letterSpacing: moderateScale(1.5),
        fontSize: '24@ms'
    },
    button: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
        paddingHorizontal: '16@ms',
        paddingVertical: '8@vs',
        borderRadius: '8@ms'
    },
    buttonText: {
        color: 'white',
        fontWeight: '500',
        fontSize: '12@ms'
    }
});

export default HotlineBanner;
