import React from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    Linking,
    StatusBar,
} from 'react-native';
import {
    Info,
    Users,
    HardHat,
    Baby,
    Shield,
    CircleCheck,
    Phone,
} from 'lucide-react-native';
import { scale, verticalScale, moderateScale, ScaledSheet } from 'react-native-size-matters';
import Header from '../../components/Header';
import LinearGradient from 'react-native-linear-gradient';

const AboutTraffickingScreen = () => {
    const handleCall = () => {
        Linking.openURL('tel:999');
    };

    const types = [
        {
            id: '1',
            title: 'নারী পাচার',
            icon: Users,
            colors: ['#E040FB', '#E91E63'],
        },
        {
            id: '2',
            title: 'শ্রমিক পাচার',
            icon: HardHat,
            colors: ['#FFC107', '#FF9800'],
        },
        {
            id: '3',
            title: 'শিশু পাচার',
            icon: Baby,
            colors: ['#03A9F4', '#00BCD4'],
        },
        {
            id: '4',
            title: 'যৌন শোষণ',
            icon: Shield,
            colors: ['#FF5252', '#FF1744'],
        },
    ];

    return (
        <View className="flex-1 bg-[#F8F9FA] dark:bg-black">
            <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
            <Header
                title="মানবপাচার সম্পর্কে জানুন"
                subtitle="জানলেই বাঁচানো সম্ভব"
                showBackButton={true}
            />

            <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
                <View style={styles.container}>
                    {/* Intro Section */}
                    <View style={styles.introCard}>
                        <View style={styles.introHeader}>
                            <View style={styles.infoIconWrapper}>
                                <Info size={moderateScale(24)} color="#4CAF50" />
                            </View>
                            <Text style={styles.introTitle}>মানবপাচার কী?</Text>
                        </View>
                        <Text style={styles.introDescription}>
                            প্রতারণা, জোরপূর্বক বা প্রলোভনের মাধ্যমে মানুষকে শোষণের উদ্দেশ্যে পাচার করাই মানবপাচার।
                        </Text>
                    </View>

                    {/* Types Section */}
                    <Text style={styles.sectionTitle}>পাচারের ধরন</Text>
                    <View style={styles.typesGrid}>
                        {types.map((type) => (
                            <TouchableOpacity key={type.id} activeOpacity={0.8} style={styles.typeCardWrapper}>
                                <LinearGradient
                                    colors={type.colors}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 1 }}
                                    style={styles.typeCard}
                                >
                                    <type.icon size={moderateScale(32)} color="white" />
                                    <Text style={styles.typeText}>{type.title}</Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* Caution Section (Warning Signs) */}
                    <View style={styles.cautionSection}>
                        <Text style={styles.cautionTitle}>সতর্ক হোন যদি—</Text>
                        <View style={styles.cautionItem}>
                            <View style={styles.bullet} />
                            <Text style={styles.cautionText}>অতিরিক্ত বেতনের প্রলোভন</Text>
                        </View>
                        <View style={styles.cautionItem}>
                            <View style={styles.bullet} />
                            <Text style={styles.cautionText}>চুক্তি ছাড়া কাজ</Text>
                        </View>
                        <View style={styles.cautionItem}>
                            <View style={styles.bullet} />
                            <Text style={styles.cautionText}>পরিচয় গোপন রাখা</Text>
                        </View>
                    </View>

                    {/* Safe Practices Checklist */}
                    <Text style={styles.sectionTitle}>সতর্ক হোন যদি—</Text>
                    <View style={styles.checklist}>
                        {[
                            'শুধুমাত্র যাচাইকৃত চাকরি গ্রহণ করুন',
                            'পরিবারকে সব তথ্য জানান',
                            'সরকারি হেল্পলাইন ব্যবহার করুন',
                            'দালাল এড়িয়ে চলুন',
                        ].map((item, index) => (
                            <View key={index} style={styles.checkItem}>
                                <CircleCheck size={moderateScale(20)} color="#9CA3AF" />
                                <Text style={styles.checkText}>{item}</Text>
                            </View>
                        ))}
                    </View>

                    {/* Hotline Banner */}
                    <View style={styles.hotlineBanner}>
                        <View style={styles.hotlineLeft}>
                            <View style={styles.phoneIconWrapper}>
                                <Phone size={moderateScale(24)} color="white" />
                            </View>
                            <View>
                                <Text style={styles.hotlineLabel}>২৪/৭ জরুরি হটলাইন</Text>
                                <Text style={styles.hotlineNumber}>৯৯৯</Text>
                            </View>
                        </View>
                        <TouchableOpacity style={styles.callButton} onPress={handleCall}>
                            <Text style={styles.callButtonText}>কল করুন</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Footer Note */}
                    <View style={styles.footerNote}>
                        <Text style={styles.footerText}>আপনার পরিচয় এবং তথ্য সম্পূর্ণ গোপন থাকবে।</Text>
                        <Text style={styles.footerText}>নিঃসংকোচে যোগাযোগ করুন।</Text>
                    </View>

                    <View style={{ height: verticalScale(20) }} />
                </View>
            </ScrollView>
        </View>
    );
};

const styles = ScaledSheet.create({
    container: {
        padding: '16@ms',
    },
    introCard: {
        backgroundColor: 'white',
        borderRadius: '16@ms',
        padding: '20@ms',
        marginBottom: '24@vs',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 2,
    },
    introHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: '12@vs',
    },
    infoIconWrapper: {
        backgroundColor: '#E8F5E9',
        padding: '8@ms',
        borderRadius: '12@ms',
        marginRight: '12@ms',
    },
    introTitle: {
        fontSize: '20@ms',
        fontWeight: 'bold',
        color: '#1F2937',
    },
    introDescription: {
        fontSize: '15@ms',
        color: '#4B5563',
        lineHeight: '22@ms',
    },
    sectionTitle: {
        fontSize: '18@ms',
        fontWeight: 'bold',
        color: '#1F2937',
        marginBottom: '16@vs',
    },
    typesGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginBottom: '24@vs',
    },
    typeCardWrapper: {
        width: '48%',
        aspectRatio: 1.2,
        marginBottom: '12@vs',
    },
    typeCard: {
        flex: 1,
        borderRadius: '16@ms',
        padding: '16@ms',
        justifyContent: 'center',
        alignItems: 'center',
    },
    typeText: {
        color: 'white',
        fontWeight: 'bold',
        marginTop: '8@vs',
        fontSize: '16@ms',
    },
    cautionSection: {
        backgroundColor: '#EF4444',
        borderRadius: '16@ms',
        padding: '24@ms',
        marginBottom: '24@vs',
    },
    cautionTitle: {
        color: 'white',
        fontSize: '20@ms',
        fontWeight: 'bold',
        marginBottom: '16@vs',
    },
    cautionItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        padding: '12@ms',
        borderRadius: '12@ms',
        marginBottom: '12@vs',
    },
    bullet: {
        width: '6@ms',
        height: '6@ms',
        borderRadius: '3@ms',
        backgroundColor: 'white',
        marginRight: '12@ms',
    },
    cautionText: {
        color: 'white',
        fontSize: '15@ms',
        fontWeight: '500',
    },
    checklist: {
        backgroundColor: 'white',
        borderRadius: '16@ms',
        padding: '8@ms',
        marginBottom: '24@vs',
    },
    checkItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: '16@ms',
        borderBottomWidth: 1,
        borderBottomColor: '#F3F4FB',
    },
    checkText: {
        fontSize: '15@ms',
        color: '#4B5563',
        marginLeft: '12@ms',
    },
    hotlineBanner: {
        backgroundColor: '#111827',
        borderRadius: '16@ms',
        padding: '20@ms',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '24@vs',
    },
    hotlineLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    phoneIconWrapper: {
        backgroundColor: '#EF4444',
        padding: '12@ms',
        borderRadius: 'full',
        marginRight: '16@ms',
    },
    hotlineLabel: {
        color: '#9CA3AF',
        fontSize: '13@ms',
    },
    hotlineNumber: {
        color: 'white',
        fontSize: '24@ms',
        fontWeight: 'bold',
    },
    callButton: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        paddingHorizontal: '16@ms',
        paddingVertical: '10@ms',
        borderRadius: '8@ms',
    },
    callButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    footerNote: {
        backgroundColor: 'white',
        borderRadius: '16@ms',
        padding: '20@ms',
        alignItems: 'center',
    },
    footerText: {
        fontSize: '14@ms',
        color: '#6B7280',
        textAlign: 'center',
    },
});

export default AboutTraffickingScreen;
