import React, { useState } from 'react';
import { View, Text, ScrollView, ActivityIndicator } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import Header from '../../components/Header';
import { Clock3, MapPin } from 'lucide-react-native';
import { moderateScale } from 'react-native-size-matters';
import CustomEmergencyContactComponent from '../../components/customEmergencyContact/CustomEmergencyContactComponent';
import CustomCommonIcon from '../../components/customCommonIconComponent/CustomCommonIcon';
import CountryDropdown from '../../components/customDropDown/CustomDropDown';
import AppBackground from '../../components/AppBackground';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { useQuery } from '@apollo/client/react';
import { HOTLINES_BY_COUNTRY_QUERY } from '../../api/queries';

interface Hotline {
  id: number;
  country: string;
  countryBn: string;
  title: string;
  titleBn: string;
  number: string;
  numberBn: string;
}

interface HotlinesData {
  hotlinesByCountry: Hotline[];
}

const EmergencyContactScreen = () => {
  const languageMode = useSelector((state: RootState) => state.language.mode);
  const [selectedCountryName, setSelectedCountryName] = useState<string>('Bangladesh');

  const { data: hotlinesData, loading: hotlinesLoading } = useQuery<HotlinesData>(HOTLINES_BY_COUNTRY_QUERY, {
    variables: { page: 1, limit: 100, country: selectedCountryName },
    fetchPolicy: 'cache-and-network',
  });

  const hotlines = hotlinesData?.hotlinesByCountry || [];

  return (
    <AppBackground>
      <Header
        title={languageMode === 'en' ? "Emergency Contact" : "জরুরি যোগাযোগ"}
        showBackButton
        subtitle={languageMode === 'en' ? "Call here in an emergency" : "জরুরি পরিস্থিতিতে এখানে কল করুন"}
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

          <View style={styles.textWrapper}>
            <Text
              style={styles.urgencyText}
              numberOfLines={1}
            >
              {languageMode === 'en' ? "Emergency?" : "জরুরি পরিস্থিতি?"}
            </Text>

            <Text
              style={styles.callText}
              numberOfLines={1}
            >
              {languageMode === 'en' ? "Call 999 immediately" : "অবিলম্বে ৯৯৯ নম্বরে কল করুন"}
            </Text>
          </View>
        </View>
        <View style={styles.dropdown}>
          <CountryDropdown
            onSelect={country => {
              if (country && country.name) {
                setSelectedCountryName(country.name);
              }
            }}
          />
        </View>

        {hotlinesLoading ? (
          <ActivityIndicator size="large" color="#009688" style={{ marginTop: 20 }} />
        ) : (
          hotlines.map((hotline: any, index: number) => (
            <View key={hotline.id} style={index === 0 ? styles.dropdown : styles.dropdownone}>
              <CustomEmergencyContactComponent
                title={languageMode === 'en' ? hotline.title : hotline.titleBn}
                hotLineNumber={languageMode === 'en' ? hotline.number : hotline.numberBn}
              />
            </View>
          ))
        )}

        <View style={styles.legalCard}>
          <View style={styles.legalHeader}>
            <CustomCommonIcon
              icon={MapPin}
              bgColor="rgba(0, 150, 137, 1)"
              iconColor="white"
              size={moderateScale(20)}
            />
            <Text style={styles.legalTitle}>
              {languageMode === 'en' ? "Nearest Police Station" : "নিকটস্থ পুলিশ স্টেশন"}
            </Text>
          </View>
          <Text style={styles.legalText}>
            {languageMode === 'en' ? "Contact your local police station" : "আপনার এলাকার থানায় যোগাযোগ করুন"}
          </Text>
        </View>
        <View style={styles.legalCardAddress}>
          <View style={styles.legalInfoWrapper}>
            <Text style={styles.legalTitlecart}>
              {languageMode === 'en' ? "Your identity and information will remain completely confidential." : "আপনার পরিচয় এবং তথ্য সম্পূর্ণ গোপন থাকবে।"}
            </Text>
          </View>
          <Text style={styles.legalTitlecart}>
            {languageMode === 'en' ? "Feel free to contact us." : "নিঃসংকোচে যোগাযোগ করুন।"}
          </Text>
        </View>
      </ScrollView>
    </AppBackground>
  );
};

export default EmergencyContactScreen;

const styles = ScaledSheet.create({
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
    fontFamily: 'July-Bold',
  },
  callText: {
    color: 'rgba(255, 128, 128, 1)',
    fontSize: '12@ms',
    marginTop: '2@vs',
    fontFamily: 'July-Regular',
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