import React from 'react';
import { Text, View, Image, Animated, StyleSheet, Easing, Dimensions } from 'react-native';

import Constants from 'expo-constants';
import AchievementRecordManager from '../manager/buddyManager/AchievementRecordManager';

export default class LoadingScreen extends React.Component {

  constructor() {
    super();
    this.RotateValueHolder = new Animated.Value(0);
  }

  componentDidMount() {
    this.StartImageRotateFunction();
  }

  StartImageRotateFunction() {
    this.RotateValueHolder.setValue(0);
    Animated.timing(this.RotateValueHolder, {
      toValue: 1,
      duration: 1000,
      easing: Easing.linear,
      useNativeDriver: true
    }).start(() => this.StartImageRotateFunction());
  }

  render() {
    if (this.props.hide == true) {
      return null;
    }

    const RotateData = this.RotateValueHolder.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg'],
    });
    return (
      <View style={{
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        justifyContent: 'space-around',
        alignItems: 'center'
      }}>
        <Text style={{ fontSize: 40, fontWeight: 'bold' }}>CeliApp</Text>
        <Animated.Image
          style={{
            width: 150,
            height: 150,
            transform: [{ rotate: RotateData }],
          }}
          source={require('../assets/images/celiapp_icon_new.png')}
        />
        <Text style={{ color: 'green' }}>Glutenfree is what you want to be</Text>
        <Text style={{ fontSize: 12, color: 'gray' }}>Version {Constants.manifest.version}</Text>
      </View>
    );
  }
}

