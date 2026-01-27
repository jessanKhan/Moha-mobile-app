import React from 'react';
import { View, FlatList } from 'react-native';
import Header from '../../components/Header';
import { ExternalLink } from 'lucide-react-native';
import { moderateScale } from 'react-native-size-matters';
import CustomEmergencyContactComponent from '../../components/customEmergencyContact/CustomEmergencyContactComponent';
import QuickLinksComponent from '../../components/quickLinkComponent/QuickLinksComponent';
import { quickLinksSectionData } from '../../data/linkComponentData';
import LinkComponent from '../../components/quickLinkComponent/LinkComponent';

const QuickLinkScreen = () => {
  return (
    <View className="flex-1 bg-white dark:bg-black">
      <Header
        title="দ্রুত লিংক"
        showBackButton={true}
        subtitle="প্রয়োজনীয় দ্রুত লিংক"
      />

      <FlatList
        data={quickLinksSectionData}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          padding: moderateScale(20),
          gap: moderateScale(15),
        }}
        renderItem={({ item }) => (
          <QuickLinksComponent
            title={item.title}
            gradientColors={item.gradientColors}
            headerIcon={item.icon}
            data={item.items}
            keyExtractor={linkItem => linkItem.id}
            renderItem={({ item: linkItem, index }) => (
              <LinkComponent
                text={linkItem.text}
                icon={ExternalLink}
                onPress={() => console.log(linkItem.text)}
                isFirst={index === 0}
              />
            )}
          />
        )}
        ListFooterComponent={() => (
          <CustomEmergencyContactComponent
            title="২৪/৭ জরুরি হটলাইন"
            hotLineNumber="৯৯৯"
          />
        )}
      />
    </View>
  );
};

export default QuickLinkScreen;