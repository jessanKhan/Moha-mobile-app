import React from 'react';
import { View, Text, TouchableOpacity, Platform, StatusBar } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { ArrowLeft } from 'lucide-react-native';

interface HeaderProps {
    title: string;
    subtitle?: string;
    showBackButton?: boolean;
    rightComponent?: React.ReactNode;
    variant?: 'default' | 'home';
}

const Header: React.FC<HeaderProps> = ({
    title,
    subtitle,
    showBackButton = false,
    rightComponent,
    variant = 'default',
}) => {
    const insets = useSafeAreaInsets();
    const navigation = useNavigation();

    const handleBackPress = () => {
        if (navigation.canGoBack()) {
            navigation.goBack();
        }
    };

    return (
        <View className="overflow-hidden rounded-b-[24px]">
            <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
            <LinearGradient
                colors={['#1447E6', '#009689']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
            />
            <LinearGradient
                colors={['#1E3A5F', '#0D7377']}
                start={{ x: 0, y: 1 }}
                end={{ x: 0, y: 0 }}
                style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: 0.8 }}
            />

            <View
                style={{
                    paddingTop: insets.top + 16,
                    paddingBottom: 24,
                    paddingHorizontal: 20,
                }}
                className="flex-row items-center justify-between"
            >
                <View className="flex-row items-center flex-1">
                    {showBackButton && (
                        <TouchableOpacity
                            onPress={handleBackPress}
                            className="mr-3 bg-white/20 p-2 rounded-xl"
                        >
                            <ArrowLeft size={24} color="#FFFFFF" />
                        </TouchableOpacity>
                    )}

                    <View className="flex-1">
                        <Text className="text-white text-xl font-bold font-inter-bold" numberOfLines={1}>
                            {title}
                        </Text>
                        {subtitle && (
                            <Text className="text-white/80 text-xs mt-1 font-inter-regular" numberOfLines={1}>
                                {subtitle}
                            </Text>
                        )}
                    </View>
                </View>

                {rightComponent && (
                    <View className="ml-3">
                        {rightComponent}
                    </View>
                )}
            </View>
        </View>
    );
};

export default Header;
