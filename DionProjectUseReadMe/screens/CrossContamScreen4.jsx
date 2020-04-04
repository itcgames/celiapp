import React from 'react';
import { View, StyleSheet} from 'react-native';
import ExpoVideoPlayer  from '../components/ExpoVideoPlayer';


export default class CrossContamScreen4 extends React.Component {
  static navigationOptions = {
    title: 'Video Player',
  };



  render() {
    return (
      <View style={styles.container}>
      <ExpoVideoPlayer fileID = {4}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
      fontSize: 30,
      textAlign: 'center',
      margin: 20,
    }
  });