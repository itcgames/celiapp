
import React from 'react';
import { View, Keyboard, TouchableOpacity, StyleSheet} from 'react-native';
import Dialog from "react-native-dialog";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { HeaderBackButton } from 'react-navigation-stack'
import DatabaseManager from '../manager/DatabaseManager';
import TextInputSingleLine from '../components/TextInputSingleLine';
import NoteEdit from '../components/NoteEdit';
import DayChooser from '../components/DayChooser';
import TimePicker from '../components/TimePicker';
import HorizontalLineWithText from '../components/HorizontalLineWithText';
import FoodDiaryRatingBar from '../components/FoodDiary/FoodDiaryRatingBar';
import FoodDiaryTagEdit from '../components/FoodDiary/FoodDiaryTagEdit'
import FoodDiaryImageEdit from '../components/FoodDiary/FoodDiaryImageEdit'
import LanguageManager from '../manager/LanguageManager';
import GlutonManager from '../manager/GlutonManager';
import GearManager from '../manager/GearManager';
import AchievementManager from '../manager/buddyManager/AchievementManager';
import EntryManager from '../manager/buddyManager/EntryManager';
import CeliLogger from '../analytics/analyticsManager';
import Interactions from '../constants/Interactions';
import Colors from '../constants/Colors';
import ImageHeader, { HeaderImage } from '../components/ImageHeader';

export default class FoodDiaryScreen extends React.Component
{
    static navigationOptions = ({navigation}) => ({
		headerTintColor: '#ffffff',
		headerStyle: 
		{
			backgroundColor: Colors.meal
		},
		headerTitle:<ImageHeader logo={HeaderImage.MEAL} width={40} color={'#ffffff'}/>,
        headerLeft: <HeaderBackButton tintColor={'#ffffff'} label={' '} onPress={() => navigation.state.params.onCancelPressed()}/>
    })

    constructor(props) {
        super(props);
        this.noteEditedHandler = this.noteEditedHandler.bind(this);
        this.nameEditedHandler = this.nameEditedHandler.bind(this);
        this.dateEditedHandler = this.dateEditedHandler.bind(this);
        this.timeEditedHandler = this.timeEditedHandler.bind(this);
        this.ratingEditedHandler = this.ratingEditedHandler.bind(this);
        this.mealChangedHandler = this.mealChangedHandler.bind(this);
        this.classChangedHandler = this.classChangedHandler.bind(this);
        this.state = {
            foodEntryNote: "",
            foodEntryName: "",            
            foodRating: 0,
            keyboardOpen: false,
            photo: null,
            selectedMealKey : 0,            
            selectedClassKey : 2,
        } 
    }

    state = {
        modified: true, // true for DEBUG now
        cancelSaveDialogVisible: false,
        saveAsEmptyFoodDialogVisible: false,
    }

    UNSAFE_componentWillMount() {
        this.setState({
            selectedDateAndTime: this.props.navigation.state.params.selectedDateAndTime
        });
        CeliLogger.addLog("FoodDiaryScreen", Interactions.OPEN);
    }

    componentDidMount() {        
        this.props.navigation.setParams({ 
            onOkPressed: this.saveCurrentData.bind(this) ,
            onCancelPressed: this.handleCancelButton.bind(this) ,
        })
        this.keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            this._keyboardDidShow,
          );
          this.keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            this._keyboardDidHide,
          );
    }

    componentWillUnmount() {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
        CeliLogger.addLog("FoodDiaryScreen", Interactions.CLOSE);
      }

    clearNoteText = () => {
        this.setState({
            foodEntryNote: ""
        })
       this._noteEdit.deleteNote();
     }
    
    timeEditedHandler = (dateTime) =>{
        let tmpDateTime = this.state.selectedDateAndTime
        tmpDateTime.setHours(dateTime.getHours())
        tmpDateTime.setMinutes(dateTime.getMinutes())

        this.setState({
            selectedDateAndTime: tmpDateTime,
        })
    }

    _keyboardDidShow = ()  => {
        this.setState({
            keyboardOpen: true,
        })
      }
    
      _keyboardDidHide = ()  => {
        this.setState({
            keyboardOpen: false,
        })
      }


    dateEditedHandler = (dateTime) =>{

        let tmpDateTime = this.state.selectedDateAndTime
        tmpDateTime.setDate(dateTime.getDate())
        tmpDateTime.setMonth(dateTime.getMonth())
        tmpDateTime.setFullYear(dateTime.getFullYear())
        this.setState({
            selectedDateAndTime: tmpDateTime,
        })
        if(Array.isArray(this.state.selectedSymptoms) && this.state.selectedSymptoms.length){
            this.showDayChangeSaveDialog()
        }else{
            //symptoms were not edited, but maybe the note. Delete note and update noteEdit
            this.setState({
                symptomEntryNote: ""
            })
            this.clearNoteText()
        }
    }

    ratingEditedHandler = (rating) =>{
        this.setState({
            foodRating: rating,
        });
    }

    
    mealChangedHandler = (meal) =>{
        this.setState({
            selectedMealKey: meal,
        });
    }
  
    classChangedHandler = (tag) =>{
        this.setState({
            selectedClassKey: tag,            
        });
    }
  
    noteEditedHandler = (note) =>{
        this.setState({
            foodEntryNote: note,
        });
    }
    nameEditedHandler = (name) =>{
        this.setState({
            foodEntryName: name,
        });
    }

    saveCurrentData(goHome) {
        if (this.state.photo != null || this.state.foodEntryName != "" ){     
            this.saveData(goHome)
            }else{
                this.showSaveEmptyDialog()
                // Alert.alert(
                //     LanguageManager.getInstance().getText("NOT_SAVED"),
                //     LanguageManager.getInstance().getText("PICTURE_OR_NAME"),
                //     [
                //       {text: 'OK'},
                //     ],
                //     {cancelable: false},
                //   );
            }        
    }

    saveData(goHome){
        let tmpDateTime = this.state.selectedDateAndTime
        tmpDateTime.setFullYear(tmpDateTime.getFullYear());
        DatabaseManager.getInstance().createMealEvent(this.state.foodEntryName, this.state.selectedClassKey, this.state.selectedMealKey, this.state.foodRating, this.state.foodEntryNote, this.state.photo, tmpDateTime.getTime(), 
            (error) => {alert(error)}, 
            () => {GlutonManager.getInstance().setMessage(2); GearManager.getInstance().sendMessage("msg 31")}
        );
        // AchievementAddition
        if (this.state.selectedMealKey == 0){
            if (this.state.selectedClassKey == 0){
                EntryManager.AddEntry("GLUTENBREAKFAST");
            }
            if (this.state.selectedClassKey == 1){
                EntryManager.AddEntry("GLUTENFREEBREAKFAST");
            }
            if (this.state.selectedClassKey == 2){
                EntryManager.AddEntry("UNSUREBREAKFAST");
            }
        }
        if (this.state.selectedMealKey == 1){
            if (this.state.selectedClassKey == 0){

            }
            if (this.state.selectedClassKey == 1){
                EntryManager.AddEntry("GLUTENFREELUNCH");
            }
        }
        if (this.state.selectedMealKey == 2){
            if (this.state.selectedClassKey == 0){

            }
            if (this.state.selectedClassKey == 1){
                EntryManager.AddEntry("GLUTENFREEDINNER");
            }
        }
        AchievementManager.triggerAchievement("MEALADDED");
        if (goHome) {
            setTimeout(() => this.navigateHome(), 100);
            }
    }

    handleCancelButton() {
        if (this.state.modified == true) {
            this.showBackDiscardDialog()
        } else {
            this.navigateHome()
        }
    }

    navigateHome() {
        this.props.navigation.goBack();
    }

    showBackDiscardDialog() {
        this.setState({ cancelSaveDialogVisible: true });
    };

    showSaveEmptyDialog(){
        this.setState({ saveAsEmptyFoodDialogVisible: true });
    }

    handleBack() {
        this.setState({ cancelSaveDialogVisible: false });
        this.setState({ saveAsEmptyFoodDialogVisible: false });
    };

    handleDiscard() {
        this.setState({ cancelSaveDialogVisible: false });
        this.setState({ saveAsEmptyFoodDialogVisible: false });
        this.navigateHome()
    };


    render() {

        const marginToUse = 0;// ((this.state.keyboardOpen) ? 300 : 0);
        const tags = [LanguageManager.getInstance().getText("GLUTEN"), LanguageManager.getInstance().getText("NO_GLUTEN"), LanguageManager.getInstance().getText("UNSURE")];
        const meals = [LanguageManager.getInstance().getText("BREAKFAST"), LanguageManager.getInstance().getText("LUNCH"), LanguageManager.getInstance().getText("DINNER"), LanguageManager.getInstance().getText("SNACK")];
        return (
            //extraScrollHeight not supoorted out-of-the-box in android see here https://github.com/AyushAppin/react-native-keyboard-aware-scroll-view
            <KeyboardAwareScrollView extraScrollHeight={20} scrollEnabled={true} enableAutomaticScroll={true}>
                <HorizontalLineWithText borderColor={Colors.meal} text = {LanguageManager.getInstance().getText("DATE")}/>
                <DayChooser color={Colors.meal} disabledColor={Colors.mealDatePickerChevron} ref={component => this._dayChooser = component} date = {this.state.selectedDateAndTime} onDateChanged={this.dateEditedHandler}/>
                <HorizontalLineWithText borderColor={Colors.meal} text = {LanguageManager.getInstance().getText("TIME")}/>
                <TimePicker ref={component => this._timePicker = component} textString = "EATEN_AT" onTimeChanged={this.timeEditedHandler}/>
                <HorizontalLineWithText text = {LanguageManager.getInstance().getText("TYPES")}/>
                <FoodDiaryTagEdit ref={component => this._meal = component} all={meals} selected={this.state.selectedMealKey} isExclusive={true} onTagChanged={this.mealChangedHandler}/>
                <HorizontalLineWithText text = {LanguageManager.getInstance().getText("MEAL_NAME")}/>
                <TextInputSingleLine
                  ref={component => this._name = component}
                  onTextChanged={this.nameEditedHandler}
                  style={{Top: 10}}
                  placeholderText= {LanguageManager.getInstance().getText("MEAL_NAME_PLACEHOLDER")}
                />
                <HorizontalLineWithText text = {LanguageManager.getInstance().getText("MEAL_NOTES")} style={{Top: 10}}/>
                <NoteEdit
                  ref={component => this._noteEdit = component}
                  note={this.state.symptomEntryNote}
                  onTextChanged={this.noteEditedHandler}
                  style={{Top: 10}}
                  placeholderText= {LanguageManager.getInstance().getText("MEAL_NOTES_PLACEHOLDER")}
                />
                <HorizontalLineWithText text = {LanguageManager.getInstance().getText("TAGS")}/>
                <FoodDiaryTagEdit ref={component => this._class = component} all={tags} selected={this.state.selectedClassKey} isExclusive={true} onTagChanged={this.classChangedHandler}/>
                <HorizontalLineWithText text = {LanguageManager.getInstance().getText("IMAGE")}/>
                <View style={{alignItems: 'center'}}>
                    <FoodDiaryImageEdit navigation = {this.props.navigation} onPictureTaken={(image) => this.setState({photo: image})}/>
                </View>
                <HorizontalLineWithText text = {LanguageManager.getInstance().getText("RATING")}/>
                <View style={{alignItems: 'center'}}>
                    <FoodDiaryRatingBar ref={component => this._rating = component}  onRatingChanged={this.ratingEditedHandler}/>
                </View> 
                <View>
                    <Dialog.Container visible={this.state.saveAsEmptyFoodDialogVisible}>
                        <Dialog.Title>{LanguageManager.getInstance().getText("SAVE_EMPTY_FOOD")}</Dialog.Title>
                        <Dialog.Description>
                        {LanguageManager.getInstance().getText("WANT_TO_SAVE_EMPTY_FOOD")}
                        </Dialog.Description>
                        <Dialog.Button label={LanguageManager.getInstance().getText("BACK")} onPress={() => this.handleBack()} />
                        <Dialog.Button label={LanguageManager.getInstance().getText("YES")} onPress={() => this.saveData(true)} />
                    </Dialog.Container>
                </View>
                <View>
                    <Dialog.Container visible={this.state.cancelSaveDialogVisible}>
                        <Dialog.Title>{LanguageManager.getInstance().getText("DISCARD")}</Dialog.Title>
                        <Dialog.Description>
                        {LanguageManager.getInstance().getText("DO_YOU_WANT_TO_DISCARD")}
                        </Dialog.Description>
                        <Dialog.Button label={LanguageManager.getInstance().getText("BACK")} onPress={() => this.handleBack()} />
                        <Dialog.Button label={LanguageManager.getInstance().getText("DISCARD")} onPress={() => this.handleDiscard()} />
                    </Dialog.Container>
                </View>
            </KeyboardAwareScrollView>
        )
    }

}

    
    var styles = StyleSheet.create({
     headText:{
        fontSize: 20,
        textAlign: 'center',
        margin: 10
     },
    });