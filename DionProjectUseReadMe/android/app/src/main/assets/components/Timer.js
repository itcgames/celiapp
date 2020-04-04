import React from 'react';
import PropTypes from 'prop-types';

/**
 * Timer Component
 * Draws current time left on each question to the screen
 * @param {*} props 
 */
function Timer(props) {

  // Returns current time left for the question
  return (
    <div className="timer">
      <h3>{props.time}</h3>
    </div>
  )
}

// Takes in current time left
Timer.propTypes = {
  time: PropTypes.number.isRequired
};

export default Timer;
