import React from "react";

import "components/appointment/styles.scss"
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import useVisualMode from "hooks/useVisualMode";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  
  function save(name, interviewer) {
    
    const interview = {
      student: name,
      interviewer
    };
    
    transition(SAVING);
    props
    .bookInterview(props.id, interview)
    .then(() => {
      return transition(SHOW)
    })
    .catch(error => transition(ERROR_SAVE, true));
  }

  function onCancel() {
    transition(SHOW);
  }

  function onDelete() {
    transition(CONFIRM);
  }

  function onConfirm() {
    transition(DELETING, true);
    props.cancelInterview(props.id)
    .then(() => transition(EMPTY))
    .catch(error => transition(ERROR_DELETE, true))
  }

  function onEdit() {
    transition(EDIT)
  }
  
  function onClose() {
    back();
  }
  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => {
        mode === EMPTY && transition(CREATE)
      }} />}
      {mode === SAVING && <Status message={'Saving'}></Status>}
      {mode === DELETING && <Status message={'Deleting'}></Status>}
      {mode === ERROR_DELETE && <Error message={'Could not cancel Appointment'} onClose={onClose}></Error>}
      {mode === ERROR_SAVE && <Error message={'Could not save Appointment'}   onClose={onClose}></Error>}
      {mode === CREATE && <Form onCancel={back} interviewers={props.interviewers} onSave={save} />}
      {mode === EDIT && <Form student={props.interview.student} interviewers={props.interviewers} onCancel={back} interviewer={props.interview.interviewer} onSave={save} />}
      {mode === SHOW && (
        <Show
          
          student={props.interview && props.interview.student}
          interviewer={props.interview && props.interviewers.filter(inter => {
            return inter.id === props.interview.interviewer})[0]
          }
          onDelete={onDelete}
          onEdit={onEdit}
        />
      )}
      {mode === CONFIRM && <Confirm onConfirm={onConfirm} onCancel={onCancel}/>}
    </article>
  )
}