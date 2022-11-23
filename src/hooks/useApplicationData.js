import { useState, useEffect } from "react";
import axios from "axios";
import { getAppointmentsForDay} from "helpers/selectors";

export default function useApplicationData() {
  
  // State Object needs to be copied and then constructed before changing state
  const [state, setState] = useState({
    day: "Tuesday",
    days: [],
    appointments: {},
    dailyAppointments: [],
    interviewers: {}
  });

  const [dailyAppointments, setDailyAppointments] = useState([]);

  // This function checks for the current amount of spots remaining
  // This will return a value that will update the state and more specifically
  // the DayListItems
  function findSpots(days, appointments) {

    const resultingArray = []; //Initializing our Days array

    // for...of loop through the array of objects in days
    for(const dayInDays of days) {
      let countSpots = 0; // Counts remaining spots
      // looping though appoints
      for(const appIDs of dayInDays.appointments) {
        // checks if the appointments at the appointment ids are null for a specific day
        if(appointments[`${appIDs}`].interview === null){
          countSpots++; 
        }
      }
      
      // construct a days object and push onto the array
      resultingArray.push({
        ...dayInDays,
        spots: countSpots
      })
    }
    
    // returns days array
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

      setState(() => {
        setDailyAppointments(() => {
          return [...getAppointmentsForDay(state, state.day)]
        });
        
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
      setState(() => {
        setDailyAppointments(() => {
          
          return [...getAppointmentsForDay(state, state.day)]
        });
        findSpots(state.days, appointments);
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