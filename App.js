import React from "react";
import ReactDOM from "react-dom";
import Navigation from './Navigation'
import { Provider } from 'react-redux';
import { store, persistor } from './src/redux';
import { PersistGate } from 'redux-persist/integration/react'
import { Text } from "react-native";
import { StripeProvider } from "@stripe/stripe-react-native";

export default function App() {
  return (
    <StripeProvider publishableKey="pk_test_51M4E9pEh4Kq9bXBevoiyg0Hj62Wpftk46CMLdh3EeXKrzuTRcQ183sVmxQqdCYFiiwih6ncz6hxFluRgC8jOQacj00rV3b75qe">
      <Provider store={store}>
        <PersistGate loading={<Text>Loading...</Text>} persistor={persistor}>
          <Navigation/>
        </PersistGate>
      </Provider>
      </StripeProvider> 
  );
}