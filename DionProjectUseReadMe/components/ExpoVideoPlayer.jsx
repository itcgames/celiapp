import React from 'react';
import { Video } from 'expo-av';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { AndroidBackHandler } from 'react-navigation-backhandler';

export default class ExpoVideoPlayer extends React.Component {

  constructor() {
    super()
    global.playbackObject;

    // node require() only takes string literals so we need to define each possibilty here
    this.files = {
      0: require('../assets/videos/what_happens_when_you_get_glutened.mp4'),
      1: require('../assets/videos/cross_contamination_of_gluten_part_1.mp4'),
      2: require('../assets/videos/cross_contamination_of_gluten_part_2.mp4'),
      3: require('../assets/videos/cross_contamination_of_gluten_part_3.mp4'),
      4: require('../assets/videos/cross_contamination_of_gluten_part_4.mp4')
    };
    this.file = {};
    this.title = '';

  }

  componentWillMount() {
    this.setUp();
  }

  setUp() {
    // Then we can assign the correct one to use from props passed from chosen screen
    switch (this.props.fileID) {
      case 0:
        this.file = this.files[0];
        this.title = 'What happens when I get "glutened"?'
        break;
      case 1:
        this.file = this.files[1];
        this.title = 'How easily can food be contaminated by gluten during preperation? Exmaple 1'
        break;
      case 2:
        this.file = this.files[2];
        this.title = 'How easily can food be contaminated by gluten during preperation? Exmaple 2'
        break;
      case 3:
        this.file = this.files[3];
        this.title = 'How easily can food be contaminated by gluten during preperation? Exmaple 3'
        break;
      case 4:
        this.file = this.files[4];
        this.title = 'How easily can food be contaminated by gluten during preperation? Exmaple 4'
        break;
      default:
        break;
    }
  }

  onBackButtonPressAndroid = () => {
    playbackObject.stopAsync();
    return false;
  };

  _handleVideoRef = component => {
    playbackObject = component;
    if (playbackObject != null) {
      playbackObject.loadAsync(this.file, initialStatus = { shouldPlay: true }, downloadFirst = true);
      playbackObject.playAsync();
    }
  }

  render() {
    const { width } = Dimensions.get('window');
    return (
      <AndroidBackHandler onBackPress={this.onBackButtonPressAndroid}>
        <View style={styles.container}>
          <Text style={styles.welcome}>{this.title}</Text>
          <Video
            ref={this._handleVideoRef}
            useNativeControls
            style={{ width, height: "50%" }}
            resizeMode={'contain'}
          />
        </View>
      </AndroidBackHandler>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  }
});
