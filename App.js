import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux'
import NavigationPage from './src/containers/NavigationPage'

export default function App() {
  return (
    // <Provider>
    <NavigationPage />
    // </Provider>
  );
}
