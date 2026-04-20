import React, { useMemo } from 'react';
import { View, FlatList, ActivityIndicator } from 'react-native';
import Header from '../../components/Header';
import { ExternalLink } from 'lucide-react-native';
import { moderateScale } from 'react-native-size-matters';
import QuickLinksComponent from '../../components/quickLinkComponent/QuickLinksComponent';
import LinkComponent from '../../components/quickLinkComponent/LinkComponent';
import AppBackground from '../../components/AppBackground';
import { useQuery } from '@apollo/client/react';
import { CATEGORY_BY_COMPONENT_ID, ALL_QUICK_LINKS } from '../../api/queries';
import { useRoute } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import HotlineBar from '../../components/Home/HotlineBar';

const QuickLinkScreen = () => {
  const route = useRoute<any>();
  const { componentId } = route.params || {};
  const languageMode = useSelector((state: RootState) => state.language.mode);

  const { data: categoryData, loading: categoryLoading } = useQuery<any>(CATEGORY_BY_COMPONENT_ID, {
    variables: { componentId: parseInt(componentId) },
    skip: !componentId,
  });

  const { data: linksData, loading: linksLoading } = useQuery<any>(ALL_QUICK_LINKS, {
    variables: { page: 1, limit: 100 },
  });

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
                //    onPress={() => console.log(linkItem.url)}
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
