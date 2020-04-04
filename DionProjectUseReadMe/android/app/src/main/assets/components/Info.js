import React, { Component } from 'react';
import InfoPoint from './InfoPoint';
import Option from './Option';
import Search from './Search';

/**
 * Info Component
 * Handles switching between base and personalised info pages
 * Handles all formatting and rendering of info points
 */
class Info extends Component {

  /**
   * Constructor for the info class
   * Called when a info object is initialised
   */
  constructor() {
    super(); // Call super constructor for component
    
    // Declare my state variables
    this.state = {
      page: 'Info',
      info: [],
      personalInfo: []
     };

     // Bind this to the relevant functions that need to access it
     this.switch = this.switch.bind(this);
     this.search = this.search.bind(this);
     this.renderInfoPoints = this.renderInfoPoints.bind(this);
     this.returnHome = this.returnHome.bind(this);
     
  }

  /**
   * Called when component is re-rendered
   */
 componentWillMount() {

  // Sets up base and personalised info points
  this.setState({
    info: this.props.info,
    personalInfo: this.props.personalInfo
   });
 }

 /**
   * Function for searching for info points
   */
 search(value) {

  value = value.toLowerCase(); // Converts word searched to lower case

  var array = [];
  var title = "";

  // Empties base and personalised info page of all info points
  this.setState({
    info: [],
    personalInfo: []
   });
  
  if(this.state.page === "Info") {

    // Loops through all info points
    for (var i = 0; i < this.props.infoSaved.length; i++){
      title = this.props.infoSaved[i].title;
      title = title.toLowerCase();
      if(title.includes(value)) {
        // If searched word is in title of info point, add it to info points to be drawn
        array.push(this.props.infoSaved[i]);

        // Sets new array of info points that contain word to be what is rendered
        this.setState({
          info: array,
          personalInfo: this.props.personalSave
         });
      }
    }
  }
  else if(this.state.page === "Personalised") {

    // Loops through all personalised info points
    for (var j = 0; j < this.props.personalSave.length; j++){
      title = this.props.personalSave[j].title;
      title = title.toLowerCase();
      if(title.includes(value)) {
        // If searched word is in title of info point, add it to info points to be drawn
        array.push(this.props.personalSave[j]);

        // Sets new array of info points that contain word to be what is rendered
        this.setState({
          info: this.props.infoSaved,
          personalInfo: array
         });
      }
    }
  }
}

  /**
   * Function for rendering an info card
   */
  renderInfoPoints(key) {
    // Returns info point, set up with values passed
    return (
      <InfoPoint
        key={key}
        title={key.title}
        content={key.content}
        page={this.state.page}
        deleteFunc={this.props.deleteFunc}
      />
    );
  }

  /**
   * Function for switching between base and personalised info page
   */
  switch() {
    if(this.state.page === "Info") {
      // If current page is base info page, set it to be the personalised page
      this.setState({ page: "Personalised" });

      // Call function that updates user events
      this.props.updateCount("Leave Info Page", "Enter Personalised Page", this.props.username)
    }
    else {
      // If current page is personalised info page, set it to be the base info page
      this.setState({ page: "Info" });

      // Call function that updates user events
      this.props.updateCount("Leave Personalised Page", "Enter Info Page", this.props.username)
    }

  }

  /**
   * Function for returning to the home screen
   */
  returnHome() {
    // Calls the same function regardless of page but sends different message
    if(this.state.page === "Info") {

      // Calls on fuction that sets home page to be rendered
      // The message it's passing lets the application know where the user is coming from
      this.props.button("Leave Info Page");
    }
    else {

      // Calls on fuction that sets home page to be rendered
      // The message it's passing lets the application know where the user is coming from
      this.props.button("Leave Personalised Page")
    }
    
  }

  /**
   * Function for rendering all relevant info content to the screen
   */
  render() {

    // Renders different page based on whether it's the base info page or personalised info page
    if(this.state.page === "Info") {
      return (
        <div>
          <Option symbol="fa fa-home fa-3x" side="option top" change={this.returnHome}/>
          <Option symbol="fa fa-clone fa-3x" side="option switch" change={this.switch}/>
          <Search onChange={this.search} class="infoSearch"/>
          <ul className="info">
            {this.state.info.map(this.renderInfoPoints)}
          </ul>
        </div>
      );
    }
    else {
      return (
        <div>
          <Option symbol="fa fa-home fa-3x" side="option top" change={this.returnHome}/>
          <Option symbol="fa fa-clone fa-3x" side="option switch" change={this.switch}/>
          <Search onChange={this.search} class="infoSearch"/>
          <h4> This Info has been personalised for you </h4>
          <ul className="info">
            {this.state.personalInfo.map(this.renderInfoPoints)}
          </ul>
        </div>
      );
    }
    
  }
}


export default Info;
