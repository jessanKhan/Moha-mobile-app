import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import Header from '../../components/Header';
import { ScaledSheet, moderateScale } from 'react-native-size-matters';
import { Target, Users, Award, BookOpen, Wrench, Monitor, Briefcase } from 'lucide-react-native';
import AppBackground from '../../components/AppBackground';

const TrainingScreen = () => {
    return (
        <AppBackground>
            <Header title="প্রশিক্ষণ ও দক্ষতা উন্নয়ন" subtitle="আত্মনির্ভরশীলতায় এক ধাপ এগিয়ে" showBackButton={true} />
            <ScrollView style={styles.flex1} showsVerticalScrollIndicator={false}>

                <View style={styles.contentContainer}>
                    <Text style={styles.sectionTitle}>প্রশিক্ষণ ও দক্ষতা উন্নয়ন</Text>
                    <Text style={styles.description}>
                        দক্ষতা উন্নয়নের মাধ্যমে স্বনির্ভরতা ও টেকসই জীবনের পথে এগিয়ে যাওয়া।
                    </Text>
                    <Text style={styles.description}>
                        দক্ষতা ও জ্ঞান অর্জন একজন মানুষের জীবনে নতুন সম্ভাবনার দুয়ার খুলে দেয়। প্রশিক্ষণ কার্যক্রমের মাধ্যমে মানব পাচারের শিকার ব্যক্তিদের আত্মবিশ্বাস, কর্মদক্ষতা ও কর্মসংস্থানের সুযোগ সৃষ্টি করা হয়।
                    </Text>
                    <Text style={styles.description}>
                        প্রশিক্ষণ হলো মানব পাচারের শিকার ব্যক্তি ও ঝুঁকিপূর্ণ জনগোষ্ঠীর জন্য একটি দক্ষতা-ভিত্তিক সহায়তা প্রক্রিয়া, যার মাধ্যমে তারা পেশাগত ও জীবনদক্ষতা অর্জন করে স্বনির্ভর জীবনে পথে এগিয়ে যেতে পারেন।
                    </Text>

                    <View style={styles.featureGrid}>
                        <View style={styles.featureCard}>
                            <View style={[styles.iconCircle, { backgroundColor: '#E0F2FE' }]}>
                                <Target size={moderateScale(24)} color="#0284C7" />
                            </View>
                            <Text style={styles.featureText}>লক্ষ্য ভিত্তিক</Text>
                        </View>
                        <View style={styles.featureCard}>
                            <View style={[styles.iconCircle, { backgroundColor: '#E0F2FE' }]}>
                                <Users size={moderateScale(24)} color="#0284C7" />
                            </View>
                            <Text style={styles.featureText}>সহায়ক পরিবেশ</Text>
                        </View>
                        <View style={styles.featureCard}>
                            <View style={[styles.iconCircle, { backgroundColor: '#E0F2FE' }]}>
                                <Award size={moderateScale(24)} color="#0284C7" />
                            </View>
                            <Text style={styles.featureText}>স্বীকৃত সার্টিফিকেট</Text>
                        </View>
                        <View style={styles.featureCard}>
                            <View style={[styles.iconCircle, { backgroundColor: '#E0F2FE' }]}>
                                <BookOpen size={moderateScale(24)} color="#0284C7" />
                            </View>
                            <Text style={styles.featureText}>ব্যবহারিক শিক্ষা</Text>
                        </View>
                    </View>

                    <Text style={styles.subHeader}>আমরা কী ধরনের প্রশিক্ষণ প্রদান করি</Text>
                    <Text style={styles.description}>চারটি মূল ক্যাটাগরিতে বিভিন্ন ধরনের প্রশিক্ষণ কোর্স পাবেন</Text>

                    <View style={styles.typesContainer}>
                        <View style={styles.typeCard}>
                            <View style={[styles.typeIcon, { backgroundColor: '#2563EB' }]}>
                                <Wrench size={moderateScale(24)} color="white" />
                            </View>
                            <Text style={styles.typeTitle}>কারিগরি ও পেশাগত প্রশিক্ষণ</Text>
                            <Text style={styles.typeDesc}>সেলাই, দর্জি কাজ, ইলেকট্রিক্যাল কাজ, কম্পিউটার প্রশিক্ষণ, হস্তশিল্পসহ বিভিন্ন পেশাভিত্তিক প্রশিক্ষণ।</Text>
                        </View>

                        <View style={styles.typeCard}>
                            <View style={[styles.typeIcon, { backgroundColor: '#6366F1' }]}>
                                <Monitor size={moderateScale(24)} color="white" />
                            </View>
                            <Text style={styles.typeTitle}>আইটি ও ডিজিটাল দক্ষতা</Text>
                            <Text style={styles.typeDesc}>কম্পিউটার বেসিক, গ্রাফিক ডিজাইন, ডাটা এন্ট্রি, অনলাইন মার্কেটিং ও ডিজিটাল প্ল্যাটফর্ম ব্যবহারের প্রশিক্ষণ।</Text>
                        </View>

                        <View style={styles.typeCard}>
                            <View style={[styles.typeIcon, { backgroundColor: '#06B6D4' }]}>
                                <Briefcase size={moderateScale(24)} color="white" />
                            </View>
                            <Text style={styles.typeTitle}>উদ্যোক্তা ও ক্ষুদ্র ব্যাবসা</Text>
                            <Text style={styles.typeDesc}>ক্ষুদ্র ব্যাবসা শুরু, ব্যবসায়িক পরিকল্পনা ও বাজার সংযোগ বিষয়ক প্রশিক্ষণ।</Text>
                        </View>
                    </View>

                    <View style={styles.blueSection}>
                        <Text style={styles.blueSectionTitle}>আমরা সকলের পাশে আছি</Text>
                        <Text style={styles.blueSectionSubTitle}>কারা এই সেবা পাবেন</Text>

                        <View style={styles.audienceList}>
                            {[
                                "মানব পাচারের শিকার নারী, পুরুষ ও শিশু",
                                "পুনর্বাসনপ্রাপ্ত ভুক্তভোগী",
                                "সামাজিক একীভূতকরণ পর্যায়ে থাকা ব্যক্তি",
                                "ঝুঁকিপূর্ণ জনগোষ্ঠী"
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
    featureGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginVertical: '20@vs',
        gap: '12@ms',
    },
    featureCard: {
        width: '48%',
        backgroundColor: 'white',
        borderRadius: '12@ms',
        padding: '16@ms',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
        marginBottom: '8@vs'
    },
    iconCircle: {
        width: '48@ms',
        height: '48@ms',
        borderRadius: '24@ms',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '12@vs',
    },
    featureText: {
        fontSize: '14@ms',
        fontWeight: '600',
        color: '#1F2937',
        textAlign: 'center',
        fontFamily: 'July-Bold',
    },
    subHeader: {
        fontSize: '18@ms',
        fontWeight: 'bold',
        color: '#1F2937',
        marginBottom: '6@vs',
        marginTop: '10@vs',
        fontFamily: 'July-Bold',
    },
    typesContainer: {
        marginTop: '16@vs',
        gap: '16@vs',
    },
    typeCard: {
        backgroundColor: 'white',
        borderRadius: '16@ms',
        padding: '20@ms',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        alignItems: 'center',
    },
    typeIcon: {
        width: '56@ms',
        height: '56@ms',
        borderRadius: '16@ms',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '16@vs',
    },
    typeTitle: {
        fontSize: '18@ms',
        fontWeight: 'bold',
        color: '#1F2937',
        marginBottom: '8@vs',
        textAlign: 'center',
        fontFamily: 'July-Bold',
    },
    typeDesc: {
        fontSize: '13@ms',
        color: '#6B7280',
        textAlign: 'center',
        lineHeight: '20@ms',
        fontFamily: 'July-Regular',
    },
    blueSection: {
        backgroundColor: '#164E63',
        borderRadius: '20@ms',
        padding: '24@ms',
        marginTop: '30@vs',
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

export default TrainingScreen;
