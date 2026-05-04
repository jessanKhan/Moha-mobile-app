import React, { useMemo } from 'react';
import { View, FlatList, ActivityIndicator, Linking, RefreshControl, Alert } from 'react-native';
import Header from '../../components/Header';
import { ExternalLink } from 'lucide-react-native';
import { moderateScale } from 'react-native-size-matters';
import QuickLinksComponent from '../../components/quickLinkComponent/QuickLinksComponent';
import LinkComponent from '../../components/quickLinkComponent/LinkComponent';
import AppBackground from '../../components/AppBackground';
import { useQuery } from '@apollo/client/react';
import { CATEGORY_BY_COMPONENT_ID, ALL_QUICK_LINKS } from '../../api/queries';
import { useRoute, useFocusEffect } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import HotlineBar from '../../components/Home/HotlineBar';

const QuickLinkScreen = () => {
  const route = useRoute<any>();
  const { componentId } = route.params || {};
  const languageMode = useSelector((state: RootState) => state.language.mode);

  const { data: categoryData, loading: categoryLoading, refetch: refetchCategories } = useQuery<any>(CATEGORY_BY_COMPONENT_ID, {
    variables: { componentId: parseInt(componentId) },
    skip: !componentId,
    fetchPolicy: 'cache-and-network',
  });

  const { data: linksData, loading: linksLoading, refetch: refetchLinks } = useQuery<any>(ALL_QUICK_LINKS, {
    variables: { page: 1, limit: 100 },
    fetchPolicy: 'cache-and-network',
  });

  const handleRefresh = React.useCallback(() => {
    refetchCategories();
    refetchLinks();
  }, [refetchCategories, refetchLinks]);

  useFocusEffect(
    React.useCallback(() => {
      handleRefresh();
    }, [handleRefresh])
  );

  const handleLinkPress = async (url: string) => {
    if (!url) return;
    
    // Trim and ensure protocol
    let targetUrl = url.trim();
    if (!targetUrl.startsWith('http://') && !targetUrl.startsWith('https://')) {
      targetUrl = 'https://' + targetUrl;
    }

    try {
      const supported = await Linking.canOpenURL(targetUrl);
      if (supported) {
        await Linking.openURL(targetUrl);
      } else {
        // Fallback: try opening directly if canOpenURL fails
        try {
          await Linking.openURL(targetUrl);
        } catch (e) {
          Alert.alert("Error", "Don't know how to open this URL: " + targetUrl);
        }
      }
    } catch (error) {
      Alert.alert("Error", "An error occurred while opening the link");
    }
  };

  const sections = useMemo(() => {
    const categories = categoryData?.categoryByComponentId;
    const allLinks = linksData?.allQuickLinks;

    if (!categories || !allLinks || !Array.isArray(categories)) return [];

    return categories.map((cat: any) => {
      const normalizedCatName = cat.name?.toLowerCase().trim();
      const catLinks = allLinks.filter((link: any) =>
        link.category?.toLowerCase().trim() === normalizedCatName
      );

      return {
        id: cat.id.toString(),
        title: languageMode === 'bn' ? cat.nameBn : cat.name,
        logoUrl: cat.logoUrl,
        color: cat.color,
        items: catLinks,
      };
    }).filter(section => section.items.length > 0);
  }, [categoryData, linksData, languageMode]);

  if (categoryLoading || linksLoading) {
    return (
      <AppBackground>
        <Header title={languageMode === 'bn' ? "দ্রুত লিংক" : "Quick Links"} showBackButton={true} />
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#009689" />
        </View>
      </AppBackground>
    );
  }

  return (
    <AppBackground>
      <Header
        title={languageMode === 'bn' ? "দ্রুত লিংক" : "Quick Links"}
        showBackButton={true}
        subtitle={languageMode === 'bn' ? "প্রয়োজনীয় দ্রুত লিংক" : "Essential Quick Links"}
      />

      <FlatList
        data={sections}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={categoryLoading || linksLoading}
            onRefresh={handleRefresh}
            tintColor="#009689"
          />
        }
        contentContainerStyle={{
          padding: moderateScale(20),
          gap: moderateScale(15),
        }}
        renderItem={({ item }) => (
          <QuickLinksComponent
            title={item.title}
            gradientColors={(item.color && item.color.startsWith('#')) ? [item.color, item.color] : ['#009689', '#004D40']}
            logoUrl={item.logoUrl}
            data={item.items}
            keyExtractor={(linkItem: any) => linkItem.id.toString()}
            renderItem={({ item: linkItem, index }: { item: any; index: number }) => (
              <LinkComponent
                text={languageMode === 'bn' ? linkItem.labelBn : linkItem.label}
                icon={ExternalLink}
                onPress={() => handleLinkPress(linkItem.url)}
                isFirst={index === 0}
              />
            )}
          />
        )}
        ListFooterComponent={() => (
          <View style={{ marginHorizontal: -moderateScale(16) }}>
            <HotlineBar />
          </View>
        )}
      />
    </AppBackground>
  );
};

export default QuickLinkScreen;
