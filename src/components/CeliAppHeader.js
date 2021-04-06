import React from 'react'
import { Image, StyleSheet, View, Text } from 'react-native'
import mealImage from '../assets/images/cutlery_white.svg';
import { SvgXml } from 'react-native-svg';

export default class CeliAppHeader extends React.Component 
{
	render() 
	{
		return (
            <View style={styles.container}>
                <Logo					
					image={this.props.image}
					logo={this.props.logo}
					color={this.props.color} 
					width={this.props.width} 
					height={this.props.height}/>

                <Text style={[styles.text, {color: this.props.color}]}>
            		{this.props.title}
                </Text>
            </View>
        )
    }
}

const Logo = ({image, color, width, height}) =>
{
	return <Image
			style={[styles.image, {tintColor:color}]}
			width={width || 25}
			height={height || 25}
			source={image}
			resizeMode='contain'
		/>
}

const styles = StyleSheet.create
({
	container: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},

	image: {
		zIndex: 999
	},

	text: {
		fontSize: 15,
		marginHorizontal: 5
	}
});