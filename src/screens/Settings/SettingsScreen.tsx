import React from 'react';
import { View, Text } from 'react-native';
import Header from '../../components/Header';
import { ScaledSheet } from 'react-native-size-matters';

const SettingsScreen = () => {
  return (
    <View style={styles.container}>
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
    color: '#D97706',
  },
  description: {
    fontSize: '14@ms',
    color: '#6B7280',
    marginTop: '8@vs',
  },
});

export default SettingsScreen;
