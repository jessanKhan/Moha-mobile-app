import { FlatList, StyleSheet, ActivityIndicator, View, RefreshControl } from 'react-native';
import React from 'react';
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

const Initiatives = () => {
  const languageMode = useSelector((state: RootState) => state.language.mode);

  const { data, loading, refetch } = useQuery<any>(INITIATIVES_QUERY, {
    variables: { page: 1.0, limit: 10.0 },
    fetchPolicy: 'cache-and-network',
  });

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }, [refetch]);

  const initiatives = data?.initiatives || [];

  return (
    <AppBackground>
      <Header
        title={languageMode === 'en' ? 'Initiatives' : 'উদ্যোগসমূহ'}
        subtitle={
          languageMode === 'en'
            ? 'Human trafficking prevention initiatives'
            : 'মানব পাচার প্রতিরোধে উদ্যোগ'
        }
        showBackButton
      />
      {loading ? (
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
        />
      )}
    </AppBackground>
  );
};

export default Initiatives;

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
});
