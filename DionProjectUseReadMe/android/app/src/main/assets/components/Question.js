import React from 'react';
import PropTypes from 'prop-types';

/**
 * Question Component
 * Displays current quiz question
 * @param {*} props 
 */
function Question(props) {
  return (
    <div>
      <h2 className="question">{props.content}</h2>
    </div>
  );
}

// Takes in question to be displayed
Question.propTypes = {
  content: PropTypes.string.isRequired
};

export default Question;
