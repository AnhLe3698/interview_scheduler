import React from "react";

import "components/Button.scss";
import classNames from "classnames";

export default function Button(props) {
   let classNamesEl =  classNames('button', {'button--confirm': props.confirm, 'button--danger': props.danger})
   let onClickEv = props.onClick ? props.onClick : ''

  return (<button 
   onClick={onClickEv} 
   className={classNamesEl} 
   disabled={props.disabled}
   >
   {props.children}
   </button>);
}
