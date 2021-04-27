import React from 'react';
import { View, StyleSheet, AppState } from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';
import LoadingScreen from './src/screens/LoadingScreen';
import DatabaseManager from './src/manager/DatabaseManager';
import LanguageManager from './src/manager/LanguageManager';
import GlutonManager from './src/manager/GlutonManager';
import GearManager from './src/manager/GearManager';
import UploadManager from './src/manager/UploadManager';
import NotificationManager from './src/manager/NotificationManager';
import UsernameDialog from './src/components/UsernameDialog';
import TokenManager from './src/manager/TokenManager';
import LoggingStore from './src/manager/buddyManager/LoggingStore';

import { } from 'react-native-dotenv';
import FlashMessage from 'react-native-flash-message';
import { showMessage } from "react-native-flash-message";
import OnBoardingScreen from './src/screens/OnboardingScreen';
import GoalSettingScreen from "./src/screens/GoalSettingScreen";

// export default class App extends React.Component {
//   state = {
//     isSplashReady: false,
//     isAppReady: false,
//     appState: AppState.currentState
//   }
//
//   componentDidMount() {
//     DatabaseManager.getInstance().loadSettings(null,
//       (_, error) => { alert("error loading settings" + JSON.stringify(error)); },
//       (_, { rows: { _array } }) => {
//         let settings = {};
//         for (var i in _array) {
//           settings[_array[i].name] = JSON.parse(_array[i].objData);
//         }
//         this.initApplication(settings);
//       }
//     );
//
//     AppState.addEventListener('change', this._handleAppStateChange);
//   }
//
//   componentWillUnmount() {
//     AppState.removeEventListener('change', this._handleAppStateChange);
//     console.log("unmounting App")
//   }
//
//   _handleAppStateChange = (nextAppState) => {
//     if (
//       nextAppState.match(/inactive|background/) &&
//       this.state.appState === 'active'
//     ) {
//       this.uploadFreshData();
//       console.log('App is going to background!');
//     }
//     this.setState({ appState: nextAppState });
//   };
//
//   initApplication(settings) {
//     LanguageManager.getInstance().setLanguage(settings.language);
//     GlutonManager.getInstance().setBuddy(settings.nickname);
//
//     GearManager.getInstance().setWsHost(settings.wsHost);
//     GearManager.getInstance().setGearHost(settings.gearHost);
//     GearManager.getInstance().connect();
//
//     this.setState({
//       isSplashReady: true,
//     didShowOnBoarding: !!settings.didShowOnBoarding,
//     didShowGoalSettingsPage: !!settings.didShowGoalSettingsPage,
//       hasUserId: !!settings.userId,
//       userId: settings.userId,
//       password: settings.password,
//       loggedIn: false,
//       gamify: settings.gamify
//     });
//
//     if (this.state.hasUserId) {
//       TokenManager.getInstance().refreshToken(this.state.userId, this.state.password, this.loginFailedExternally, this.onLoginFailed, this.onLoginSuccess);
//     }
//
//     this.uploadFreshData();
//
//     NotificationManager.getInstance(); //just to show the user the notification permission screen.
//
//
//     setTimeout(() => this.setState({ isAppReady: true }), 3000);
//   }
//
//   handleUserLogin = (userName, password) => {
//     TokenManager.getInstance().login(userName, password, this.loginFailedExternally, this.onLoginFailed, this.onLoginSuccess);
//   }
//
//   handleUserRegistration = (nickname, userName, password) => {
//     // nickname eat up atm!
//     TokenManager.getInstance().registerUser(nickname, userName, password,
//       () => showMessage({
//         message: "Sign up failed!",
//         description: "You may have no Internet access!",
//         type: "warning",
//       }),
//       () => showMessage({
//         message: "Sign up failed!",
//         description: "Your email address may not be whitelisted. Please contact desqol.study@gmail.com.",
//         type: "warning",
//       }),
//       this.onLoginSuccess);
//   }
//
//   // returned statuscode is 200:
//   onLoginSuccess = (res, userData) => {
//     const { statusCode, data } = res;
//     const { username, pw } = userData;
//
//     let showMsg = !this.state.hasUserId;
//
//     this.setState({
//       hasUserId: true,
//       userId: username,
//       password: pw,
//       gamify: data.gamify
//     });
//
//     DatabaseManager.getInstance().saveSettings('userId', username, (error) => { alert(error) }, null);
//     DatabaseManager.getInstance().saveSettings('password', pw, (error) => { alert(error) }, null);
//     DatabaseManager.getInstance().saveSettings('gamify', data.gamify === true ? 1 : -1, (error) => { alert(error) }, null);
//
//     // set gamification flag in Store:
//     if (data.gamify !== LoggingStore.gamificationFlag) {
//       LoggingStore.setGamificationFlag(data.gamify);
//     }
//     if (showMsg) {
//       showMessage({
//         message: "Welcome to CeliApp",
//         description: "... and the 21-day challenge!",
//         type: "success",
//       });
//     }
//   }
//
//   onLoginFailed = (res, userData) => {
//     const { statusCode, data } = res;
//
//     showMessage({
//       message: "Sign in failed!",
//       description: data.message,
//       type: "warning",
//     });
//   }
//
//
//   /*
//   FOR LOGINS WITHOUT INTERNET/SERVER CONNECTION ONLY:
//   */
//   loginFailedExternally = (res, userData) => {
//     // no internet connection? server offline? etc. --> set gamify-flag randomly!
//     if (!this.state.hasUserId && !(this.state.gamify === 1 || this.state.gamify === -1)) {
//       if (Math.random() < 0.5) {
//         DatabaseManager.getInstance().saveSettings('gamify', 1, (error) => { alert(error) }, null);
//         LoggingStore.setGamificationFlag(true)
//       } else {
//         LoggingStore.setGamificationFlag(false);
//         DatabaseManager.getInstance().saveSettings('gamify', -1, (error) => { alert(error) }, null);
//       }
//     }
//
//     // log in without internet connection:
//     this.setState({
//       hasUserId: true,
//       userId: userData.userName,
//       password: userData.pw
//     })
//     showMessage({
//       message: "Sign in failed!",
//       description: "You may have no Internet access!",
//       type: "warning",
//     });
//   }
//
//
//   getUploadServiceAuthToken = () => this.state.userId
//
//   uploadFreshData() {
//     token = this.getUploadServiceAuthToken()
//     //TODO get new auth token
//     if (token) {
//       UploadManager.getInstance().setToken(token);
//       DatabaseManager.getInstance().fetchUnrecordedData((_, error) => console.error(error), (_, data) => {
//         UploadManager.getInstance().uploadData(data, () => { DatabaseManager.getInstance().updateLastRecorded(); });
//       });
//     }
//   }
//
//   render() {
//     return (
//       <View style={styles.container}>
//
//         {this.state.isSplashReady == false
//           ? null
//           : this.state.hasUserId
//             ? this.state.didShowOnBoarding ? this.state.didShowGoalSettingsPage ? <AppNavigator /> :
//
//       <GoalSettingScreen onSaveButtonPressed={() =>
//         {
//           this.setState({didShowGoalSettingsPage: true});
//           DatabaseManager.getInstance().saveSettings('didShowGoalSettingsPage', true, (error) => { alert(error) }, null);
//         }} />  :
//
//       <OnBoardingScreen getStartedPressed={() =>
//         {
//           this.setState({didShowOnBoarding: true});
//           DatabaseManager.getInstance().saveSettings('didShowOnBoarding', true, (error) => { alert(error) }, null);
//         }}/>
//             : <UsernameDialog onLogin={this.handleUserLogin} onRegister={this.handleUserRegistration} />
//         }
//         <LoadingScreen hide={this.state.isAppReady} style={styles.loading} />
//         <FlashMessage position="bottom" duration={6000} />
//       </View>
//     );
//   }
// }
//
// const styles = StyleSheet.create({
//   container: {
//     width: '100%',
//     height: '100%',
//   },
//   loading: {
//     position: 'absolute',
//     width: '100%',
//     height: '100%',
//     backgroundColor: 'white',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

import { Text } from "react-native";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import { Notifications } from "expo";

Notifications.createCategoryAsync('A_OR_B', [
  {
    actionId: 'one',
    buttonTitle: 'Button One',
    isDestructive: true,
    isAuthenticationRequired: false,
  },
  {
    actionId: 'two',
    buttonTitle: 'Button Two',
    isDestructive: false,
    isAuthenticationRequired: true,
  },
  {
    actionId: 'three',
    buttonTitle: 'Three',
    textInput: { submitButtonTitle: 'Three', placeholder: 'Type Something' },
    isAuthenticationRequired: false,
  },
])
  .then(() => {
    console.log(`Category created!`);
  })
  .catch(() => {
    console.log(`Category not created!`);
  });

export default class App extends React.Component {
  state = {
    token: null,
    notification: null,
  };

  registerForPushNotificationsAsync = async () => {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      return;
    }

    try {
      const token = await Notifications.getExpoPushTokenAsync();
      console.log({ token });
      this.setState({ token });
    } catch (err) {
      // couldn't get the token
    }
  };

  componentDidMount() {
    // Get the Expo push token
    this.registerForPushNotificationsAsync();
    // Add a listener
    Notifications.addListener((notification) => {
      this.setState({ notification });
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>Push Token</Text>
        <Text style={styles.paragraph}>{this.state.token}</Text>
        <Text style={styles.heading}>Latest Notification</Text>
        <Text style={styles.paragraph}>
          {JSON.stringify(this.state.notification)}
        </Text>
        <Text style={styles.heading}>actionId</Text>
        <Text style={styles.paragraph}>
          {this.state.notification ? this.state.notification.actionId : null}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#ecf0f1",
    padding: 8,
  },
  paragraph: {
    margin: 10,
    fontSize: 14,
    fontWeight: "normal",
    textAlign: "center",
  },
  heading: {
    margin: 10,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});
