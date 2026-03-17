import React from 'react';
import { StatusBar, useColorScheme, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './navigation/AppNavigator';

import { ApolloProvider } from '@apollo/client/react';
import client from './api/apolloClient';
import { Provider } from 'react-redux';
import { store, RootState } from './store';
import { useDispatch, useSelector } from 'react-redux';
import { hideToast } from './store/slices/toastSlice';
import CustomToast from './components/CustomToast';
import NetworkStatusHandler from './components/NetworkStatusHandler';

function AppContent() {
  const dispatch = useDispatch();
  const { visible, message, type } = useSelector((state: RootState) => state.toast);

  console.log('Toast State:', { visible, message, type });

  return (
    <View style={{ flex: 1 }}>
      <NetworkStatusHandler>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </NetworkStatusHandler>
      {visible && (
        <CustomToast
          message={message}
          type={type}
          onHide={() => dispatch(hideToast())}
        />
      )}
    </View>
  );
}

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <Provider store={store}>
      <ApolloProvider client={client}>
        <SafeAreaProvider>
          <StatusBar
            barStyle="light-content"
            backgroundColor="transparent"
            translucent={true}
          />
          <AppContent />
        </SafeAreaProvider>
      </ApolloProvider>
    </Provider>
  );
}

export default App;
