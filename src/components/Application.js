import React, { useState, useEffect } from "react";

import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./appointment";
import { getAppointmentsForDay, getInterview, getInterviewersForDay, getInterviewersListForDay } from "helpers/selectors";
import useApplicationData from "hooks/useApplicationData";

export default function Application(props) {
  

  const {
    state,
    setState,
    dailyAppointments,
    setDailyAppointments,
    bookInterview,
    cancelInterview
  } = useApplicationData();


  return (
    <main className="layout">
      <section className="sidebar">
      <img
        className="sidebar--centered"
        src="images/logo.png"
        alt="Interview Scheduler"
      />
      <hr className="sidebar__separator sidebar--centered" />
      <nav className="sidebar__menu">
        <DayList
          days={state.days}
          value={state.day}
          // setDay={...}
          onChange={day => setState((prev) => {
            
            let dayCount = {...prev}
            dayCount['day'] = day;
            setDailyAppointments(() => {
              console.log(state)
              return [...getAppointmentsForDay(dayCount, day)]
            });
            return dayCount;
          })}
        />
      </nav>
      <img
        className="sidebar__lhl sidebar--centered"
        src="images/lhl.png"
        alt="Lighthouse Labs"
      />
      </section>
      <section className="schedule">
        {
          
          dailyAppointments.map((appointment) => {
            console.log('hello', appointment);
            const interviewersArray = getInterviewersListForDay(state, state.day);
            console.log('hello interviewers', interviewersArray);
            return  (<Appointment key={appointment.id}  {...appointment} interviewers={interviewersArray} bookInterview={bookInterview} cancelInterview={cancelInterview}/>)})
        }
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
