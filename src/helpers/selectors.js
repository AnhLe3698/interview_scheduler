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
}

