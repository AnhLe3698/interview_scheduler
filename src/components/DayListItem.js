// name:String the name of the day
// spots:Number the number of spots remaining
// selected:Boolean true or false declaring that this day is selected
// setDay:Function accepts the name of the day eg. "Monday", "Tuesday"

import React from "react";

import "components/DayListItem.scss";
import classNames from "classnames";

export default function DayListItem(props) {
  const classNamesEl = classNames('day-list__item', {'day-list__item--selected': props.selected, 'day-list__item--full': (props.spots === 0 ? true:false)})
  return (
    <li onClick={() => {props.setDay(props.name)}} className={classNamesEl}>
      <h2 className="text--regular">{props.name}</h2> 
      <h3 className="text--light" >{props.spots} spots remaining</h3>
    </li>
  );
}