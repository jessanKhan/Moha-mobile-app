import React, { useRef, useState, useEffect } from 'react';
import { View, FlatList, Image, Dimensions, StyleSheet } from 'react-native';

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
            <View style={{ width: width - 40, height: 180, marginHorizontal: 20 }}>
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
        <View className="py-4">
            <FlatList
                ref={flatListRef}
                data={SLIDE_DATA}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                snapToAlignment="center"
                snapToInterval={width} // Actually with margin it's tricky, let's just make it full width or adjusted
                // To make a nice card slider with peek, we often use snapToInterval = cardWidth + margin
                // But for simplicity let's do single item paging
                decelerationRate="fast"
                onViewableItemsChanged={onViewRef.current}
                viewabilityConfig={viewConfigRef.current}
                contentContainerStyle={{ paddingHorizontal: 0 }} // We want centered items
            />

            {/* Pagination Dots */}
            <View className="flex-row justify-center mt-3 space-x-2">
                {SLIDE_DATA.map((_, index) => (
                    <View
                        key={index.toString()}
                        className={`h-2 rounded-full ${index === activeIndex ? 'w-6 bg-[#009689]' : 'w-2 bg-gray-300'
                            }`}
                    />
                ))}
            </View>
        </View>
    );
};

export default Slider;
