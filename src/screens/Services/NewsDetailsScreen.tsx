import React from 'react';
import {
    View,
    Text,
    ScrollView,
    StatusBar,
    Image,
} from 'react-native';
import { moderateScale, ScaledSheet, verticalScale } from 'react-native-size-matters';
import Header from '../../components/Header';
import AppBackground from '../../components/AppBackground';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { useRoute } from '@react-navigation/native';
import { Calendar } from 'lucide-react-native';

const NewsDetailsScreen = () => {
    const route = useRoute<any>();
    const { item: newsItem } = route.params || {};
    const languageMode = useSelector((state: RootState) => state.language.mode);

    const stripHtml = (html: string) => {
        if (!html) return '';
        return html
            .replace(/<p[^>]*>/g, '')
            .replace(/<\/p>/g, '\n\n')
            .replace(/<li>/g, '• ')
            .replace(/<\/li>/g, '\n')
            .replace(/<br\s*\/?>/g, '\n')
            .replace(/&nbsp;/g, ' ')
            .replace(/<[^>]*>?/gm, '')
            .replace(/\n{3,}/g, '\n\n')
            .trim();
    };

    if (!newsItem) {
        return (
            <AppBackground>
                <Header
                    title={languageMode === 'en' ? 'News Details' : 'সংবাদ বিবরণ'}
                    subtitle={languageMode === 'en' ? 'Latest News and Updates' : 'সর্বশেষ খবর এবং আপডেট'}
                    showBackButton={true}
                />
                <View style={styles.centerContent}>
                    <Text style={styles.errorText}>
                        {languageMode === 'en' ? 'News not found' : 'সংবাদ পাওয়া যায়নি'}
                    </Text>
                </View>
            </AppBackground>
        );
    }

    const getCategoryLabel = (cat: string) => {
        if (!cat) return languageMode === 'en' ? 'News' : 'সংবাদ';
        
        const catMap: { [key: string]: { en: string; bn: string } } = {
            'News': { en: 'News', bn: 'সংবাদ' },
            'Update': { en: 'Update', bn: 'আপডেট' },
            'Campaign': { en: 'Campaign', bn: 'ক্যাম্পেইন' },
            'Assembly': { en: 'Assembly', bn: 'অ্যাসেম্বলি' },
        };

        const normalizedCat = cat.charAt(0).toUpperCase() + cat.slice(1).toLowerCase();
        return catMap[normalizedCat] ? (languageMode === 'en' ? catMap[normalizedCat].en : catMap[normalizedCat].bn) : cat;
    };

    const title = languageMode === 'en' ? newsItem?.title : newsItem?.titleBn;
    const category = getCategoryLabel(newsItem?.category);
    const date = languageMode === 'en' ? (newsItem?.date ? new Date(newsItem.date).toLocaleDateString() : '') : (newsItem?.dateBn || (newsItem?.date ? new Date(newsItem.date).toLocaleDateString() : ''));
    const description = languageMode === 'en' ? newsItem?.description : newsItem?.descriptionBn;

    return (
        <AppBackground>
            <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
            <Header
                title={languageMode === 'en' ? 'News Details' : 'সংবাদ বিবরণ'}
                subtitle={languageMode === 'en' ? 'Latest News and Updates' : 'সর্বশেষ খবর এবং আপডেট'}
                showBackButton={true}
            />

            <ScrollView
                style={styles.scrollContainer}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.contentWrapper}>
                    <Text style={styles.newsTitle}>{title}</Text>

                    <View style={styles.metaContainer}>
                        {category && (
                            <View style={styles.categoryBadge}>
                                <Text style={styles.categoryText}>{category}</Text>
                            </View>
                        )}
                        <View style={styles.dateContainer}>
                            <Calendar size={moderateScale(16)} color="#6B7280" />
                            <Text style={styles.dateText}>{date}</Text>
                        </View>
                    </View>

                    {newsItem?.thumbnailUrl && (
                        <View style={styles.imageContainer}>
                            <Image
                                source={{ uri: newsItem.thumbnailUrl }}
                                style={styles.newsImage}
                                resizeMode="cover"
                            />
                        </View>
                    )}

                    <View style={styles.descriptionContainer}>
                        <Text style={styles.descriptionText}>
                            {stripHtml(description)}
                        </Text>
                    </View>
                </View>
                <View style={{ height: verticalScale(40) }} />
            </ScrollView>
        </AppBackground>
    );
};

const styles = ScaledSheet.create({
    scrollContainer: {
        flex: 1,
    },
    centerContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        fontSize: '16@ms',
        color: '#6B7280',
        fontFamily: 'July-Regular',
    },
    contentWrapper: {
        paddingHorizontal: '20@ms',
        paddingTop: '20@vs',
    },
    newsTitle: {
        fontSize: '20@ms',
        fontWeight: 'bold',
        color: '#111827',
        lineHeight: '30@ms',
        fontFamily: 'July-Bold',
        marginBottom: '16@vs',
    },
    metaContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: '20@vs',
        gap: '16@ms',
    },
    categoryBadge: {
        backgroundColor: '#E0F2FE',
        paddingHorizontal: '12@ms',
        paddingVertical: '4@vs',
        borderRadius: '8@ms',
    },
    categoryText: {
        color: '#0369A1',
        fontSize: '12@ms',
        fontWeight: '600',
        fontFamily: 'July-Bold',
    },
    dateContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: '6@ms',
    },
    dateText: {
        color: '#6B7280',
        fontSize: '13@ms',
        fontFamily: 'July-Regular',
    },
    imageContainer: {
        width: '100%',
        height: '200@vs',
        borderRadius: '16@ms',
        overflow: 'hidden',
        marginBottom: '20@vs',
        backgroundColor: '#F3F4F6',
    },
    newsImage: {
        width: '100%',
        height: '100%',
    },
    descriptionContainer: {
        marginBottom: '20@vs',
    },
    descriptionText: {
        fontSize: '15@ms',
        color: '#374151',
        lineHeight: '26@ms',
        fontFamily: 'July-Regular',
        textAlign: 'justify',
    },
});

export default NewsDetailsScreen;
