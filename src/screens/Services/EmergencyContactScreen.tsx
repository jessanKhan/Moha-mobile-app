import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import Header from '../../components/Header';
import { Clock3 } from 'lucide-react-native';
import { moderateScale, ScaledSheet } from 'react-native-size-matters';

const EmergencyContactScreen = () => {
  return (
    <View style={styles.container}>
      <Header title="জরুরি যোগাযোগ" showBackButton />

      <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View
          style={styles.bannerContainer}
        >
          <View
            style={styles.iconWrapper}
          >
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
      </ScrollView>
    </View>
  );
};

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollContent: {
    flex: 1,
    paddingHorizontal: '16@ms',
    paddingTop: '16@vs',
  },
  bannerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: '16@ms',
    paddingHorizontal: '16@ms',
    paddingVertical: '16@ms',
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
    fontWeight: '600',
  },
  callText: {
    color: 'rgba(255, 128, 128, 1)',
    fontSize: '12@ms',
    marginTop: '2@vs',
  },
});

export default EmergencyContactScreen;
