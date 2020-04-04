import React from 'react';
import PropTypes from 'prop-types';
import Option from './Option';

/**
 * Info Point Component
 * Displays info card on info page of the application
 * Allows user to remove personalised points
 * @param {*} props 
 */
function InfoPoint(props) {

  /**
   * Function returns a bullet point of info point for the info card
   * @param {*} key 
   */
  function renderPoint(key) {
    return (
      <li className="InfoPoint">
        <p>{key}</p>
      </li>
    );
  }

  /**
   * Function called when user deletes personalised point
   */
  function deleteMe() {
    // Calls delete function in Info.js
    props.deleteFunc(props.title[0]);
  }

  return (
    <div className="infoBox">
      <h3>{props.title}</h3>
      {props.page == "Personalised" &&
        <Option symbol="fa fa-close fa-2x" side="option challenge2" change= {() => {deleteMe()}}/>
      }
      <ul className="InfoPoint">
        {props.content.map(renderPoint)}
      </ul>
    </div>
  );
}

// Takes in title of info card and content on info card
InfoPoint.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.array.isRequired
};

export default InfoPoint;
