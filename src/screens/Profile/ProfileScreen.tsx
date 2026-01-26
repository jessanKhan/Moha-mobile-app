import React from 'react';
import { Text, View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import Header from '../../components/Header';

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
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
  },
  subtitle: {
    fontSize: '14@ms',
    color: '#6B7280',
    marginTop: '8@vs',
  },
});

export default ProfileScreen;
