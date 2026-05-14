import { FlatList, StyleSheet, ActivityIndicator, View, RefreshControl, TouchableOpacity, Text } from 'react-native';
import React, { useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import InitiativesComponent from '../../components/initiativesComponent/InitiativesComponent';
import Header from '../../components/Header';
import AppBackground from '../../components/AppBackground';
import { useQuery } from '@apollo/client/react';
import { INITIATIVES_QUERY } from '../../api/queries';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

const stripHtmlTags = (html: string) => {
  if (!html) return '';
  return html
    .replace(/<p[^>]*>/g, '') // remove opening <p>
    .replace(/<\/p>/g, '\n\n') // replace closing </p> with double line break
    .replace(/<br\s*\/?>/g, '\n') // replace <br> with line break
    .replace(/<[^>]+>/g, '') // remove all other tags
    .replace(/&nbsp;/g, ' ') // replace html spaces
    .trim();
};

const OngoingProgrammes = () => {
  const languageMode = useSelector((state: RootState) => state.language.mode);
  const [limit, setLimit] = React.useState(10);
  const [hasMore, setHasMore] = React.useState(true);

  const { data, loading, refetch } = useQuery<any>(INITIATIVES_QUERY, {
    variables: { page: 1.0, limit: (limit * 1.0) },
    fetchPolicy: 'cache-and-network',
  });

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch])
  );

  const [refreshing, setRefreshing] = React.useState(false);

  React.useEffect(() => {
    if (data?.initiatives) {
      if (data.initiatives.length < limit) {
        setHasMore(false);
      } else {
        setHasMore(true);
      }
    }
  }, [data, limit]);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }, [refetch]);

  const handleLoadMore = () => {
    if (loading || !hasMore) return;
    setLimit(prev => prev + 10);
  };

  const initiatives = data?.initiatives || [];

  return (
    <AppBackground>
      <Header
        title={languageMode === 'en' ? 'On going Programmes/Projects' : 'চলমান প্রোগ্রাম/প্রকল্পসমূহ'}
        subtitle={
          languageMode === 'en'
            ? 'Human trafficking prevention initiatives'
            : 'মানব পাচার প্রতিরোধে উদ্যোগ'
        }
        showBackButton
      />
      {loading && initiatives.length === 0 ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#ffffff" />
        </View>
      ) : (
        <FlatList
          data={initiatives}
          keyExtractor={item => item.id.toString()}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={['#155DFC']}
              tintColor={'#155DFC'}
            />
          }
          renderItem={({ item }) => (
            <InitiativesComponent
              title={languageMode === 'en' ? (item.title || '') : (item.titleBn || '')}
              description={stripHtmlTags(languageMode === 'en' ? (item.description || '') : (item.descriptionBn || ''))}
              imageUrl={item.attachmentUrl}
              colors={(item.color && item.color.startsWith('#')) ? [item.color, item.color] : ['#009689', '#00786F']}
              iconBgColor={item.color || '#ffffff'}
            />
          )}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          style={styles.flatList}
          ListFooterComponent={() => (
            <>
              {hasMore && (
                <TouchableOpacity
                  style={styles.loadMoreButton}
                  onPress={handleLoadMore}
                  disabled={loading}
                >
                  {loading ? (
                    <ActivityIndicator size="small" color="#155DFC" />
                  ) : (
                    <Text style={styles.loadMoreText}>
                      {languageMode === 'bn' ? 'আরো দেখুন' : 'View More'}
                    </Text>
                  )}
                </TouchableOpacity>
              )}
            </>
          )}
        />
      )}
    </AppBackground>
  );
};

export default OngoingProgrammes;

const styles = StyleSheet.create({
  flatList: {
    flex: 1,
    width: '100%',
  },
  listContent: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    gap: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadMoreButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginBottom: 24,
    borderRadius: 25,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#155DFC',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    minWidth: 140,
    marginTop: 10,
  },
  loadMoreText: {
    color: '#155DFC',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
