import { View, Image } from 'react-native';
import React, { FC } from 'react';
import { ScaledSheet, moderateScale } from 'react-native-size-matters';
import { CustomCommonIconProps } from '../../type/CustomCommonIconType';

const CustomCommonIcon: FC<CustomCommonIconProps> = ({
  icon,
  imageUrl,
  bgColor,
  iconColor,
  size = 24,
}) => {
  const Icon: any = icon;
  return (
    <View
      style={[styles.container, { backgroundColor: bgColor }, imageUrl ? { padding: 0 } : null]}
    >
      {imageUrl ? (
        <Image
          source={{ uri: imageUrl }}
          style={{ width: moderateScale(size), height: moderateScale(size) }}
          resizeMode="contain"
        />
      ) : (
        Icon && <Icon color={iconColor} size={moderateScale(size)} />
      )}
    </View>
  );
};

const styles = ScaledSheet.create({
  container: {
    height: '40@vs',
    width: '40@ms',
    borderRadius: '14@ms',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '25@ms',
  },
});

export default CustomCommonIcon;
