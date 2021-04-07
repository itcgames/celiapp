import React from 'react';
import {View,  StyleSheet, Text} from 'react-native';
export default class HorizontalLineWithText extends React.Component{
    render(){
        return(
        <View style={{
            borderBottomColor: this.props.borderColor || 'black',
			borderBottomWidth: 2,
            marginBottom: 8,
            marginTop: 20,
			marginLeft: 100,
			marginRight: 100
        }}>
            <Text style={styles.TextStyle}>{this.props.text}</Text>
        </View>
        )
    }
}


var styles = StyleSheet.create({
    TextStyle:{
       fontSize: 20,
	   color: '#616161',
	   textAlign: 'center',
	   marginBottom: 5
    }
});