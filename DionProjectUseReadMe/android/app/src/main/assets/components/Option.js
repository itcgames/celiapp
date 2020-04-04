import React from 'react';
import PropTypes from 'prop-types';

/**
 * Option component
 * Displays styled button to the screen
 * @param {*} props 
 */
function Option(props) {
  return (
    <div className="optionBox">
      <button className={props.side} onClick={props.change}><i class={props.symbol}></i>{props.name}</button>
    </div>
  );
}

// Takes in buttons text, style, function when pressed and icon
Option.propTypes = {
  name: PropTypes.string,
  side: PropTypes.string.isRequired,
  change: PropTypes.func,
  symbol: PropTypes.string
};

export default Option;
