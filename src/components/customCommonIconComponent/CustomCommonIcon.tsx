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
      style={[styles.container, { backgroundColor: bgColor }, (!Icon && imageUrl) ? { padding: 0 } : null]}
    >
      {Icon ? (
        <Icon color={iconColor} size={moderateScale(size)} />
      ) : (
        imageUrl && (
          <Image
            source={{ uri: imageUrl }}
            style={{ width: moderateScale(size), height: moderateScale(size) }}
            resizeMode="contain"
          />
        )
      )}
    </View>
  );
};

const styles = ScaledSheet.create({
  container: {
    height: '40@vs',
    width: '40@ms',
    borderRadius: '10@ms',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '6@ms',
  },
});

export default CustomCommonIcon;
