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
import { useRoute } from '@react-navigation/native';

const AboutTraffickingScreen = () => {
    const route = useRoute<any>();
    const { componentId, thumbnailPath } = route.params || {};
    const languageMode = useSelector((state: RootState) => state.language.mode);

    const { data, loading, refetch } = useQuery<any>(CONTENTS_BY_COMPONENT_ID, {
        variables: { componentId: parseFloat(componentId) },
        skip: !componentId,
        fetchPolicy: 'cache-and-network',
    });

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
            .replace(/<li>/g, '• ')
            .replace(/<\/li>/g, '\n')
            .replace(/<[^>]*>?/gm, '')
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
                        contents.map((item: any, index: number) => {
                            const title = languageMode === 'en' ? item.title : item.titleBn;
                            const description = languageMode === 'en' ? item.description : item.descriptionBn;

                            return (
                                <View key={item.id || index} style={styles.section}>
                                    {title && <Text style={styles.sectionTitle}>{title}</Text>}
                                    <Text style={styles.description}>
                                        {stripHtml(description)}
                                    </Text>
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
    sectionTitle: {
        fontSize: '22@ms',
        fontWeight: 'bold',
        color: '#1F2937',
        marginBottom: '12@vs',
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
