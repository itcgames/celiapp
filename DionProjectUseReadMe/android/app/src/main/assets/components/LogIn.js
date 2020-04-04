import React, { Component } from 'react';

/**
 * Log In Component
 * Handles user logging in to the application
 * Lets user navigate to the sign in screen
 */
class LogIn extends  Component {

  /**
   * Constructor for the Log In class
   * Called when a Log In object is initialised
   */
    constructor() {

      super(); // Call super constructor for component

      // Declare my state variables 
      this.state = {
        username: '',
        password: '',
        failedLogIn: false
      };

      // Bind this to relevant functions
      this.handleUChange = this.handleUChange.bind(this);
      this.handlePChange = this.handlePChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.signUp = this.signUp.bind(this);
    }

    /**
     * Called when component is re-rendered
     */
    componentWillMount() {}
 
    /**
     * This asynchronous function will execute an API call when the user tries log in
     * API call checks entered data against stored user
     * Returns false if entered details dont match any in database
     * Returns true if entered details match user in database
     */
    async callApi() {
        const accept = await fetch('/LogIn', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              username: this.state.username,
              password: this.state.password
            })
          });

        var acceptJSON = await accept.json(); 
        
        
        if(acceptJSON === true) {
            // If accepted, log the user in
            this.props.button("Log In", this.state.username);
        }
        else {
            // Set log in to have failed
            this.setState({
                failedLogIn: true
              });
        }
    }

    /**
     * Swicthes to the sign up screen
     * @param {*} event 
     */
    signUp(event) {
      this.props.change();
    }

    /**
     * Function called when user presses log in button
     * @param {*} event 
     */
    handleSubmit(event) {
        event.preventDefault();
        
        this.callApi(); // Call log in api
        return false;
    }

    /**
     * Called when user enters value into username search bar
     * @param {*} event 
     */
    handleUChange(event) {
        // Stores entered value in state variable
        this.setState({username: event.target.value});
    }

    /**
     * Called when user enters value into password search bar
     * @param {*} event 
     */
    handlePChange(event) {
        // Stores entered value in state variable
        this.setState({password: event.target.value});
    }

    /**
     * render function for log in screen
     */
    render() {
      return (
        <div>
            { !this.state.failedLogIn && 
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Username:  <br/>
                        <input className="LogIn" type="text" value={this.state.username} onChange={this.handleUChange} />
                    </label>
                    <br/>
                    <label>
                        Password:  <br/>
                        <input className="LogIn" type="password" value={this.state.password} onChange={this.handlePChange} />
                    </label>
                    <br/>
                    <a href='javascript:void(0)' onClick={this.signUp}>Sign Up</a>
                    <input className="SubmitForm" type="submit" value="Log In" />
                </form>
            }
            { this.state.failedLogIn &&
                <form onSubmit={this.handleSubmit}>
                <label>
                    Username:  <br/>
                    <input className="LogIn fail" type="text" value={this.state.username} onChange={this.handleUChange} />
                </label>
                <br/>
                <label>
                    Password:  <br/>
                    <input className="LogIn fail" type="password" value={this.state.password} onChange={this.handlePChange} />
                </label>
                <br/>
                <h5>Either your username or password was incorrect</h5>
                <a href='javascript:void(0)' onClick={this.signUp}>Sign Up</a>
                <input className="SubmitForm" type="submit" value="Log In" />
            </form>
            }
        </div>
      );
    }
  }

  export default LogIn;
