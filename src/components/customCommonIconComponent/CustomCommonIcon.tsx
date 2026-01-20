import { StyleSheet, View } from 'react-native';
import React, { FC } from 'react';
import { scale, verticalScale } from 'react-native-size-matters';
import { CustomCommonIconProps } from '../../type/CustomCommonIconType';

const CustomCommonIcon: FC<CustomCommonIconProps> = ({
  icon,
  bgColor,
  iconColor,
  size,
}) => {
  const Icon: any = icon;
  return (
    <View
      className="items-center justify-center"
      style={[styles.container, { backgroundColor: bgColor }]}
    >
      {/* <Building color="#fff" size={moderateScale(28)} /> */}
      <Icon color={iconColor} size={size} />
    </View>
  );
};

export default CustomCommonIcon;

const styles = StyleSheet.create({
  container: {
    height: verticalScale(40),
    width: scale(40),
    borderRadius: scale(14),
  },
});
