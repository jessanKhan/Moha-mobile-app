import { FlatList, StyleSheet, ActivityIndicator, View } from 'react-native';
import React from 'react';
import InitiativesComponent from '../../components/initiativesComponent/InitiativesComponent';
import Header from '../../components/Header';
import AppBackground from '../../components/AppBackground';
import { useQuery } from '@apollo/client/react';
import { INITIATIVES_QUERY } from '../../api/queries';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

const Initiatives = () => {
  const languageMode = useSelector((state: RootState) => state.language.mode);

  const { data, loading } = useQuery<any>(INITIATIVES_QUERY, {
    variables: { page: 1.0, limit: 10.0 },
  });

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
          renderItem={({ item }) => (
            <InitiativesComponent
              title={languageMode === 'en' ? (item.title || '') : (item.titleBn || '')}
              description={languageMode === 'en' ? (item.description || '') : (item.descriptionBn || '')}
              imageUrl={item.attachmentUrl}
              colors={item.color ? [item.color, item.color] : ['#009689', '#00786F']}
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
