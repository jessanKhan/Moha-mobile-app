import React from 'react';
import { View, Text, TouchableOpacity, Platform, StatusBar } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { ArrowLeft } from 'lucide-react-native';
import { ScaledSheet, moderateScale } from 'react-native-size-matters';

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
        <View style={styles.container}>
            {/* Single Vertical Gradient for Header and Status Bar */}
            <LinearGradient
                colors={['#009689', '#1E3A5F']}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={StyleSheet.absoluteFill}
            />

            <View
                style={[
                    styles.content,
                    {
                        paddingTop: insets.top + (Platform.OS === 'android' ? moderateScale(24) : moderateScale(10)),
                    }
                ]}
            >
                <View style={styles.leftContainer}>
                    {showBackButton && (
                        <TouchableOpacity
                            onPress={handleBackPress}
                            style={styles.backButton}
                            activeOpacity={0.7}
                        >
                            <ArrowLeft size={moderateScale(24)} color="#FFFFFF" />
                        </TouchableOpacity>
                    )}

                    <View style={styles.titleContainer}>
                        <Text style={styles.title} numberOfLines={1}>
                            {title}
                        </Text>
                        {subtitle && (
                            <Text style={styles.subtitle} numberOfLines={1}>
                                {subtitle}
                            </Text>
                        )}
                    </View>
                </View>

                {rightComponent && (
                    <View style={styles.rightComponent}>
                        {rightComponent}
                    </View>
                )}
            </View>
        </View>
    );
};

const styles = ScaledSheet.create({
    container: {
        overflow: 'hidden',
        borderBottomLeftRadius: '32@ms',
        borderBottomRightRadius: '32@ms',
        backgroundColor: '#009689',
    },
    content: {
        paddingBottom: '28@vs',
        paddingHorizontal: '20@ms',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    leftContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    backButton: {
        marginRight: '12@ms',
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        padding: '8@ms',
        borderRadius: '12@ms',
    },
    titleContainer: {
        flex: 1,
    },
    title: {
        color: 'white',
        fontSize: '20@ms',
        fontWeight: 'bold',
        fontFamily: 'font-inter-bold',
    },
    subtitle: {
        color: 'rgba(255, 255, 255, 0.8)',
        fontSize: '12@ms',
        marginTop: '4@vs',
        fontFamily: 'font-inter-regular',
    },
    rightComponent: {
        marginLeft: '12@ms',
    }
});

import { StyleSheet } from 'react-native';

export default Header;
