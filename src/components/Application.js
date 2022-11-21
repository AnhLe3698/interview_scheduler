import React, { useState, useEffect } from "react";
import axios from "axios";
import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./appointment";
import { getAppointmentsForDay, getInterview, getInterviewersForDay, getInterviewersListForDay } from "helpers/selectors";


export default function Application(props) {
  const [state, setState] = useState({
    day: "Tuesday",
    days: [],
    appointments: {},
    dailyAppointments: [],
    interviewers: {}
  });

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.delete(`/api/appointments/${id}`, appointment).then(response => {
      setState(() => {
        setDailyAppointments(() => {
          console.log(state)
          return [...getAppointmentsForDay(state, state.day)]
        });
        return {
        ...state,
        appointments,
        }
      })  
    })
  }

  function bookInterview(id, interview) {
    console.log(state);

    // something is missing here
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    
    return axios.put(`/api/appointments/${id}`, appointment).then(response => {
      setState(() => {
        setDailyAppointments(() => {
          console.log(state)
          return [...getAppointmentsForDay(state, state.day)]
        });
        return {
        ...state,
        appointments,
        }
      })  
    })
    
    
    console.log('booking',id, interview);
  }

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
      console.log('API appointments', all[1].data)
      setState(prev => ({'day': prev.day, days: days, appointments:appointments, interviewers:all[2].data }));
      setDailyAppointments(() => {
        const appointmentForTheDay = getAppointmentsForDay({days: days, appointments:appointments}, state.day);
        console.log('appointment array', appointmentForTheDay);
        return appointmentForTheDay;
      })
      // console.log(getAppointmentsForDay({days: days, appointments:appointments}, state.day))
    })
  }, [])
  
  useEffect(() => {
    setDailyAppointments(() => {
      console.log(state)
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
