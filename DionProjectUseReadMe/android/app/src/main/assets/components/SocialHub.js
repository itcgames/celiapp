import React, { Component } from 'react';
import Option from './Option';
import Challenge from './Challenges';
import Report from './Reports';
import Popup from "reactjs-popup";
import Search from './Search';

/**
 * Social Hub Component
 * This class handles all multiplayer aspects of the application
 * Renders all challenges and reports to the screen
 * Allows users to react to challenges and reports
 * Allows users to issue challenges to other users
 */
class SocialHub extends Component {

    /**
   * Constructor for the social hub class
   * Called when a social hub object is initialised
   */
    constructor() {
        super(); // Call super constructor for component

        // Declare my state variables
        this.state = {
            page: 'Social Hub',
            challenges: [],
            reports: [],
            searchName: '',
            errorMessage: '',
            fail: false,
            questionArray: []
        };

        // Bind this to the relevant functions that need to access it
        this.reactToChallenge = this.reactToChallenge.bind(this);
        this.deleteReport = this.deleteReport.bind(this);
        this.renderChallenges = this.renderChallenges.bind(this);
        this.renderReports = this.renderReports.bind(this);
        this.search = this.search.bind(this);
        this.startChallenge = this.startChallenge.bind(this);
        this.leaveSocialHub = this.leaveSocialHub.bind(this);
    }

    /**
     * Called when component is re-rendered
     */
    componentWillMount() {
        this.reportIndex = -1;

        // Calls function which retrieves users current reports and challenges
        this.callApi(); 
    }

    /**
     * This asynchronous function is called when social hub loads
     * It retrieves all reports and challenges belonging to user
     */
    async callApi() {
        // API call to get challenges
        const response = await fetch('/get_challenges/' + this.props.username);
        this.challenges = await response.json();   

        this.setState({ // Stores challenges in state variable
            challenges : this.challenges
        });  

        // API call to get reports
        const reportResponse = await fetch('/get_reports/' + this.props.username);
        this.reports = await reportResponse.json();   

        this.setState({ // Stores reports in state variable
            reports : this.reports
        });  
    }

    /**
     * Function called when user deletes a report
     */
    deleteReport(id) {
        var array = []
        array = this.state.reports;
        
        // Loop thorugh array of reports
        for(var i = 0; i < array.length; i++) {

            if(array[i].id === id) { // If current report equals report to be deleted

                // Remove report from array 
                array.splice(i, 1);
                break;
            }
        }

        // Update reports
        this.setState({
            reports : array
        });
        this.delReportsAPI(id); // Call API function to delete reports
    }

    /**
     * This asynchronous function is called when user deletes a report
     * Makes api call to remove report from database
     */
    async delReportsAPI(id) {
        // Passes id of report to be deleted
        const response = await fetch('/discard_report', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              id: id
            })
          });
    }

    /**
     * Function called when user reacts to a challenge
     * accept parameter is true when challenge is accepted
     * accept parameter is false when challenge is rejected
     * Username passed is the username of the user who issued the challenge
     */
    reactToChallenge(username, accept) {
        var array = []
        array = this.state.challenges;
        var selectedChallenge = {};
        
        // Loops through all challenges
        for(var i = 0; i < array.length; i++) {
            if(array[i].challenger === username) {
                selectedChallenge = array[i].questions;
                if(!accept) {
                    // If challenge was rejected, remove challenge from array
                    array.splice(i, 1);
                    break;
                }
            }
        }
        // Update challenges
        this.setState({
            challenges : array
        });

        if(!accept) {
            // If challenge rejected, call api to update challenge in database
            this.delChallengeAPI(username);
        }
        else {
            // If challenge is accepted, call function to start challenge
            this.acceptChallenge(username, selectedChallenge);
        }
    }

    /**
     * Function called when user accepts challenge
     */
    acceptChallenge(username, selectedChallenge) {
        var arrayOfQuestions = []

        // Split string into array of question ids
        arrayOfQuestions = selectedChallenge.split(",").map(Number);
        arrayOfQuestions.pop(); 

        // Call function that updates user events
        this.props.updateCount("Leave Social Hub", "Start Quiz", this.props.username);

        // Call function that starts challenge quiz
        this.props.acceptChallenge(username, arrayOfQuestions);
    } 

    /**
     * This asynchronous function is called when user deletes a challenge
     * Makes api call to remove challenge from database
     */
    async delChallengeAPI(username) {
        
        const response = await fetch('/reject_challenge', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              challenger: username,
              challenged: this.props.username
            })
          });
    }

    /**
     * Function for rendering a challenge 
     * @param {*} key 
     */
    renderChallenges(key) {
        // Return challenge component
        return (
            <Challenge
                username={key.challenger}
                deleteChallenge={this.reactToChallenge}
            />
        );
    }

    /**
     * Function for rendering a report
     * @param {*} key 
     */
    renderReports(key) {
        // Return report component
        return (
            <Report
                result={key.response}
                id={key.id}
                username={key.challenged}
                deleteReport={this.deleteReport}
            />
        );
    }

    /**
     * Function called when user enters a name to issue a challenge to
     * @param {*} value 
     */
    search(value) {

        // Assigns value in search bar to state variable
        this.setState({
            searchName: value
        });
    }

    /**
     * This asynchronous function is called when user starts a challenge
     */
    async startChallenge() {
        if(this.state.searchName.length <= 0) {
            // If user hits challenge button with nothing entered
            this.setState({
                errorMessage: "No user with that username",
                fail: true
            });
        }
        else if(this.state.searchName !== this.props.username) {
            // If user isn't trying to challenge themselves
            
            // API call to check if username is in database
            const response = await fetch('/check_username/' + this.state.searchName + '/challenged_by/' + this.props.username);
            this.userExists = await response.json(); 
            
            if(this.userExists.message.length > 0) {
                // If user isn't in database
                this.setState({
                    errorMessage: this.userExists.message,
                    fail: true
                });
            }
            else if(this.userExists.exist) { // User exists

                // Call function that updates user events
                this.props.updateCount("Leave Social Hub", "Start Quiz", this.props.username);
                this.props.challengeBTN(this.state.searchName);
            }
            else {
                this.setState({
                    errorMessage: "No user with that username",
                    fail: true
                });
            }
        }
        else { // If entered username is the same as the users
            this.setState({
                errorMessage: "Can't challenge yourself",
                fail: true
            });
        }
        
    }

    /**
     * Function for when the user is leaving the social hub
     * Purpose of this function is so that we can send the message for updating events
     */
    leaveSocialHub() {
        this.props.button("Leave Social Hub");
    }

    /**
     * Render function
     */
    render() {
        return (
            <div>
                <Option symbol="fa fa-home fa-3x" side="option top" change={this.leaveSocialHub}/>
                <Popup trigger={<button className="option challengeBTN">Issue Challenge</button>} modal>
                    {close => ( // This section here is the pop up that appears when player presses the issue challenege button
                        <div className="modal">
                            <a className="closePopUp" onClick={close}>
                                &times;
                            </a>
                            <div className="titlePopUp">Find Challenger</div>
                            <Search onChange={this.search} class="challengeSearch"/>
                            { this.state.fail && 
                                <h5 className="errorPopUp">{this.state.errorMessage}</h5>
                            }
                            <div className="actions">
                                <button
                                    className="popUpOption"
                                    onClick={() => {
                                        this.startChallenge();
                                    
                                    }}
                                >
                                Challenge
                                </button>
                            </div>
                        </div>
                    )}
                </Popup>
                <div className="challenges">
                    <h2 className="SocialTitle">Challenges</h2>
                    {this.state.challenges.length > 0 ? (
                        <ul>
                            {this.state.challenges.map(this.renderChallenges)}
                        </ul>
                        ) : (
                        <h4>No challenges at the moment!</h4>
                     )}
                    
                </div>
                <div className="challenges">
                    <h2 className="SocialTitle">Reports</h2>
                    {this.state.reports.length > 0 ? (
                        <ul>
                            {this.state.reports.map(this.renderReports)}
                        </ul>
                        ) : (
                        <h4>No reports at the moment!</h4>
                     )}
                </div>
            </div>
        );
        
    }
}

export default SocialHub;