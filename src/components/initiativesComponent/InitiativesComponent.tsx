import { StyleSheet, Text, View, Dimensions } from 'react-native';
import React, { FC } from 'react';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
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
        colors={colors}
        style={styles.linearGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <View style={styles.iconAndTextContainer}>
          <CustomCommonIcon
            icon={icon}
            bgColor="rgba(255, 255, 255, 0.2)"
            iconColor={iconBgColor || '#ffffff'}
            size={moderateScale(28)}
          />
          <Text style={styles.text} numberOfLines={2}>
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

export default InitiativesComponent;

const styles = StyleSheet.create({
  container: {
    width: width - 32,
    backgroundColor: '#FFFFFF',
    borderRadius: scale(14),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 10,
  },
  linearGradient: {
    height: verticalScale(82),
    borderTopLeftRadius: scale(14),
    borderTopRightRadius: scale(14),
  },
  iconAndTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: '100%',
    paddingHorizontal: scale(20),
    gap: scale(12),
  },
  text: {
    flex: 1, // ✅ Text কে Full width নিতে দিবে
    fontSize: scale(18),
    fontWeight: '400',
    color: 'rgba(255, 255, 255, 1)',
    flexWrap: 'wrap',
  },
  textDescriptionContainer: {
    padding: scale(20),
  },
  textDescription: {
    fontSize: scale(16),
    fontWeight: '400',
    color: 'rgba(69, 85, 108, 1)',
    lineHeight: scale(22),
  },
});
