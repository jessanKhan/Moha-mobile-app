import React from 'react';
import { View, FlatList } from 'react-native';
import Header from '../../components/Header';
import QuickLinksComponent from '../../components/quickLinkComponent/QuickLinksComponent';
import { moderateScale } from 'react-native-size-matters';
import PreventiveMeasureComponent from '../../components/preventiveMeasure/PreventiveMeasureComponent';
import { preventData } from '../../data/preventlinkData';

const PreventiveMeasuresScreen = () => {
  return (
    <View className="flex-1 bg-gray-50 dark:bg-black">
      <Header
        title="দ্রুত লিংক"
        showBackButton={true}
        subtitle="প্রয়োজনীয় দ্রুত লিংক"
      />

      <FlatList
        data={preventData}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          padding: moderateScale(16),
          paddingBottom: moderateScale(24),
        }}
        ItemSeparatorComponent={() => (
          <View style={{ height: moderateScale(16) }} />
        )}
        renderItem={({ item }) => (
          <QuickLinksComponent
            title={item.title}
            gradientColors={item.gradientColors}
            headerIcon={item.icon}
            data={item.items}
            keyExtractor={linkItem => linkItem.id}
            renderItem={({ item: linkItem, index }) => (
              <PreventiveMeasureComponent
                text={linkItem.text}
                isFirst={index === 0}
              />
            )}
          />
        )}
      />
    </View>
  );
};

export default PreventiveMeasuresScreen;
