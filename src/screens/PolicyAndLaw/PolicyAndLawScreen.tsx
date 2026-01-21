import { FlatList, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { policyAndLawData } from '../../data/policyandlawData';
import PolicyAndLawComponent from '../../components/policyAndLawComponent/PolicyAndLawComponent';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import { Scale } from 'lucide-react-native';
import CustomEmergencyContactComponent from '../../components/customEmergencyContact/CustomEmergencyContactComponent';

const PolicyAndLawScreen = () => {
  return (
    <View style={styles.container}>
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
        contentContainerStyle={{
          gap: 10,
          paddingVertical: 20,
          paddingHorizontal: 20,
        }}
        showsVerticalScrollIndicator={false}
        style={styles.flatList}
        ListFooterComponent={() => (
          <View>
            <View style={styles.footerContainer}>
              <View style={styles.iconAndTextContainer}>
                <Scale color="rgba(0, 120, 111, 1)" size={moderateScale(28)} />
                <Text style={styles.text}>আইনি পরামর্শ</Text>
              </View>
              <View style={styles.descriptionContainer}>
                <Text style={styles.description}>
                  আইনি সহায়তা প্রয়োজন হলে নিকটস্থ আইনজীবী বা আইনি সহায়তা
                  কেন্দ্রে যোগাযোগ করুন সকল তথ্য সম্পূর্ণ গোপনীয় রাখা হবে।
                </Text>
              </View>
            </View>
            <CustomEmergencyContactComponent
              title={'২৪/৭ জরুরি হটলাইন'}
              hotLineNumber="৯৯৯"
            />
          </View>
        )}
      />
    </View>
  );
};

export default PolicyAndLawScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  flatList: {
    flex: 1,
    width: '100%',
  },
  footerContainer: {
    backgroundColor: 'rgba(240, 253, 250, 1)',
    borderRadius: moderateScale(16),
    padding: moderateScale(16),
    marginBottom: verticalScale(12),
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
    gap: moderateScale(12),
  },
  text: {
    color: 'rgba(0, 120, 111, 1)',
    fontSize: moderateScale(16),
    fontWeight: '400',
    lineHeight: verticalScale(24),
  },
  descriptionContainer: {
    marginTop: verticalScale(9),
    paddingHorizontal: moderateScale(40),
  },
  description: {
    color: 'rgba(0, 120, 111, 1)',
    fontSize: moderateScale(14),
    fontWeight: '400',
    lineHeight: verticalScale(23),
  },
});
