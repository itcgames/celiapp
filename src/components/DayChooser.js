
import React from 'react';
import {Text, View, Button, StyleSheet} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as Icon from '@expo/vector-icons';

var daysDiffToProp = 0

export default class DayChooser extends React.Component{

	constructor(props){
        super(props);
        this.state = {
            currDate: this.props.date,
            currDateString: new Date(this.props.date).getDate() + "." + (new Date(this.props.date).getMonth()+1) + "." + new Date(this.props.date).getFullYear()
        }
    }

    changeDay(next){
        var newDate = new Date(this.props.date)
        if(next){
            newDate.setDate(newDate.getDate() + 1);
        }else{
            newDate.setDate(newDate.getDate() - 1);
        }
        
        newDate.setDate(newDate.getDate() + daysDiffToProp);
        var newDateString = new Date(newDate).getDate() + "." + (new Date(newDate).getMonth()+1) + "." + new Date(newDate).getFullYear()
        this.setState({currDateString: newDateString});
        this.props.onDateChanged(newDate);
    }

    render(){
        const date = new Date(this.props.date);
        date.setDate(date.getDate() + daysDiffToProp + 1);
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);
        date.setMilliseconds(0);

        const disableFutureButton = date.getTime() >= new Date().getTime();
        
        return(
            <View style={{
                flexDirection:'row',
                justifyContent:'space-evenly',
                alignItems:'stretch'
                }}>
                <View>
					<TouchableOpacity onPress={() => this.changeDay(false)}>
                		<Icon.Ionicons name={'chevron-back-outline'} size={30} color={this.props.color}/>
            		</TouchableOpacity>
                </View>
                <View>
                    <Text style ={styles.dateText}> {this.state.currDateString} </Text>
                </View>
                <View>
					<TouchableOpacity disabled={disableFutureButton} onPress={() => this.changeDay(true)}>
                		<Icon.Ionicons name={'chevron-forward-outline'} size={30} 
							color={disableFutureButton ? this.props.disabledColor : this.props.color }/>
            		</TouchableOpacity>
                </View>
            </View>
        )
    }
}

var styles = StyleSheet.create({
    dateText:{
        fontSize: 20,
		color: '#818181'
    }
});