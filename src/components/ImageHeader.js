import React from 'react'
import { StyleSheet, View } from 'react-native'
import symptomImage from '../assets/images/stethoscope_white.svg';
import emotionImage from '../assets/images/smiley_face_white.svg';
import mealImage from '../assets/images/cutlery_white.svg';
import gipImage from '../assets/images/heartbeat.svg';
import { SvgXml } from 'react-native-svg';

export const HeaderImage =
{
	SYMPTOM: symptomImage,
	EMOTION: emotionImage,
	MEAL: mealImage,
	GIP: gipImage
};

export default class ImageHeader extends React.Component 
{
	render() 
	{
		const width = this.props.width;
		return (
            <View style={styles.container}>
                
				<View 
					width={width}
					height={width}
					borderRadius={width / 2}
					style={{
						position: 'absolute',
						borderColor: this.props.color,
						borderWidth: 1}}>
				</View>

				<Logo		
					image={this.props.logo}
					color={this.props.color} 
					width={this.props.width}
					sttyle={{
						position: 'absolute'
					}}/>
            </View>
        )
    }
}

const Logo = ({image, color, width}) =>
<SvgXml
	width={width}
	color={color}
	xml={image}
	style={{zIndex: 1}}/>

const styles = StyleSheet.create
({
	container: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: 10
	}
});