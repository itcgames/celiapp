import React from 'react';
import PropTypes from 'prop-types';

/**
 * Search Component
 * Draws styled search bar to screen
 */
function Search(props) {

  /**
   * Function called when user inputs into search bar
   * @param {*} e 
   */
  function onChange(e) {
    // Calls function associated with specific search bar
    props.onChange(e.target.value);
  }

  // Returns a search bar
 return (
    <input
      className={props.class}
      placeholder="Search for..."
      onChange={onChange}
    />
  )
}

// Takes in function to be called when user inputs into search bar
// Takes in class to specify what style searchbar should have
Search.propTypes = {
  onChange : PropTypes.func.isRequired,
  class : PropTypes.string.isRequired
};

export default Search;
