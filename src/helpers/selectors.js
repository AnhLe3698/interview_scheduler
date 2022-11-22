export function getAppointmentsForDay(state, day) {
    //... returns an array of appointments for that day
    let arrayOfAppoint = [];
    
    const resObj = state.days.filter(resDay => resDay.name === day)
  
    if(resObj.length !== 0 && resObj[0].appointments.length !== 0) {
      for(const appDates of resObj[0].appointments) {
        arrayOfAppoint.push(state.appointments[`${appDates}`]);
      }
    }
  
    return arrayOfAppoint;
};

export function getInterview(state, interview) {

  if (!interview) {
    return null;
  } else {
    let interviewerName = '';
    let avatar = '';
    let interviewer;
    for (const interviewers in state.interviewers) {

      if (interviewers == interview.interviewer) {
        interviewerName = state.interviewers[`${interviewers}`].name;
        avatar = state.interviewers[`${interviewers}`].avatar;
        interviewer = interviewers;
      }
    }

    return {
      student: interview.student,
      interviewer: {
        id: interview.interviewer,
        name: interviewerName,
        avatar: avatar
      }
    };
  }
}

export function getInterviewersForDay(state, day) {
  //... returns an array of Interviewers for that day
  let interviewerObj = [];
  let appointments = getAppointmentsForDay(state, day);

  if (appointments.length !== 0) {
    for (const appointment of appointments) {
      
      if (state.appointments[`${appointment.id}`].interview) {
        interviewerObj.push(state.interviewers[state.appointments[`${appointment.id}`].interview.interviewer])
      } 

    }
  } else {
    return [];
  }
 
  return interviewerObj;
};

export function getInterviewersListForDay(state, day) {
  //... returns an array of appointments for that day
  let interviewerObj = [];
  const resObj = state.days.filter(resDay => resDay.name === day)[0]
  
  for(const interviewerId of resObj.interviewers) {
    
    interviewerObj.push(state.interviewers[`${interviewerId}`]);
    
  }
  
  return interviewerObj;
};





