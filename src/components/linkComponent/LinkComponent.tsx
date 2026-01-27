import { Text, TouchableOpacity, View } from 'react-native';
import { moderateScale, ScaledSheet } from 'react-native-size-matters';
import React, { FC } from 'react';

interface LinkComponentProps {
  text?: string;
  icon?: any;
  onPress?: () => void;
  isFirst?: boolean;
}

const LinkComponent: FC<LinkComponentProps> = ({
  text,
  icon: Icon,
  onPress,
  isFirst = false,
}) => {
  return (
    <TouchableOpacity
      style={[styles.container, !isFirst && styles.notFirst]}
      onPress={onPress}
    >
      <Text style={styles.txt}>{text}</Text>
      <Icon color="rgba(144, 161, 185, 1)" size={moderateScale(20)} />
    </TouchableOpacity>
  );
};

export default LinkComponent;

const styles = ScaledSheet.create({
  container: {
    height: 'auto',
    width: '100%',
    borderRadius: '14@ms',
    borderWidth: '1@ms',
    borderColor: 'rgba(144, 161, 185, 1)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '20@ms',
  },
  notFirst: {
    marginTop: '12@ms',
  },
  txt: {
    fontSize: '15@ms',
    fontWeight: '400',
    color: 'rgba(29, 41, 61, 1)',
    lineHeight: '20@ms',
  },
});
