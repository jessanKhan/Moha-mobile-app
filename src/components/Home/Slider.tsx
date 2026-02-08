import React, { useRef, useState, useEffect } from 'react';
import { View, FlatList, Image, Dimensions, Text } from 'react-native';
import { ScaledSheet, scale, verticalScale } from 'react-native-size-matters';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

const { width } = Dimensions.get('window');

interface SliderProps {
    sliders?: any[];
}

const Slider = ({ sliders = [] }: SliderProps) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const flatListRef = useRef<FlatList>(null);
    const languageMode = useSelector((state: RootState) => state.language.mode);

    const onViewRef = useRef(({ viewableItems }: any) => {
        if (viewableItems.length > 0) {
            setActiveIndex(viewableItems[0].index);
        }
    });

    const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 });

    useEffect(() => {
        if (sliders.length === 0) return;

        let interval = setInterval(() => {
            if (activeIndex === sliders.length - 1) {
                flatListRef.current?.scrollToIndex({ index: 0, animated: true });
            } else {
                flatListRef.current?.scrollToIndex({ index: activeIndex + 1, animated: true });
            }
        }, 4000);

        return () => clearInterval(interval);
    }, [activeIndex, sliders]);

    const renderItem = ({ item }: any) => {
        const title = languageMode === 'bn' ? item.titleBn : item.title;
        const subtitle = languageMode === 'bn' ? item.subtitleBn : item.subtitle;

        return (
            <View style={styles.slideItem}>
                <View style={styles.imageContainer}>
                    <Image
                        source={{ uri: item.mediaUrl }}
                        style={styles.image}
                        resizeMode="cover"
                    />
                    <View style={styles.textOverlay}>
                        {title && <Text style={styles.slideTitle} numberOfLines={1}>{title}</Text>}
                        {subtitle && <Text style={styles.slideSubtitle} numberOfLines={1}>{subtitle}</Text>}
                    </View>
                </View>
            </View>
        );
    };

    if (!sliders || sliders.length === 0) {
        return null;
    }

    return (
        <View style={styles.container}>
            <FlatList
                ref={flatListRef}
                data={sliders}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
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
                {sliders.map((_, index) => (
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
        paddingVertical: '8@vs',
        backgroundColor: 'rgba(0,0,0,0.4)', // Slightly darker for better readability
        justifyContent: 'center',
        paddingHorizontal: '12@ms',
    },
    slideTitle: {
        color: 'white',
        fontSize: '14@ms',
        fontWeight: 'bold',
        fontFamily: 'July-Bold',
    },
    slideSubtitle: {
        color: '#E5E7EB',
        fontSize: '12@ms',
        fontFamily: 'July-Regular',
        marginTop: '2@vs',
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
