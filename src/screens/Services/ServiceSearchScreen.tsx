import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import Header from '../../components/Header';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
    Home,
    Shield,
    MapPin,
    Heart,
    User,
    CornerUpLeft,
    BookOpen,
    Volume2,
    Plus,
} from 'lucide-react-native';
import LinearGradient from 'react-native-linear-gradient';
import { moderateScale, ScaledSheet } from 'react-native-size-matters';
import AppBackground from '../../components/AppBackground';
import { useQuery } from '@apollo/client/react';
import { SERVICES_QUERY } from '../../api/queries';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { ActivityIndicator } from 'react-native';

type RootStackParamList = {
    ServiceList: { serviceId: string | number; title: string; subtitle?: string };
    ServiceAid: { serviceId: string | number; title: string; subtitle?: string };
    Rehabilitation: undefined;
    Repatriation: undefined;
    ShelterHome: undefined;
    SocialIntegration: undefined;
    Training: undefined;
    Awareness: undefined;
};

const ICON_MAPPING: { [key: string]: any } = {
    'Home': Home,
    'Shield': Shield,
    'MapPin': MapPin,
    'Heart': Heart,
    'User': User,
    'CornerUpLeft': CornerUpLeft,
    'BookOpen': BookOpen,
    'Volume2': Volume2,
    'Plus': Plus,
};

const FALLBACK_ICONS = [Home, Shield, MapPin, Heart, User, CornerUpLeft, BookOpen, Volume2, Plus];

interface Service {
    id: number;
    title: string;
    titleBn: string;
    subtitle: string;
    subtitleBn: string;
    description: string;
    descriptionBn: string;
    isCenter: string;
    order: number;
    color: string;
    iconName: string;
    attachmentUrl: string;
    isPublished: string;
}

interface ServicesData {
    services: Service[];
}

const ServiceSearchScreen = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const languageMode = useSelector((state: RootState) => state.language.mode);

    const { data, loading, error } = useQuery<ServicesData>(SERVICES_QUERY, {
        variables: { page: 1.0, limit: 20.0 },
    });

    const GRADIENT_PALETTE = [
        ['#4285F4', '#1976D2'], // Blue
        ['#34A853', '#2E7D32'], // Green
        ['#9C27B0', '#7B1FA2'], // Purple
        ['#E65100', '#BF360C'], // Orange
        ['#795548', '#5D4037'], // Brown
        ['#EA4335', '#C62828'], // Red
        ['#009688', '#00796B'], // Teal
    ];

    const services = data?.services || [];

    const handleCategoryPress = (item: any) => {
        const titleEn = item.title || '';
        const titleBn = item.titleBn || '';
        const title = languageMode === 'en' ? titleEn : titleBn;

        const subtitleEn = item.subtitle || '';
        const subtitleBn = item.subtitleBn || '';
        const subtitle = languageMode === 'en' ? subtitleEn : subtitleBn;

        if (item.isCenter === "YES") {
            navigation.navigate('ServiceList', { 
                serviceId: item.id, 
                title, 
                subtitle 
            });
        } else {
            navigation.navigate('ServiceAid', { 
                serviceId: item.id, 
                title, 
                subtitle 
            });
        }
    };

    return (
        <AppBackground>
            <Header
                title={languageMode === 'en' ? "Service Search" : " "}
                subtitle={languageMode === 'en' ? "Find services according to your needs" : 'আপনার প্রয়োজন অনুযায়ী সেবা খুঁজুন'}
                showBackButton={true}
            />
            <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
                {loading ? (
                    <View style={styles.centerContainer}>
                        <ActivityIndicator size="large" color="#ffffff" />
                    </View>
                ) : error ? (
                    <View style={styles.centerContainer}>
                        <Text style={styles.errorText}>
                            {languageMode === 'en' ? "Failed to load services" : "সেবা লোড করতে ব্যর্থ হয়েছে"}
                        </Text>
                    </View>
                ) : services.length > 0 ? (
                    services.map((item: any, index: number) => {
                        const colors = (item.color && item.color.startsWith('#'))
                            ? [item.color, item.color]
                            : GRADIENT_PALETTE[index % GRADIENT_PALETTE.length];

                        const IconComponent = ICON_MAPPING[item.iconName] || FALLBACK_ICONS[index % FALLBACK_ICONS.length];

                        return (
                            <TouchableOpacity
                                key={item.id}
                                onPress={() => handleCategoryPress(item)}
                                activeOpacity={0.9}
                                style={styles.cardContainer}
                            >
                                <LinearGradient
                                    colors={colors}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 0 }}
                                    style={styles.gradient}
                                >
                                    <View style={styles.iconWrapper}>
                                        <IconComponent color="white" size={moderateScale(28)} />
                                    </View>
                                    <View style={styles.textWrapper}>
                                        <Text style={styles.title}>
                                            {languageMode === 'en' ? item.title : item.titleBn}
                                        </Text>
                                        <Text style={styles.subtitle}>
                                            {languageMode === 'en' ? item.subtitle : item.subtitleBn}
                                        </Text>
                                    </View>
                                </LinearGradient>
                            </TouchableOpacity>
                        );
                    })
                ) : (
                    <View style={styles.centerContainer}>
                        <Text style={styles.errorText}>
                            {languageMode === 'en' ? "No services found" : "কোনো সেবা পাওয়া যায়নি"}
                        </Text>
                    </View>
                )}
            </ScrollView>
        </AppBackground>
    );
};

const styles = ScaledSheet.create({
    scrollContent: {
        flex: 1,
        paddingHorizontal: '16@ms',
        paddingTop: '16@ms',
    },
    scrollContainer: {
        paddingBottom: '20@ms',
    },
    cardContainer: {
        marginBottom: '12@vs',
        borderRadius: '16@ms',
        overflow: 'hidden',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 3.84,
        backgroundColor: 'white',
    },
    gradient: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: '18@vs',
        paddingHorizontal: '20@ms',
        minHeight: '90@vs',
    },
    iconWrapper: {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        padding: '10@ms',
        borderRadius: '12@ms',
        marginRight: '16@ms',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textWrapper: {
        flex: 1,
        justifyContent: 'center',
    },
    title: {
        color: 'white',
        fontSize: '18@ms',
        fontWeight: 'bold',
        marginBottom: '4@vs',
        fontFamily: 'July-Bold',
    },
    subtitle: {
        color: 'rgba(255, 255, 255, 0.9)',
        fontSize: '13@ms',
        fontFamily: 'July-Regular',
        lineHeight: '18@ms',
    },
    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: '50@vs',
    },
    errorText: {
        color: 'white',
        fontSize: '14@ms',
        fontFamily: 'July-Regular',
    },
});

export default ServiceSearchScreen;
