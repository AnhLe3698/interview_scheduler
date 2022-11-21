import React, {useState} from "react";

import InterviewerList from "components/InterviewerList";
import Button from "components/Button";

export default function Form(props) {
  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);

  function reset() {
    setStudent("");
    setInterviewer(null);
  }

  function cancel() {
    reset();
    return props.onCancel;
  }
  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form onSubmit={event => event.preventDefault()} autoComplete="off">
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            id="student-name"
            placeholder="Enter Student Name"
            onChange={() => {setStudent(document.getElementById("student-name").value)
            console.log(student);
            }}
            value={student}
          />
        </form>
        <InterviewerList 
          interviewers={props.interviewers}
          value={interviewer}
          onChange={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button onClick={() => {
            let cool = cancel()
            cool()}} danger >Cancel</Button>
          <Button onClick={() => {props.onSave(student, interviewer)}} confirm >Save</Button>
        </section>
      </section>
    </main>
  )
}