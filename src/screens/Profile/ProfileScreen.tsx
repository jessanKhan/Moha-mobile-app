import React from 'react';
import { Text, View, Dimensions } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import Header from '../../components/Header';
import LinearGradient from 'react-native-linear-gradient';

const { width } = Dimensions.get('window');

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      {/* Bottom Left Gradient Box */}
      <LinearGradient
        colors={['#E8FFD4', '#CEE1FC']}
        style={styles.gradientBox}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />

      {/* Top Right Gradient Box */}
      <LinearGradient
        colors={['#E9D4FF', '#FCCEE8']}
        style={styles.gradientBoxTop}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />

      <Header
        variant="default"
        title="প্রোফাইল"
        showBackButton={true}
      />
      <View style={styles.content}>
        <Text style={styles.title}>
          Profile Screen
        </Text>
        <Text style={styles.subtitle}>
          Manage your personal information.
        </Text>
      </View>

    </View>

  );
};

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20@ms',
  },
  title: {
    fontSize: '24@ms',
    fontWeight: 'bold',
    color: '#059669',
    fontFamily: 'July-Bold',
  },
  subtitle: {
    fontSize: '14@ms',
    color: '#6B7280',
    marginTop: '8@vs',
    fontFamily: 'July-Regular',
  },
  gradientBox: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: width * 0.5,
    height: width * 0.5,
    borderTopRightRadius: 0,
  },
  gradientBoxTop: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: width * 0.5,
    height: width * 0.5,
  },
});

export default ProfileScreen;
