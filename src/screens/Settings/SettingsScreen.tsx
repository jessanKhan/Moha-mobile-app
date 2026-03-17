import React from 'react';
import { View, Text } from 'react-native';
import Header from '../../components/Header';
import { ScaledSheet } from 'react-native-size-matters';
import AppBackground from '../../components/AppBackground';

const SettingsScreen = () => {
  return (
    <AppBackground>
      <Header
        variant="default"
        title="সেটিংস"
        showBackButton={true}
      />
      <View style={styles.content}>
        <Text style={styles.title}>
          Settings Screen
        </Text>
        <Text style={styles.description}>
          Configure your app preferences.
        </Text>
      </View>
    </AppBackground>
  );
};

const styles = ScaledSheet.create({
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20@ms',
  },
  title: {
    fontSize: '24@ms',
    fontWeight: 'bold',
    color: '#D97706',
    fontFamily: 'July-Bold',
  },
  description: {
    fontSize: '14@ms',
    color: '#6B7280',
    marginTop: '8@vs',
    fontFamily: 'July-Regular',
  },
});

export default SettingsScreen;
