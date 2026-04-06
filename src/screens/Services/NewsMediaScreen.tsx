import React, { useRef, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { View, Text, ScrollView, ImageBackground, TouchableOpacity, FlatList, Dimensions, ActivityIndicator } from 'react-native';
import Header from '../../components/Header';
import { Newspaper, Calendar, Clock } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { moderateScale, scale, ScaledSheet } from 'react-native-size-matters';
import HotlineBanner from '../../components/HotlineBanner';
import { useQuery } from '@apollo/client/react';
import { NEWS_ALL_QUERY, GET_EVENTS_QUERY } from '../../api/queries';
import LinearGradient from 'react-native-linear-gradient';
import AppBackground from '../../components/AppBackground';

const { width } = Dimensions.get('window');

interface News {
    id: number;
    pageId?: number;
    category?: string;
    title?: string;
    titleBn?: string;
    subtitle?: string;
    subtitleBn?: string;
    date?: string;
    dateBn?: string;
    thumbnailUrl?: string;
}

interface NewsData {
    newsAll: News[];
}

interface Event {
    id: number;
    title: string;
    titleBn?: string;
    fromDate: string;
    fromDateBn?: string;
}

interface EventsData {
    events: Event[];
}

const NewsMediaScreen = () => {
    const languageMode = useSelector((state: RootState) => state.language.mode);
    const navigation = useNavigation<any>();
    const [activeIndex, setActiveIndex] = useState(0);
    const flatListRef = useRef<FlatList>(null);

    const [limit, setLimit] = useState(10);

    const { data, loading, error } = useQuery<NewsData>(NEWS_ALL_QUERY, {
        variables: { page: 1, limit },
        fetchPolicy: 'cache-and-network',
    });

    const handleViewMore = () => {
        setLimit(prev => prev + 10);
    };

    const [eventsLimit, setEventsLimit] = useState(10);

    const { data: eventsData, loading: eventsLoading } = useQuery<EventsData>(GET_EVENTS_QUERY, {
        variables: { page: 1, limit: eventsLimit },
        fetchPolicy: 'cache-and-network',
    });

    const handleViewMoreEvents = () => {
        setEventsLimit(prev => prev + 10);
    };

    const onViewRef = useRef(({ viewableItems }: any) => {
        if (viewableItems.length > 0) {
            setActiveIndex(viewableItems[0].index);
        }
    });

    const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 });

    useEffect(() => {
        const itemsCount = data?.newsAll?.length || 0;
        if (itemsCount <= 1) return;

        let interval = setInterval(() => {
            if (activeIndex === itemsCount - 1) {
                flatListRef.current?.scrollToIndex({ index: 0, animated: true });
            } else {
                flatListRef.current?.scrollToIndex({ index: activeIndex + 1, animated: true });
            }
        }, 4000);

        return () => clearInterval(interval);
    }, [activeIndex, data?.newsAll]);



    const renderCarouselItem = ({ item }: { item: News }) => (
        <TouchableOpacity
            activeOpacity={0.9}
            style={styles.slideItem}
            onPress={() => navigation.navigate('NewsDetails', { item })}
        >
            <ImageBackground
                source={{ uri: item.thumbnailUrl }}
                style={styles.slideImage}
                imageStyle={{ borderRadius: scale(20) }}
            >
                <View style={styles.slideOverlay}>
                    <Text style={styles.slideTitle}>
                        {languageMode === 'en' ? (item.title || '') : (item.titleBn || '')}
                    </Text>
                </View>
            </ImageBackground>
        </TouchableOpacity>
    );

    return (
        <AppBackground>
            <Header
                title={languageMode === 'en' ? "News & Media" : "সংবাদ ও মিডিয়া"}
                subtitle={languageMode === 'en' ? "Latest News and Updates" : 'সর্বশেষ খবর এবং আপডেট'}
                showBackButton={true}
            />

            <ScrollView style={styles.flex1} showsVerticalScrollIndicator={false}>

                <View style={styles.carouselContainer}>
                    <FlatList
                        ref={flatListRef}
                        data={data?.newsAll || []}
                        renderItem={renderCarouselItem}
                        keyExtractor={(item) => item.id.toString()}
                        horizontal
                        pagingEnabled
                        showsHorizontalScrollIndicator={false}
                        snapToAlignment="center"
                        snapToInterval={width}
                        decelerationRate="fast"
                        onViewableItemsChanged={onViewRef.current}
                        viewabilityConfig={viewConfigRef.current}
                    />
                </View>

                <View style={styles.newsCard}>
                    <LinearGradient
                        colors={['#155DFC', '#1447E6']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.newsHeader}
                    >
                        <View style={styles.flexRow}>
                            <Newspaper size={moderateScale(20)} color="white" />
                            <Text style={styles.newsHeaderText}>{languageMode === 'en' ? "News" : "খবর"}</Text>
                        </View>
                    </LinearGradient>

                    <View style={styles.newsList}>
                        {loading ? (
                            <View style={styles.centerContent}>
                                <Text style={styles.statusText}>{languageMode === 'en' ? "Loading..." : "লোড হচ্ছে..."}</Text>
                            </View>
                        ) : error ? (
                            <View style={styles.centerContent}>
                                <Text style={[styles.statusText, { color: '#EF4444' }]}>
                                    {languageMode === 'en' ? "Oops! Could not load news." : "উহ! খবর লোড করা সম্ভব হয়নি।"}
                                </Text>
                            </View>
                        ) : data?.newsAll && data.newsAll.length > 0 ? (
                            data.newsAll.map((item, index) => (
                                <TouchableOpacity
                                    key={item.id}
                                    style={[styles.newsItem, index !== data.newsAll.length - 1 && styles.borderBottom]}
                                    onPress={() => navigation.navigate('NewsDetails', { item })}
                                >
                                    <View style={styles.newsItemContent}>
                                        <View style={styles.newsTextContent}>
                                            <Text style={styles.newsItemTitle} numberOfLines={2}>
                                                {languageMode === 'en' ? item.title : item.titleBn}
                                            </Text>
                                            <Text style={styles.newsItemDesc} numberOfLines={2}>
                                                {languageMode === 'en' ? item.subtitle : item.subtitleBn}
                                            </Text>
                                            <View style={styles.dateWrapper}>
                                                <Clock size={moderateScale(12)} color="#9CA3AF" />
                                                <Text style={styles.dateText}>
                                                    {languageMode === 'en' ? (item.date ? new Date(item.date).toLocaleDateString() : '') : (item.dateBn || (item.date ? new Date(item.date).toLocaleDateString() : ''))}
                                                </Text>
                                            </View>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            ))
                        ) : (
                            <View style={styles.centerContent}>
                                <Text style={styles.statusText}>{languageMode === 'en' ? "No news found." : "কোনো খবর পাওয়া যায়নি।"}</Text>
                            </View>
                        )}
                    </View>

                    {data?.newsAll && data.newsAll.length >= limit && (
                        <TouchableOpacity
                            activeOpacity={0.8}
                            style={styles.viewMoreBtnContainer}
                            onPress={handleViewMore}
                            disabled={loading}
                        >
                            <LinearGradient
                                colors={['#155DFC', '#1447E6']}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                style={styles.viewMoreBtn}
                            >
                                {loading && data?.newsAll && data.newsAll.length > 0 ? (
                                    <ActivityIndicator size="small" color="#fff" />
                                ) : (
                                    <Text style={styles.viewMoreText}>{languageMode === 'en' ? "View More" : "আরো দেখুন"}</Text>
                                )}
                            </LinearGradient>
                        </TouchableOpacity>
                    )}
                </View>

                <View style={styles.eventsSection}>
                    <Text style={styles.sectionTitle}>{languageMode === 'en' ? "Upcoming Events" : "আসন্ন কর্মসূচি"}</Text>
                    <LinearGradient
                        colors={['#F0FDFA', '#EFF6FF']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.eventsList}
                    >
                        {eventsLoading ? (
                            <View style={styles.centerContent}>
                                <Text style={styles.statusText}>{languageMode === 'en' ? "Loading..." : "লোড হচ্ছে..."}</Text>
                            </View>
                        ) : eventsData?.events && eventsData.events.length > 0 ? (
                            eventsData.events.map((event, index) => (
                                <View
                                    key={event.id}
                                    style={[styles.eventItem, index !== eventsData.events.length - 1 && styles.eventBorder]}
                                >
                                    <View style={styles.eventInfo}>
                                        <View style={styles.eventIconWrapper}>
                                            <Calendar size={moderateScale(20)} color="white" />
                                        </View>
                                        <View style={styles.flex1}>
                                            <Text style={styles.eventTitle}>{languageMode === 'en' ? event.title : (event.titleBn || event.title)}</Text>
                                            <Text style={styles.eventDate}>
                                                {languageMode === 'en' ? (event.fromDate ? new Date(event.fromDate).toLocaleDateString() : '') : (event.fromDateBn || (event.fromDateBn ? new Date(event.fromDateBn).toLocaleDateString() : ''))}
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                            ))
                        ) : (
                            <View style={styles.centerContent}>
                                <Text style={styles.statusText}>{languageMode === 'en' ? "No events found." : "কোনো কর্মসূচি পাওয়া যায়নি।"}</Text>
                            </View>
                        )}
                    </LinearGradient>
                    {eventsData?.events && eventsData.events.length >= eventsLimit && (
                        <TouchableOpacity
                            activeOpacity={0.8}
                            style={[styles.viewMoreBtnContainer, { marginHorizontal: 0, marginTop: moderateScale(16), marginBottom: 0 }]}
                            onPress={handleViewMoreEvents}
                            disabled={eventsLoading}
                        >
                            <LinearGradient
                                colors={['#009689', '#00786F']}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                style={styles.viewMoreBtn}
                            >
                                {eventsLoading && eventsData?.events && eventsData.events.length > 0 ? (
                                    <ActivityIndicator size="small" color="#fff" />
                                ) : (
                                    <Text style={styles.viewMoreText}>{languageMode === 'en' ? "View More" : "আরো দেখুন"}</Text>
                                )}
                            </LinearGradient>
                        </TouchableOpacity>
                    )}
                </View>

                <View style={styles.footerHotline}>
                    <HotlineBanner />
                </View>

            </ScrollView>
        </AppBackground>
    );
};

const styles = ScaledSheet.create({
    flex1: {
        flex: 1,
    },
    carouselContainer: {
        paddingVertical: '16@vs',
    },
    slideItem: {
        width: width,
        height: '180@vs',
        paddingHorizontal: '16@ms',
    },
    slideImage: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    slideOverlay: {
        backgroundColor: 'rgba(0,0,0,0.3)',
        padding: '16@ms',
        borderRadius: '26@ms',
        justifyContent: 'flex-end',
        height: '100%',
    },
    slideTitle: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: '18@ms',
        marginBottom: '4@vs',
        fontFamily: 'July-Bold',
    },
    slideSubtitle: {
        color: 'rgba(255, 255, 255, 0.9)',
        fontSize: '12@ms',
        fontFamily: 'July-Regular',
    },
    newsCard: {
        marginHorizontal: '16@ms',
        marginBottom: '24@vs',
        backgroundColor: 'white',
        borderRadius: '24@ms',
        overflow: 'hidden',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
    },
    newsHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: '20@ms',
        paddingVertical: '12@vs',
    },
    flexRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    newsHeaderText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: '18@ms',
        marginLeft: '12@ms',
        fontFamily: 'July-Bold',
    },
    centerContent: {
        paddingVertical: '32@vs',
        alignItems: 'center',
        justifyContent: 'center',
    },
    statusText: {
        fontSize: '14@ms',
        fontFamily: 'July-Regular',
        color: '#6B7280',
    },
    newsList: {
        paddingHorizontal: '20@ms',
        paddingVertical: '8@vs',
    },
    newsItem: {
        paddingVertical: '16@vs',
    },
    newsItemContent: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: '12@ms',
    },
    newsTextContent: {
        flex: 1,
    },
    borderBottom: {
        borderBottomWidth: 1,
        borderBottomColor: '#F3F4F6',
    },
    newsItemTitle: {
        color: '#111827',
        fontWeight: 'bold',
        fontSize: '14@ms',
        marginBottom: '4@vs',
        lineHeight: '20@ms',
        fontFamily: 'July-Bold',
    },
    newsItemDesc: {
        color: '#6B7280',
        fontSize: '12@ms',
        lineHeight: '18@ms',
        marginBottom: '8@vs',
        fontFamily: 'July-Regular',
    },
    dateWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    dateText: {
        color: '#9CA3AF',
        fontSize: '10@ms',
        marginLeft: '4@ms',
        fontFamily: 'July-Regular',
    },
    viewMoreBtnContainer: {
        marginHorizontal: '20@ms',
        marginBottom: '20@vs',
        borderRadius: '25@ms',
        overflow: 'hidden',
    },
    viewMoreBtn: {
        paddingVertical: '12@vs',
        alignItems: 'center',
        justifyContent: 'center',
    },
    viewMoreText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: '14@ms',
        fontFamily: 'July-Bold',
    },
    eventsSection: {
        paddingHorizontal: '16@ms',
        marginBottom: '32@vs',
    },
    sectionTitle: {
        color: '#1F2937',
        fontWeight: 'bold',
        fontSize: '18@ms',
        marginBottom: '16@vs',
        fontFamily: 'July-Bold',
    },
    eventsList: {
        borderRadius: '24@ms',
        padding: '24@ms',
        borderWidth: 2,
        borderColor: '#8beedaff',
    },
    eventItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    eventBorder: {
        marginBottom: '20@vs',
        paddingBottom: '20@vs',
        borderBottomWidth: 2,
        borderBottomColor: '#8beedaff',
    },
    eventInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    eventIconWrapper: {
        backgroundColor: '#009689',
        padding: '8@ms',
        borderRadius: '12@ms',
        marginRight: '16@ms',
    },
    eventTitle: {
        color: '#0B4F4A',
        fontWeight: '600',
        fontSize: '14@ms',
        marginBottom: '4@vs',
        fontFamily: 'July-Regular',
    },
    eventDate: {
        color: '#00786F',
        fontWeight: '300',
        fontSize: '12@ms',
        fontFamily: 'July-Regular',
    },
    footerHotline: {
        paddingHorizontal: '16@ms',
        paddingBottom: '32@vs',
    },
});

export default NewsMediaScreen;
