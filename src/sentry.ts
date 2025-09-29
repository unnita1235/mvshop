import * as Sentry from '@sentry/react-native';

const dsn = process.env.SENTRY_DSN || '';

Sentry.init({
  dsn,
  tracesSampleRate: 1.0,
  release: process.env.RELEASE_VERSION || 'mvshop@dev',
  beforeBreadcrumb(breadcrumb) {
    if (breadcrumb.data?.email) {
      breadcrumb.data.email = '[masked]';
    }
    if (breadcrumb.data?.token) {
      breadcrumb.data.token = '[masked]';
    }
    return breadcrumb;
  },
});

export default Sentry;
export const ErrorBoundary = Sentry.Native.ErrorBoundary;
