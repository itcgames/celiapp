import React, { Component } from 'react';
import { WebView } from 'react-native-webview';
import { StyleSheet, Image, Text, View, Dimensions } from 'react-native';
// import { AssetUtils } from 'expo-asset-utils';


/// Attempt to load the uri asynrounsly in hopes of serving the correct bundle : (
export default class MyWeb extends Component {
  async getQuiz(webViewSource) {
    console.log(webViewSource);
    try {
      let file = await AssetUtils.resolveAsync();
      let fileContents = await FileSystem.readAsStringAsync(file.localUri);
      return fileContents;
    }
    catch (e) {
      console.log('caught error', e);
    }
  }

  render() {
    /// failed attemps to load the quiz and build through web view
    //const webViewSource = { html: require('../assets/index.js') () };
    //const source = require('../assets/public/index.html');
    //const webViewSource = this.getQuiz(source);

    const { width } = Dimensions.get('window');
    return (
      <View style={styles.container}>
        <Text>{'Hi'}</Text>
        <WebView
          allowFileAccess={true}
          style={{ width, height: "100%" }}
          originWhitelist={['*']}

          //Loading html file from project folder
          //  source={ require('../assets/public/test.html') }

          source= {{uri: 'http://34.246.173.61:3000/'}} // if the server is started the quiz can be loaded here responsively!

          // This one goes through all the way and asks for missing packages
          // After installing all dependencies loops back around to this require
          // Saying that something is wrong in the dependecy bundle
          //    source={{ html: require('../assets/index.js') () }}

          // attempt to serve the app through a boot.js
          // source={{ html: require('../assets/public/boot.js')() }}


          useWebKit
          allowUniversalAccessFromFileURLs={true}
          allowFileAccessFromFileURLs={true}
          loadWithOverviewMode={true}
          useWideViewPort={true}
          //Enable Javascript support
          javaScriptEnabled={true}
          //For the Cache
          domStorageEnabled={true}
          mixedContentMode="always"
        />
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
