import React from "react";

import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./appointment";
import { getAppointmentsForDay, getInterviewersListForDay } from "helpers/selectors";
import useApplicationData from "hooks/useApplicationData";

export default function Application() {
  
  // Import helper functions and states
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
          onChange={day => setState((prev) => {
            let dayCount = {...prev}
            dayCount['day'] = day;
            setDailyAppointments(() => {
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
          // Cunstructing the list of daily appointments depending on the day of week
          dailyAppointments.map((appointment) => {
            const interviewersArray = getInterviewersListForDay(state, state.day);
            return  (<Appointment key={appointment.id}  {...appointment} interviewers={interviewersArray} bookInterview={bookInterview} cancelInterview={cancelInterview}/>)})
        }
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
