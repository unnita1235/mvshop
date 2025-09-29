import { Platform } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';

export function initNotifications() {
  if (Platform.OS === 'android') {
    PushNotification.createChannel(
      {
        channelId: 'mvshop-high-priority',
        channelName: 'High Priority Notifications',
        channelDescription: 'Used for important notifications',
        importance: 4,
        vibrate: true,
      },
      (created) => console.log(`CreateChannel returned '${created}'`)
    );

    messaging().setBackgroundMessageHandler(async (remoteMessage) => {
      console.log('Message handled in the background!', remoteMessage);
    });
  }

  messaging()
    .requestPermission()
    .then((authStatus) => {
      console.log('Authorization status:', authStatus);
    })
    .catch(console.error);

  messaging().onTokenRefresh((token) => {
    console.log('New FCM token:', token);
    // Send token to backend if needed
  });

  messaging().onMessage(async (remoteMessage) => {
    console.log('Foreground message:', remoteMessage);
    PushNotification.localNotification({
      channelId: 'mvshop-high-priority',
      title: remoteMessage.notification?.title,
      message: remoteMessage.notification?.body || '',
    });
  });
}
