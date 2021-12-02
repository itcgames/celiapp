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
import {GIPLogFrequency} from "./src/constants/Events";

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
    GlutonManager.getInstance().setBuddy(settings.nickname);

    GearManager.getInstance().setWsHost(settings.wsHost);
    GearManager.getInstance().setGearHost(settings.gearHost);
    GearManager.getInstance().connect();
  
    this.setState({
      isSplashReady: true,
      didShowOnBoarding: !!settings.didShowOnBoarding,
      didShowGoalSettingsPage: !!settings.didShowGoalSettingsPage,
      hasUserId: !!settings.userId,
      userId: settings.userId,
      password: settings.password,
      loggedIn: false,
      gamify: settings.gamify,
      usingGIP: settings.usingGIP,
    });

    console.log("Using GIP setting", settings.usingGIP)
    
    if (this.state.hasUserId) {
      TokenManager.getInstance().refreshToken(this.state.userId, this.state.password, this.loginFailedExternally, this.onLoginFailed, this.onLoginSuccess);
    }

    this.uploadFreshData();
    
    NotificationManager.getInstance(); //just to show the user the notification permission screen.

    //TODO: need to show for a short period so the data for the main screen can be collated, but should replace fixed time with "main screen ready 'event'"
    setTimeout(() => this.setState({ isAppReady: true }), 1000);
  }

  handleUserLogin = (userName, password) => {
    TokenManager.getInstance().login(userName, password, this.loginFailedExternally, this.onLoginFailed, this.onLoginSuccess);
  }

  handleUserRegistration = (nickname, userName, password) => {
    // nickname eat up atm!
    TokenManager.getInstance().registerUser(nickname, userName, password,
      () => showMessage({
        message: "Sign up failed!",
        description: "You may have no Internet access!",
        type: "warning",
      }),
      () => showMessage({
        message: "Sign up failed!",
        description: "Your email address may not be whitelisted. Please contact desqol.study@gmail.com.",
        type: "warning",
      }),
      this.onLoginSuccess);
  }

  // returned statuscode is 200:
  onLoginSuccess = (res, userData) => {
    const { statusCode, data } = res;
    const { username, pw } = userData;

    let showMsg = !this.state.hasUserId;

    const defaultUsingGIPFlag = true;
    const usingGIP = data.usingGIP===undefined ? defaultUsingGIPFlag : data.usingGIP

    let gipGoalIndex = GIPLogFrequency.Never;

    if(data.usingGIP)
      gipGoalIndex = data.gip3PerWeek ? GIPLogFrequency.ThricePerWeek : GIPLogFrequency.Daily;

    this.setState({
      hasUserId: true,
      userId: username,
      password: pw,
      gamify: data.gamify,
      usingGIP: usingGIP,
      gipGoalIndex: gipGoalIndex
    });

    DatabaseManager.getInstance().saveSettings('userId', username, (error) => { alert(error) }, null);
    DatabaseManager.getInstance().saveSettings('password', pw, (error) => { alert(error) }, null);
    DatabaseManager.getInstance().saveSettings('gamify', data.gamify === true ? 1 : -1, (error) => { alert(error) }, null);
    DatabaseManager.getInstance().saveSettings('usingGIP', usingGIP === true ? 1 : -1, (error) => { alert(error) }, null);
    DatabaseManager.getInstance().saveSettings('gipGoalIndex', gipGoalIndex, (error) => { alert(error) }, null);

    // set gamification flag in Store:
    if (data.gamify !== LoggingStore.gamificationFlag) {
      LoggingStore.setGamificationFlag(data.gamify);
    }
  }

  onLoginFailed = (res, userData) => {
    const { statusCode, data } = res;

    showMessage({
      message: "Sign in failed!",
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
      message: "Sign in failed!",
      description: "You may have no Internet access!",
      type: "warning",
    });
  }


  getUploadServiceAuthToken = () => this.state.userId

  uploadFreshData() {
    const token = this.getUploadServiceAuthToken()
    //TODO get new auth token
    if (token) {
      UploadManager.getInstance().setToken(token);
      console.log('Preparing upload...', new Date().getTime())
      DatabaseManager.getInstance().fetchUnrecordedData((_, error) => console.error(error), (_, data) => {
        //console.log('data to upload:', data);
        let lastModified = null;

        //get the timestamp of the last returned record in events/symptoms.
        //TODO: for future versions it might be a better idea to have an uploaded-property in each record to show if it hasn't been uploaded yet, instead of just having a global timestamp.
        if (data.symptoms != null) {
          if (data.symptoms.length > 0) {
            lastModified = data.symptoms[data.symptoms.length-1].modified;
          }
        }
        if (data.events != null) {
          if (data.events.length > 0) {
            let modified = data.events[data.events.length-1].modified;
            if (lastModified === null || lastModified === 0 || lastModified < modified) {
              lastModified = modified;
            }
          }
        }
        console.log('Last modified timeStamp in upload data: ', lastModified);
        //TODO: should we actually only uploadData if events or symptoms are present instead of submitting empty arrays?
        UploadManager.getInstance().uploadData(data, () => { 
            if (lastModified !== null && lastModified > 0) { 
              //only update the lastRecorded date if we actually submitted symptoms/events 
              //to avoid losing new entries that haven't been written to the DB at the time of fetching the "unrecorded" data.
              DatabaseManager.getInstance().updateLastRecorded(lastModified); 
            }
            console.log('Finished upload ',new Date().getTime()) 
        });
      });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <LoadingScreen hide={this.state.isAppReady} style={styles.loading} />
        {this.state.isSplashReady == false
          ? null
          : this.state.hasUserId
            ? this.state.didShowOnBoarding ? this.state.didShowGoalSettingsPage ? <AppNavigator  screenProps={{usingGIP : this.state.usingGIP}} /> :
			
			<GoalSettingScreen usingGIP={this.state.usingGIP} onSaveButtonPressed={() =>
				{
					this.setState({didShowGoalSettingsPage: true});
					DatabaseManager.getInstance().saveSettings('didShowGoalSettingsPage', true, (error) => { alert(error) }, null);
				}} />  :
			
			<OnBoardingScreen getStartedPressed={() =>
				{
					this.setState({didShowOnBoarding: true});
					DatabaseManager.getInstance().saveSettings('didShowOnBoarding', true, (error) => { alert(error) }, null);
				}}/>
            : <UsernameDialog onLogin={this.handleUserLogin} onRegister={this.handleUserRegistration} />
        }

        <FlashMessage position="top" duration={6000} />
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