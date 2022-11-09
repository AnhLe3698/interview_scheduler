import React, {useState} from "react";

// The <Form> component should track the following state:

// student:String
// interviewer:Number
// The <Form> component should have the following actions:

// setStudent:Function
// setInterviewer:Function
// The <Form> component should take the following props:

// student:String
// interviewers:Array
// interviewer:Number
// onSave:Function
// onCancel:Function

import InterviewerList from "components/InterviewerList";
import Button from "components/Button";

export default function Form() {
  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off">
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            /*
              This must be a controlled component
              your code goes here
            */
          />
        </form>
        <InterviewerList 
          /* your code goes here */
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger >Cancel</Button>
          <Button confirm >Save</Button>
        </section>
      </section>
    </main>
  )
}