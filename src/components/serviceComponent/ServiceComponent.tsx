import { Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { ChartColumn } from 'lucide-react-native';
import { ScaledSheet, moderateScale } from 'react-native-size-matters';

const ServiceComponent = () => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.container}
    >
      <View
        style={styles.iconContainer}
      >
        <ChartColumn color="#fff" size={moderateScale(28)} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.text}>পরিসংখ্যান</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = ScaledSheet.create({
  container: {
    height: '136@vs',
    width: '190@ms',
    backgroundColor: '#FFFFFF',
    borderRadius: '10@ms',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 10,
  },
  iconContainer: {
    height: '56@vs',
    width: '56@ms',
    borderRadius: '14@ms',
    backgroundColor: '#1447E6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    marginTop: '10@vs',
  },
  text: {
    fontSize: '20@ms',
    fontWeight: 'bold',
    color: '#1F2937',
  },
});

export default ServiceComponent;
