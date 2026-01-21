import {
  LayoutAnimation,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  UIManager,
  View,
} from 'react-native';
import React, { FC, useState } from 'react';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import CustomCommonIcon from '../customCommonIconComponent/CustomCommonIcon';
import { Scale, ChevronDown, ChevronUp, LucideIcon } from 'lucide-react-native';

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental?.(true);
}

interface PolicyAndLawComponentProps {
  title?: string;
  description?: string;
  icon?: LucideIcon;
  iconColors?: string;
  iconBgColor?: string;
}

const PolicyAndLawComponent: FC<PolicyAndLawComponentProps> = ({
  title,
  description,
  icon,
  iconColors,
  iconBgColor,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsOpen(!isOpen);
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggle} style={styles.leftIconContainer}>
        <View style={styles.iconAndTextContainer}>
          <CustomCommonIcon
            icon={icon}
            bgColor={iconBgColor}
            iconColor={iconColors}
            size={moderateScale(28)}
          />
          <Text style={styles.text}>{title}</Text>
        </View>
        {isOpen ? (
          <ChevronUp color="rgba(144, 161, 185, 1)" size={moderateScale(28)} />
        ) : (
          <ChevronDown
            color="rgba(144, 161, 185, 1)"
            size={moderateScale(28)}
          />
        )}
      </TouchableOpacity>
      {isOpen && (
        <View style={styles.textDescriptionContainer}>
          <View style={styles.textDescriptionsContainer}>
            <Text style={styles.textDescription}>{description}</Text>
          </View>
        </View>
      )}
    </View>
  );
};

export default PolicyAndLawComponent;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
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
  leftIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconAndTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: moderateScale(20),
  },
  text: {
    fontSize: moderateScale(16),
    fontWeight: '400',
    color: 'rgba(29, 41, 61, 1)',
  },
  textDescriptionContainer: {
    borderTopWidth: 0.5,
    borderColor: 'rgba(178, 190, 195, 1)',
    marginTop: verticalScale(16),
    marginHorizontal: -moderateScale(16),
  },
  textDescriptionsContainer: {
    marginTop: verticalScale(12),
    paddingLeft: moderateScale(90),
  },
  textDescription: {
    fontSize: moderateScale(14),
    fontWeight: '400',
    color: 'rgba(69, 85, 108, 1)',
  },
});
