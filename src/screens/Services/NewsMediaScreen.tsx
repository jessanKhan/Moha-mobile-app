import React, { useRef, useState, useEffect } from 'react';
import { View, Text, ScrollView, ImageBackground, TouchableOpacity, Image, FlatList, Dimensions } from 'react-native';
import Header from '../../components/Header';
import { Newspaper, Calendar, ChevronRight, Clock } from 'lucide-react-native';
import { moderateScale, scale, verticalScale, ScaledSheet } from 'react-native-size-matters';
import HotlineBanner from '../../components/HotlineBanner';

const { width } = Dimensions.get('window');

const NewsMediaScreen = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const flatListRef = useRef<FlatList>(null);

    const carouselItems = [
        {
            id: '1',
            title: "নিরাপদ সমাজ গড়তে একসাথে",
            subtitle: "মানব পাচার প্রতিরোধে সচেতন থাকুন",
            image: "https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?q=80&w=800&auto=format&fit=crop"
        },
        {
            id: '2',
            title: "নিরাপদ সমাজ গড়তে একসাথে",
            subtitle: "মানব পাচার প্রতিরোধে সচেতন থাকুন",
            image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=800&auto=format&fit=crop"
        }
    ];

    const onViewRef = useRef(({ viewableItems }: any) => {
        if (viewableItems.length > 0) {
            setActiveIndex(viewableItems[0].index);
        }
    });

    const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 });

    useEffect(() => {
        let interval = setInterval(() => {
            if (activeIndex === carouselItems.length - 1) {
                flatListRef.current?.scrollToIndex({ index: 0, animated: true });
            } else {
                flatListRef.current?.scrollToIndex({ index: activeIndex + 1, animated: true });
            }
        }, 4000);

        return () => clearInterval(interval);
    }, [activeIndex]);

    const newsItems = [
        {
            id: 1,
            title: "ঢাকায় মানব পাচার চক্র ভাঙচুর, ১৫ জন গ্রেপ্তার",
            description: "র‍্যাবের অভিযানে রাজধানীর বিভিন্ন এলাকা থেকে মানব পাচার চক্রের সদস্যদের গ্রেপ্তার করা হয়েছে।",
            date: "১৫ ডিসেম্বর, ২০২৫"
        },
        {
            id: 2,
            title: "বিমানবন্দর থেকে বিদেশে পাচারের চেষ্টা, উদ্ধার ৩ কিশোরী",
            description: "হযরত শাহজালাল আন্তর্জাতিক বিমানবন্দর থেকে পাচারের সময় তিন কিশোরীকে উদ্ধার করেছে আইন-শৃঙ্খলা বাহিনী।",
            date: "১৪ ডিসেম্বর, ২০২৫"
        },
        {
            id: 3,
            title: "ভুয়া চাকরির প্রলোভনে মানব পাচার, আটক ৭ দালাল",
            description: "বিদেশে চাকরির মিথ্যা আশ্বাস দিয়ে পাচারের অভিযোগে ৭ জন দালালকে গ্রেপ্তার করেছে পুলিশ।",
            date: "১২ ডিসেম্বর, ২০২৫"
        },
        {
            id: 4,
            title: "মানব পাচার প্রতিরোধে নতুন হটলাইন চালু করল সরকার",
            description: "মানব পাচার সংক্রান্ত অভিযোগ দ্রুত গ্রহণের জন্য সরকার নতুন একটি বিশেষ হটলাইন নম্বর চালু করেছে।",
            date: "১১ ডিসেম্বর, ২০২৫"
        }
    ];

    const upcomingEvents = [
        { id: 1, title: "জাতীয় মানব পাচার প্রতিরোধ দিবস", date: "৩০ জানুয়ারি" },
        { id: 2, title: "সচেতনতা সেমিনার - ঢাকা বিশ্ববিদ্যালয়", date: "৫ ফেব্রুয়ারি" },
        { id: 3, title: "আইনজীবী প্রশিক্ষণ কর্মশালা", date: "১২ ফেব্রুয়ারি" }
    ];

    const renderCarouselItem = ({ item }: any) => (
        <View style={styles.slideItem}>
            <ImageBackground
                source={{ uri: item.image }}
                style={styles.slideImage}
                imageStyle={{ borderRadius: scale(20) }}
            >
                <View style={styles.slideOverlay}>
                    <Text style={styles.slideTitle}>{item.title}</Text>
                    <Text style={styles.slideSubtitle}>{item.subtitle}</Text>
                </View>
            </ImageBackground>
        </View>
    );

    return (
        <View style={styles.container}>
            <Header title="সংবাদ ও মিডিয়া" subtitle='সর্বশেষ খবর এবং আপডেট' showBackButton={true} />

            <ScrollView style={styles.flex1} showsVerticalScrollIndicator={false}>

                {/* Refactored Carousel (Paging) */}
                <View style={styles.carouselContainer}>
                    <FlatList
                        ref={flatListRef}
                        data={carouselItems}
                        renderItem={renderCarouselItem}
                        keyExtractor={(item) => item.id}
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

                {/* News Section Card */}
                <View style={styles.newsCard}>
                    <View style={styles.newsHeader}>
                        <Newspaper size={moderateScale(20)} color="white" />
                        <Text style={styles.newsHeaderText}>খবর</Text>
                    </View>

                    <View style={styles.newsList}>
                        {newsItems.map((item, index) => (
                            <TouchableOpacity
                                key={item.id}
                                style={[styles.newsItem, index !== newsItems.length - 1 && styles.borderBottom]}
                            >
                                <Text style={styles.newsItemTitle}>
                                    {item.title}
                                </Text>
                                <Text style={styles.newsItemDesc} numberOfLines={2}>
                                    {item.description}
                                </Text>
                                <View style={styles.dateWrapper}>
                                    <Clock size={moderateScale(12)} color="#9CA3AF" />
                                    <Text style={styles.dateText}>{item.date}</Text>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>

                    <TouchableOpacity activeOpacity={0.8} style={styles.viewMoreBtn}>
                        <Text style={styles.viewMoreText}>আরো ও দেখুন</Text>
                    </TouchableOpacity>
                </View>

                {/* Upcoming Events */}
                <View style={styles.eventsSection}>
                    <Text style={styles.sectionTitle}>আসন্ন কর্মসূচি</Text>
                    <View style={styles.eventsList}>
                        {upcomingEvents.map((event, index) => (
                            <View
                                key={event.id}
                                style={[styles.eventItem, index !== upcomingEvents.length - 1 && styles.eventBorder]}
                            >
                                <View style={styles.eventInfo}>
                                    <View style={styles.eventIconWrapper}>
                                        <Calendar size={moderateScale(20)} color="white" />
                                    </View>
                                    <View style={styles.flex1}>
                                        <Text style={styles.eventTitle}>{event.title}</Text>
                                        <Text style={styles.eventDate}>{event.date}</Text>
                                    </View>
                                </View>
                                <ChevronRight size={moderateScale(18)} color="#9CA3AF" />
                            </View>
                        ))}
                    </View>
                </View>

                {/* Hotline Bar */}
                <View style={styles.footerHotline}>
                    <HotlineBanner />
                </View>

            </ScrollView>
        </View>
    );
};

const styles = ScaledSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FA',
    },
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
        borderRadius: '20@ms',
        justifyContent: 'flex-end',
        height: '100%',
    },
    slideTitle: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: '18@ms',
        marginBottom: '4@vs',
    },
    slideSubtitle: {
        color: 'rgba(255, 255, 255, 0.9)',
        fontSize: '12@ms',
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
        backgroundColor: '#2563EB',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: '20@ms',
        paddingVertical: '12@vs',
    },
    newsHeaderText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: '18@ms',
        marginLeft: '12@ms',
    },
    newsList: {
        paddingHorizontal: '20@ms',
        paddingVertical: '8@vs',
    },
    newsItem: {
        paddingVertical: '16@vs',
    },
    borderBottom: {
        borderBottomWidth: 1,
        borderBottomColor: '#F3F4F6',
    },
    newsItemTitle: {
        color: '#111827',
        fontWeight: 'bold',
        fontSize: '14@ms',
        marginBottom: '8@vs',
        lineHeight: '20@ms',
    },
    newsItemDesc: {
        color: '#6B7280',
        fontSize: '12@ms',
        lineHeight: '18@ms',
        marginBottom: '12@vs',
    },
    dateWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    dateText: {
        color: '#9CA3AF',
        fontSize: '10@ms',
        marginLeft: '4@ms',
    },
    viewMoreBtn: {
        backgroundColor: '#2563EB',
        marginHorizontal: '20@ms',
        marginBottom: '20@vs',
        paddingVertical: '12@vs',
        borderRadius: '12@ms',
        alignItems: 'center',
        justifyContent: 'center',
    },
    viewMoreText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: '14@ms',
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
    },
    eventsList: {
        backgroundColor: '#E0F2F1',
        borderRadius: '24@ms',
        padding: '24@ms',
        borderWidth: 1,
        borderColor: '#B2DFDB',
    },
    eventItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    eventBorder: {
        marginBottom: '20@vs',
        paddingBottom: '20@vs',
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(178, 223, 219, 0.5)',
    },
    eventInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    eventIconWrapper: {
        backgroundColor: '#00897B',
        padding: '8@ms',
        borderRadius: '12@ms',
        marginRight: '16@ms',
    },
    eventTitle: {
        color: '#1F2937',
        fontWeight: 'bold',
        fontSize: '14@ms',
        marginBottom: '4@vs',
    },
    eventDate: {
        color: '#00897B',
        fontWeight: '500',
        fontSize: '12@ms',
    },
    footerHotline: {
        paddingHorizontal: '16@ms',
        paddingBottom: '32@vs',
    },
});

export default NewsMediaScreen;
