import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Platform, UIManager } from 'react-native';
import Header from '../../components/Header';
import { Calendar, FileText } from 'lucide-react-native';
import { ScaledSheet, moderateScale } from 'react-native-size-matters';
import AppBackground from '../../components/AppBackground';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

if (Platform.OS === 'android') {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }
}

const TABS = ['Rules', 'Legal', 'Policy', 'Insurance', 'Compliance'];

const MOCK_DATA = [
    {
        id: 1,
        title: 'Received Digital Data Sovereignty Standards',
        date: 'Jan 15, 2024'
    },
    {
        id: 2,
        title: 'Received Digital Data Sovereignty Standards',
        date: 'Jan 15, 2024'
    },
    {
        id: 3,
        title: 'Received Digital Data Sovereignty Standards',
        date: 'Jan 15, 2024'
    }
];

const PolicyLawScreen = () => {
    const languageMode = useSelector((state: RootState) => state.language.mode);
    const [activeTab, setActiveTab] = useState(0);

    return (
        <AppBackground>
            <Header
                title={languageMode === 'bn' ? "নীতি ও আইন" : "Policy & Law"}
                showBackButton={true}
            />

            <View style={styles.container}>
                {/* Tabs */}
                <View style={styles.tabsContainer}>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabsScroll}>
                        {TABS.map((tab, index) => {
                            const isActive = activeTab === index;
                            return (
                                <TouchableOpacity
                                    key={index}
                                    style={[styles.tabButton, isActive && styles.tabButtonActive]}
                                    onPress={() => setActiveTab(index)}
                                    activeOpacity={0.7}
                                >
                                    <Text style={[styles.tabText, isActive && styles.tabTextActive]}>
                                        {tab}
                                    </Text>
                                </TouchableOpacity>
                            );
                        })}
                    </ScrollView>
                </View>

                <ScrollView style={styles.scrollArea} showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                    {/* Section Title */}
                    <Text style={styles.sectionTitle}>{TABS[activeTab]}</Text>

                    {/* Cards */}
                    {MOCK_DATA.map((item) => (
                        <View key={item.id} style={styles.card}>
                            <Text style={styles.cardTitle}>{item.title}</Text>

                            <View style={styles.dateContainer}>
                                <Calendar size={moderateScale(14)} color="#4B5563" style={styles.calendarIcon} />
                                <Text style={styles.dateText}>Effective: {item.date}</Text>
                            </View>

                            <TouchableOpacity style={styles.pdfButton} activeOpacity={0.8}>
                                <FileText size={moderateScale(16)} color="#FFFFFF" strokeWidth={2} />
                                <Text style={styles.pdfButtonText}>View PDF</Text>
                            </TouchableOpacity>
                        </View>
                    ))}
                </ScrollView>
            </View>
        </AppBackground>
    );
};

const styles = ScaledSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9FAFB',
    },
    tabsContainer: {
        paddingVertical: '16@vs',
        backgroundColor: '#F9FAFB',
    },
    tabsScroll: {
        paddingHorizontal: '16@ms',
        alignItems: 'center',
    },
    tabButton: {
        paddingHorizontal: '16@ms',
        paddingVertical: '8@vs',
        backgroundColor: '#E5E7EB',
        borderRadius: '20@ms',
        marginRight: '8@ms',
        alignItems: 'center',
        justifyContent: 'center',
    },
    tabButtonActive: {
        backgroundColor: '#0F172A',
    },
    tabText: {
        color: '#4B5563',
        fontSize: '13@ms',
        fontFamily: 'July-Regular',
        fontWeight: '500',
    },
    tabTextActive: {
        color: '#FFFFFF',
        fontFamily: 'July-Bold',
    },
    scrollArea: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: '16@ms',
        paddingBottom: '40@vs',
    },
    sectionTitle: {
        fontSize: '20@ms',
        color: '#0F172A',
        fontFamily: 'July-Bold',
        fontWeight: 'bold',
        marginBottom: '16@vs',
    },
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: '16@ms',
        padding: '20@ms',
        marginBottom: '16@vs',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.03,
        shadowRadius: 4,
        elevation: 1,
    },
    cardTitle: {
        fontSize: '16@ms',
        color: '#0F172A',
        fontFamily: 'July-Bold',
        fontWeight: '600',
        marginBottom: '12@vs',
        lineHeight: '22@ms',
    },
    dateContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: '16@vs',
    },
    calendarIcon: {
        marginRight: '6@ms',
    },
    dateText: {
        color: '#4B5563',
        fontSize: '12@ms',
        fontFamily: 'July-Regular',
    },
    pdfButton: {
        backgroundColor: '#0F172A',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '24@ms',
        paddingVertical: '12@vs',
    },
    pdfButtonText: {
        color: '#FFFFFF',
        fontSize: '14@ms',
        fontFamily: 'July-Bold',
        fontWeight: '600',
        marginLeft: '8@ms',
    },
});

export default PolicyLawScreen;
