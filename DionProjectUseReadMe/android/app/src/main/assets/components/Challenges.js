import React from 'react';
import PropTypes from 'prop-types';
import Option from './Option';

/**
 * Challenge component
 * @param {*} props 
 */
function Challenge(props) {

    /**
     * Function called when user reacts to challenege
     * challenge is true when challenge is accepted
     * challenge is false when challenge is rejected
     * @param {*} challenge 
     */
    function deleteMe(challenge) {
        // Calls function in socialhub.js 
        props.deleteChallenge(props.username, challenge)
    }

    return (
        <div className="">
            <h4 className="challengeText">{props.username}</h4>
       
            <Option symbol="fa fa-check fa-2x" side="option challenge1" change ={() => {deleteMe(true)}}/>
            <Option symbol="fa fa-close fa-2x" side="option challenge2" change= {() => {deleteMe(false)}}/>
     
        </div>
    );
}

// Takes in username of person who issued challenge
// Takes in function for reacting to challenge
Challenge.propTypes = {
    username: PropTypes.string.isRequired,
    deleteChallenge: PropTypes.func
};

export default Challenge;