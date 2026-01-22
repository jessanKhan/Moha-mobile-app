import React, { useRef, useState, useEffect } from 'react';
import { View, FlatList, Image, Dimensions } from 'react-native';
import { ScaledSheet, scale, verticalScale } from 'react-native-size-matters';

const { width } = Dimensions.get('window');

const SLIDE_DATA = [
    {
        id: '1',
        // Using placeholder images that look somewhat relevant or just generic nature/people
        image: 'https://images.unsplash.com/photo-1576091160550-217358c7c8c9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        title: 'Human Trafficking Awareness'
    },
    {
        id: '2',
        image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        title: 'Community Support'
    },
    {
        id: '3',
        image: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        title: 'Safe Migration'
    },
];

const Slider = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const flatListRef = useRef<FlatList>(null);

    const onViewRef = useRef(({ viewableItems }: any) => {
        if (viewableItems.length > 0) {
            setActiveIndex(viewableItems[0].index);
        }
    });

    const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 });

    useEffect(() => {
        let interval = setInterval(() => {
            if (activeIndex === SLIDE_DATA.length - 1) {
                flatListRef.current?.scrollToIndex({ index: 0, animated: true });
            } else {
                flatListRef.current?.scrollToIndex({ index: activeIndex + 1, animated: true });
            }
        }, 4000);

        return () => clearInterval(interval);
    }, [activeIndex]);

    const renderItem = ({ item }: any) => {
        return (
            <View style={styles.slideItem}>
                <View className="rounded-2xl overflow-hidden h-full shadow-lg bg-gray-200">
                    <Image
                        source={{ uri: item.image }}
                        className="w-full h-full"
                        resizeMode="cover"
                    />
                    {/* Overlay Gradient could go here */}
                    <View className="absolute bottom-0 left-0 right-0 p-4 bg-black/40">
                        {/* Text if needed */}
                    </View>
                </View>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <FlatList
                ref={flatListRef}
                data={SLIDE_DATA}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                snapToAlignment="center"
                snapToInterval={width}
                decelerationRate="fast"
                onViewableItemsChanged={onViewRef.current}
                viewabilityConfig={viewConfigRef.current}
                contentContainerStyle={{ paddingHorizontal: 0 }}
            />

            {/* Pagination Dots */}
            <View className="flex-row justify-center mt-3 space-x-2">
                {SLIDE_DATA.map((_, index) => (
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
            </View>
        </View>
    );
};

const styles = ScaledSheet.create({
    container: {
        paddingVertical: '16@vs'
    },
    slideItem: {
        width: width - scale(40), // Combining mix of window width and scale is tricky in string syntax unless using simple calc or just leaving as inline/computed.
        // Since width depends on runtime dimension, we might keep inline or use a helper.
        // ScaledSheet doesn't solve window width subtraction easily.
        // We will keep 'width' logic in render but use 'height' and margins here if constant.
        // Actually, let's keep the dynamic width inline in renderItem but move others.
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

export default Slider;
