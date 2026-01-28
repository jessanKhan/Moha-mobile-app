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
                    <Text style={styles.number}>৯৯৯</Text>
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
        backgroundColor: '#FB2C36',
        borderRadius: '24@ms',
        padding: '12@ms'
    },
    label: {
        color: '#CAD5E2',
        fontSize: '16@ms',
        fontWeight: '400',
    },
    number: {
        color: 'white',
        fontWeight: '400',
        letterSpacing: moderateScale(2),
        fontSize: '20@ms'
    },
    button: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '20@ms',
        // borderColor: 'rgba(255, 255, 255, 0.2)',
        paddingHorizontal: '16@ms',
        paddingVertical: '8@vs'
    },
    buttonText: {
        color: 'white',
        fontWeight: '400',
        fontSize: '16@ms'
    }
});

export default HotlineBar;
