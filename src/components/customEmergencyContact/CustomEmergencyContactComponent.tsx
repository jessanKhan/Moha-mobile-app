import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { FC } from 'react';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import LinearGradient from 'react-native-linear-gradient';
import { Phone } from 'lucide-react-native';

type CustomEmergencyContactComponentProps = {
  onPress?: () => void;
  title?: string;
  hotLineNumber?: string;
};

const CustomEmergencyContactComponent: FC<
  CustomEmergencyContactComponentProps
> = ({ onPress, title, hotLineNumber }) => {
  const CIRCLE_SIZE = 47;

  return (
    <LinearGradient
      colors={['rgba(15, 23, 43, 1)', 'rgba(29, 41, 61, 1)']}
      style={styles.container}
    >
      <View style={styles.titleWithContainer}>
        <View
          style={[
            styles.callContainer,
            {
              height: moderateScale(CIRCLE_SIZE),
              width: moderateScale(CIRCLE_SIZE),
              borderRadius: moderateScale(CIRCLE_SIZE) / 2,
            },
          ]}
        >
          <Phone color="#fff" size={moderateScale(25)} />
        </View>

        <View>
          <Text style={styles.hotlineTxt}>{title}</Text>
          <Text style={styles.hotlineNumber}>{hotLineNumber}</Text>
        </View>

        <View style={{ flex: 1 }} />

        <TouchableOpacity style={styles.hotlineBtn}>
          <Text style={styles.hotlineBtntxt}>কল করুন</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

export default CustomEmergencyContactComponent;

const styles = StyleSheet.create({
  container: {
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
  titleWithContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: moderateScale(16),
  },
  callContainer: {
    backgroundColor: 'rgba(251, 44, 54, 1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  hotlineTxt: {
    fontSize: moderateScale(16),
    fontWeight: '400',
    color: 'rgba(202, 213, 226, 1)',
    lineHeight: moderateScale(20),
  },
  hotlineNumber: {
    fontSize: moderateScale(26),
    fontWeight: '400',
    color: '#FFFFFF',
    lineHeight: moderateScale(32),
  },
  hotlineBtn: {
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: moderateScale(14),
    height: moderateScale(32),
    width: moderateScale(82),
  },
  hotlineBtntxt: {
    fontSize: moderateScale(12),
    fontWeight: '400',
    color: '#FFFFFF',
    lineHeight: moderateScale(20),
  },
});
