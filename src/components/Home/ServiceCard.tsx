import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { LucideIcon } from 'lucide-react-native';
import { ScaledSheet, scale, verticalScale } from 'react-native-size-matters';

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
            className="bg-white dark:bg-zinc-900 rounded-2xl items-center justify-center shadow-sm border border-gray-100 dark:border-zinc-800"
            style={styles.card}
        >
            <View
                className={`rounded-full items-center justify-center mb-3`}
                style={[styles.iconContainer, { backgroundColor: iconBgColor || color }]}
            >
                <Icon size={24} color="#FFFFFF" />
            </View>
            <Text
                className="text-gray-800 dark:text-gray-100 text-center font-medium"
                style={styles.title}
            >
                {title}
            </Text>
        </TouchableOpacity>
    );
};

const styles = ScaledSheet.create({
    card: {
        margin: '8@s',
        padding: '16@s',
        elevation: 2,
        minHeight: '110@vs',
        flex: 1,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: verticalScale(1),
        },
        shadowOpacity: 0.1,
        shadowRadius: scale(2),
    },
    iconContainer: {
        width: '48@s',
        height: '48@s',
        marginBottom: '12@vs',
    },
    title: {
        fontSize: '12@ms',
        lineHeight: '16@vs',
    }
});

export default ServiceCard;
