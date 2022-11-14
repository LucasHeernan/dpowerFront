import React from 'react';
import Navigation from './Navigation';
import { Provider } from 'react-redux';
import { store, persistor } from './src/redux';
import { PersistGate } from 'redux-persist/integration/react';
import { Text } from 'react-native';
import { StripeProvider } from '@stripe/stripe-react-native';
import CheckoutForm from './src/components/CheckoutForm';

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={<Text>Loading...</Text>} persistor={persistor}>
        <Navigation />
      </PersistGate>
      {/* <StripeProvider publishableKey='pk_test_51M2e4QDkxUT8dvAmJVln7ly2JTzdSGAKTwKmoj5Oo9azUxYohYz6upz0ER8JboiIDVMOgFzzgd0CLQbJlKYjoMqm00wXrVxeUY'>
        <CheckoutForm />
      </StripeProvider> */}
    </Provider>
  );
}
