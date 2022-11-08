import React from "react";

import InterviewerListItem from "./InterviewerListItem";
import "components/InterviewerList.scss"

export default function InterviewerList(props) {
  return (
    <section className="interviewers">
    <h4 className="interviewers__header text--light">Interviewer</h4>
    <ul className="interviewers__list">
      {props.interviewers.map((interviewer) => {
        return (
          <InterviewerListItem 
            {...interviewer}
            setInterviewer={() => props.setInterviewer(interviewer.id)}
            selected={props['interviewer'] === interviewer.id ? true:false}
          />
        )
      })}
    </ul>
    </section>
    
    
  )
}