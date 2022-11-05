import React from "react";
import ReactDOM from "react-dom";
import Navigation from './Navigation'
import { Provider } from 'react-redux';
import { store, persistor } from './src/redux';
import { PersistGate } from 'redux-persist/integration/react'
import { Text } from "react-native";

export default function App() {
  return (
      <Provider store={store}>
        <PersistGate loading={<Text>Loading...</Text>} persistor={persistor}>
          <Navigation/>
        </PersistGate>
      </Provider>
  );
}