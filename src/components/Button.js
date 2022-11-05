import React from "react";

import "components/Button.scss";

export default function Button(props) {
   let buttonClass = "button";
   let onClickEv = props.onClick ? props.onClick : ''
  if (props.confirm) {
    buttonClass += " button--confirm";
  }

  if (props.danger) {
   buttonClass += " button--danger"
  }

  return <button onClick={onClickEv} className={buttonClass} disabled={props.disabled}>{props.children}</button>;
}
