import React, { Component } from 'react';
import { CSSTransitionGroup } from 'react-transition-group';
import Option from './Option';

/**
 * Result Component
 * Displays the results page
 * Makes API call to update highscore and get current highscore
 */
  class Result extends  Component {

    /**
     * Constructor for the result class
     * Called when a rseult object is initialised
     */
    constructor() {
      super(); // Call super constructor for component

      // Bind this to all neccesary function
      this.changeToInfo = this.changeToInfo.bind(this);
      this.changeToHome = this.changeToHome.bind(this);

      // Declare my state variables 
      this.state = {
        score: 0,
        result: 0,
        highScore: 0
      }
    }

    /**
     * Called when component is re-rendered
     */
    componentWillMount() {
      this.callApi(); // Calls API to update and return users highscore
    }

    /**
     * This asynchronous function will execute an API call when results page loads
     * Return value is users highscore
     */
    async callApi() {
      // Send current score and username
      const scoreResponse = await fetch('/score', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          score: this.props.quizScore,
          username: this.props.username
        })
      });
      
      this.scoreReceived = await scoreResponse.json(); 

      this.setState({
        score: this.props.quizScore,
        result: this.props.quizResult,
        highScore: this.scoreReceived[0][0]
      });

    }

    /**
     * Function called when user selects info button
     */
    changeToInfo() {
      this.props.info("Leave Result Page");
    }

    /**
     * Function called when user selects render button
     */
    changeToHome() {
      this.props.button("Leave Result Page");
    }

    /**
     * Render function for results page
     */
    render() {
      return (
        <div>
          <CSSTransitionGroup
            className="container result"
            component="div"
            transitionName="fade"
            transitionEnterTimeout={800}
            transitionLeaveTimeout={500}
            transitionAppear
            transitionAppearTimeout={500}
          >
            <div>
              <h3>You got <strong>{this.state.result}</strong> correct!</h3>
              <h3>Your score: <strong>{this.state.score}</strong></h3>
              <h3>Your highScore: <strong>{this.state.highScore}</strong></h3>
              {this.props.challenged && 
                <h3><strong>{this.props.challengeResult}</strong> the challenge from <strong>{this.props.challenger}</strong></h3>
              }
            </div>
          </CSSTransitionGroup>
          <Option symbol="fa fa-home" name=" Home" side="option resultRight" change={this.changeToHome}/>
          <Option symbol="fa fa-info" name=" Info" side="option resultLeft" change={this.changeToInfo}/>
        </div>
      );
    }
  }

  export default Result;
