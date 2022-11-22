import { useState, useEffect } from "react";
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

  function findSpots(days, appointments) {
    const resultingArray = [];
    for(const dayInDays of days) {
      let countSpots = 0;
      for(const appIDs of dayInDays.appointments) {
        if(appointments[`${appIDs}`].interview === null){
          countSpots++;
        }
      }
      
      resultingArray.push({
        ...dayInDays,
        spots: countSpots
      })
    }
    console.log('hello ', resultingArray);
    return resultingArray;
  }

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
      console.log(response)
      console.log(state.days)
      console.log(appointments)
      // console.log('hello',findSpots(state.days, appointments));
      setState(() => {
        setDailyAppointments(() => {
          return [...getAppointmentsForDay(state, state.day)]
        });
        
        // const days = [...state.days];
        // if (response.status === 204) {
        //   days = findSpots(days, appointments);
        // }
        return {
        ...state,
        days: findSpots(state.days, appointments),
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
      
      console.log(response)
      console.log(state.days)
      console.log(appointments)
      // console.log('hello',findSpots(state.days, appointments));
      setState(() => {
        setDailyAppointments(() => {
          
          return [...getAppointmentsForDay(state, state.day)]
        });
        findSpots(state.days, appointments);
        // const days = [...state.days];
        // if (response.status === 204) {
        //   days = findSpots(days, appointments);
        // }
        return {
        ...state,
        days: findSpots(state.days, appointments),
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
      const appointments = {...all[1].data};
      setState(prev => ({'day': prev.day, days: days, appointments:appointments, interviewers:all[2].data }));
      setDailyAppointments(() => {
        const appointmentForTheDay = getAppointmentsForDay({days: days, appointments:appointments}, state.day);
        return appointmentForTheDay;
      })

    })
  }, [])
  
  useEffect(() => {
    setDailyAppointments(() => {
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