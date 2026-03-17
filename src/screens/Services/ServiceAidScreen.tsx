import React from 'react';
import { View, Text, ScrollView, Image, ActivityIndicator } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { ScaledSheet, moderateScale, verticalScale } from 'react-native-size-matters';
import Header from '../../components/Header';
import AppBackground from '../../components/AppBackground';
import { useQuery } from '@apollo/client/react';
import { AIDS_BY_SERVICE_ID } from '../../api/queries';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

interface AidTopic {
    id: number;
    title: string;
    titleBn: string;
    subtitle: string;
    subtitleBn: string;
}

interface AidCard {
    id: number;
    title: string;
    titleBn: string;
    subtitle: string;
    subtitleBn: string;
}

interface Aid {
    id: number;
    title: string;
    titleBn: string;
    subtitle: string;
    subtitleBn: string;
    description: string;
    descriptionBn: string;
    attachmentUrl: string;
    topics: AidTopic[];
    cards: AidCard[];
}

interface AidsData {
    aidsByServiceId: Aid[];
}

const ServiceAidScreen = () => {
    const route = useRoute<any>();
    const { serviceId, title, subtitle } = route.params || {};
    const languageMode = useSelector((state: RootState) => state.language.mode);

    const { data, loading, error } = useQuery<AidsData>(AIDS_BY_SERVICE_ID, {
        variables: { serviceId: parseFloat(serviceId) },
        skip: !serviceId,
    });

    const aid = data?.aidsByServiceId?.[0];

    if (loading) {
        return (
            <AppBackground>
                <Header title={title || ''} subtitle={subtitle || ''} showBackButton={true} />
                <View style={styles.centerContainer}>
                    <ActivityIndicator size="large" color="#ffffff" />
                </View>
            </AppBackground>
        );
    }

    if (error || !aid) {
        return (
            <AppBackground>
                <Header title={title || ''} subtitle={subtitle || ''} showBackButton={true} />
                <View style={styles.centerContainer}>
                    <Text style={styles.errorText}>
                        {languageMode === 'en' ? 'No data found' : 'কোন তথ্য পাওয়া যায়নি'}
                    </Text>
                </View>
            </AppBackground>
        );
    }

    const aidTitle = languageMode === 'en' ? aid.title : aid.titleBn;
    const aidSubtitle = languageMode === 'en' ? aid.subtitle : aid.subtitleBn;
    const aidDescription = languageMode === 'en' ? aid.description : aid.descriptionBn;

    const parseHtmlItems = (html: string) => {
        if (!html) return [];
        const regex = /<li>(.*?)<\/li>/g;
        const matches = [];
        let match;
        while ((match = regex.exec(html)) !== null) {
            matches.push(match[1].replace(/<[^>]*>?/gm, '').trim());
        }
        return matches;
    };

    return (
        <AppBackground>
            <Header title={title || ''} subtitle={subtitle || ''} showBackButton={true} />
            <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false}>
                <View style={styles.container}>
                    <Text style={styles.aidTitle}>{aidTitle}</Text>
                    <Text style={styles.aidSubtitle}>{aidSubtitle}</Text>
                    {aidDescription && <Text style={styles.aidDescription}>{aidDescription}</Text>}

                    {aid.attachmentUrl && (
                        <View style={styles.imageContainer}>
                            <Image source={{ uri: aid.attachmentUrl }} style={styles.image} />
                        </View>
                    )}

                    <Text style={styles.sectionTitle}>
                        {languageMode === 'en' ? 'What assistance do we provide?' : 'আমরা কী ধরণের সহায়তা প্রদান করি'}
                    </Text>

                    {aid.topics?.map((topic: any) => (
                        <View key={topic.id} style={styles.topicCard}>
                            <Text style={styles.topicTitle}>
                                {languageMode === 'en' ? topic.title : topic.titleBn}
                            </Text>
                            <Text style={styles.topicSubtitle}>
                                {languageMode === 'en' ? topic.subtitle : topic.subtitleBn}
                            </Text>
                        </View>
                    ))}

                    <View style={{ height: moderateScale(20) }} />

                    {aid.cards?.map((card: any) => {
                        const cardDesc = languageMode === 'en' ? card.description : card.descriptionBn;
                        const items = parseHtmlItems(cardDesc);
                        
                        return (
                            <View key={card.id} style={styles.blueSection}>
                                <Text style={styles.blueSectionHeader}>আমরা সকলের পাশে আছি</Text>
                                <Text style={styles.blueSectionTitle}>
                                    {languageMode === 'en' ? card.title : card.titleBn}
                                </Text>
                                {card.subtitle || card.subtitleBn ? (
                                    <Text style={styles.blueSectionSubtitle}>
                                        {languageMode === 'en' ? card.subtitle : card.subtitleBn}
                                    </Text>
                                ) : null}

                                <View style={styles.itemsList}>
                                    {items.map((item, idx) => (
                                        <View key={idx} style={styles.listItem}>
                                            <View style={styles.numberCircle}>
                                                <Text style={styles.numberText}>{idx + 1}</Text>
                                            </View>
                                            <Text style={styles.itemText}>{item}</Text>
                                        </View>
                                    ))}
                                </View>
                            </View>
                        );
                    })}
                </View>
            </ScrollView>
        </AppBackground>
    );
};

const styles = ScaledSheet.create({
    scrollContent: {
        flex: 1,
    },
    container: {
        padding: '16@ms',
        paddingBottom: '60@ms',
    },
    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        color: 'white',
        fontSize: '14@ms',
        fontFamily: 'July-Regular',
    },
    aidTitle: {
        fontSize: '20@ms',
        fontWeight: 'bold',
        color: '#1F2937',
        marginBottom: '4@vs',
        fontFamily: 'July-Bold',
    },
    aidSubtitle: {
        fontSize: '14@ms',
        color: '#4B5563',
        lineHeight: '20@ms',
        marginBottom: '16@vs',
        fontFamily: 'July-Bold',
    },
    aidDescription: {
        fontSize: '14@ms',
        color: '#4B5563',
        lineHeight: '22@ms',
        marginBottom: '16@vs',
        fontFamily: 'July-Regular',
    },
    imageContainer: {
        width: '100%',
        height: '220@vs',
        borderRadius: '16@ms',
        overflow: 'hidden',
        marginBottom: '24@vs',
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    sectionTitle: {
        fontSize: '18@ms',
        fontWeight: 'bold',
        color: '#111827',
        marginBottom: '16@vs',
        fontFamily: 'July-Bold',
    },
    topicCard: {
        backgroundColor: '#ECFDF5',
        borderRadius: '12@ms',
        padding: '16@ms',
        marginBottom: '12@vs',
        borderLeftWidth: '5@ms',
        borderLeftColor: '#10B981', // Green
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
    },
    topicTitle: {
        fontSize: '16@ms',
        fontWeight: 'bold',
        color: '#065F46',
        marginBottom: '4@vs',
        fontFamily: 'July-Bold',
    },
    topicSubtitle: {
        fontSize: '13@ms',
        color: '#374151',
        lineHeight: '18@ms',
        fontFamily: 'July-Regular',
    },
    blueSection: {
        backgroundColor: '#1E3A5F',
        borderRadius: '20@ms',
        padding: '24@ms',
        marginTop: '12@vs',
    },
    blueSectionHeader: {
        color: '#D1D5DB',
        fontSize: '12@ms',
        marginBottom: '4@vs',
        fontFamily: 'July-Regular',
    },
    blueSectionTitle: {
        color: 'white',
        fontSize: '18@ms',
        fontWeight: 'bold',
        marginBottom: '20@vs',
        fontFamily: 'July-Bold',
    },
    blueSectionSubtitle: {
        color: '#E5E7EB',
        fontSize: '13@ms',
        lineHeight: '20@ms',
        marginBottom: '20@vs',
        fontFamily: 'July-Regular',
    },
    itemsList: {
        gap: '12@vs',
    },
    listItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.1)',
        padding: '12@ms',
        borderRadius: '12@ms',
        gap: '12@ms',
    },
    numberCircle: {
        width: '28@ms',
        height: '28@ms',
        borderRadius: '14@ms',
        backgroundColor: '#F97316', // Orange
        justifyContent: 'center',
        alignItems: 'center',
    },
    numberText: {
        color: 'white',
        fontSize: '14@ms',
        fontWeight: 'bold',
        fontFamily: 'July-Bold',
    },
    itemText: {
        color: '#F3F4F6',
        fontSize: '13@ms',
        flex: 1,
        fontFamily: 'July-Regular',
    },
});

export default ServiceAidScreen;
