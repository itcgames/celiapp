import React, { Component } from 'react';

/**
 * Sign Up Component
 * Allows users to create a log in with a username and a password
 */
class SignUp extends  Component {

    /**
     * Constructor for the Sign Up class
     * Called when a Sign Up object is initialised
     */
    constructor() {
        super(); // Call super constructor for component
            
        // Declare my state variables
        this.state = {
        username: '',
        password: '',
        fail: false,
        errorMessage: ''
        };

        // Bind this to the relevant functions that need to access it
        this.handleUChange = this.handleUChange.bind(this);
        this.handlePChange = this.handlePChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.logIn = this.logIn.bind(this);
    }

    /**
     * Called when component is re-rendered
     */
    componentWillMount() { }

    /**
     * This asynchronous function will execute an API call when user tries sign up
     * API call tries to add new user to database
     * If data is incorrect or user already exists, return value will be false
     */
    async callApi() {

        // Pass username and password that the user wishes to have as their log in details
        const accept = await fetch('/SignUp', {
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
            // If sign up was successful, log user in
            this.props.button("", this.state.username);
        }
        else {
            // Sign up wasn't successful

            // Set up error message
            this.setState({
                fail: true,
                errorMessage: "Username already taken"
              });
        }
    }

    /**
     * Function for switching to log in screen
     * @param {*} event 
     */
    logIn(event) {
        this.props.change();
    }

    /**
     * Function for when user clicks sign up button
     * @param {*} event 
     */
    handleSubmit(event) {
        event.preventDefault();
        
        if(this.state.username.length < 5) {
            // If username isn't long enough
            this.setState({
                fail: true,
                errorMessage: "Username must be 5 or more characters"
            });
        }
        else if(this.state.password.length < 5) {
            // If password isn't long enough
            this.setState({
                fail: true,
                errorMessage: "Password must be 5 or more characters"
            });
        }
        else {
            // Call api to add new user to database
            this.callApi();
        }
        
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
     * Render function for sign up page
     */
    render() {
      return (
        <div>
            { !this.state.fail && 
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
                    <a href='javascript:void(0)' onClick={this.logIn}>Already have an account?</a>
                    <input className="SubmitForm" type="submit" value="Submit" />
                </form>
            }
            { this.state.fail &&
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
                <h5>{this.state.errorMessage}</h5>
                <a href='javascript:void(0)' onClick={this.logIn}>Already Have Account? Log In</a>
                <input className="SubmitForm" type="submit" value="Submit" />
            </form>

            }
        </div>
      );
    }
  }

  export default SignUp;
