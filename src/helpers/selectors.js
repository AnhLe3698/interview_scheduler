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




