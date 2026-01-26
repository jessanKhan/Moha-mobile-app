import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import Header from '../../components/Header';
import { Clock3, MapPin } from 'lucide-react-native';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import CountryDropdown from '../../components/customDropDown/CustomDropDown';
import CustomEmergencyContactComponent from '../../components/customEmergencyContact/CustomEmergencyContactComponent';
import CustomCommonIcon from '../../components/customCommonIconComponent/CustomCommonIcon';

const EmergencyContactScreen = () => {
  return (
    <View className="flex-1 bg-white">
      <Header
        title="জরুরি যোগাযোগ"
        showBackButton
        subtitle="জরুরি পরিস্থিতিতে এখানে কল করুন"
      />

      <ScrollView
        className="flex-1 p-4"
        keyboardShouldPersistTaps="handled"
        nestedScrollEnabled={true}
        showsVerticalScrollIndicator={false}
      >
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
        <View style={styles.dropdown}>
          <CountryDropdown
            onSelect={country => {
              console.log(country.value);
            }}
          />
        </View>
        <View style={styles.dropdown}>
          <CustomEmergencyContactComponent
            title="২৪/৭ জরুরি হটলাইন"
            hotLineNumber="৯৯৯"
          />
        </View>
        <View style={styles.dropdownone}>
          <CustomEmergencyContactComponent
            title="মানব পাচার হটলাইন"
            hotLineNumber="১০৯৮"
          />
        </View>
        <View style={styles.dropdownone}>
          <CustomEmergencyContactComponent
            title="নারী ও শিশু নির্যাতন প্রতিরোধ সেল"
            hotLineNumber="১০৯৮"
          />
        </View>
        <View
          className="bg-cyan-50 dark:bg-cyan-900/20 border border-cyan-100 dark:border-cyan-800/30"
          style={styles.legalCard}
        >
          <View
            className="flex-row items-center"
            style={{ marginBottom: verticalScale(12) }}
          >
            <CustomCommonIcon
              icon={MapPin}
              bgColor="rgba(0, 150, 137, 1)"
              iconColor="white"
              size={moderateScale(20)}
            />
            <Text
              className="text-cyan-800 dark:text-cyan-400 font-bold"
              style={styles.legalTitle}
            >
              নিকটস্থ পুলিশ স্টেশন
            </Text>
          </View>
          <Text
            className="text-cyan-700 dark:text-cyan-300"
            style={styles.legalText}
          >
            আপনার এলাকার থানায় যোগাযোগ করুন
          </Text>
        </View>
        <View className="bg-cyan-50" style={styles.legalCardAddress}>
          <View
            className="flex-row items-center"
            style={{ marginBottom: verticalScale(20) }}
          >
            <Text style={styles.legalTitlecart}>
              আপনার পরিচয় এবং তথ্য সম্পূর্ণ গোপন থাকবে।
            </Text>
          </View>
          <Text style={styles.legalTitlecart}>নিঃসংকোচে যোগাযোগ করুন।</Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default EmergencyContactScreen;

const styles = ScaledSheet.create({
  dropdown: {
    marginTop: verticalScale(20),
  },
  dropdownone: {
    marginTop: verticalScale(10),
  },
  legalCard: {
    padding: '24@ms',
    borderRadius: '16@ms',
    marginBottom: '24@vs',
    marginTop: '10@vs',
  },
  legalTitle: {
    marginLeft: '12@s',
    fontSize: '16@ms',
  },
  legalText: {
    fontSize: '14@ms',
    lineHeight: '20@ms',
    marginBottom: '4@vs',
    marginLeft: '53@s',
    marginTop: '-15@vs',
  },
  legalSubText: {
    fontSize: '12@ms',
    marginTop: '8@vs',
  },
  legalCardAddress: {
    padding: '24@ms',
    borderRadius: '16@ms',
    marginBottom: '24@vs',
    backgroundColor: 'rgba(255, 255, 255, 1)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  legalTitlecart: {
    fontSize: '14@ms',
    fontWeight: '400',
    color: 'rgba(29, 41, 61, 1)',
    lineHeight: '23@ms',
  },
});
