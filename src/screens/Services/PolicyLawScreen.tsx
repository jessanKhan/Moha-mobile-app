import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Platform, UIManager, ActivityIndicator, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Header from '../../components/Header';
import { Calendar, FileText } from 'lucide-react-native';
import { ScaledSheet, moderateScale } from 'react-native-size-matters';
import AppBackground from '../../components/AppBackground';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { GET_CATEGORIES_OF_POLICY, GET_POLICIES_BY_CATEGORY } from '../../api/queries';
import { useQuery } from '@apollo/client/react';

if (Platform.OS === 'android') {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }
}

interface PolicyCategory {
    id: number;
    name: string;
    nameBn: string;
}

interface CategoriesData {
    categoriesOfPolicy: PolicyCategory[];
}

interface PolicyDetail {
    id: number;
    title: string;
    titleBn: string;
    attachmentUrl: string;
    date: string;
    dateBn: string;
}

interface PoliciesByCategoryData {
    policiesByCategory: PolicyDetail[];
}

const PolicyLawScreen = () => {
    const navigation = useNavigation<any>();
    const languageMode = useSelector((state: RootState) => state.language.mode);
    const [activeTab, setActiveTab] = useState(0);

    const { data: categoriesData, loading: loadingCategories } = useQuery<CategoriesData>(GET_CATEGORIES_OF_POLICY, {
        fetchPolicy: 'cache-and-network',
    });

    const categories = categoriesData?.categoriesOfPolicy || [];

    const currentTabName = categories[activeTab]
        ? (languageMode === 'bn' ? categories[activeTab].nameBn : categories[activeTab].name)
        : '';

    const activeCategoryQueryName = categories[activeTab]?.name || 'Legal';

    const { data: policiesData, loading: loadingPolicies } = useQuery<PoliciesByCategoryData>(GET_POLICIES_BY_CATEGORY, {
        variables: { category: activeCategoryQueryName },
        skip: categories.length === 0,
        fetchPolicy: 'cache-and-network',
    });

    const policies = policiesData?.policiesByCategory || [];

    const handleViewPdf = (item: PolicyDetail) => {
        if (item.attachmentUrl) {
            navigation.navigate('PdfViewer', {
                url: item.attachmentUrl,
                title: languageMode === 'bn' ? item.titleBn : item.title
            });
        } else {
            Alert.alert(
                languageMode === 'bn' ? "সতর্কতা" : "Warning",
                languageMode === 'bn' ? "পিডিএফ ফাইল পাওয়া যায়নি।" : "PDF file not found."
            );
        }
    };

    return (
        <AppBackground>
            <Header
                title={languageMode === 'bn' ? "নীতি ও আইন" : "Policy & Law"}
                subtitle={languageMode === 'en' ? 'Legal information and guidelines' : 'আইনি তথ্য এবং নির্দেশনা'}
                showBackButton={true}
            />

            <View style={styles.container}>
                {/* Tabs */}
                <View style={styles.tabsContainer}>
                    {loadingCategories ? (
                        <ActivityIndicator size="small" color="#1E3A8A" style={{ paddingVertical: moderateScale(8) }} />
                    ) : categories.length === 0 ? (
                        <Text style={{ textAlign: 'center', color: '#4B5563' }}>No categories found.</Text>
                    ) : (
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabsScroll}>
                            {categories.map((cat, index) => {
                                const isActive = activeTab === index;
                                const tabName = languageMode === 'bn' ? cat.nameBn : cat.name;
                                return (
                                    <TouchableOpacity
                                        key={cat.id || index}
                                        style={[styles.tabButton, isActive && styles.tabButtonActive]}
                                        onPress={() => setActiveTab(index)}
                                        activeOpacity={0.7}
                                    >
                                        <Text style={[styles.tabText, isActive && styles.tabTextActive]}>
                                            {tabName}
                                        </Text>
                                    </TouchableOpacity>
                                );
                            })}
                        </ScrollView>
                    )}
                </View>

                <ScrollView style={styles.scrollArea} showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                    {/* Section Title */}
                    {!loadingCategories && categories.length > 0 && (
                        <Text style={styles.sectionTitle}>{currentTabName}</Text>
                    )}

                    {/* Cards */}
                    {loadingPolicies ? (
                        <ActivityIndicator size="large" color="#1E3A8A" style={{ marginTop: 20 }} />
                    ) : policies.length === 0 ? (
                        <Text style={{ textAlign: 'center', color: '#4B5563', marginTop: 20 }}>
                            {languageMode === 'bn' ? 'কোনো তথ্য পাওয়া যায়নি।' : 'No data found.'}
                        </Text>
                    ) : (
                        policies.map((item) => (
                            <View key={item.id} style={styles.card}>
                                <Text style={styles.cardTitle}>{languageMode === 'bn' ? item.titleBn : item.title}</Text>

                                <View style={styles.dateContainer}>
                                    <Calendar size={moderateScale(14)} color="#4B5563" style={styles.calendarIcon} />
                                    <Text style={styles.dateText}>
                                        {languageMode === 'bn' ? 'কার্যকর: ' : 'Effective: '}
                                        {item.date ? item.date : (languageMode === 'bn' ? 'প্রযোজ্য নয়' : 'N/A')}
                                    </Text>
                                </View>

                                <TouchableOpacity
                                    style={styles.pdfButton}
                                    activeOpacity={0.8}
                                    onPress={() => handleViewPdf(item)}
                                >
                                    <FileText size={moderateScale(16)} color="#FFFFFF" strokeWidth={2} />
                                    <Text style={styles.pdfButtonText}>{languageMode === 'bn' ? 'পিডিএফ দেখুন' : 'View PDF'}</Text>
                                </TouchableOpacity>
                            </View>
                        ))
                    )}
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
        minHeight: '64@vs',
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
        backgroundColor: '#1E3A8A',
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
        color: '#000000ff',
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
        color: '#1F2937',
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
        color: '#6B7280',
        fontSize: '12@ms',
        fontFamily: 'July-Regular',
    },
    pdfButton: {
        backgroundColor: '#1E3A8A',
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
