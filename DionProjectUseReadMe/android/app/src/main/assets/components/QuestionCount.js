import React from 'react';
  import PropTypes from 'prop-types';

  /**
   * Question Count component
   * Displays which question the user is on
   * Displays how many questions are in the quiz 
   * @param {*} props 
   */
  function QuestionCount(props) {
    return (
      <div className="questionCount">
        Question <span>{props.counter}</span> of <span>{props.total}</span>
      </div>
    );
  }

  // Takes in current question number and total number of questions
  QuestionCount.propTypes = {
    counter: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired
  };

  export default QuestionCount;
