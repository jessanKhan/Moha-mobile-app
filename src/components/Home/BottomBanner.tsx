import { View, Text, ImageBackground, TouchableOpacity, StyleSheet } from 'react-native';
import { ShieldAlert } from 'lucide-react-native';
import { ScaledSheet, moderateScale } from 'react-native-size-matters';

interface BottomBannerProps {
    onPress?: () => void;
}

const BottomBanner = ({ onPress }: BottomBannerProps) => {
    return (
        <TouchableOpacity
            activeOpacity={0.9}
            onPress={onPress}
            style={styles.container}
        >
            <ImageBackground
                source={{ uri: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' }}
                style={styles.imageBackground}
            >
                <View style={styles.overlay} />
                <View style={styles.content}>
                    <View
                        style={styles.iconContainer}
                    >
                        <ShieldAlert size={moderateScale(24)} color="white" />
                    </View>
                    <Text
                        style={styles.text}
                    >
                        মানবপাচার সম্পর্কে জানুন
                    </Text>
                </View>
            </ImageBackground>
        </TouchableOpacity>
    );
};

const styles = ScaledSheet.create({
    container: {
        height: '140@vs',
        borderRadius: '24@ms',
        marginHorizontal: '16@ms',
        overflow: 'hidden',
        elevation: 4,
        marginVertical: '16@vs',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
    },
    imageBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    content: {
        alignItems: 'center',
        zIndex: 10,
    },
    iconContainer: {
        backgroundColor: 'rgba(0, 150, 137, 0.8)',
        borderRadius: '30@ms',
        padding: '12@ms',
        marginBottom: '8@vs',
    },
    text: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: '18@ms',
    },
});

export default BottomBanner;
