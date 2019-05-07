
import React from 'react';
import {Icon, View, Text, Alert} from 'react-native';
import SymptomIcon from './SymptomIcon';
import SymptomIconButton from './SymptomIconButton';
import MoreSymptomsButton from './MoreSymptomsButton'
import HorizontalLineWithText from '../HorizontalLineWithText';
import HorizontalLine from '../HorizontalLine';


export default class SymptomGroup extends React.Component{

    constructor(props) {
       super(props);
       this.severityChooserHandler = this.severityChooserHandler.bind(this);
       this.symptomSelected = this.symptomSelected.bind(this)
       this.symptomDeselected = this.symptomDeselected.bind(this)
       this.state = {
           canOpenSeverityChooser: true,
           symptomAndSeverityList: [],
       } 
    }
    

    severityChooserHandler(setActive){
        if(setActive){
            this.setState({
                canOpenSeverityChooser: true,
            });
        }else{
            this.setState({
                canOpenSeverityChooser: false,
            });
        }

    }


    symptomSelected(symptomID, severity){ //severity: 1==yellow, 2==orange, 3==red
        let tmpArray = this.state.symptomAndSeverityList;
        tmpArray.push([symptomID,severity])
        var arrayLength = tmpArray.length;
        this.props.onSelectedSymptomIDsChanged(tmpArray)
    }


    //Deletion of symptoms doesnt work property.
    //TODO!! - dont know why, but sometimes it deletes more than neccessary, sometimes less....
    symptomDeselected(symptomID, severity){
        let tmpArray = this.state.symptomAndSeverityList;
        var arrayLength = tmpArray.length;
        var toFind = [symptomID,severity];
        for(var i = 0; i < arrayLength; i++){
            let toSearch = tmpArray[i, 0];
            if(toSearch.toString().localeCompare(toFind.toString())){
                tmpArray.splice(i,1);
            }
        }
        this.props.onSelectedSymptomIDsChanged(tmpArray)
    }



    render(){
        return(
            <View>
                <View style={{
                    height:150,
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    marginTop: 25,
                }}>
                    <SymptomIconButton type = {1} symptomID={1} onSeverityChooserHandled = {this.severityChooserHandler} canOpenSeverity = {this.state.canOpenSeverityChooser} onSymptomSelected = {this.symptomSelected} onSymptomDeselected = {this.symptomDeselected}/>
                    <SymptomIconButton type = {2} symptomID={2} onSeverityChooserHandled = {this.severityChooserHandler} canOpenSeverity = {this.state.canOpenSeverityChooser} onSymptomSelected = {this.symptomSelected} onSymptomDeselected = {this.symptomDeselected}/>
                    <SymptomIconButton type = {2} symptomID={3} onSeverityChooserHandled = {this.severityChooserHandler} canOpenSeverity = {this.state.canOpenSeverityChooser} onSymptomSelected = {this.symptomSelected} onSymptomDeselected = {this.symptomDeselected}/>
                    <SymptomIconButton type = {3} symptomID={4} onSeverityChooserHandled = {this.severityChooserHandler} canOpenSeverity = {this.state.canOpenSeverityChooser} onSymptomSelected = {this.symptomSelected} onSymptomDeselected = {this.symptomDeselected}/>
                </View>
                <View style={{
                    height:150,
                    flexDirection:'row',
                    justifyContent: 'space-around',
                    alignItems:'center',
                }}>
                    <SymptomIconButton type = {1} symptomID={5} onSeverityChooserHandled = {this.severityChooserHandler} canOpenSeverity = {this.state.canOpenSeverityChooser} onSymptomSelected = {this.symptomSelected} onSymptomDeselected = {this.symptomDeselected}/>
                    <SymptomIconButton type = {2} symptomID={6} onSeverityChooserHandled = {this.severityChooserHandler} canOpenSeverity = {this.state.canOpenSeverityChooser} onSymptomSelected = {this.symptomSelected} onSymptomDeselected = {this.symptomDeselected}/>
                    <SymptomIconButton type = {2} symptomID={7} onSeverityChooserHandled = {this.severityChooserHandler} canOpenSeverity = {this.state.canOpenSeverityChooser} onSymptomSelected = {this.symptomSelected} onSymptomDeselected = {this.symptomDeselected}/>
                    <SymptomIconButton type = {4} symptomID={8} onSeverityChooserHandled = {this.severityChooserHandler} canOpenSeverity = {this.state.canOpenSeverityChooser} onSymptomSelected = {this.symptomSelected} onSymptomDeselected = {this.symptomDeselected}/>
                </View>
                <HorizontalLine />
            </View>
        )
    }
}