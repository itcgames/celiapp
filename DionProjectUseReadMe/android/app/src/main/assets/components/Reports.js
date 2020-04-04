import React from 'react';
import PropTypes from 'prop-types';
import Option from './Option';

/**
 * Reports component
 * Formats and renders report
 * @param {*} props 
 */
function Report(props) {

    /**
     * Function called when user selects discard button on report
     */
    function deleteMe() {
        props.deleteReport(props.id)
    }

    /**
     * Returns formatted report
     */
    return (
        <div className="">
            <h4 className="challengeText"><u>Name</u>: {props.username} &nbsp; <u>Result</u>: {props.result}</h4>
       
            <Option symbol="fa fa-close fa-2x" side="option challenge2" change={deleteMe}/>
     
        </div>
    );
}

// Takes username of challenged user, id of report,
// Result of challenge and function for when report is discarded
Report.propTypes = {
    username: PropTypes.string,
    id: PropTypes.number.isRequired,
    result: PropTypes.string.isRequired,
    deleteReport: PropTypes.func
};

export default Report;