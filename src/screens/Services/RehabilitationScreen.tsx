import React from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
import Header from '../../components/Header';
import { ScaledSheet } from 'react-native-size-matters';
import LinearGradient from 'react-native-linear-gradient';
import AppBackground from '../../components/AppBackground';

const RehabilitationScreen = () => {
    return (
        <AppBackground>
            <Header title="পুনর্বাসন" subtitle="নতুন জীবনের জন্য সহায়তা" showBackButton={true} />
            <ScrollView style={styles.flex1} showsVerticalScrollIndicator={false}>

                <View style={styles.contentContainer}>
                    <Text style={styles.sectionTitle}>পুনর্বাসন</Text>
                    <Text style={styles.description}>
                        মানব পাচারের শিকার ব্যক্তিদের নিরাপদ পুনরুদ্ধার, অনির্ভরতা ও সমাজে পুনঃএকত্রীকরণের জন্য সমন্বিত সহায়তা
                    </Text>

                    <Text style={[styles.description, { marginTop: 10 }]}>
                        মানব পাচারের অভিজ্ঞতা একজন মানুষের জীবনকে ভেঙে দিতে পারে। পুনর্বাসন কার্যক্রমের মাধ্যমে ভুক্তভোগীদের শারীরিক, মানসিক ও সামাজিকভাবে শক্তিশালী করে নতুন জীবনের পথে এগিয়ে নেওয়া হয়।
                    </Text>

                    <Image
                        source={{ uri: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=800&auto=format&fit=crop' }}
                        style={styles.heroImage}
                    />

                    <Text style={styles.subHeader}>পুনর্বাসন সম্পর্কে</Text>
                    <Text style={styles.description}>
                        পুনর্বাসন হলো মানব পাচারের শিকার ব্যক্তিদের জন্য একটি দীর্ঘমেয়াদী সহায়তা প্রক্রিয়া, যার মাধ্যমে তারা নিরাপদ আশ্রয়, চিকিৎসা, মানসিক সহায়তা, শিক্ষা ও কর্মসংস্থানের সুযোগ পেয়ে স্বাভাবিক জীবনে ফিরে আসতে পারেন।
                    </Text>

                    <View style={styles.cardContainer}>
                        <LinearGradient colors={['#F0FDFA', '#EFF6FF']} style={styles.card}>
                            <View style={[styles.borderLeft, { backgroundColor: '#10B981' }]} />
                            <View style={styles.cardContent}>
                                <Text style={styles.cardTitle}>নিরাপদ আশ্রয় ও আবাসন</Text>
                                <Text style={styles.cardDesc}>ভুক্তভোগীদের জন্য অস্থায়ী ও প্রয়োজনে দীর্ঘমেয়াদী নিরাপদ আশ্রয়ের ব্যবস্থা করা হয়।</Text>
                            </View>
                        </LinearGradient>

                        <LinearGradient colors={['#F0FDFA', '#EFF6FF']} style={styles.card}>
                            <View style={[styles.borderLeft, { backgroundColor: '#10B981' }]} />
                            <View style={styles.cardContent}>
                                <Text style={styles.cardTitle}>চিকিৎসা ও স্বাস্থ্যসেবা</Text>
                                <Text style={styles.cardDesc}>শারীরিক অসুস্থতা, আঘাত ও প্রয়োজনীয় চিকিৎসা সেবা প্রদান করা হয়।</Text>
                            </View>
                        </LinearGradient>

                        <LinearGradient colors={['#F0FDFA', '#EFF6FF']} style={styles.card}>
                            <View style={[styles.borderLeft, { backgroundColor: '#10B981' }]} />
                            <View style={styles.cardContent}>
                                <Text style={styles.cardTitle}>মনোসামাজিক ও মানসিক সহায়তা</Text>
                                <Text style={styles.cardDesc}>মানসিক সুস্থতা নিশ্চিত করতে কাউন্সেলিং ও থেরাপি সেবা দেওয়া হয়।</Text>
                            </View>
                        </LinearGradient>

                        <LinearGradient colors={['#F0FDFA', '#EFF6FF']} style={styles.card}>
                            <View style={[styles.borderLeft, { backgroundColor: '#10B981' }]} />
                            <View style={styles.cardContent}>
                                <Text style={styles.cardTitle}>শিক্ষা ও দক্ষতা উন্নয়ন</Text>
                                <Text style={styles.cardDesc}>সাধারণ শিক্ষা, কারিগরি প্রশিক্ষণ ও জীবনদক্ষতা উন্নয়নের সুযোগ প্রদান করা হয়।</Text>
                            </View>
                        </LinearGradient>
                    </View>

                    <View style={styles.blueSection}>
                        <Text style={styles.blueSectionTitle}>আমরা সকলের পাশে আছি</Text>
                        <Text style={styles.blueSectionSubTitle}>কারা এই পুনর্বাসন সেবা পাবেন</Text>

                        <View style={styles.audienceList}>
                            {[
                                "মানব পাচারের শিকার নারী, পুরুষ ও শিশু",
                                "উদ্ধারপ্রাপ্ত ভুক্তভোগী",
                                "দীর্ঘমেয়াদী সহায়তার প্রয়োজন রয়েছে এমন ব্যক্তি",
                                "ঝুঁকিপূর্ণ অবস্থায় থাকা পুনরুদ্ধারপ্রাপ্ত ভুক্তভোগী"
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
        </AppBackground>
    );
};

const styles = ScaledSheet.create({
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
        backgroundColor: '#164E63',
        borderRadius: '20@ms',
        padding: '24@ms',
        marginTop: '20@vs',
    },
    blueSectionTitle: {
        color: '#CFFAFE',
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
        backgroundColor: '#F97316',
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

export default RehabilitationScreen;
