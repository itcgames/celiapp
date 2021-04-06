import React from 'react';
import {View, Button, Text, Alert, StyleSheet} from 'react-native';
import DateTimePicker from "react-native-modal-datetime-picker";
import LanguageManager from '../manager/LanguageManager';

export default class TimePicker extends React.Component {


    constructor(props){
        super(props);
        this.state = {
          isDateTimePickerVisible: false,
          selectedTime: new Date()
        }
    }

    showDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: true });
      };
     
      hideDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: false });
      };
     
      handleDatePicked = choosenDate => {
        this.setState({selectedTime: choosenDate})
        this.hideDateTimePicker();
        this.props.onTimeChanged(choosenDate);
      };

    render(){
 
      const hourString = (new Date(this.state.selectedTime).getHours() > 9) ? new Date(this.state.selectedTime).getHours() : "0" + new Date(this.state.selectedTime).getHours()
      const minuteString = (new Date(this.state.selectedTime).getMinutes() > 9) ? new Date(this.state.selectedTime).getMinutes() : "0" + new Date(this.state.selectedTime).getMinutes()

        return(
            <View>
              <View style={styles.rowContainer}>
                	<Button color={'#818181'} title={hourString + ":" + minuteString} onPress={this.showDateTimePicker} />
                </View>
              <DateTimePicker
                isVisible={this.state.isDateTimePickerVisible}
                onConfirm={this.handleDatePicked}
                onCancel={this.hideDateTimePicker}
                mode = {'time'}
               />
            </View>
        )
    }
}


var styles = StyleSheet.create({
    rowContainer:{
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center'
    },
    occuredText:{
      fontSize: 20,
      justifyContent: 'center',
      alignItems: 'center'
    }
   });