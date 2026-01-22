import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, LayoutAnimation, Platform, UIManager } from 'react-native';
import Header from '../../components/Header';
import { ChevronDown, ChevronUp, Phone, Scale } from 'lucide-react-native';
import { policies } from '../../data/policyData';

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
            <View className="bg-white dark:bg-zinc-900 mb-4 rounded-2xl shadow-sm border border-gray-100 dark:border-zinc-800 overflow-hidden">
                <TouchableOpacity
                    onPress={onPress}
                    className="flex-row items-center p-4 justify-between"
                >
                    <View className="flex-row items-center flex-1 pr-4">
                        <View className={`w-12 h-12 rounded-2xl items-center justify-center mr-4`} style={{ backgroundColor: item.color }}>
                            <Icon size={24} color="white" />
                        </View>
                        <Text className="text-gray-800 dark:text-gray-100 text-lg font-bold flex-1">
                            {item.title}
                        </Text>
                    </View>
                    {expanded ? <ChevronUp size={20} color="#9CA3AF" /> : <ChevronDown size={20} color="#9CA3AF" />}
                </TouchableOpacity>

                {expanded && (
                    <View className="px-4 pb-6 pt-2 pl-[72px]">
                        <Text className="text-gray-600 dark:text-gray-400 leading-6">
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

            <ScrollView className="flex-1 px-4 pt-6" contentContainerStyle={{ paddingBottom: 100 }}>
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
                <View className="bg-cyan-50 dark:bg-cyan-900/20 p-6 rounded-2xl border border-cyan-100 dark:border-cyan-800/30 mb-6 mt-2">
                    <View className="flex-row items-center mb-3">
                        <Scale size={20} color="#0891B2" />
                        <Text className="text-cyan-800 dark:text-cyan-400 font-bold ml-3 text-base">আইনি পরামর্শ</Text>
                    </View>
                    <Text className="text-cyan-700 dark:text-cyan-300 mb-1 leading-5">
                        আইনি সহায়তা প্রয়োজন হলে নিকটস্থ আইনজীবী বা আইনি সহায়তা কেন্দ্রে যোগাযোগ করুন।
                    </Text>
                    <Text className="text-cyan-700 dark:text-cyan-300 text-xs mt-2 opacity-80">
                        সকল তথ্য সম্পূর্ণ গোপনীয় রাখা হবে।
                    </Text>
                </View>

                {/* Hotline Banner */}
                <View className="bg-[#101929] rounded-2xl p-5 flex-row items-center justify-between mb-8">
                    <View className="flex-row items-center">
                        <View className="bg-[#EF4444] p-3 rounded-full mr-4">
                            <Phone size={24} color="white" fill="white" />
                        </View>
                        <View>
                            <Text className="text-gray-400 text-xs mb-1">২৪/৭ জরুরি হটলাইন</Text>
                            <Text className="text-white text-2xl font-bold tracking-widest">৯৯৯</Text>
                        </View>
                    </View>
                    <TouchableOpacity className="bg-white/10 px-4 py-2 rounded-lg border border-white/10">
                        <Text className="text-white text-xs font-medium">কল করুন</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>
        </View>
    );
};

export default PolicyLawScreen;
