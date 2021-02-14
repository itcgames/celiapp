import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import ActionButton from 'react-native-action-button';
import * as Icon from '@expo/vector-icons';
import LanguageManager from '../manager/LanguageManager';
import CeliLogger from '../analytics/analyticsManager';
import Interactions from '../constants/Interactions';

export default class MenuButton extends React.Component {

constructor(props) {
    super(props);

    this.currentDate = null;
    if (props.shareConfig)
    {
        props.shareConfig.onDateChanged(this.onDateChanged.bind(this));
    }

  }

  onDateChanged(newDate) {
    this.currentDate = newDate;
  }
  
  getEventDate(){
    return !!this.currentDate ? this.currentDate : new Date()
  }

  render() {
    if (this.props.type == 1) {
      return (
              <ActionButton buttonColor="rgba(231,76,60,1)">
                <ActionButton.Item buttonColor='#00000000' title={LanguageManager.getInstance().getText("ADD_GIP_RESULT")} onPress={() => {this.props.navigation.navigate('AddGIP', {'selectedDateAndTime' : this.getEventDate() }), console.log("first button pressed!!!")}}>
                  <Image source ={require('../assets/images/GIP_icon.png')}/>
                </ActionButton.Item>
                <ActionButton.Item buttonColor='#9b59b6' title={LanguageManager.getInstance().getText("ADD_EMOTION")} onPress={() => this.props.navigation.navigate('AddEmote', {'selectedDateAndTime' : this.getEventDate() })}>
                  <Icon.Ionicons name="md-happy" style={styles.actionButtonIcon} />
                </ActionButton.Item>
                <ActionButton.Item buttonColor='#3498db' title={LanguageManager.getInstance().getText("ADD_MEAL")} onPress={() => this.props.navigation.navigate('AddMeal', {'selectedDateAndTime' : this.getEventDate() })}>
                  <Icon.Ionicons name="md-restaurant" style={styles.actionButtonIcon} />
                </ActionButton.Item>
                <ActionButton.Item buttonColor='#1abc9c' title={LanguageManager.getInstance().getText("ADD_SYMPTOM")} onPress={() => this.props.navigation.navigate('AddSymptom', {'selectedDateAndTime' : this.getEventDate() })}>
                  <Icon.Ionicons name="md-medkit" style={styles.actionButtonIcon} />
                </ActionButton.Item>
                <ActionButton.Item buttonColor='#6c63ff' title={LanguageManager.getInstance().getText("QUIZ")} onPress={() => {this.props.navigation.navigate('QuizMain', {'selectedDateAndTime' : this.getEventDate() }), console.log("selectedQuiz")}}>
                  <Icon.Ionicons name="help-circle-outline" style={styles.actionButtonIcon} />
                </ActionButton.Item>
              </ActionButton>
      );
    }

    return (
      <ActionButton buttonColor="rgba(231,76,60,1)">
        <ActionButton.Item buttonColor='#00000000' title={LanguageManager.getInstance().getText("ADD_GIP_RESULT")} onPress={() => { this.props.navigation.navigate('AddGIP', { 'selectedDateAndTime': this.getEventDate()  }), console.log("first button pressed!!!") }}>
          <Image source={require('../assets/images/GIP_icon.png')} />
        </ActionButton.Item>
        <ActionButton.Item buttonColor='#9b59b6' title={LanguageManager.getInstance().getText("ADD_EMOTION")} onPress={() => this.props.navigation.navigate('AddEmote', { 'selectedDateAndTime': this.getEventDate()  })}>
          <Icon.Ionicons name="md-happy" style={styles.actionButtonIcon} />
        </ActionButton.Item>
        <ActionButton.Item buttonColor='#3498db' title={LanguageManager.getInstance().getText("ADD_MEAL")} onPress={() => this.props.navigation.navigate('AddMeal', { 'selectedDateAndTime': this.getEventDate()  })}>
          <Icon.Ionicons name="md-restaurant" style={styles.actionButtonIcon} />
        </ActionButton.Item>
        <ActionButton.Item buttonColor='#1abc9c' title={LanguageManager.getInstance().getText("ADD_SYMPTOM")} onPress={() => this.props.navigation.navigate('AddSymptom', { 'selectedDateAndTime': this.getEventDate()  })}>
          <Icon.Ionicons name="md-medkit" style={styles.actionButtonIcon} />
        </ActionButton.Item>
        <ActionButton.Item buttonColor='#6c63ff' title={LanguageManager.getInstance().getText("QUIZ")} onPress={() => {this.props.navigation.navigate('QuizMain', {'selectedDateAndTime' : this.getEventDate() }), console.log("selectedQuiz")}}>
          <Icon.Ionicons name="help-circle-outline" style={styles.actionButtonIcon} />
        </ActionButton.Item>
      </ActionButton>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 75,
    right: 10,
    height: 50,
    width: 200
  },
  actionButtonIcon: {
    fontSize: 35,
    color: 'white',
  }
});