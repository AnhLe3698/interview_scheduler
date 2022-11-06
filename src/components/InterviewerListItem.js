import React from "react";
import "components/InterviewerListItem.scss"
import classNames from "classnames";

export default function InterviewerListItem(props) {
  let classNameEl = classNames("interviewers__item", {'interviewers__item--selected': props.selected})
  let classNameIm = classNames('interviewers__item-image', {'interviewers_item--selected': props.selected})
  return (
    <li className={classNameEl} onClick={() => {
      props.setInterviewer(props.id)
    }}>
      <img
        className={classNameIm}
        src={props.avatar}
        alt={props.name}
      />
      Sylvia Palmer
    </li>
  );
}