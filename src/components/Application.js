import React, { useState, useEffect } from "react";
import axios from "axios";
import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./appointment";
import { getAppointmentsForDay, getInterview } from "helpers/selectors";


export default function Application(props) {
  const [state, setState] = useState({
    day: "Tuesday",
    days: [],
    appointments: {},
    dailyAppointments: [],
    interviewers: {}
  });

  const [dailyAppointments, setDailyAppointments] = useState([]);

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ]).then((all) => {
      const days = [...all[0].data];
      // console.log(days);
      const appointments = {...all[1].data};
      console.log(all[2].data)
      setState(prev => ({'day': prev.day, days: days, appointments:appointments, interviewers:all[2].data }));
      setDailyAppointments(getAppointmentsForDay({days: days, appointments:appointments}, state.day))
      console.log(getAppointmentsForDay({days: days, appointments:appointments}, state.day))
    })
  }, [])
  
  useEffect(() => {
    setDailyAppointments(() => {
      return [...getAppointmentsForDay(state, state.day)]
    });
  }, [state])

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
            return (<Appointment key={appointment.id}  {...appointment}/>)})
        }
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
