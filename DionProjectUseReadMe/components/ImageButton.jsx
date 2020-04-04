import React from 'react'
import { Button, TouchableOpacity, View, Image, Text, StyleSheet } from 'react-native'

export default class ImageButton extends Button {

    static navigationOptions = {
        title: 'Video Vault!     ',
    };

    render() {
        return (
            <TouchableOpacity style={styles.touchable} onPress={this.props.func}>
                <Image source={this.props.source} />
                <View>
                    <Text style={styles.text}>{this.props.title}</Text>
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    view: {
        position: 'absolute',
        backgroundColor: 'transparent'
    },

    touchable: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        fontSize: 18,
        textAlign: 'center'
    },
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
