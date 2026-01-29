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
                <View style={styles.imageContainer}>
                    <Image
                        source={{ uri: item.image }}
                        style={styles.image}
                        resizeMode="cover"
                    />
                    <View style={styles.textOverlay} />
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
            <View style={styles.paginationContainer}>
                {SLIDE_DATA.map((_, index) => (
                    <View
                        key={index.toString()}
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
        width: width,
        height: '180@vs',
        paddingHorizontal: '20@ms',
    },
    imageContainer: {
        borderRadius: '16@ms',
        overflow: 'hidden',
        height: '100%',
        backgroundColor: '#F3F4F6',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    textOverlay: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '40@vs',
        backgroundColor: 'rgba(0,0,0,0.3)',
    },
    paginationContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: '12@vs',
        gap: '8@ms',
    },
    dot: {
        width: '8@ms',
        height: '8@ms',
        borderRadius: '4@ms',
        backgroundColor: '#D1D5DB',
    },
    activeDot: {
        width: '24@ms',
        backgroundColor: '#009689',
    }
});

export default Slider;
