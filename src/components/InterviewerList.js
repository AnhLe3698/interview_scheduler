import React from "react";
import PropTypes from 'prop-types';

import InterviewerListItem from "./InterviewerListItem";
import "components/InterviewerList.scss"

function InterviewerList(props) {
  return (
    <section className="interviewers">
    <h4 className="interviewers__header text--light">Interviewer</h4>
    <ul className="interviewers__list">
      {props.interviewers.map((interviewer) => {
        return (
          <InterviewerListItem 
            {...interviewer}
            key={interviewer.id}
            setInterviewer={() => props.onChange(interviewer.id)}
            selected={interviewer.id === props.value}
          />
        )
      })}
    </ul>
    </section>
    
    
  )
}

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};

export default InterviewerList;

