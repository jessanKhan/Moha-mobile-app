import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, LayoutAnimation, Platform, UIManager, ActivityIndicator, Image } from 'react-native';
import Header from '../../components/Header';
import { ChevronDown, ChevronUp, Scale, Gavel } from 'lucide-react-native';
import HotlineBanner from '../../components/HotlineBanner';
import { ScaledSheet, moderateScale } from 'react-native-size-matters';
import AppBackground from '../../components/AppBackground';
import { useQuery } from '@apollo/client/react';
import { POLICIES_QUERY } from '../../api/queries';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

if (Platform.OS === 'android') {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }
}

const PolicyLawScreen = () => {
    const [expandedIndex, setExpandedIndex] = useState<number | null>(0);
    const languageMode = useSelector((state: RootState) => state.language.mode);
    const { data, loading, error } = useQuery(POLICIES_QUERY, {
        variables: { page: 1, limit: 10 },
        fetchPolicy: 'no-cache',
    });

    useEffect(() => {
        if (data) console.warn("DEBUG POLICIES DATA:", JSON.stringify((data as any).policies?.length));
        console.log("Policy Screen UI State:", {
            loading,
            error: error?.message,
            dataCount: (data as any)?.policies?.length
        });
    }, [data, loading, error]);
    const toggleExpand = (index: number) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setExpandedIndex(expandedIndex === index ? null : index);
    };

    const stripHtml = (html: string) => {
        return html?.replace(/<[^>]*>?/gm, '') || '';
    };

    const BG_COLORS = ['#00786Fff', '#18c24bff', '#ceac24ff', '#611764ff', '#3b1cd8ff', '#30b9c0ff', '##E7000Bff', '#2766b8ff'];

    const getRandomBg = (id: number) => {
        return BG_COLORS[id % BG_COLORS.length];
    };

    const AccordionItem = ({ item, index, expanded, onPress }: any) => {
        const title = languageMode === 'bn' ? item.titleBn : item.title;
        const description = languageMode === 'bn' ? item.descriptionBn : item.description;
        const randomBg = getRandomBg(item.id);

        return (
            <View style={styles.accordionContainer}>
                <TouchableOpacity
                    onPress={onPress}
                    activeOpacity={0.7}
                    style={styles.accordionHeader}
                >
                    <View style={styles.headerContent}>
                        <View style={[styles.iconContainer, { backgroundColor: randomBg }]}>
                            {item.attachmentUrl ? (
                                <Image
                                    source={{ uri: item.attachmentUrl }}
                                    style={styles.attachmentImage}
                                    resizeMode="cover"
                                />
                            ) : (
                                <Gavel size={moderateScale(24)} color="#4B5563" />
                            )}
                        </View>
                        <Text style={styles.itemTitle}>
                            {title}
                        </Text>
                    </View>
                    {expanded ? <ChevronUp size={moderateScale(20)} color="#9CA3AF" /> : <ChevronDown size={moderateScale(20)} color="#9CA3AF" />}
                </TouchableOpacity>

                {expanded && (
                    <View style={styles.expandedContent}>
                        <Text style={styles.contentText}>
                            {stripHtml(description)}
                        </Text>
                    </View>
                )}
            </View>
        );
    };

    return (
        <AppBackground>
            <Header
                title={languageMode === 'bn' ? "নীতি ও আইন" : "Policy & Law"}
                subtitle={languageMode === 'bn' ? "আইনি তথ্য এবং নির্দেশনা" : "Legal information and guidelines"}
                showBackButton={true}
            />

            <ScrollView style={styles.flex1} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                {loading ? (
                    <ActivityIndicator size="large" color="#1559F7" style={{ marginTop: 50 }} />
                ) : error ? (
                    <View style={{ marginTop: 20, padding: 10 }}>
                        <Text style={{ textAlign: 'center', color: 'red' }}>Error: {error.message}</Text>
                        {(error as any).graphQLErrors?.length > 0 && (
                            <Text style={{ textAlign: 'center', color: 'red', fontSize: 12 }}>
                                {(error as any).graphQLErrors[0].message}
                            </Text>
                        )}
                    </View>
                ) : (data as any)?.policies?.length > 0 ? (
                    (data as any)?.policies.map((item: any, index: number) => (
                        <AccordionItem
                            key={item.id}
                            item={item}
                            index={index}
                            expanded={expandedIndex === index}
                            onPress={() => toggleExpand(index)}
                        />
                    ))
                ) : (
                    <Text style={{ textAlign: 'center', marginTop: 20 }}>
                        {languageMode === 'bn' ? 'কোন তথ্য পাওয়া যায়নি' : 'No information found'}
                    </Text>
                )}

                {/* Legal Advice Card */}
                <View style={styles.legalCard}>
                    <View style={styles.legalHeader}>
                        <Scale size={moderateScale(20)} color="#0891B2" />
                        <Text style={styles.legalTitle}>
                            {languageMode === 'bn' ? "আইনি পরামর্শ" : "Legal Advice"}
                        </Text>
                    </View>
                    <Text style={styles.legalText}>
                        {languageMode === 'bn'
                            ? "আইনি সহায়তা প্রয়োজন হলে নিকটস্থ আইনজীবী বা আইনি সহায়তা কেন্দ্রে যোগাযোগ করুন।"
                            : "If you need legal assistance, contact your nearest lawyer or legal aid center."}
                    </Text>
                    <Text style={styles.legalSubText}>
                        {languageMode === 'bn' ? "সকল তথ্য সম্পূর্ণ গোপনীয় রাখা হবে।" : "All information will be kept strictly confidential."}
                    </Text>
                </View>

                {/* Hotline Banner */}
                <HotlineBanner
                    title={languageMode === 'bn' ? "২৪/৭ জরুরি হটলাইন" : "24/7 Emergency Hotline"}
                    number="৯৯৯"
                    onPress={() => console.log('Call 999')}
                />

            </ScrollView>
        </AppBackground>
    );
};

const styles = ScaledSheet.create({
    flex1: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: '16@ms',
        paddingTop: '20@vs',
        paddingBottom: '40@vs',
    },
    accordionContainer: {
        backgroundColor: 'white',
        marginBottom: '16@vs',
        borderRadius: '16@ms',
        borderWidth: 1,
        borderColor: '#F3F4F6',
        overflow: 'hidden',
        elevation: 1,
    },
    accordionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '16@ms',
    },
    headerContent: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        paddingRight: '16@ms',
    },
    iconContainer: {
        width: '40@ms',
        height: '40@ms',
        borderRadius: '10@ms',
        marginRight: '12@ms',
        alignItems: 'center',
        justifyContent: 'center',
    },
    itemTitle: {
        color: '#1F2937',
        fontWeight: 'bold',
        fontSize: '15@ms',
        flex: 1,
        fontFamily: 'July-Bold',
    },
    attachmentImage: {
        width: '60%',
        height: '60%',
        borderRadius: '10@ms',
    },
    expandedContent: {
        paddingHorizontal: '16@ms',
        paddingBottom: '20@vs',
        paddingTop: '4@vs',
        paddingLeft: '68@ms',
    },
    contentText: {
        color: '#4B5563',
        fontSize: '14@ms',
        lineHeight: '20@ms',
        fontFamily: 'July-Regular',
    },
    legalCard: {
        padding: '20@ms',
        backgroundColor: '#ECFEFF',
        borderRadius: '16@ms',
        marginBottom: '24@vs',
        marginTop: '8@vs',
        borderWidth: 1,
        borderColor: '#CFFAFE',
    },
    legalHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: '12@vs',
    },
    legalTitle: {
        marginLeft: '10@ms',
        color: '#0891B2',
        fontWeight: 'bold',
        fontSize: '16@ms',
        fontFamily: 'July-Bold',
    },
    legalText: {
        color: '#155E75',
        fontSize: '14@ms',
        lineHeight: '20@ms',
        marginBottom: '8@vs',
        fontFamily: 'July-Regular',
    },
    legalSubText: {
        color: '#155E75',
        fontSize: '12@ms',
        opacity: 0.7,
        fontFamily: 'July-Regular',
    },
});

export default PolicyLawScreen;
