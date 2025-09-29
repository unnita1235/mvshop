import 'react-native-gesture-handler';
import { AppRegistry } from 'react-native';
import React from 'react';
import App from './App';
import Sentry from './sentry';

const SentryWrappedApp = () => (
  <Sentry.ErrorBoundary fallback={() => null}>
    <App />
  </Sentry.ErrorBoundary>
);

AppRegistry.registerComponent('MVShop', () => SentryWrappedApp);
