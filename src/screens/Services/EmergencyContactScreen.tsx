import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import Header from '../../components/Header';
import { Clock3 } from 'lucide-react-native';
import { moderateScale } from 'react-native-size-matters';

const EmergencyContactScreen = () => {
  return (
    <View className="flex-1 bg-white">
      <Header title="জরুরি যোগাযোগ" showBackButton />

      <ScrollView className="flex-1 px-4 pt-4">
        <View
          className="flex-row items-center rounded-2xl px-4 py-4"
          style={{
            backgroundColor: 'rgba(255, 220, 220, 1)',
            borderWidth: 1,
            borderColor: 'rgba(255, 190, 190, 1)',
          }}
        >
          <View
            className="items-center justify-center rounded-full"
            style={{
              height: moderateScale(36),
              width: moderateScale(36),
              backgroundColor: 'rgba(255, 200, 200, 1)',
            }}
          >
            <Clock3 color="rgba(255, 77, 77, 1)" size={moderateScale(20)} />
          </View>

          {/* Texts */}
          <View className="ml-3 flex-1">
            <Text
              className="font-inter-semibold"
              style={{
                color: 'rgba(255, 77, 77, 1)',
                fontSize: moderateScale(14),
              }}
              numberOfLines={1}
            >
              জরুরি পরিস্থিতি?
            </Text>

            <Text
              className="font-inter-regular"
              style={{
                color: 'rgba(255, 128, 128, 1)',
                fontSize: moderateScale(12),
                marginTop: 2,
              }}
              numberOfLines={1}
            >
              অবিলম্বে ৯৯৯ নম্বরে কল করুন
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default EmergencyContactScreen;
