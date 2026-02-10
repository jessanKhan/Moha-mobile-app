import React from 'react';
import { View, Text, ScrollView, Image, Dimensions } from 'react-native';
import Header from '../../components/Header';
import { ScaledSheet, moderateScale } from 'react-native-size-matters';
import LinearGradient from 'react-native-linear-gradient';

const { width } = Dimensions.get('window');

const SocialIntegrationScreen = () => {
    return (
        <View style={styles.container}>
            <Header title="সামাজিক একীভূতকরণ" subtitle="মানব পাচার প্রতিরোধ ও ভুক্তভোগীদের সুরক্ষা" showBackButton={true} />
            <ScrollView style={styles.flex1} showsVerticalScrollIndicator={false}>

                <View style={styles.contentContainer}>
                    <Text style={styles.sectionTitle}>সামাজিক একীভূতকরণ</Text>
                    <Text style={styles.description}>
                        মানব পাচার প্রতিরোধ ও ভুক্তভোগীদের পুনর্বাসনের ক্ষেত্রে সামাজিক একীভূতকরণ একটি গুরুত্বপূর্ণ ধাপ। পাচারের শিকার ব্যক্তিরা অনেক সময় সমাজে ফিরে আসতে লজ্জা বা ভয়ের সম্মুখীন হন। তাদের স্বাভাবিক জীবনে ফিরিয়ে আনা এবং সমাজের মূলস্রোতে যুক্ত করাই এই সেবার মূল লক্ষ্য।
                    </Text>

                    <Text style={[styles.description, { marginTop: 10 }]}>
                        সামাজিক একীভূতকরণের মাধ্যমে ভুক্তভোগীদের মনোবল বৃদ্ধি, পারিবারিক বন্ধন সুদৃঢ় করা এবং তাদের অর্থনৈতিকভাবে স্বাবলম্বী হওয়ার সুযোগ তৈরি করে দেওয়া হয়। আমরা বিশ্বাস করি, সকলের সম্মিলিত প্রচেষ্টায় একটি বৈষম্যহীন ও নিরাপদ সমাজ গড়ে তোলা সম্ভব।
                    </Text>

                    <Image
                        source={{ uri: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=800&auto=format&fit=crop' }}
                        style={styles.heroImage}
                    />

                    <Text style={styles.subHeader}>আমরা কী ধরনের সামাজিক একীভূতকরণ সহায়তা প্রদান করি</Text>
                    <Text style={styles.description}>
                        আমরা বিশ্বাস করি, ভুক্তভোগীদের দোষারোপ নয়—বরং সম্মান, সহানুভূতি ও সহযোগিতাই সমাজকে পুনঃএকত্রীকরণের মূল চাবিকাঠি।
                    </Text>

                    {/* Support Cards */}
                    <View style={styles.cardContainer}>
                        <LinearGradient colors={['#E8F5E9', '#F1F8E9']} style={styles.card}>
                            <View style={[styles.borderLeft, { backgroundColor: '#4CAF50' }]} />
                            <View style={styles.cardContent}>
                                <Text style={styles.cardTitle}>পারিবারিক পুনঃসংযোগ</Text>
                                <Text style={styles.cardDesc}>পরিবারের সঙ্গে সম্পর্ক পুনর্গঠন, মধ্যস্থতা ও সহানুভূতিশীল যোগাযোগ সহায়তা।</Text>
                            </View>
                        </LinearGradient>

                        <LinearGradient colors={['#E8F5E9', '#F1F8E9']} style={styles.card}>
                            <View style={[styles.borderLeft, { backgroundColor: '#4CAF50' }]} />
                            <View style={styles.cardContent}>
                                <Text style={styles.cardTitle}>কর্মসংস্থান ও সামাজিক অংশগ্রহণ</Text>
                                <Text style={styles.cardDesc}>চাকরি সুযোগ, স্বেচ্ছাসেবকমূলক কার্যক্রম ও সামাজিক কর্মকাণ্ডে অংশগ্রহণে সহায়তা।</Text>
                            </View>
                        </LinearGradient>

                        <LinearGradient colors={['#E8F5E9', '#F1F8E9']} style={styles.card}>
                            <View style={[styles.borderLeft, { backgroundColor: '#4CAF50' }]} />
                            <View style={styles.cardContent}>
                                <Text style={styles.cardTitle}>কমিউনিটি সচেতনতা ও সংযোগ</Text>
                                <Text style={styles.cardDesc}>স্থানীয় সমাজে সচেতনতা কার্যক্রম ও কমিউনিটি নেতাদের সম্পৃক্ত করে সামাজিক গ্রহণযোগ্যতা বৃদ্ধি।</Text>
                            </View>
                        </LinearGradient>

                        <LinearGradient colors={['#E8F5E9', '#F1F8E9']} style={styles.card}>
                            <View style={[styles.borderLeft, { backgroundColor: '#4CAF50' }]} />
                            <View style={styles.cardContent}>
                                <Text style={styles.cardTitle}>সামাজিক দক্ষতা ও আত্মবিশ্বাস উন্নয়ন</Text>
                                <Text style={styles.cardDesc}>যোগাযোগ দক্ষতা, সিদ্ধান্ত গ্রহণ ও আত্মমর্যাদা বৃদ্ধির প্রশিক্ষণ।</Text>
                            </View>
                        </LinearGradient>
                    </View>


                    {/* Target Audience Section */}
                    <View style={styles.blueSection}>
                        <Text style={styles.blueSectionTitle}>আমরা সকলের পাশে আছি</Text>
                        <Text style={styles.blueSectionSubTitle}>কারা এই সেবা পাবেন</Text>

                        <View style={styles.audienceList}>
                            {[
                                "পুনর্বাসন সম্পন্ন করা মানব পাচার ভুক্তভোগী",
                                "প্রত্যাবর্তনের পর সামাজিক সহায়তার প্রয়োজন রয়েছে এমন ব্যক্তি",
                                "পরিবার ও কমিউনিটিতে পুনঃসংযোগে আগ্রহী ভুক্তভোগী",
                                "দীর্ঘমেয়াদী সামাজিক সহায়তার প্রয়োজন রয়েছে এমন ব্যক্তি"
                            ].map((item, index) => (
                                <View key={index} style={styles.audienceItem}>
                                    <View style={styles.numberCircle}>
                                        <Text style={styles.numberText}>{index + 1}</Text>
                                    </View>
                                    <Text style={styles.audienceText}>{item}</Text>
                                </View>
                            ))}
                        </View>
                    </View>

                </View>
            </ScrollView>
        </View>
    );
};

const styles = ScaledSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    flex1: {
        flex: 1,
    },
    contentContainer: {
        padding: '20@ms',
        paddingBottom: '40@vs',
    },
    sectionTitle: {
        fontSize: '22@ms',
        fontWeight: 'bold',
        color: '#1F2937',
        marginBottom: '10@vs',
        fontFamily: 'July-Bold',
    },
    description: {
        fontSize: '14@ms',
        color: '#4B5563',
        lineHeight: '22@ms',
        fontFamily: 'July-Regular',
        marginBottom: '10@vs',
    },
    heroImage: {
        width: '100%',
        height: '200@vs',
        borderRadius: '16@ms',
        marginVertical: '20@vs',
    },
    subHeader: {
        fontSize: '18@ms',
        fontWeight: 'bold',
        color: '#1F2937',
        marginBottom: '10@vs',
        fontFamily: 'July-Bold',
    },
    cardContainer: {
        marginVertical: '10@vs',
    },
    card: {
        borderRadius: '12@ms',
        marginBottom: '12@vs',
        flexDirection: 'row',
        overflow: 'hidden',
        elevation: 1,
    },
    borderLeft: {
        width: '6@ms',
        height: '100%',
    },
    cardContent: {
        padding: '16@ms',
        flex: 1,
    },
    cardTitle: {
        fontSize: '16@ms',
        fontWeight: 'bold',
        color: '#1F2937',
        marginBottom: '6@vs',
        fontFamily: 'July-Bold',
    },
    cardDesc: {
        fontSize: '13@ms',
        color: '#4B5563',
        lineHeight: '19@ms',
        fontFamily: 'July-Regular',
    },
    blueSection: {
        backgroundColor: '#164E63', // Dark cyan/blue
        borderRadius: '20@ms',
        padding: '24@ms',
        marginTop: '20@vs',
    },
    blueSectionTitle: {
        color: '#CFFAFE', // Light cyan
        fontSize: '14@ms',
        fontFamily: 'July-Regular',
        marginBottom: '4@vs',
    },
    blueSectionSubTitle: {
        color: 'white',
        fontSize: '20@ms',
        fontWeight: 'bold',
        fontFamily: 'July-Bold',
        marginBottom: '20@vs',
    },
    audienceList: {
        gap: '12@vs',
    },
    audienceItem: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '12@ms',
        padding: '12@ms',
        flexDirection: 'row',
        alignItems: 'center',
    },
    numberCircle: {
        width: '28@ms',
        height: '28@ms',
        borderRadius: '14@ms',
        backgroundColor: '#F97316', // Orange
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: '12@ms',
    },
    numberText: {
        color: 'white',
        fontSize: '14@ms',
        fontWeight: 'bold',
    },
    audienceText: {
        color: 'white',
        fontSize: '14@ms',
        fontFamily: 'July-Regular',
        flex: 1,
    },
});

export default SocialIntegrationScreen;
