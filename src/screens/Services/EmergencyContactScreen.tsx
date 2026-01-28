import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import Header from '../../components/Header';
import { Clock3, MapPin } from 'lucide-react-native';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import CustomEmergencyContactComponent from '../../components/customEmergencyContact/CustomEmergencyContactComponent';
import CustomCommonIcon from '../../components/customCommonIconComponent/CustomCommonIcon';
import CountryDropdown from '../../components/customDropDown/CustomDropDown';
const EmergencyContactScreen = () => {
  return (
    <View style={styles.container}>
      <Header
        title="জরুরি যোগাযোগ"
        showBackButton
        subtitle="জরুরি পরিস্থিতিতে এখানে কল করুন"
      />

      <ScrollView
        style={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        nestedScrollEnabled={true}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.bannerContainer}>
          <View style={styles.iconWrapper}>
            <Clock3 color="rgba(255, 77, 77, 1)" size={moderateScale(20)} />
          </View>

          {/* Texts */}
          <View style={styles.textWrapper}>
            <Text
              style={styles.urgencyText}
              numberOfLines={1}
            >
              জরুরি পরিস্থিতি?
            </Text>

            <Text
              style={styles.callText}
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
        <View style={styles.legalCard}>
          <View style={styles.legalHeader}>
            <CustomCommonIcon
              icon={MapPin}
              bgColor="rgba(0, 150, 137, 1)"
              iconColor="white"
              size={moderateScale(20)}
            />
            <Text style={styles.legalTitle}>
              নিকটস্থ পুলিশ স্টেশন
            </Text>
          </View>
          <Text style={styles.legalText}>
            আপনার এলাকার থানায় যোগাযোগ করুন
          </Text>
        </View>
        <View style={styles.legalCardAddress}>
          <View style={styles.legalInfoWrapper}>
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
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollContent: {
    flex: 1,
    padding: '16@ms',
  },
  bannerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: '16@ms',
    padding: '16@ms',
    backgroundColor: 'rgba(255, 220, 220, 1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 190, 190, 1)',
  },
  iconWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '18@ms',
    height: '36@ms',
    width: '36@ms',
    backgroundColor: 'rgba(255, 200, 200, 1)',
  },
  textWrapper: {
    marginLeft: '12@ms',
    flex: 1,
  },
  urgencyText: {
    color: 'rgba(255, 77, 77, 1)',
    fontSize: '14@ms',
    fontFamily: 'Inter-SemiBold',
  },
  callText: {
    color: 'rgba(255, 128, 128, 1)',
    fontSize: '12@ms',
    marginTop: '2@vs',
    fontFamily: 'Inter-Regular',
  },
  dropdown: {
    marginTop: '20@vs',
  },
  dropdownone: {
    marginTop: '10@vs',
  },
  legalCard: {
    padding: '24@ms',
    borderRadius: '16@ms',
    marginBottom: '24@vs',
    marginTop: '10@vs',
    backgroundColor: 'rgba(236, 254, 255, 1)',
    borderWidth: 1,
    borderColor: 'rgba(207, 250, 254, 1)',
  },
  legalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: '12@vs',
  },
  legalTitle: {
    marginLeft: '12@s',
    fontSize: '16@ms',
    fontWeight: '700',
    color: 'rgba(21, 94, 117, 1)',
  },
  legalText: {
    fontSize: '14@ms',
    lineHeight: '20@ms',
    marginLeft: '32@s',
    color: 'rgba(14, 116, 144, 1)',
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
  legalInfoWrapper: {
    marginBottom: '20@vs',
  },
  legalTitlecart: {
    fontSize: '14@ms',
    fontWeight: '400',
    color: 'rgba(29, 41, 61, 1)',
    lineHeight: '23@ms',
  },
});