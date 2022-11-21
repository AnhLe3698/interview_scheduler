import React, { useState, useEffect } from "react";
import axios from "axios";
import { getAppointmentsForDay} from "helpers/selectors";

export default function useApplicationData() {

  const [dailyAppointments, setDailyAppointments] = useState([]);

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

  }


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

    })
  }, [])
  
  useEffect(() => {
    setDailyAppointments(() => {
      console.log(state)
      return [...getAppointmentsForDay(state, state.day)]
    });
  }, [state])


  return {
    state,
    setState,
    dailyAppointments,
    setDailyAppointments,
    bookInterview,
    cancelInterview
  }
}