import { FlatList, StyleSheet } from 'react-native';
import React from 'react';
import { initiativeData } from '../../data/initiativesData';
import InitiativesComponent from '../../components/initiativesComponent/InitiativesComponent';
import Header from '../../components/Header';
import AppBackground from '../../components/AppBackground';

const Initiatives = () => {
  return (
    <AppBackground>
      <Header
        title="উদ্যোগসমূহ"
        subtitle="মানব পাচার প্রতিরোধে উদ্যোগ"
        showBackButton
      />
      <FlatList
        data={initiativeData}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <InitiativesComponent
            title={item.title}
            description={item.description}
            icon={item.icon}
            colors={item.gradientColors}
            iconBgColor={item.iconBgColor}
          />
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        style={styles.flatList}
      />
    </AppBackground>
  );
};

export default Initiatives;

const styles = StyleSheet.create({
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
