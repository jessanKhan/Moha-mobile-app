import React from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
import Header from '../../components/Header';
import { ScaledSheet, moderateScale } from 'react-native-size-matters';
import { Shield, Users, Mic, AlertTriangle, AlertCircle } from 'lucide-react-native';

const AwarenessScreen = () => {
    return (
        <View style={styles.container}>
            <Header title="সতর্ক থাকুন, নিরাপদ থাকুন" subtitle="সচেতনতাই আমাদের শক্তি" showBackButton={true} />
            <ScrollView style={styles.flex1} showsVerticalScrollIndicator={false}>

                <View style={styles.contentContainer}>

                    <Image
                        source={{ uri: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1000&auto=format&fit=crop' }}
                        style={styles.heroImage}
                    />

                    <Text style={styles.sectionTitle}>সতর্ক থাকুন, নিরাপদ থাকুন</Text>
                    <Text style={styles.description}>
                        মানব পাচারকারীরা প্রলোভন দেখিয়ে, মিথ্যা বা প্রতারণার মাধ্যমে পাচার করে থাকে। সোশ্যাল মিডিয়া, মোবাইল অ্যাপ্লিকেশন এবং অনলাইন প্ল্যাটফর্মগুলো তাদের প্রধান মাধ্যম।
                    </Text>

                    {/* Warning Tips Card */}
                    <View style={styles.warningCard}>
                        <Text style={styles.warningTitle}>সতর্কতার লক্ষণ:</Text>
                        <View style={styles.bulletList}>
                            {[
                                "অবাস্তব বেতন বা সুবিধার প্রতিশ্রুতি",
                                "পাসপোর্ট বা অন্যান্য গুরুত্বপূর্ণ নথি জমা রাখার দাবি",
                                "পরিবার বা বন্ধুদের সাথে যোগাযোগে বাধা",
                                "কাজ ছেড়ে অন্য কোথাও যাওয়ার চাপ"
                            ].map((item, index) => (
                                <View key={index} style={styles.bulletItem}>
                                    <View style={styles.bulletDot} />
                                    <Text style={styles.bulletText}>{item}</Text>
                                </View>
                            ))}
                        </View>
                    </View>

                    {/* Blue Advice Box */}
                    <View style={styles.blueBox}>
                        <Text style={styles.blueBoxTitle}>মনে রাখবেন:</Text>
                        <Text style={styles.blueBoxText}>
                            যদি কোনো প্রস্তাব খুব বেশি ভালো মনে হয়, তাহলে সম্ভবত এটি সত্য নয়। সর্বদা যাচাই করুন এবং বিশ্বস্ত উৎসের সাথে পরামর্শ করুন।
                        </Text>
                    </View>

                    <Image
                        source={{ uri: 'https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?q=80&w=1000&auto=format&fit=crop' }}
                        style={styles.secondaryImage}
                    />

                    <Text style={styles.subHeader}>সম্প্রদায়ের শক্তি</Text>
                    <Text style={styles.description}>
                        একটি সচেতন সম্প্রদায় মানব পাচার প্রতিরোধে সবচেয়ে শক্তিশালী হাতিয়ার। যখন আমরা প্রত্যেকে এক হই, তথ্য শেয়ার করি এবং একে অপরকে রক্ষা করি, তখন আমরা একটি নিরাপদ পরিবেশ তৈরি করি।
                    </Text>

                    {/* Action Items List */}
                    <View style={styles.actionList}>
                        <View style={styles.actionItem}>
                            <View style={[styles.actionIcon, { backgroundColor: '#DBEAFE' }]}>
                                <Users size={moderateScale(24)} color="#1E40AF" />
                            </View>
                            <View style={styles.actionTextContainer}>
                                <Text style={styles.actionTitle}>সচেতনতা প্রচার</Text>
                                <Text style={styles.actionDesc}>আপনার এলাকায় সচেতনতা প্রোগ্রাম এবং কর্মশালায় অংশগ্রহণ করুন</Text>
                            </View>
                        </View>

                        <View style={styles.actionItem}>
                            <View style={[styles.actionIcon, { backgroundColor: '#DBEAFE' }]}>
                                <Users size={moderateScale(24)} color="#1E40AF" />
                            </View>
                            <View style={styles.actionTextContainer}>
                                <Text style={styles.actionTitle}>সহযোগিতা করুন</Text>
                                <Text style={styles.actionDesc}>স্থানীয় সংস্থা এবং কর্তৃপক্ষের সাথে সহযোগিতা করুন</Text>
                            </View>
                        </View>

                        <View style={styles.actionItem}>
                            <View style={[styles.actionIcon, { backgroundColor: '#DBEAFE' }]}>
                                <Mic size={moderateScale(24)} color="#1E40AF" />
                            </View>
                            <View style={styles.actionTextContainer}>
                                <Text style={styles.actionTitle}>কথা বলুন</Text>
                                <Text style={styles.actionDesc}>সন্দেহজনক কার্যকলাপ দেখলে নীরব থাকবেন না, রিপোর্ট করুন</Text>
                            </View>
                        </View>
                    </View>


                    {/* Action Cards (Report, Share etc) */}
                    <Text style={styles.subHeader}>সচেতনতা সৃষ্টি করুন</Text>
                    <Text style={styles.description}>মানব পাচার প্রতিরোধে আমাদের সবার ভূমিকা রয়েছে। সঠিক তথ্য এবং সচেতনতায় পারে জীবন বাঁচাতে।</Text>

                    <View style={styles.gridContainer}>
                        <View style={styles.gridCard}>
                            <View style={[styles.gridIcon, { backgroundColor: '#3B82F6' }]}>
                                <Shield size={moderateScale(24)} color="white" />
                            </View>
                            <Text style={styles.gridTitle}>সতর্ক থাকুন</Text>
                            <Text style={styles.gridDesc}>মায়াজাল তৈরির আগে এর সাথে সম্পর্কিত তথ্য যাচাই করুন।</Text>
                        </View>

                        <View style={styles.gridCard}>
                            <View style={[styles.gridIcon, { backgroundColor: '#6366F1' }]}>
                                <Users size={moderateScale(24)} color="white" />
                            </View>
                            <Text style={styles.gridTitle}>সম্প্রদায়ে শেয়ার করুন</Text>
                            <Text style={styles.gridDesc}>আপনার পরিবার, বন্ধু এবং সম্প্রদায়ের সাথে সচেতনতা শেয়ার করুন।</Text>
                        </View>

                        <View style={styles.gridCard}>
                            <View style={[styles.gridIcon, { backgroundColor: '#0EA5E9' }]}>
                                <AlertTriangle size={moderateScale(24)} color="white" />
                            </View>
                            <Text style={styles.gridTitle}>সন্দেহজনক কার্যকলাপ রিপোর্ট করুন</Text>
                            <Text style={styles.gridDesc}>কোনো সন্দেহজনক কার্যকলাপ দেখলে অবিলম্বে কর্তৃপক্ষকে জানান।</Text>
                        </View>
                    </View>

                    <Image
                        source={{ uri: 'https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?q=80&w=1000&auto=format&fit=crop' }}
                        style={styles.bottomImage}
                    />

                    {/* Promise List */}
                    <Text style={styles.subHeader}>প্রতিরোধের পদক্ষেপ</Text>
                    <Text style={styles.description}>মানব পাচার রোধ করার জন্য প্রতিরোধমূলক ব্যবস্থা গ্রহণ অত্যন্ত গুরুত্বপূর্ণ। আমরা সবাইকে একটি নিরাপদ সমাজ গড়তে পারি।</Text>

                    <View style={styles.promiseList}>
                        {[
                            "বিদেশে যাওয়ার আগে সঠিক কাগজপত্র এবং লাইসেন্সপ্রাপ্ত এজেন্সি যাচাই করুন",
                            "অপরিচিত ব্যক্তির সাথে ব্যক্তিগত তথ্য শেয়ার করা থেকে বিরত থাকুন",
                            "শিশু ও যুবকদের নিরাপত্তা সম্পর্কে শিক্ষিত করুন",
                            "স্থানীয় আইন প্রয়োগকারী সংস্থা এবং সাহায্য লাইনের নম্বর সংরক্ষণ করুন"
                        ].map((item, index) => (
                            <View key={index} style={styles.promiseItem}>
                                <Shield size={moderateScale(20)} color="#3B82F6" />
                                <Text style={styles.promiseText}>{item}</Text>
                            </View>
                        ))}
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
    heroImage: {
        width: '100%',
        height: '180@vs',
        borderRadius: '16@ms',
        marginBottom: '20@vs',
    },
    secondaryImage: {
        width: '100%',
        height: '180@vs',
        borderRadius: '16@ms',
        marginVertical: '20@vs',
    },
    bottomImage: {
        width: '100%',
        height: '150@vs',
        borderRadius: '16@ms',
        marginVertical: '20@vs',
    },
    sectionTitle: {
        fontSize: '20@ms',
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
    warningCard: {
        backgroundColor: 'white',
        borderRadius: '16@ms',
        padding: '20@ms',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
        marginVertical: '10@vs',
    },
    warningTitle: {
        fontSize: '16@ms',
        fontWeight: 'bold',
        color: '#1F2937',
        marginBottom: '12@vs',
        fontFamily: 'July-Bold',
    },
    bulletList: {
        gap: '8@vs',
    },
    bulletItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    bulletDot: {
        width: '6@ms',
        height: '6@ms',
        borderRadius: '3@ms',
        backgroundColor: '#2563EB',
        marginRight: '10@ms',
    },
    bulletText: {
        fontSize: '14@ms',
        color: '#4B5563',
        fontFamily: 'July-Regular',
        flex: 1,
    },
    blueBox: {
        backgroundColor: '#1E3A8A', // Dark Blue
        borderRadius: '12@ms',
        padding: '16@ms',
        marginTop: '10@vs',
    },
    blueBoxTitle: {
        color: 'white',
        fontSize: '16@ms',
        fontWeight: 'bold',
        marginBottom: '8@vs',
        fontFamily: 'July-Bold',
    },
    blueBoxText: {
        color: '#DBEAFE',
        fontSize: '14@ms',
        lineHeight: '20@ms',
        fontFamily: 'July-Regular',
    },
    subHeader: {
        fontSize: '18@ms',
        fontWeight: 'bold',
        color: '#1F2937',
        marginBottom: '8@vs',
        marginTop: '20@vs',
        fontFamily: 'July-Bold',
    },
    actionList: {
        gap: '16@vs',
        marginVertical: '10@vs',
    },
    actionItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    actionIcon: {
        width: '48@ms',
        height: '48@ms',
        borderRadius: '24@ms',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: '16@ms',
    },
    actionTextContainer: {
        flex: 1,
    },
    actionTitle: {
        fontSize: '16@ms',
        fontWeight: 'bold',
        color: '#1F2937',
        marginBottom: '4@vs',
        fontFamily: 'July-Bold',
    },
    actionDesc: {
        fontSize: '13@ms',
        color: '#6B7280',
        fontFamily: 'July-Regular',
    },
    gridContainer: {
        gap: '16@vs',
        marginVertical: '10@vs',
    },
    gridCard: {
        backgroundColor: 'white',
        borderRadius: '16@ms',
        padding: '20@ms',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
    },
    gridIcon: {
        width: '48@ms',
        height: '48@ms',
        borderRadius: '16@ms',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '16@vs',
    },
    gridTitle: {
        fontSize: '16@ms',
        fontWeight: 'bold',
        color: '#1F2937',
        marginBottom: '8@vs',
        fontFamily: 'July-Bold',
    },
    gridDesc: {
        fontSize: '13@ms',
        color: '#6B7280',
        fontFamily: 'July-Regular',
    },
    promiseList: {
        gap: '16@vs',
        marginTop: '10@vs',
    },
    promiseItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: '12@ms',
    },
    promiseText: {
        fontSize: '13@ms',
        color: '#374151',
        fontWeight: '600',
        flex: 1,
        fontFamily: 'July-Regular',
    },
});

export default AwarenessScreen;
