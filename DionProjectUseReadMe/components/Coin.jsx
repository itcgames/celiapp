import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import SpriteSheet from 'rn-sprite-sheet';


export default class Coin extends React.Component {

    constructor() {
        super()
    }

    componentWillMount() {
        this.setUp();
    }

    setUp() {
        this.coin = {};
        this.config = {
            type: 'spin', // (required) name of the animation (name is specified as a key in the animation prop)
            fps: 24, // frames per second
            loop: true, // if true, replays animation after it finishes
            resetAfterFinish: true, // if true, the animation will reset back to the first frame when finished; else will remain on the last frame when finished
            // onFinish = () => { } // called when the animation finishes; will not work when loop === true
        };
    }

    _handleRef = component => {
        var playbackObject = component;
        if (playbackObject != null) {
            playbackObject.play(this.config);

        }
    }

    render() {
        return (
            < SpriteSheet
                ref={this._handleRef}
                    // coin spin
                source={require('../assets/sprites/coin.png')}
                columns={6}
                rows={1}
                //height={200} // set either, none, but not both
                width={50}
                    // coin shine
                //source={require('../assets/sprites/coinShine.png')} // https://opengameart.org/content/coin-animation
                //columns={2}
                //rows={3}
                //width={47}
                imageStyle={{ marginTop: -1 }}
                animations={{
                    spin: [0, 1, 2, 3, 4, 5]
                }}
            />
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
