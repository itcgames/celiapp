/// @authors Dion Buckley and Peter Daly
/// This screen I built for my native screen stack, however the logic I have taken (in stripped down form) from my predessecor project
/// What this means is that Peter built a Quiz for React.js whereas I have been tasked with porting over the reusable parts and rewritting
/// The native specific parts (like render functions and some other nuances)
/// I have only taken the most basic version of Peters quiz as I don't have any need for the many extra features from his project
/// The specific lines and functions I added (apart from obvios file structure like imports and class defintion) I will tag as my own

import React from 'react';
import QuizWebView from "../components/QuizWebView";
import { Button, StatusBar, StyleSheet, View, Text } from 'react-native';
import Quiz from '../components/Quiz';

export default class QuizScreen extends React.Component {
  constructor(props) {
    super(props);

    // Declare state variables
    this.state = {
      page: '',
      title: "Home",
      quizQuestions: []
    };

    // Bind this to the relevant functions that need to access it 
    this.changeToHome = this.changeToHome.bind(this);
    this.componentWillMount = this.componentWillMount.bind(this);
    this.changeToQuiz = this.changeToQuiz.bind(this);
    this.changeToInfo = this.changeToInfo.bind(this);
    this.leaveHome = this.leaveHome.bind(this);
  }

  /// @author Dion Buckley
  /// This relates to my stack navigator
  static navigationOptions = {
    title: 'Quiz Zone        ',
  };

  /**
 * Called when component is re-rendered
 */
  componentWillMount() {
    this.callApi(); // Calls function that handles api calls necessary for starting application

    // Sets current page to be the log in page
    this.setState({
      page: "Home"
    });
  }


  /**
  * This asynchronous function will execute an API call once the application starts
  * It retrieves all information displayed in the application and splits it up into
  * info data and quiz data
  */
  async callApi() {
    ///
    /// @author Dion Buckley
    /// Exception handling try, catch blocks were added by me for ALL async functions in aim to make this solution more robust, handling promises rejections
    ///
    try {
      // Makes api call
      ///
      /// @author Dion Buckley
      /// Using Expo (which uses local host) the python server can no longer run off localhost but rather a static external ip
      ///
      // Home
      const response = await fetch('http://192.168.0.42:5000/info'); // cannot use local host as expo conflicts the ip so setup static ip on host
      // Hotspot const response = await fetch('http://192.168.43.169:5000/info');
      // College through tethered  
      //const response = await fetch('http://192.168.42.162:5000/info');
      // Tethered home const response = await fetch('http://192.168.42.227:5000/info');

      this.infoReceived = await response.json();  // Gets data back from call
      var quizQuestions = [] // Array to hold all quiz data

      var id = 1;
      for (var i = 0; i < this.infoReceived.length; i++) {
        // Loops through every info point
        for (var j = 0; j < this.infoReceived[i].quizContent.length; j++) {
          // Loops through every quiz question in info card

          // Creates object which stores all information in that quiz question
          var object = {
            "id": id,
            "question": this.infoReceived[i].quizContent[j].question,
            "category": this.infoReceived[i].title,
            "correct": this.infoReceived[i].quizContent[j].correct,
            "answers": this.infoReceived[i].quizContent[j].answers
          }

          quizQuestions.push(object); // Adds object to the array
          id++; // Increments id for the next question
        }
        ///
        /// @author Dion Buckley
        /// This log was important in figuring out if all of the moving parts (mariadb server, python server off external ip, google doc data pulling etc, were all working in my project)
        ///
        // console.log(quizQuestions);
      }
      // Stores all the info and quiz content received
      this.setState({
        quizQuestions : quizQuestions
         
      });
    }
    catch (e) {
      console.log('caught error', e);
    }
  }

  // /**
  //  * This asynchronous function will execute an API call once the user changes the current page
  //  * The purpose of this is so that we can track how often certain pages are visited
  //  */
  // async updatePageCount(event1, event2) {
  //   try {
  //     // Event1 is the user leaving their current page
  //     // Event2 is the user entering the new page
  //     const response = await fetch('/update_user_info', {
  //       method: 'POST',
  //       headers: {
  //         'Accept': 'application/json',
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         event1: event1,
  //         event2: event2
  //       })
  //     });
  //   }
  //   catch (e) {
  //     console.log('caught error', e);
  //   }
  // }

  renderQuiz() {
    //console.log(this.state.quizQuestions)
    if (this.state.quizQuestions.length > 0) {
      return (
        <View style={styles.container}>
          <Text style = {styles.title}>{"Quiz"}</Text>
          {/* <QuizWebView/> */}
          <Quiz questions={this.state.quizQuestions} />
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
        <Text>{"Quiz"}</Text>
      </View>
      )
    }
  }

  /**
   * Function for changing pages to the home page 
   */
  changeToHome(messageEvent) {
    // Message event is to let us know where the user is coming from ie Info or quiz page

    this.setState({
      page: "Home",
      title: "Home",
    });
    // Call function that updates user events
    // this.updatePageCount(messageEvent, "Enter Home Page");
  }


  /**
   * Function for changing pages to the home page 
   */
  changeToQuiz(event) {
    this.setState({
      page: "Quiz",
      title: "Quiz"
    });

    // Call function that updates user events
    // this.updatePageCount("Leave Home Page", "Start Quiz");
  }

  /**
   * Function for changing pages to the info page 
   */
  changeToInfo(messageEvent) {
    // Message event is to let us know where the user is coming from ie home or result page

    this.setState({
      page: "Info",
      title: "Information",
    });

    // Call function that updates user events
    this.updatePageCount(messageEvent, "Enter Info Page ");
  }


  /**
   * Function for rendering the Info page to the screen
   */
  renderInfoContent() {
    return (
      <View style={styles.container}>
        {/* <Info
        info={this.state.info}
        personalInfo={this.state.personalInfo}
        username={this.state.username}
        infoSaved={this.state.infoSaved}
        personalSave={this.state.personalSave}
        button={this.changeToHome}
        searchFunc={this.search}
        deleteFunc={this.deleteFromPersonalisedInfo}
        updateCount={this.updatePageCount}
      /> */}
      </View>
    );
  }

  /**
   * Function called when leaving home to go to the info page
   * Purpose of this is to allow to send the message for our user data event
   */
  leaveHome(event) {
    this.changeToInfo("Leave Home Page");
  }

  /**
   * Function for rendering the Home page to the screen
   */
  renderHome() {

    return (
      <View style={styles.container}>
        <Button title="    Quiz    " onPress={this.changeToQuiz} />
        <Text>{''}</Text>
        <Button title="Information " onPress={this.leaveHome} />
        {/* <Option symbol="fa fa-address-book fa-3x" side="option top" change={this.changeToSocialHub} /> */}
      </View>
    );
  }

  /**
   * This function checks which page should be rendered
   * It then calls the corresponding render function
   */
  renderPage() {
    if (this.state.page === "Home") {
      return this.renderHome();
    }
    else if (this.state.page === "Quiz") {
      return this.renderQuiz();
    }
    else if (this.state.page === "Info") {
      return this.renderInfoContent();
    }
  }

  /**
   * Base render function
   */
  render() {
    return (
      this.renderPage() /* Calls function that decides which page should be rendered */
    )
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 30,
    textAlign: 'center',
    margin: 20,
  }
});
