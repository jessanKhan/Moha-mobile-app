import { FlatList, StyleSheet, View } from 'react-native';
import React from 'react';
import { initiativeData } from '../../data/initiativesData';
import InitiativesComponent from '../../components/initiativesComponent/InitiativesComponent';
import Header from '../../components/Header';
import { scale } from 'react-native-size-matters';

const InitiativesScreen = () => {
  return (
    <View style={styles.container}>
      <Header
        title="উদ্যোগসমূহ"
        subtitle="মানব পাচার প্রতিরোধে উদ্যোগ"
        showBackButton
      />
      <FlatList
        data={initiativeData}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={{ overflow: 'hidden', borderRadius: scale(14) }}>
            <InitiativesComponent
              title={item.title}
              description={item.description}
              icon={item.icon}
              colors={item.gradientColors}
              iconBgColor={item.iconBgColor}
            />
          </View>
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        style={styles.flatList}
      />
    </View>
  );
};

export default InitiativesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  flatList: {
    flex: 1,
    width: '100%',
  },
  listContent: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    gap: 16,
  },
});
