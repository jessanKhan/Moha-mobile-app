import React from 'react';
import { View, Text, ImageBackground } from 'react-native';
import { ShieldAlert } from 'lucide-react-native';
import { ScaledSheet, moderateScale } from 'react-native-size-matters';

const BottomBanner = () => {
    return (
        <View
            className="overflow-hidden"
            style={styles.container}
        >
            <ImageBackground
                source={{ uri: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' }}
                className="flex-1 justify-center items-center"
            >
                <View className="absolute inset-0 bg-black/50" />
                <View className="items-center z-10">
                    <View
                        className="bg-[#009689]/80 rounded-full mb-2"
                        style={styles.iconContainer}
                    >
                        <ShieldAlert size={moderateScale(24)} color="white" />
                    </View>
                    <Text
                        className="text-white font-bold"
                        style={styles.text}
                    >
                        মানবপাচার সম্পর্কে জানুন
                    </Text>
                </View>
            </ImageBackground>
        </View>
    );
};

const styles = ScaledSheet.create({
    container: {
        marginHorizontal: '16@s',
        marginBottom: '96@vs',
        marginTop: '16@vs',
        height: '128@vs',
        borderRadius: '12@s'
    },
    iconContainer: {
        padding: '8@s'
    },
    text: {
        fontSize: '18@ms'
    }
});

export default BottomBanner;
