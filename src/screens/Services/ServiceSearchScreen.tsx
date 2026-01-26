import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import Header from '../../components/Header';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Home, Shield } from 'lucide-react-native';
import LinearGradient from 'react-native-linear-gradient';
import { scale, verticalScale, moderateScale, ScaledSheet } from 'react-native-size-matters';

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
        <View style={styles.container}>
            <Header title="সেবা অনুসন্ধান" subtitle='আপনার প্রয়োজন অনুযায়ী সেবা খুঁজুন' showBackButton={true} />
            <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false}>
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

const styles = ScaledSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    scrollContent: {
        flex: 1,
        padding: '16@ms',
    },
    cardContainer: {
        marginBottom: '16@vs',
        borderRadius: '16@ms',
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
        padding: '20@ms',
        height: '100@vs',
    },
    iconWrapper: {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        padding: '12@ms',
        borderRadius: '12@ms',
        marginRight: '16@ms',
    },
    textWrapper: {
        flex: 1,
    },
    title: {
        color: 'white',
        fontSize: '22@ms',
        fontWeight: 'bold',
        marginBottom: '4@vs',
    },
    subtitle: {
        color: 'rgba(255, 255, 255, 0.8)',
        fontSize: '14@ms',
    },
});

export default ServiceSearchScreen;
