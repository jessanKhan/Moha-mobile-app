import { FlatList, Text, View } from 'react-native';
import React from 'react';
import { policyAndLawData } from '../../data/policyandlawData';
import PolicyAndLawComponent from '../../components/policyAndLawComponent/PolicyAndLawComponent';
import { moderateScale, ScaledSheet } from 'react-native-size-matters';
import { Scale } from 'lucide-react-native';
import CustomEmergencyContactComponent from '../../components/customEmergencyContact/CustomEmergencyContactComponent';
import Header from '../../components/Header';

const PolicyAndLawScreen = () => {
  return (
    <View style={styles.container}>
      <Header
        title="নীতি ও আইন"
        subtitle="মানব পাচার প্রতিরোধে প্রযোজ্য আইনসমূহ"
        showBackButton
      />

      <FlatList
        data={policyAndLawData}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <PolicyAndLawComponent
            title={item.title}
            description={item.description}
            icon={item.icon}
            iconColors={item.iconColors}
            iconBgColor={item.iconBgColor}
          />
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        style={styles.flatList}
        ListFooterComponent={() => (
          <View style={styles.footer}>
            <View style={styles.footerContainer}>
              <View style={styles.iconAndTextContainer}>
                <Scale color="rgba(0, 120, 111, 1)" size={moderateScale(28)} />
                <Text style={styles.text}>আইনি পরামর্শ</Text>
              </View>

              <View style={styles.descriptionContainer}>
                <Text style={styles.description}>
                  আইনি সহায়তা প্রয়োজন হলে নিকটস্থ আইনজীবী বা আইনি সহায়তা
                  কেন্দ্রে যোগাযোগ করুন। সকল তথ্য সম্পূর্ণ গোপনীয় রাখা হবে।
                </Text>
              </View>
            </View>

            <CustomEmergencyContactComponent
              title="২৪/৭ জরুরি হটলাইন"
              hotLineNumber="৯৯৯"
            />
          </View>
        )}
      />
    </View>
  );
};

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  flatList: {
    flex: 1,
    width: '100%',
  },
  listContent: {
    gap: '12@vs',
    paddingVertical: '20@vs',
    paddingHorizontal: '20@ms',
  },
  footer: {
    gap: '12@vs',
    paddingTop: '6@vs',
    paddingBottom: '20@vs',
  },
  footerContainer: {
    backgroundColor: 'rgba(240, 253, 250, 1)',
    borderRadius: '16@ms',
    padding: '16@ms',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    width: '95%',
    alignSelf: 'center',
  },
  iconAndTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: '12@ms',
  },
  text: {
    color: 'rgba(0, 120, 111, 1)',
    fontSize: '16@ms',
    fontWeight: '400',
    lineHeight: '24@ms',
  },
  descriptionContainer: {
    marginTop: '10@vs',
    paddingLeft: '40@ms',
  },
  description: {
    color: 'rgba(0, 120, 111, 1)',
    fontSize: '14@ms',
    fontWeight: '400',
    lineHeight: '22@ms',
  },
});

export default PolicyAndLawScreen;
