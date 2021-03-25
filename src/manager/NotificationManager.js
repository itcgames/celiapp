import { Alert, Platform } from 'react-native';
import * as Permissions from 'expo-permissions';
import LanguageManager from './LanguageManager';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';

//request permission to send notifications to user.
async function getiOSNotificationPermission() {
    const { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    if (status !== 'granted') 
    {
        await Permissions.askAsync(Permissions.NOTIFICATIONS);
    }
};

// https://docs.expo.io/push-notifications/push-notifications-setup/
async function registerForPushNotificationsAsync() {
  if (Constants.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      Alert.alert(
        "Not granted",
        "My Alert Msg",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ],
        { cancelable: false }
      );
      console.warn('Failed to get push token for push notification!');
      return;
    }
    const token = (await Notifications.getExpoPushTokenAsync()).data;
    console.warn("celiapp_token");
    console.warn(token);
    Alert.alert(
      "Token",
      token,
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ],
      { cancelable: false }
    );
    //this.setState({ expoPushToken: token });
  } else {
    
    console.warn('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }
};

export default class NotificationManager 
{
    static getInstance()
    {
        if (NotificationManager.instance == null)
        {
            NotificationManager.instance = new NotificationManager();
            this.instance.initialize();
            //this.instance.scheduleNotification();
        }
        return this.instance;
    }

    scheduleNotification() 
    {
        console.log("Scheduling a notification...");
        //every time the user logs anything, reset all current notifications
        Notifications.cancelAllScheduledNotificationsAsync();

        const title = LanguageManager.getInstance().getText('NOTIFICATION_TITLE');
        const body = LanguageManager.getInstance().getText('NOTIFICATION_BODY');

        const localnotification = 
        {
            title: title,
            body: body,
            android: { sound: true },
            ios: { sound: true },
            data: {
                title: title,
                body: body
            }
        };
        
        let now = new Date();
        let tomorrow = new Date();
        tomorrow.setHours(now.getHours() + 12);

        // if the new time falls early in the morning or late at night, set it to the next morning
        if (tomorrow.getHours() <= 7 || tomorrow.getHours() >= 22)
        {
            tomorrow.setHours(8, 0, 0);
            tomorrow.setDate(tomorrow.getDate() + 1);
        }
        const schedulingOptions = { time: tomorrow };
        Notifications.scheduleLocalNotificationAsync(localnotification, schedulingOptions);
    }

    listenForNotifications = () =>
    {
        Notifications.addListener(notification => 
        {
            if (notification.origin === 'received' && Platform.OS === 'ios') 
            {
                if (notification.data)
                {
                    Alert.alert(notification.data.title, notification.data.body);
                }
            }
        });
    };

    initialize() 
    {
      console.log('Initialising notifications...');
      registerForPushNotificationsAsync();
      //getiOSNotificationPermission();
      //this.listenForNotifications();
    }
}
