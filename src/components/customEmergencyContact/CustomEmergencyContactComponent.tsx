import React, { FC } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { moderateScale, ScaledSheet } from 'react-native-size-matters';
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
  return (
    <LinearGradient
      colors={['rgba(15, 23, 43, 1)', 'rgba(29, 41, 61, 1)']}
      style={styles.container}
    >
      <View style={styles.row}>
        {/* Icon */}
        <View
          style={styles.callContainer}
        >
          <Phone color="#fff" size={moderateScale(25)} />
        </View>

        {/* Text block */}
        <View style={styles.textBlock}>
          <Text style={styles.hotlineTxt} numberOfLines={1}>
            {title}
          </Text>
          <Text style={styles.hotlineNumber} numberOfLines={1}>
            {hotLineNumber}
          </Text>
        </View>

        {/* Button */}
        <TouchableOpacity
          style={styles.hotlineBtn}
          onPress={onPress}
          activeOpacity={0.7}
        >
          <Text style={styles.hotlineBtntxt} numberOfLines={1}>
            কল করুন
          </Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = ScaledSheet.create({
  container: {
    borderRadius: '16@ms',
    padding: '16@ms',
    marginBottom: '12@vs',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    width: '95%',
    alignSelf: 'center',
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  callContainer: {
    backgroundColor: 'rgba(251, 44, 54, 1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: '16@ms',
    flexShrink: 0,
    height: '47@ms',
    width: '47@ms',
    borderRadius: '23.5@ms',
  },

  textBlock: {
    flex: 1,
    marginRight: '12@ms',
    minWidth: 0,
  },

  hotlineTxt: {
    fontSize: '16@ms',
    fontWeight: '400',
    color: 'rgba(202, 213, 226, 1)',
    lineHeight: '20@ms',
  },

  hotlineNumber: {
    fontSize: '26@ms',
    fontWeight: '400',
    color: '#FFFFFF',
    lineHeight: '32@ms',
  },

  hotlineBtn: {
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '14@ms',
    height: '32@ms',
    paddingHorizontal: '16@ms',
    minWidth: '90@ms',
    flexShrink: 0,
  },

  hotlineBtntxt: {
    fontSize: '14@ms',
    fontWeight: '500',
    color: '#FFFFFF',
    lineHeight: '20@ms',
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
});

export default CustomEmergencyContactComponent;
