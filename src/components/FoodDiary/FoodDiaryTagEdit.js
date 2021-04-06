import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Layout from '../constants/Layout';
import { SvgXml } from 'react-native-svg';

export default class FoodDiaryTagEdit extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
          selected: props.selected,
        }
		
      }

    render() {
		numberOfItems = this.props.all.length;
        return (
          <View style={styles.container}>
            {this.makeButtons()}
          </View>
        )
      }

    changeTag = (key) => {
        let selected
          selected = key        
        this.setState({
          selected,
        });

        if (this.props.onTagChanged != null) {
            this.props.onTagChanged(key);
        }
      }

    makeButtons() 
	{
		const window = Layout.window;
		const backgroundDimensions = window.width * .16;

        return this.props.all.map((obj, i) => 
		{
			const on = (this.state.selected == i)
			const backgroundColor = on ? '#707070' : '#f7f7f7';
			const textColor = on ? '#ffffff' : '#707070';
			const icon = on ? obj.icon : obj.iconselected;
			
			return (            
			<TouchableOpacity onPress={() => {this.changeTag(i)}}>
				<View
					backgroundColor={backgroundColor}
					borderColor='black'
					key={i}
					style={[styles.iconBorder, {
						width: backgroundDimensions,
						height: backgroundDimensions
					}]}>
					<SvgXml
						width={backgroundDimensions * .7}
						height={backgroundDimensions * .7}
						xml={icon}
						style={styles.icon}/>
					<Text style={[styles.tag, {
						color: textColor
					}]}>{obj.tag}</Text>
				</View>
			</TouchableOpacity>)
        });
	}
}

const styles = StyleSheet.create
({
	container: {
		flexDirection: 'row',
		justifyContent: 'space-evenly',
		alignItems: 'center',
		padding: 20
	},

	iconBorder:
	{
		borderRadius: 10,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.2,
		shadowRadius: 7,  
		elevation: 5
	},

	icon:
	{
		marginTop: 3,
		alignSelf: 'center'
	},

	tag: 
	{
		alignSelf: 'center'
	},
})