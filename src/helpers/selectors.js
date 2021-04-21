


export function getAppointmentsForDay(state, day) {
  const dayFound = state.days.find(eachDay => eachDay.name === day);
  if (!dayFound) {
    return [];
  }
  const appointments = dayFound.appointments.map(appointmentId => state.appointments[appointmentId]);
  return appointments;
}

export function getInterview(state, interview) {
 
  if (!interview) {
    return null;
  }

  const interviewObj = {
    student: interview.student,
    interviewer: state.interviewers[interview.interviewer]
  };
  return interviewObj;
}
