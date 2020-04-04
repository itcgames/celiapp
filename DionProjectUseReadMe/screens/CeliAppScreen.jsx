import React from 'react';
import { Button, StatusBar, StyleSheet, View, Text, } from 'react-native';
import * as Font from 'expo-font'
import Coin from '../components/Coin'

export default class CeliAppScreen extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      fontLoaded: false
    }
  }


  static navigationOptions = {
    title: 'CeliApp    ',
  };

  render() {
    if (this.state.fontLoaded) {
      return (
        <View style={styles.container}>
          <Text style={styles.title}>{'CeliApp Home Screen'}</Text>
          <Coin />
          <Button title="Knowledge Center  " onPress={this._knowledge} />
          <StatusBar barStyle="default" />
        </View>
      );
    }
    else {
      return (<View />);
    }
  }

  _knowledge = () => {
    this.props.navigation.navigate('Home');
  };

  // something like this for custom fonts..
  async componentDidMount() {
    await Font.loadAsync({
      PlayfairDisplay : require('../assets/fonts/PlayfairDisplay-Regular.otf')
    })
    this.setState({ fontLoaded: true })
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
    fontFamily: 'PlayfairDisplay'
  }
});
