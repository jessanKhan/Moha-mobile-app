import { StyleSheet, Text, View, Dimensions } from 'react-native';
import React, { FC } from 'react';
import { moderateScale, ScaledSheet } from 'react-native-size-matters';
import LinearGradient from 'react-native-linear-gradient';
import CustomCommonIcon from '../customCommonIconComponent/CustomCommonIcon';
import { LucideIcon } from 'lucide-react-native';

const { width } = Dimensions.get('window');

type InitiativeCardProps = {
  title?: string;
  description?: string;
  icon?: LucideIcon;
  colors: (string | number)[];
  iconBgColor?: string;
};

const InitiativesComponent: FC<InitiativeCardProps> = ({
  title,
  description,
  icon,
  colors,
  iconBgColor,
}) => {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={colors as (string | number)[]}
        style={styles.linearGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <View style={styles.iconAndTextContainer}>
          <CustomCommonIcon
            icon={icon}
            bgColor="rgba(255, 255, 255, 0.2)"
            iconColor={iconBgColor || '#ffffff'}
            size={25}
          />
          <Text style={styles.text} numberOfLines={1}>
            {title}
          </Text>
        </View>
      </LinearGradient>
      <View style={styles.textDescriptionContainer}>
        <Text style={styles.textDescription}>{description}</Text>
      </View>
    </View>
  );
};

const styles = ScaledSheet.create({
  container: {
    width: width - moderateScale(15),
    backgroundColor: '#FFFFFF',
    borderRadius: '14@ms',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 10,
  },
  linearGradient: {
    height: '65@vs',
    borderTopLeftRadius: '14@ms',
    borderTopRightRadius: '14@ms',
  },
  iconAndTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: '100%',
    paddingHorizontal: '20@ms',
    gap: '12@ms',
  },
  text: {
    flex: 1,
    fontSize: '14@ms',
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 1)',
  },
  textDescriptionContainer: {
    padding: '20@ms',
  },
  textDescription: {
    fontSize: '12@ms',
    fontWeight: '400',
    color: 'rgba(69, 85, 108, 1)',
    lineHeight: '22@ms',
  },
});

export default InitiativesComponent;
