import React from 'react';
import PropTypes from 'prop-types';
import Option from './Option';

/**
 * Confirm Component
 * Displayed before the quiz so that the user can see the quiz rules
 * Allows user to start quiz
 * Allows user to navigate back to the home screen
 * @param {*} props 
 */
function Confirm(props) {

  return (
    <div>
      <h2>Rules</h2>
      <ul className="rules">
          <li className="rulePoint">Answer each questions before the timer runs out</li>
          <li className="rulePoint">The faster the questions is answered, the higher the score given</li>
          <li className="rulePoint">If you answer a question wrong, an info point with information on that topic will be appended to your personal information page</li>
      </ul>
      <Option symbol="fa fa-home fa-3x" side="option top" change={props.home}/>
      <Option name="Confirm" side="option confirm" change={props.confirm}/>
    </div>
  );
}

// Takes in function to return home
// Takes in function to start quiz
Confirm.propTypes = {
  home: PropTypes.func.isRequired,
  confirm: PropTypes.func.isRequired
};

export default Confirm;
