import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { LucideIcon } from 'lucide-react-native';

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
            className="bg-white dark:bg-zinc-900 rounded-2xl p-4 m-2 flex-1 items-center justify-center shadow-sm border border-gray-100 dark:border-zinc-800"
            style={{
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 1,
                },
                shadowOpacity: 0.1,
                shadowRadius: 2,
                elevation: 2,
                minHeight: 110,
            }}
        >
            <View
                className={`w-12 h-12 rounded-full items-center justify-center mb-3`}
                style={{ backgroundColor: iconBgColor || color }}
            >
                <Icon size={24} color="#FFFFFF" />
            </View>
            <Text className="text-gray-800 dark:text-gray-100 text-center font-medium text-xs leading-4">
                {title}
            </Text>
        </TouchableOpacity>
    );
};

export default ServiceCard;
