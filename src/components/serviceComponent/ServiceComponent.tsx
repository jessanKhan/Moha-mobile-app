import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { ChartColumn } from 'lucide-react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

const ServiceComponent = () => {
  return (
    <TouchableOpacity
      className="items-center justify-center bg-[#FFFFFF]"
      style={styles.container}
    >
      <View
        className="items-center justify-center bg-[#1447E6]"
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

export default ServiceComponent;

const styles = StyleSheet.create({
  container: {
    height: verticalScale(136),
    width: scale(190),
    backgroundColor: '#FFFFFF',
    borderRadius: scale(10),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 10,
  },
  iconContainer: {
    height: verticalScale(56),
    width: scale(56),
    borderRadius: scale(14),
  },
  textContainer: {
    marginTop: verticalScale(10),
  },
  text: {
    fontSize: scale(20),
    fontWeight: 'bold',
  },
});
