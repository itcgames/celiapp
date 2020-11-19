import React from 'react';
import { View, StyleSheet, AppState } from 'react-native';
import ViewPager from '@react-native-community/viewpager';
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


export default class App extends React.Component {
  state = {
    isSplashReady: false,
    isAppReady: false,
    appState: AppState.currentState
  }

  componentDidMount() {
    DatabaseManager.getInstance().loadSettings(null,
      (_, error) => { alert("error loading settings" + JSON.stringify(error)); },
      (_, { rows: { _array } }) => {
        let settings = {};

        for (var i in _array) {
          settings[_array[i].name] = JSON.parse(_array[i].objData);
        }

        this.initApplication(settings);
      }
    );

    AppState.addEventListener('change', this._handleAppStateChange);
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
    console.log("unmounting App")
  }

  _handleAppStateChange = (nextAppState) => {
    if (
      nextAppState.match(/inactive|background/) &&
      this.state.appState === 'active'
    ) {
      this.uploadFreshData();
      console.log('App is going to background!');
    }
    this.setState({ appState: nextAppState });
  };

  initApplication(settings) {
    LanguageManager.getInstance().setLanguage(settings.language);
    NotificationManager.getInstance(); //just to show the user the notification permission screen.
    GlutonManager.getInstance().setBuddy(settings.nickname);

    GearManager.getInstance().setWsHost(settings.wsHost);
    GearManager.getInstance().setGearHost(settings.gearHost);
    GearManager.getInstance().connect();


    this.uploadFreshData();

    this.setState({
      isSplashReady: true,
      hasUserId: !!settings.userId,
      userId: settings.userId,
      password: settings.password,
      loggedIn: false,
      gamify: settings.gamify
    });

    if (this.state.hasUserId) {
      TokenManager.getInstance().refreshToken(this.state.userId, this.state.password, this.loginFailedExternally, this.onLoginFailed, this.onLoginSuccess);
    }

    setTimeout(() => this.setState({ isAppReady: true }), 3000);
  }

  handleUserLogin = (userName, password) => {
    TokenManager.getInstance().login(userName, password, this.loginFailedExternally, this.onLoginFailed, this.onLoginSuccess);
  }

  handleUserRegistration = (nickname, userName, password) => {
    // nickname eat up atm!
    TokenManager.getInstance().registerUser(nickname, userName, password,
      showMessage({
        message: "Registration failed!",
        description: "You may have no internet access!",
        type: "warning",
      }),
      showMessage({
        message: "Registration failed!",
        description: "Maybe your account is not activated yet!",
        type: "warning",
      }),
      this.onRegisterSuccess);
  }

  onRegisterSuccess = (res, userData) => {
    const { statusCode, data } = res;
    const { nickname, email, pw } = userData;
    showMessage({
      message: "REGISTERED SUCCESSFULLY!",
      description: "trying to login ...",
      type: "success",
    })
    TokenManager.login(email, pw, this.loginFailedExternally, this.onLoginFailed, this.onLoginSuccess);
  }

  // returned statuscode is 200:
  onLoginSuccess = (res, userData) => {
    const { statusCode, data } = res;
    const { username, pw } = userData

    showMsg = !this.state.hasUserId

    this.setState({
      hasUserId: true,
      userId: username,
      password: pw,
      gamify: data.gamify
    })
    DatabaseManager.getInstance().saveSettings('userId', username, (error) => { alert(error) }, null);
    DatabaseManager.getInstance().saveSettings('password', pw, (error) => { alert(error) }, null);
    DatabaseManager.getInstance().saveSettings('gamify', data.gamify === true ? 1 : -1, (error) => { alert(error) }, null);

    // set gamification flag in Store:
    if (data.gamify !== LoggingStore.gamificationFlag) {
      LoggingStore.setGamificationFlag(data.gamify);
    }
    if (showMsg) {
      showMessage({
        message: "Welcome to CeliApp",
        description: "... and the 21-day challenge!",
        type: "success",
      });
    }
  }

  onLoginFailed = (res, userData) => {
    const { statusCode, data } = res;

    showMessage({
      message: "LOGIN FAILED!",
      description: data.message,
      type: "warning",
    });
  }


  /* 
  FOR LOGINS WITHOUT INTERNET/SERVER CONNECTION ONLY:
  */
  loginFailedExternally = (res, userData) => {
    // no internet connection? server offline? etc. --> set gamify-flag randomly!
    if (!this.state.hasUserId && !(this.state.gamify === 1 || this.state.gamify === -1)) {
      if (Math.random() < 0.5) {
        DatabaseManager.getInstance().saveSettings('gamify', 1, (error) => { alert(error) }, null);
        LoggingStore.setGamificationFlag(true)
      } else {
        LoggingStore.setGamificationFlag(false);
        DatabaseManager.getInstance().saveSettings('gamify', -1, (error) => { alert(error) }, null);
      }
    }

    // log in without internet connection:
    this.setState({
      hasUserId: true,
      userId: userData.userName,
      password: userData.pw
    })
    showMessage({
      message: "LOGIN FAILED!",
      description: "You may have no internet access!",
      type: "warning",
    });
  }


  getUploadServiceAuthToken = () => this.state.userId

  uploadFreshData() {
    token = this.getUploadServiceAuthToken()
    //TODO get new auth token
    if (token) {
      UploadManager.getInstance().setToken(token);
      DatabaseManager.getInstance().fetchUnrecordedData((_, error) => console.error(error), (_, data) => {
        UploadManager.getInstance().uploadData(data, () => { DatabaseManager.getInstance().updateLastRecorded(); });
      });
    }
  }

  render() {
    return (
      <View style={styles.container}>

        {this.state.isSplashReady == false
          ? null
          : this.state.hasUserId
            ? <AppNavigator />
            : <UsernameDialog onLogin={this.handleUserLogin} onRegister={this.handleUserRegistration} />
        }
        <LoadingScreen hide={this.state.isAppReady} style={styles.loading} />
        <FlashMessage position="bottom" duration={6000} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  loading: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
});