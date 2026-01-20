import { FlatList, StyleSheet, Text, View, Dimensions } from 'react-native';
import React from 'react';
import { initiativeData } from '../../data/initiativesData';
import InitiativesComponent from '../../components/initiativesComponent/InitiativesComponent';

const { width, height } = Dimensions.get('window');

const Initiatives = () => {
  return (
    <View style={styles.container}>
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
    </View>
  );
};

export default Initiatives;

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
