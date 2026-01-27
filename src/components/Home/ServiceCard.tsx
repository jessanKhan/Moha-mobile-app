import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { LucideIcon } from 'lucide-react-native';
import { ScaledSheet, moderateScale } from 'react-native-size-matters';

interface ServiceCardProps {
    title: string;
    icon: LucideIcon;
    onPress?: () => void;
    color?: string;
    iconBgColor?: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
    title,
    icon: Icon,
    onPress,
    color = '#009689',
    iconBgColor
}) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.7}
            style={styles.card}
        >
            <View
                style={[styles.iconContainer, { backgroundColor: iconBgColor || color }]}
            >
                <Icon size={moderateScale(24)} color="#FFFFFF" />
            </View>
            <Text
                style={styles.title}
            >
                {title}
            </Text>
        </TouchableOpacity>
    );
};

const styles = ScaledSheet.create({
    card: {
        backgroundColor: 'white',
        borderRadius: '16@ms',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '8@ms',
        padding: '16@ms',
        elevation: 2,
        minHeight: '110@vs',
        flex: 1,
        borderWidth: 1,
        borderColor: '#F3F4FB',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    iconContainer: {
        width: '48@ms',
        height: '48@ms',
        borderRadius: '24@ms',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '12@vs',
    },
    title: {
        color: '#1F2937',
        textAlign: 'center',
        fontWeight: '500',
        fontSize: '13@ms',
        lineHeight: '18@ms',
    }
});

export default ServiceCard;
