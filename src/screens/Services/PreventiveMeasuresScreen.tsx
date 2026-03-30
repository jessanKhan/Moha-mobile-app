import React from 'react';
import { View, FlatList, ActivityIndicator, RefreshControl } from 'react-native';
import Header from '../../components/Header';
import QuickLinksComponent from '../../components/quickLinkComponent/QuickLinksComponent';
import { ScaledSheet } from 'react-native-size-matters';
import CustomEmergencyContactComponent from '../../components/customEmergencyContact/CustomEmergencyContactComponent';
import PreventiveMeasureComponent from '../../components/preventiveMeasure/PreventiveMeasureComponent';
import AppBackground from '../../components/AppBackground';
import { useQuery } from '@apollo/client/react';
import { CONTENTS_BY_COMPONENT_ID } from '../../api/queries';
import { useRoute } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { BookOpen, Eye, HandFist, Plane } from 'lucide-react-native';

const RANDOM_ICONS = [BookOpen, Eye, HandFist, Plane];

const PreventiveMeasuresScreen = () => {
    const route = useRoute<any>();
    const { componentId } = route.params || {};
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

    const parseHtmlItems = (html: string) => {
        if (!html) return [];
        const regex = /<li>(.*?)<\/li>/g;
        const matches = [];
        let match;
        while ((match = regex.exec(html)) !== null) {
            matches.push(match[1].replace(/<[^>]*>?/gm, '').trim());
        }
        return matches;
    };

    const GRADIENT_PALETTE = [
        ['#009689', '#00786F'],
        ['#155DFC', '#1447E6'],
        ['#FB2C36', '#E7000B'],
        ['#FF6900', '#F54900'],
        ['#9810FA', '#8200DB'],
    ];

    const contents = data?.contentsByComponentId || [];

    return (
        <AppBackground>
            <Header
                title={languageMode === 'en' ? 'Preventive Measures' : 'প্রতিরোধমূলক ব্যবস্থা'}
                showBackButton={true}
                subtitle={languageMode === 'en' ? 'Safety tips and precautions' : 'নিরাপত্তা টিপস এবং সতর্কতা'}
            />

            {loading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#ffffff" />
                </View>
            ) : (
                <FlatList
                    data={contents}
                    keyExtractor={item => item.id.toString()}
                    refreshControl={
                        <RefreshControl 
                            refreshing={refreshing} 
                            onRefresh={onRefresh}
                            colors={['#155DFC']} 
                            tintColor={'#155DFC'} 
                        />
                    }
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.listContent}
                    ItemSeparatorComponent={() => (
                        <View style={styles.separator} />
                    )}
                    renderItem={({ item, index }) => {
                        const description = languageMode === 'en' ? item.descriptionBn : item.description;
                        const items = parseHtmlItems(description);
                        const palette = (item.color && item.color.startsWith('#'))
                            ? [item.color, item.color]
                            : GRADIENT_PALETTE[index % GRADIENT_PALETTE.length];

                        // Icon fallback logic
                        const hasIcon = (item.iconName && item.iconName.trim() !== '') || (item.iconUrl && item.iconUrl.trim() !== '');
                        const randomIcon = hasIcon ? undefined : RANDOM_ICONS[index % RANDOM_ICONS.length];

                        return (
                            <QuickLinksComponent
                                title={languageMode === 'en' ? (item.title || '') : (item.titleBn || '')}
                                gradientColors={palette}
                                headerIcon={randomIcon}
                                logoUrl={item.iconUrl}
                                data={items}
                                keyExtractor={(linkItem, idx) => idx.toString()}
                                renderItem={({ item: text, index: linkIndex }) => (
                                    <PreventiveMeasureComponent
                                        text={text}
                                        isFirst={linkIndex === 0}
                                    />
                                )}
                            />
                        );
                    }}
                    ListFooterComponent={() => (
                        <>
                            <View style={styles.spacer} />
                            <CustomEmergencyContactComponent
                                title={languageMode === 'en' ? '24/7 Emergency Hotline' : '২৪/৭ জরুরি হটলাইন'}
                                hotLineNumber={languageMode === 'en' ? '999' : '৯৯৯'}
                            />
                        </>
                    )}
                />
            )}
        </AppBackground>
    );
};

export default PreventiveMeasuresScreen;

const styles = ScaledSheet.create({
    listContent: {
        padding: '16@ms',
        paddingBottom: '24@ms',
    },
    separator: {
        height: '16@ms',
    },
    spacer: {
        height: '20@ms',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
