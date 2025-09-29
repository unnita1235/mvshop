import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './navigation/RootNavigator';
import Sentry, { ErrorBoundary } from './sentry';
import { initNotifications } from './notifications/notifications';
import Toast from 'react-native-toast-message';

initNotifications();

const linking = {
  prefixes: ['mvshop://'],
  config: {
    screens: {
      Order: 'order/:id',
      ProductList: 'products',
      ProductDetail: 'products/:id',
      Cart: 'cart',
      Checkout: 'checkout',
    },
  },
};

function FallbackUI() {
  return null; // Customize fallback UI if needed
}

export default function App() {
  return (
    <ErrorBoundary fallback={<FallbackUI />}>
      <NavigationContainer linking={linking}>
        <RootNavigator />
        <Toast />
      </NavigationContainer>
    </ErrorBoundary>
  );
}
