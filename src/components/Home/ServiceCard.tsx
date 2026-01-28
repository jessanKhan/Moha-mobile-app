import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { LucideIcon } from 'lucide-react-native';
import { ScaledSheet, moderateScale } from 'react-native-size-matters';
import LinearGradient from 'react-native-linear-gradient';

interface ServiceCardProps {
    title: string;
    icon: LucideIcon;
    onPress?: () => void;
    color?: string;
    iconBgColor?: string;
    iconGradientColors?: string[];
    titleColor?: string;
    iconTintColor?: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
    title,
    icon: Icon,
    onPress,
    color = '#009689',
    iconBgColor,
    iconGradientColors,
    titleColor = '#1D293D',
    iconTintColor = '#FFFFFF'
}) => {
    const IconContent = <Icon size={moderateScale(28)} color={iconTintColor} />;

    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.7}
            style={styles.card}
        >
            <View style={styles.iconWrapper}>
                {iconGradientColors ? (
                    <LinearGradient
                        colors={iconGradientColors}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.iconContainer}
                    >
                        {IconContent}
                    </LinearGradient>
                ) : (
                    <View
                        style={[styles.iconContainer, { backgroundColor: iconBgColor || color }]}
                    >
                        {IconContent}
                    </View>
                )}
            </View>
            <Text
                style={[styles.title, { color: titleColor }]}
            >
                {title}
            </Text>
        </TouchableOpacity>
    );
};

const styles = ScaledSheet.create({
    card: {
        backgroundColor: 'white',
        borderRadius: '24@ms',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '8@ms',
        padding: '16@ms',
        elevation: 3,
        minHeight: '130@vs',
        flex: 1,
        borderWidth: 1,
        borderColor: '#F3F4FB',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    iconWrapper: {
        marginBottom: '12@vs',
        borderRadius: '14@ms',
        backgroundColor: 'transparent', // Ensure it doesn't block the gradient but allows shadow
        // For Android: elevation needs a View with some content or background to show. 
        // Sometimes transparent works, but often it needs a matching background or shadow properties.
        elevation: 8,
        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    iconContainer: {
        width: '56@ms',
        height: '56@ms',
        borderRadius: '14@ms',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        textAlign: 'center',
        fontWeight: '700',
        fontSize: '18@ms',
        lineHeight: '22@ms',
        padding: '2@ms'
    }
});

export default ServiceCard;
