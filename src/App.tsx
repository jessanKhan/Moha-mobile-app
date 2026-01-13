import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar, StyleSheet, Text, View, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const Stack = createNativeStackNavigator();

function HomeScreen() {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={[styles.container, isDarkMode ? styles.darkBg : styles.lightBg]}>
      <Text style={[styles.title, isDarkMode ? styles.darkText : styles.lightText]}>
        Home Screen
      </Text>
      <Text style={styles.subtitle}>
        Standard React Native styles are now used.
      </Text>
    </View>
  );
}

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={isDarkMode ? 'black' : 'white'}
      />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lightBg: {
    backgroundColor: 'white',
  },
  darkBg: {
    backgroundColor: 'black',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  lightText: {
    color: 'black',
  },
  darkText: {
    color: 'white',
  },
  subtitle: {
    color: 'gray',
    marginTop: 8,
  },
});

export default App;
