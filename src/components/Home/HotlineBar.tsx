import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Phone } from 'lucide-react-native';
import { ScaledSheet, moderateScale } from 'react-native-size-matters';

const HotlineBar = () => {
    return (
        <View
            style={styles.container}
        >
            <View style={styles.leftContainer}>
                <View style={styles.iconContainer}>
                    <Phone size={moderateScale(24)} color="white" fill="white" />
                </View>
                <View>
                    <Text style={styles.label}>২৪/৭ জরুরি হটলাইন</Text>
                    <Text style={styles.number}>১৯১৯</Text>
                </View>
            </View>

            <TouchableOpacity
                activeOpacity={0.8}
                style={styles.button}
            >
                <Text style={styles.buttonText}>কল করুন</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = ScaledSheet.create({
    container: {
        backgroundColor: '#1E293B',
        borderRadius: '16@ms',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '16@vs',
        marginHorizontal: '16@ms',
        padding: '16@ms',
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
    },
    leftContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: '16@ms'
    },
    iconContainer: {
        backgroundColor: '#EF4444',
        borderRadius: '24@ms',
        padding: '12@ms'
    },
    label: {
        color: '#9CA3AF',
        fontSize: '12@ms'
    },
    number: {
        color: 'white',
        fontWeight: 'bold',
        letterSpacing: moderateScale(2),
        fontSize: '20@ms'
    },
    button: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '8@ms',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.2)',
        paddingHorizontal: '16@ms',
        paddingVertical: '8@vs'
    },
    buttonText: {
        color: 'white',
        fontWeight: '500',
        fontSize: '14@ms'
    }
});

export default HotlineBar;
