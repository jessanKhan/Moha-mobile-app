import { FlatList, ActivityIndicator, View, RefreshControl, TouchableOpacity, Text, Image } from 'react-native';
import React, { useCallback } from 'react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { moderateScale, ScaledSheet } from 'react-native-size-matters';
import LinearGradient from 'react-native-linear-gradient';
import { ArrowRight } from 'lucide-react-native';
import Header from '../../components/Header';
import AppBackground from '../../components/AppBackground';
import { useQuery } from '@apollo/client/react';
import { GET_ALL_ACHIEVEMENTS } from '../../api/queries';
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
  const navigation = useNavigation<any>();
  const languageMode = useSelector((state: RootState) => state.language.mode);
  const [limit, setLimit] = React.useState(10);
  const [hasMore, setHasMore] = React.useState(true);

  const { data, loading, refetch } = useQuery<any>(GET_ALL_ACHIEVEMENTS, {
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
    if (data?.allAchievements) {
      if (data.allAchievements.length < limit) {
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

  const achievements = data?.allAchievements || [];

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
      {loading && achievements.length === 0 ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#ffffff" />
        </View>
      ) : (
        <FlatList
          data={achievements}
          keyExtractor={item => item.id.toString()}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={['#155DFC']}
              tintColor={'#155DFC'}
            />
          }
          renderItem={({ item }) => {
            const thumbnail = item.thumbnail || (item.photos && item.photos.length > 0 ? item.photos[0].url : 'https://via.placeholder.com/300x200');
            const desc = stripHtmlTags(languageMode === 'en' ? (item.description || '') : (item.descriptionBn || ''));
            return (
              <View style={styles.cardContainer}>
                <Image
                  source={{ uri: thumbnail }}
                  style={styles.cardImage}
                  resizeMode="cover"
                />
                <View style={styles.cardContent}>
                  <Text style={styles.cardTitle} numberOfLines={2}>
                    {languageMode === 'en' ? item.title : item.titleBn}
                  </Text>
                  <TouchableOpacity 
                    activeOpacity={0.8} 
                    style={styles.detailsButtonContainer}
                    onPress={() => navigation.navigate('OngoingProgrammeDetails', { item })}
                  >
                    <LinearGradient
                      colors={['#FF7A42', '#E85D22']}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      style={styles.detailsButton}
                    >
                      <Text style={styles.detailsButtonText}>
                        {languageMode === 'en' ? 'Details' : 'বিস্তারিত'}
                      </Text>
                      <ArrowRight size={moderateScale(16)} color="#FFFFFF" />
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              </View>
            );
          }}
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

const styles = ScaledSheet.create({
  flatList: {
    flex: 1,
    width: '100%',
  },
  listContent: {
    paddingVertical: '16@vs',
    paddingHorizontal: '16@ms',
    gap: '20@vs',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadMoreButton: {
    paddingVertical: '12@vs',
    paddingHorizontal: '20@ms',
    marginBottom: '24@vs',
    borderRadius: '25@ms',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#155DFC',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    minWidth: '140@ms',
    marginTop: '10@vs',
  },
  loadMoreText: {
    color: '#155DFC',
    fontSize: '14@ms',
    fontWeight: 'bold',
    fontFamily: 'July-Bold',
  },
  cardContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: '20@ms',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 4,
    width: '100%',
    height: '250@vs',
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: '120@vs',
  },
  cardContent: {
    padding: '20@ms',
  },
  cardTitle: {
    fontSize: '16@ms',
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: '8@vs',
    lineHeight: '24@ms',
    fontFamily: 'July-Bold',
  },
  cardDescription: {
    fontSize: '13@ms',
    color: '#6B7280',
    marginBottom: '20@vs',
    lineHeight: '20@ms',
    fontFamily: 'July-Regular',
  },
  detailsButtonContainer: {
    borderRadius: '25@ms',
    overflow: 'hidden',
    marginTop: 'auto',
  },
  detailsButton: {
    paddingVertical: '12@vs',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8@ms',
  },
  detailsButtonText: {
    color: '#FFFFFF',
    fontSize: '14@ms',
    fontWeight: 'bold',
    fontFamily: 'July-Bold',
  },
});
