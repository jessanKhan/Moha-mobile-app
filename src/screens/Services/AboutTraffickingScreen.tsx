import React from 'react';
import {
    View,
    Text,
    ScrollView,
    StatusBar,
    Image,
    ActivityIndicator,
    RefreshControl,
} from 'react-native';
import { moderateScale, ScaledSheet, verticalScale } from 'react-native-size-matters';
import Header from '../../components/Header';
import AppBackground from '../../components/AppBackground';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { useQuery } from '@apollo/client/react';
import { CONTENTS_BY_COMPONENT_ID } from '../../api/queries';
import { useRoute, useFocusEffect } from '@react-navigation/native';

const AboutTraffickingScreen = () => {
    const route = useRoute<any>();
    const { componentId, thumbnailPath } = route.params || {};
    const languageMode = useSelector((state: RootState) => state.language.mode);

    const { data, loading, refetch } = useQuery<any>(CONTENTS_BY_COMPONENT_ID, {
        variables: { componentId: parseFloat(componentId) },
        skip: !componentId,
        fetchPolicy: 'cache-and-network',
    });

    useFocusEffect(
        React.useCallback(() => {
            refetch();
        }, [refetch])
    );

    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(async () => {
        setRefreshing(true);
        await refetch();
        setRefreshing(false);
    }, [refetch]);

    const contents = data?.contentsByComponentId || [];

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

    return (
        <AppBackground>
            <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
            <Header
                title={languageMode === 'en' ? 'Learn About Trafficking' : 'মানবপাচার সম্পর্কে জানুন'}
                subtitle={languageMode === 'en' ? 'Know more to save more' : 'জানলেই বাঁচানো সম্ভব'}
                showBackButton={true}
            />

            <ScrollView
                style={styles.scrollContainer}
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            >
                {thumbnailPath && (
                    <View style={styles.imageContainer}>
                        <Image
                            source={{ uri: thumbnailPath }}
                            style={styles.headerImage}
                            resizeMode="cover"
                        />
                    </View>
                )}

                <View style={styles.contentContainer}>
                    {loading && !refreshing ? (
                        <ActivityIndicator
                            size="large"
                            color="#155DFC"
                            style={{ marginTop: verticalScale(40) }}
                        />
                    ) : (
                        contents.map((content: any, cIndex: number) => {
                            const cTitle = languageMode === 'en' ? content.title : content.titleBn;
                            const cDescription = languageMode === 'en' ? content.description : content.descriptionBn;

                            return (
                                <View key={content.id || cIndex}>
                                    {/* Content Title/Description if any */}
                                    {(cTitle || cDescription) && (
                                        <View style={styles.section}>
                                            {cTitle && <Text style={styles.sectionTitleMain}>{cTitle}</Text>}
                                            {cDescription && (
                                                <Text style={styles.description}>{stripHtml(cDescription)}</Text>
                                            )}
                                        </View>
                                    )}

                                    {/* Nested Items */}
                                    {content.items && content.items.map((item: any, iIndex: number) => {
                                        const iTitle = languageMode === 'en' ? item.title : item.titleBn;
                                        const iDescription = languageMode === 'en' ? item.description : item.descriptionBn;

                                        return (
                                            <View key={item.id || iIndex} style={styles.section}>
                                                {iTitle && <Text style={styles.sectionTitle}>{iTitle}</Text>}
                                                {iDescription && (
                                                    <Text style={styles.description}>{stripHtml(iDescription)}</Text>
                                                )}
                                            </View>
                                        );
                                    })}
                                </View>
                            );
                        })
                    )}
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
    imageContainer: {
        width: '100%',
        paddingHorizontal: '16@ms',
        marginTop: '16@vs',
    },
    headerImage: {
        width: '100%',
        height: '240@vs',
        borderRadius: '24@ms',
    },
    contentContainer: {
        paddingHorizontal: '20@ms',
        paddingTop: '24@vs',
    },
    section: {
        marginBottom: '24@vs',
    },
    sectionTitleMain: {
        fontSize: '22@ms',
        fontWeight: 'bold',
        color: '#1F2937',
        fontFamily: 'July-Bold',
        lineHeight: '20@ms',
    },
    sectionTitle: {
        fontSize: '18@ms',
        fontWeight: 'bold',
        color: '#1F2937',
        marginBottom: '6@vs',
        fontFamily: 'July-Bold',
        lineHeight: '30@ms',
    },
    description: {
        fontSize: '15@ms',
        color: '#4B5563',
        lineHeight: '26@ms',
        fontFamily: 'July-Regular',
        textAlign: 'justify',
    },
});

export default AboutTraffickingScreen;
