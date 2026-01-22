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
            <View className="bg-white dark:bg-zinc-900 shadow-sm border border-gray-100 dark:border-zinc-800 overflow-hidden" style={styles.accordionContainer}>
                <TouchableOpacity
                    onPress={onPress}
                    className="flex-row items-center justify-between"
                    style={styles.accordionHeader}
                >
                    <View className="flex-row items-center flex-1" style={{ paddingRight: scale(16) }}>
                        <View className={`items-center justify-center`} style={[styles.iconContainer, { backgroundColor: item.color }]}>
                            <Icon size={moderateScale(24)} color="white" />
                        </View>
                        <Text className="text-gray-800 dark:text-gray-100 font-bold flex-1" style={styles.itemTitle}>
                            {item.title}
                        </Text>
                    </View>
                    {expanded ? <ChevronUp size={moderateScale(20)} color="#9CA3AF" /> : <ChevronDown size={moderateScale(20)} color="#9CA3AF" />}
                </TouchableOpacity>

                {expanded && (
                    <View style={styles.expandedContent}>
                        <Text className="text-gray-600 dark:text-gray-400" style={styles.contentText}>
                            {item.content}
                        </Text>
                    </View>
                )}
            </View>
        );
    };

    return (
        <View className="flex-1 bg-gray-50 dark:bg-black">
            <Header
                title="নীতি ও আইন"
                subtitle="আইনি তথ্য এবং নির্দেশনা"
                showBackButton={true}
            />

            <ScrollView className="flex-1" contentContainerStyle={styles.scrollContent}>
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
                <View className="bg-cyan-50 dark:bg-cyan-900/20 border border-cyan-100 dark:border-cyan-800/30" style={styles.legalCard}>
                    <View className="flex-row items-center" style={{ marginBottom: verticalScale(12) }}>
                        <Scale size={moderateScale(20)} color="#0891B2" />
                        <Text className="text-cyan-800 dark:text-cyan-400 font-bold" style={styles.legalTitle}>আইনি পরামর্শ</Text>
                    </View>
                    <Text className="text-cyan-700 dark:text-cyan-300" style={styles.legalText}>
                        আইনি সহায়তা প্রয়োজন হলে নিকটস্থ আইনজীবী বা আইনি সহায়তা কেন্দ্রে যোগাযোগ করুন।
                    </Text>
                    <Text className="text-cyan-700 dark:text-cyan-300 opacity-80" style={styles.legalSubText}>
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
    scrollContent: {
        paddingHorizontal: '16@s',
        paddingTop: '24@vs',
        paddingBottom: '100@vs'
    },
    accordionContainer: {
        marginBottom: '16@vs',
        borderRadius: '16@ms'
    },
    accordionHeader: {
        padding: '16@ms'
    },
    iconContainer: {
        width: '48@ms',
        height: '48@ms',
        borderRadius: '16@ms',
        marginRight: '16@s'
    },
    itemTitle: {
        fontSize: '16@ms' // text-lg approx
    },
    expandedContent: {
        paddingHorizontal: '16@s',
        paddingBottom: '24@vs',
        paddingTop: '8@vs',
        paddingLeft: '72@s' // 16 (padding) + 48 (icon) + 16 (margin) approx
    },
    contentText: {
        fontSize: '14@ms',
        lineHeight: '22@ms'
    },
    legalCard: {
        padding: '24@ms',
        borderRadius: '16@ms',
        marginBottom: '24@vs',
        marginTop: '8@vs'
    },
    legalTitle: {
        marginLeft: '12@s',
        fontSize: '16@ms'
    },
    legalText: {
        fontSize: '14@ms',
        lineHeight: '20@ms',
        marginBottom: '4@vs'
    },
    legalSubText: {
        fontSize: '12@ms',
        marginTop: '8@vs'
    }
});

export default PolicyLawScreen;
