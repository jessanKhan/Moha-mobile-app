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
                className="flex-1 justify-end p-6"
                imageStyle={{ borderRadius: scale(24) }}
            >
                {/* <View className="bg-black/40 absolute inset-0 rounded-3xl" /> */}
                <Text className="text-white font-bold text-xl mb-1">{item.title}</Text>
                <Text className="text-white/90 text-xs">{item.subtitle}</Text>
            </ImageBackground>
        </View>
    );

    return (
        <View className="flex-1 bg-[#F8F9FA] dark:bg-black">
            <Header title="সংবাদ ও মিডিয়া" subtitle='সর্বশেষ খবর এবং আপডেট' showBackButton={true} />

            <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>

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

                    {/* Pagination Dots */}
                    {/* <View className="flex-row justify-center mt-3 space-x-2">
                        {carouselItems.map((_, index) => (
                            <View
                                key={index.toString()}
                                className={`rounded-full ${index === activeIndex ? 'bg-[#009689]' : 'bg-gray-300'
                                    }`}
                                style={[
                                    styles.dot,
                                    index === activeIndex ? styles.activeDot : null
                                ]}
                            />
                        ))}
                    </View> */}
                </View>

                {/* News Section Card */}
                <View className="mx-4 mb-8 bg-white dark:bg-zinc-900 rounded-3xl overflow-hidden shadow-sm border border-gray-100 dark:border-zinc-800">
                    <View className="bg-[#2563EB] flex-row items-center px-6 py-4">
                        <Newspaper size={moderateScale(20)} color="white" />
                        <Text className="text-white font-bold text-lg ml-3">খবর</Text>
                    </View>

                    <View className="px-6 py-2">
                        {newsItems.map((item, index) => (
                            <TouchableOpacity
                                key={item.id}
                                className={`py-4 ${index !== newsItems.length - 1 ? 'border-b border-gray-100 dark:border-zinc-800' : ''}`}
                            >
                                <Text className="text-gray-900 dark:text-gray-100 font-bold text-sm mb-2 leading-5">
                                    {item.title}
                                </Text>
                                <Text className="text-gray-500 dark:text-gray-400 text-xs leading-5 mb-3" numberOfLines={2}>
                                    {item.description}
                                </Text>
                                <View className="flex-row items-center">
                                    <Clock size={moderateScale(12)} color="#9CA3AF" />
                                    <Text className="text-gray-400 dark:text-gray-500 text-[10px] ml-1">{item.date}</Text>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>

                    <TouchableOpacity className="bg-[#2563EB] mx-6 mb-6 py-3 rounded-xl items-center justify-center">
                        <Text className="text-white font-bold text-sm">আরো ও দেখুন</Text>
                    </TouchableOpacity>
                </View>

                {/* Upcoming Events */}
                <View className="px-4 mb-12">
                    <Text className="text-gray-800 dark:text-gray-200 font-bold text-lg mb-4">আসন্ন কর্মসূচি</Text>
                    <View className="bg-[#E0F2F1] dark:bg-zinc-900/50 rounded-3xl p-6 border border-[#B2DFDB] dark:border-zinc-800">
                        {upcomingEvents.map((event, index) => (
                            <View
                                key={event.id}
                                className={`flex-row items-center justify-between ${index !== upcomingEvents.length - 1 ? 'mb-6 pb-6 border-b border-[#B2DFDB]/30 dark:border-zinc-800' : ''}`}
                            >
                                <View className="flex-row items-center flex-1">
                                    <View className="bg-[#00897B] p-2 rounded-xl mr-4">
                                        <Calendar size={moderateScale(20)} color="white" />
                                    </View>
                                    <View className="flex-1">
                                        <Text className="text-gray-800 dark:text-gray-200 font-bold text-sm mb-1">{event.title}</Text>
                                        <Text className="text-teal-600 dark:text-teal-400 font-medium text-xs">{event.date}</Text>
                                    </View>
                                </View>
                                <ChevronRight size={moderateScale(18)} color="#9CA3AF" />
                            </View>
                        ))}
                    </View>
                </View>

                {/* Hotline Bar */}
                <View className="px-4 pb-8">
                    <HotlineBanner />
                </View>

            </ScrollView>
        </View>
    );
};

const styles = ScaledSheet.create({
    carouselContainer: {
        paddingVertical: '16@vs'
    },
    slideItem: {
        width: width - scale(40),
        height: '180@vs',
        marginHorizontal: '20@s'
    },
    dot: {
        width: '8@s',
        height: '8@s'
    },
    activeDot: {
        width: '24@s'
    }
});

export default NewsMediaScreen;
