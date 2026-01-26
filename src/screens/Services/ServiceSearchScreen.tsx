import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import Header from '../../components/Header';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Home, Shield } from 'lucide-react-native';
import LinearGradient from 'react-native-linear-gradient';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

type RootStackParamList = {
    ServiceList: { category: string; title: string };
};

const ServiceSearchScreen = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const categories = [
        {
            id: 'rehabilitation',
            title: 'পুনর্বাসন',
            subtitle: 'নতুন জীবনের জন্য সহায়তা',
            icon: Home,
            colors: ['#00B849', '#00963C'],
        },
        {
            id: 'repatriation',
            title: 'প্রত্যাবর্তন',
            subtitle: 'নিরাপদভাবে নিজ দেশে ফেরত যাওয়া',
            icon: Home,
            colors: ['#1A73E8', '#0D47A1'],
        },
        {
            id: 'shelter_home',
            title: 'সেল্টার হোম',
            subtitle: 'নিরাপদ অস্থায়ী আশ্রয়',
            icon: Shield,
            colors: ['#FF6D00', '#E65100'],
        },
    ];

    const handleCategoryPress = (category: typeof categories[0]) => {
        const routeName = category.id === 'rehabilitation' ? 'Rehabilitation' :
            category.id === 'repatriation' ? 'Repatriation' : 'ShelterHome';
        navigation.navigate(routeName as any);
    };

    return (
        <View className="flex-1 bg-white dark:bg-black">
            <Header title="সেবা অনুসন্ধান" subtitle='আপনার প্রয়োজন অনুযায়ী সেবা খুঁজুন' showBackButton={true} />
            <ScrollView className="flex-1 p-4" showsVerticalScrollIndicator={false}>
                {categories.map((item) => (
                    <TouchableOpacity
                        key={item.id}
                        onPress={() => handleCategoryPress(item)}
                        activeOpacity={0.8}
                        style={styles.cardContainer}
                    >
                        <LinearGradient
                            colors={item.colors}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={styles.gradient}
                        >
                            <View style={styles.iconWrapper}>
                                <item.icon color="white" size={moderateScale(32)} />
                            </View>
                            <View style={styles.textWrapper}>
                                <Text style={styles.title}>{item.title}</Text>
                                <Text style={styles.subtitle}>{item.subtitle}</Text>
                            </View>
                        </LinearGradient>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    cardContainer: {
        marginBottom: verticalScale(16),
        borderRadius: moderateScale(16),
        overflow: 'hidden',
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    gradient: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: moderateScale(20),
        height: verticalScale(100),
    },
    iconWrapper: {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        padding: moderateScale(12),
        borderRadius: moderateScale(12),
        marginRight: moderateScale(16),
    },
    textWrapper: {
        flex: 1,
    },
    title: {
        color: 'white',
        fontSize: moderateScale(22),
        fontWeight: 'bold',
        marginBottom: verticalScale(4),
    },
    subtitle: {
        color: 'rgba(255, 255, 255, 0.8)',
        fontSize: moderateScale(14),
    },
});

export default ServiceSearchScreen;
