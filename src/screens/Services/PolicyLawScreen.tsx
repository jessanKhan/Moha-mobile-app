import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, LayoutAnimation, Platform, UIManager } from 'react-native';
import Header from '../../components/Header';
import { ChevronDown, ChevronUp, Phone, Scale } from 'lucide-react-native';
import { policies } from '../../data/policyData';
import HotlineBanner from '../../components/HotlineBanner';

import { ScaledSheet, moderateScale, scale, verticalScale } from 'react-native-size-matters';

if (Platform.OS === 'android') {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }
}

const PolicyLawScreen = () => {
    const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

    const toggleExpand = (index: number) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setExpandedIndex(expandedIndex === index ? null : index);
    };

    const AccordionItem = ({ item, index, expanded, onPress }: any) => {
        const Icon = item.icon;
        return (
            <View style={styles.accordionContainer}>
                <TouchableOpacity
                    onPress={onPress}
                    activeOpacity={0.7}
                    style={styles.accordionHeader}
                >
                    <View style={styles.headerContent}>
                        <View style={[styles.iconContainer, { backgroundColor: item.color }]}>
                            <Icon size={moderateScale(24)} color="white" />
                        </View>
                        <Text style={styles.itemTitle}>
                            {item.title}
                        </Text>
                    </View>
                    {expanded ? <ChevronUp size={moderateScale(20)} color="#9CA3AF" /> : <ChevronDown size={moderateScale(20)} color="#9CA3AF" />}
                </TouchableOpacity>

                {expanded && (
                    <View style={styles.expandedContent}>
                        <Text style={styles.contentText}>
                            {item.content}
                        </Text>
                    </View>
                )}
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <Header
                title="নীতি ও আইন"
                subtitle="আইনি তথ্য এবং নির্দেশনা"
                showBackButton={true}
            />

            <ScrollView style={styles.flex1} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                {policies.map((item, index) => (
                    <AccordionItem
                        key={index}
                        item={item}
                        index={index}
                        expanded={expandedIndex === index}
                        onPress={() => toggleExpand(index)}
                    />
                ))}

                {/* Legal Advice Card */}
                <View style={styles.legalCard}>
                    <View style={styles.legalHeader}>
                        <Scale size={moderateScale(20)} color="#0891B2" />
                        <Text style={styles.legalTitle}>আইনি পরামর্শ</Text>
                    </View>
                    <Text style={styles.legalText}>
                        আইনি সহায়তা প্রয়োজন হলে নিকটস্থ আইনজীবী বা আইনি সহায়তা কেন্দ্রে যোগাযোগ করুন।
                    </Text>
                    <Text style={styles.legalSubText}>
                        সকল তথ্য সম্পূর্ণ গোপনীয় রাখা হবে।
                    </Text>
                </View>

                {/* Hotline Banner */}
                <HotlineBanner
                    title="২৪/৭ জরুরি হটলাইন"
                    number="৯৯৯"
                    onPress={() => console.log('Call 999')}
                />

            </ScrollView>
        </View>
    );
};

const styles = ScaledSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9FAFB',
    },
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
    },
    legalText: {
        color: '#155E75',
        fontSize: '14@ms',
        lineHeight: '20@ms',
        marginBottom: '8@vs',
    },
    legalSubText: {
        color: '#155E75',
        fontSize: '12@ms',
        opacity: 0.7,
    },
});

export default PolicyLawScreen;
