import { useState, useEffect } from "react";
import axios from "axios";
import { getAppointmentsForDay} from "helpers/selectors";

////////////////////////////////////////////
/////////Application Data Manipulation//////
///////////////////////////////////////////

export default function useApplicationData() {
  
  // State Object needs to be copied and then constructed before changing state
  const [state, setState] = useState({
    day: "Monday",
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

    // remove an appointment by seeting an interview object to null
    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    // constructing the new appointments object with the new appointments
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    // we return this axios promise so that when it is passed via prop drill
    // the Appointment component will have access to preforming syncronous code using .then and .catch

    return axios.delete(`/api/appointments/${id}`, appointment).then(response => {

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

    // remove an appointment by seeting an interview object to null
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    // constructing the new appointments object with the new appointments
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    
    // we return this axios promise so that when it is passed via prop drill
    // the Appointment component will have access to preforming syncronous code using .then and .catch
    return axios.put(`/api/appointments/${id}`, appointment).then(response => {
      
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

  // This hook will make 3 AJAX requests to our api server and await for all 3 responses before continuing
  // Only executes on page reloads
  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ]).then((all) => {

      const days = [...all[0].data];
      const appointments = {...all[1].data};

      // Initialize our state with the request data
      setState(prev => (  
        {
          'day': prev.day, 
          days: days, 
          appointments:appointments, 
          interviewers:all[2].data 
        }));

      setDailyAppointments(() => {
        const appointmentForTheDay = getAppointmentsForDay({days: days, appointments:appointments});
        return appointmentForTheDay;
      })

    })
  }, [])
  
  // sets daily appintments state and will update everytime state changes
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