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
    Users,
    BookOpen,
    Volume2,
    Plus,
    Activity,
    Book,
    Phone,
    DollarSign,
    Briefcase
} from 'lucide-react-native';
import LinearGradient from 'react-native-linear-gradient';
import { moderateScale, ScaledSheet } from 'react-native-size-matters';

type RootStackParamList = {
    ServiceList: { category: string; title: string };
    Rehabilitation: undefined;
    Repatriation: undefined;
    ShelterHome: undefined;
};

const ServiceSearchScreen = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const categories = [
        {
            id: 'shelter_list',
            title: 'আশ্রয় কেন্দ্রের তালিকা',
            subtitle: 'নিরাপদ অস্থায়ী আশ্রয়ের তথ্য',
            icon: Home,
            colors: ['#4285F4', '#1976D2'], // Blue
        },
        {
            id: 'rehab_center_list',
            title: 'পুনর্বাসন কেন্দ্রের তালিকা',
            subtitle: 'স্বাভাবিক জীবনে ফেরার সহায়তা',
            icon: Home, // Using Home as per image icon semblance, or maybe Hospital?
            colors: ['#34A853', '#2E7D32'], // Green
        },
        {
            id: 'shelter_home',
            title: 'সেল্টার হোম',
            subtitle: 'নারী ও শিশুদের সুরক্ষিত আবাসন',
            icon: MapPin,
            colors: ['#9C27B0', '#7B1FA2'], // Purple
        },
        {
            id: 'legal_aid',
            title: 'লিগ্যাল এইড',
            subtitle: 'বিনামূল্যে আইনি সহায়তা',
            icon: Shield,
            colors: ['#E65100', '#BF360C'], // Orange/Terra Cotta
        },
        {
            id: 'psychosocial',
            title: 'মনোসামাজিক সহায়তা',
            subtitle: 'মানসিক স্বাস্থ্য ও কাউন্সেলিং',
            icon: Heart,
            colors: ['#795548', '#5D4037'], // Brown
        },
        {
            id: 'rehabilitation',
            title: 'পুনর্বাসন',
            subtitle: 'মানব পাচারের শিকার ব্যক্তিদের নিরাপদ পুনরুদ্ধার',
            icon: User,
            colors: ['#43A047', '#2E7D32'], // Green
        },
        {
            id: 'repatriation',
            title: 'প্রত্যাবর্তন',
            subtitle: 'নিরাপদে নিজ পরিবারে ফেরা',
            icon: CornerUpLeft,
            colors: ['#EA4335', '#C62828'], // Red
        },
        {
            id: 'social_integration',
            title: 'সোশ্যাল ইন্টিগ্রেশন',
            subtitle: 'সামাজে পুনঃএকত্রীকরণ',
            icon: Shield,
            colors: ['#2196F3', '#1565C0'], // Blue
        },
        {
            id: 'training',
            title: 'প্রশিক্ষণ',
            subtitle: 'দক্ষতা ও জীবিকা উন্নয়ন',
            icon: BookOpen,
            colors: ['#0F9D58', '#00695C'], // Teal/Green
        },
        {
            id: 'awareness',
            title: 'সচেতনতা',
            subtitle: 'অধিকার ও তথ্যভিত্তিক শিক্ষা',
            icon: Volume2,
            colors: ['#8E24AA', '#6A1B9A'], // Purple
        },
        {
            id: 'medical',
            title: 'চিকিৎসা সেবা',
            subtitle: 'প্রাথমিক ও বিশেষায়িত চিকিৎসা',
            icon: Plus,
            colors: ['#009688', '#00796B'], // Teal
        },
        // 5 Extra Cards
        {
            id: 'empowerment',
            title: 'ক্ষমতায়ন',
            subtitle: 'নারীর ক্ষমতায়ন ও অধিকার',
            icon: Activity,
            colors: ['#EC407A', '#C2185B'], // Pink
        },
        {
            id: 'education',
            title: 'শিক্ষা সহায়তা',
            subtitle: 'শিশুদের জন্য শিক্ষা কার্যক্রম',
            icon: Book,
            colors: ['#FFCA28', '#FFA000'], // Amber
        },
        {
            id: 'emergency',
            title: 'জরুরি সেবা',
            subtitle: '২৪/৭ জরুরি সহায়তা',
            icon: Phone,
            colors: ['#F44336', '#B71C1C'], // Red
        },
        {
            id: 'community',
            title: 'কমিউনিটি সেবা',
            subtitle: 'স্থানীয় সাহায্য ও সমর্থন',
            icon: Users,
            colors: ['#607D8B', '#455A64'], // Blue Grey
        },
        {
            id: 'financial',
            title: 'আর্থিক সহায়তা',
            subtitle: 'ক্ষুদ্র ঋণ ও অনুদান',
            icon: DollarSign,
            colors: ['#4CAF50', '#2E7D32'], // Green
        },
    ];

    const handleCategoryPress = (category: typeof categories[0]) => {
        let routeName = 'ServiceList'; // Default
        const params: any = { category: category.id, title: category.title };

        if (category.id === 'rehabilitation') {
            routeName = 'Rehabilitation';
        } else if (category.id === 'repatriation') {
            routeName = 'Repatriation';
        } else if (category.id === 'shelter_home') {
            routeName = 'ShelterHome';
        }

        // Use generic ServiceList for others or specific routes if they exist
        if (['Rehabilitation', 'Repatriation', 'ShelterHome'].includes(routeName)) {
            navigation.navigate(routeName as any);
        } else {
            navigation.navigate('ServiceList', params);
        }
    };

    return (
        <View style={styles.container}>
            <Header title="সেবা অনুসন্ধান" subtitle='আপনার প্রয়োজন অনুযায়ী সেবা খুঁজুন' showBackButton={true} />
            <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
                {categories.map((item) => (
                    <TouchableOpacity
                        key={item.id}
                        onPress={() => handleCategoryPress(item)}
                        activeOpacity={0.9}
                        style={styles.cardContainer}
                    >
                        <LinearGradient
                            colors={item.colors}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={styles.gradient}
                        >
                            <View style={styles.iconWrapper}>
                                <item.icon color="white" size={moderateScale(28)} />
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
        backgroundColor: '#F5F7FA', // Slightly gray background for better contrast
    },
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
        backgroundColor: 'white', // fallback
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
});

export default ServiceSearchScreen;
