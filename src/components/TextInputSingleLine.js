import React from 'react';
import { StyleSheet, Text, View, Alert, TextInput } from 'react-native';

export default class TextInputSingleLine extends React.Component {

    constructor(props) {
        super(props);
        this.state = {text: ''};
      }

      textChanged = (t) =>{
          this.setState({
              text: t
          })
          this.props.onTextChanged(t)
      }

 render() {
      return (
        <View style={{top:10, bottom: 15}}>
            <View style={styles.Text}>
                <TextInput
                  {...this.props}
                  maxLength = {60}
                  style={{marginRight: 20}}
                  onChangeText={(text) => {this.textChanged(text)}}
                  value={this.props.preText}
                  placeholder={this.props.placeholderText || ""}
                />
            </View>
        </View>
      );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    Text:{
            borderWidth: 2,
            borderColor: '#3398de',
            marginLeft: 10,
            marginRight: 10,
            alignContent: 'space-around',
            padding: 10
        }
});
