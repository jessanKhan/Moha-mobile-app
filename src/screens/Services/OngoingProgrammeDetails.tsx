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

const OngoingProgrammeDetails = () => {
    const route = useRoute<any>();
    const { item } = route.params || {};
    const languageMode = useSelector((state: RootState) => state.language.mode);

    if (!item) {
        return (
            <AppBackground>
                <Header
                    title={languageMode === 'en' ? 'Programme Details' : 'প্রোগ্রাম বিবরণ'}
                    subtitle={languageMode === 'en' ? 'Human trafficking prevention initiatives' : 'মানব পাচার প্রতিরোধে উদ্যোগ'}
                    showBackButton={true}
                />
                <View style={styles.centerContent}>
                    <Text style={styles.errorText}>
                        {languageMode === 'en' ? 'Details not found' : 'বিবরণ পাওয়া যায়নি'}
                    </Text>
                </View>
            </AppBackground>
        );
    }

    const title = languageMode === 'en' ? item.title : (item.titleBn || item.title);
    const description = languageMode === 'en' ? item.description : (item.descriptionBn || item.description);

    // Dates formatting
    const fromDateStr = languageMode === 'en'
        ? (item.fromDate ? new Date(item.fromDate).toLocaleDateString() : '')
        : (item.fromDateBn || (item.fromDate ? new Date(item.fromDate).toLocaleDateString() : ''));

    const toDateStr = languageMode === 'en'
        ? (item.toDate ? new Date(item.toDate).toLocaleDateString() : '')
        : (item.toDateBn || (item.toDate ? new Date(item.toDate).toLocaleDateString() : ''));

    const duration = `${fromDateStr} - ${toDateStr}`;
    const location = languageMode === 'en' ? item.location : (item.locationBn || item.location);

    const thumbnail = item.thumbnail || (item.photos && item.photos.length > 0 ? item.photos[0].url : 'https://via.placeholder.com/600x400');

    const renderRichText = (html: string) => {
        if (!html) return null;
        let cleanHtml = html.replace(/<p>\s*<strong>(.*?)<\/strong>\s*<\/p>/g, '<h3>$1</h3>');
        cleanHtml = cleanHtml.replace(/<strong>(.*?)<\/strong>/g, '<h3>$1</h3>');

        const parts = cleanHtml.split(/(<h3>.*?<\/h3>)/g);

        return parts.map((part, index) => {
            if (part.startsWith('<h3>') && part.endsWith('</h3>')) {
                const text = part.replace(/<\/?h3>/g, '');
                return <Text key={index} style={styles.boldHeading}>{text}</Text>;
            } else {
                const text = part
                    .replace(/<p[^>]*>/g, '')
                    .replace(/<\/p>/g, '\n\n')
                    .replace(/<li>/g, '• ')
                    .replace(/<\/li>/g, '\n')
                    .replace(/<br\s*\/?>/g, '\n')
                    .replace(/&nbsp;/g, ' ')
                    .replace(/<[^>]*>?/gm, '')
                    .trim();
                if (!text) return null;
                return <Text key={index} style={styles.descriptionText}>{text}{'\n\n'}</Text>;
            }
        });
    };

    return (
        <AppBackground>
            <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
            <Header
                title={languageMode === 'en' ? 'Programme Details' : 'প্রোগ্রাম বিবরণ'}
                subtitle={languageMode === 'en' ? 'Human trafficking prevention initiatives' : 'মানব পাচার প্রতিরোধে উদ্যোগ'}
                showBackButton={true}
            />

            <ScrollView
                style={styles.scrollContainer}
                showsVerticalScrollIndicator={false}
            >
                {thumbnail && (
                    <View style={styles.imageContainer}>
                        <Image
                            source={{ uri: thumbnail }}
                            style={styles.coverImage}
                            resizeMode="cover"
                        />
                    </View>
                )}

                <View style={styles.contentWrapper}>
                    <Text style={styles.newsTitle}>{title}</Text>

                    <View style={styles.durationBlock}>
                        <Text style={styles.blockTitle}>{languageMode === 'en' ? 'Project Duration' : 'প্রকল্পের মেয়াদ'}</Text>
                        <Text style={styles.blockText}>{duration}</Text>
                    </View>

                    <View style={styles.locationBlock}>
                        <Text style={styles.blockTitle}>{languageMode === 'en' ? 'Project Location' : 'প্রকল্পের অবস্থান'}</Text>
                        <Text style={styles.blockText}>{location}</Text>
                    </View>

                    <View style={styles.descriptionContainer}>
                        {renderRichText(description)}
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
    imageContainer: {
        width: '95%',
        height: '220@vs',
        backgroundColor: '#F3F4F6',
        borderRadius: '16@ms',
        overflow: 'hidden',
        marginBottom: '16@vs',
        marginTop: '16@vs',
        marginHorizontal: '16@ms',
        alignSelf: 'center',
    },
    coverImage: {
        width: '100%',
        height: '100%',
    },
    contentWrapper: {
        paddingHorizontal: '20@ms',
        paddingTop: '8@vs',
    },
    newsTitle: {
        fontSize: '18@ms',
        fontWeight: 'bold',
        color: '#111827',
        lineHeight: '28@ms',
        fontFamily: 'July-Bold',
        marginBottom: '20@vs',
    },
    durationBlock: {
        backgroundColor: '#26627C',
        padding: '16@ms',
        borderRadius: '8@ms',
        marginBottom: '12@vs',
    },
    locationBlock: {
        backgroundColor: '#A05E03',
        padding: '16@ms',
        borderRadius: '8@ms',
        marginBottom: '24@vs',
    },
    blockTitle: {
        color: '#FFFFFF',
        fontSize: '14@ms',
        fontWeight: 'bold',
        fontFamily: 'July-Bold',
        marginBottom: '4@vs',
    },
    blockText: {
        color: '#FFFFFF',
        fontSize: '12@ms',
        fontFamily: 'July-Regular',
        opacity: 0.9,
    },
    descriptionContainer: {
        marginBottom: '20@vs',
    },
    boldHeading: {
        fontSize: '16@ms',
        fontWeight: 'bold',
        color: '#111827',
        fontFamily: 'July-Bold',
        marginTop: '8@vs',
        marginBottom: '8@vs',
    },
    descriptionText: {
        fontSize: '14@ms',
        color: '#374151',
        lineHeight: '24@ms',
        fontFamily: 'July-Regular',
        textAlign: 'justify',
    },
});

export default OngoingProgrammeDetails;
