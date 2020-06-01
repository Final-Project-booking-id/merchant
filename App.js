import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux'
import NavigationPage from './src/containers/NavigationPage'
import store from './src/store'

export default function App() {
  return (
    <Provider store={store}>
      <NavigationPage />
    </Provider>
  );
}
