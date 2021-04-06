import React from "react";
import Layout from '../constants/Layout';
import { StyleSheet, View, Text, Animated } from 'react-native';
import InfoIcon from '../components/InfoIcon';
import * as Icon from '@expo/vector-icons';
import _ from "lodash";
import { TouchableOpacity } from "react-native-gesture-handler";

const AnimationState =
{
	ANIMATING: 'animating',
	OPEN: 'open',
	CLOSE: 'close'
}

export default class LoggedEntry extends React.Component
{
	state =
	{
		transformValue: new Animated.Value(0),
		touchStartXPos: -1,
		canAnimate: true,
		currentAnimation: 'no-animation',
		animationState : AnimationState.CLOSE
	}

	startAnimation = (newAnimationState, toValue) => 
	{
		this.setState({animationState: AnimationState.ANIMATING});
		this.setState({canAnimate: false});
		Animated.timing(this.state.transformValue, 
		{			
			toValue: toValue,
			duration: 100,
		 	useNativeDriver: true
	   	}).start(() =>
		{
			this.setState({animationState: newAnimationState});
		});
	 };

	touchMove(evt)
	{		
		if (this.state.canAnimate && this.state.animationState !== AnimationState.ANIMATING)
		{
			if (this.state.animationState === AnimationState.CLOSE &&
				this.state.touchStartXPos - evt.nativeEvent.locationX > 2)
			{
				this.startAnimation(AnimationState.OPEN, -120);
			} else if (this.state.animationState === AnimationState.OPEN &&
				this.state.touchStartXPos - evt.nativeEvent.locationX < -2)
			{
				this.startAnimation(AnimationState.CLOSE, 0)
			}
			this.setState({touchStartXPos: evt.nativeEvent.locationX});			
		}				
	}

	touchEnd(evt)
	{
		this.setState({canAnimate: true});
		this.setState({touchStartXPos: undefined});	
	}

	render()
	{
		return (
		<View style={styles.dropShadow}>
			<Animated.View style=
			{{
				transform: [{translateX: this.state.transformValue}]
			}}
			onTouchMove={(evt) => this.touchMove(evt)}
			onTouchEnd={(evt) => this.touchEnd(evt)}>
				<Entry title={this.props.title} 
					subtitle={this.props.subtitle} 
					color={this.props.color} 
					image={this.props.image}
					onAddButtonClicked={this.props.onAddButtonClicked}
					navigationName={this.props.navigationName}
					/>
			</Animated.View>
			<View style={[styles.viewAllContentWrapper, {backgroundColor:this.props.color}]}>
				<Text style={{
					fontSize: 16,
					color: 'white',
					textAlign: 'center'
				}}>{this.props.viewallText}</Text>
			</View>
		</View>);
	}
}

const Entry = ({title, subtitle, image, color, onAddButtonClicked, navigationName}) =>
<View style={styles.container}>
	<View style={styles.leftWrapper}>
		<InfoIcon style={styles.infoIcon} color={color} image={image} width={50}/>
	</View>

	<View style={styles.leftWrapper}>
		<View style={styles.textInfo}>
			<Text style={[styles.text, styles.entryTitle]}>{title}</Text>
			<Border color={color}/>			
			<Text style={[styles.text, styles.entrySubtitle]}>{subtitle}</Text>
		</View>
	</View>
	
	<View style={styles.rightWrapper}>
		<TouchableOpacity onPress={() => onAddButtonClicked(navigationName)}>
			<Icon.Ionicons  color={color} size={35} name={"md-add"}/>
		</TouchableOpacity>
	</View>
</View>

const Border = ({color}) =>
<View style=
	{{
		marginTop: 8,
		marginBottom: 8,
		borderBottomWidth: 2,
		alignSelf: 'stretch',
		borderColor: color
	}}>
</View>

const window = Layout.window;
const styles = StyleSheet.create
({
	container:
	{		
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		width: window.width,
		height: window.height * 0.12,
		backgroundColor: '#f7f7f7',
		marginBottom: 5				
	},

	dropShadow: 
	{
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.2,
		shadowRadius: 1,  
		elevation: 5
	},

	leftWrapper:
	{
		marginLeft: 20
	},

	rightWrapper:
	{
		marginLeft: 'auto',
		marginRight: 20
	},

	viewAllContentWrapper:
	{
		display: 'flex',
		flexDirection: 'row',
		zIndex: -1,
		right: 0,
		alignItems: 'center',
		justifyContent: 'center',
		position: 'absolute',
		width: 120,
		height: window.height * 0.12
	},

	textInfo:
	{
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'flex-start',
		alignItems: 'flex-start',
		width: window.width * 0.6
	},

	text:
	{
		color: '#707070'
	},

	entryTitle:
	{
		fontSize: 22
	},

	entrySubtitle:
	{
		fontSize: 16
	}
});