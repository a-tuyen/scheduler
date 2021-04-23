


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

export function getInterviewersForDay(state, day) {
  const dayFound = state.days.find(eachDay => eachDay.name === day);

  if (!dayFound) {
    return [];
  }

  if (state.days.length === 0) {
    return [];
  }
  console.log('DAYFOUND:', dayFound);
  const interviewers = dayFound.interviewers.map(interviewerId => state.interviewers[interviewerId]);
  console.log('INTERVIEWERS:', interviewers)
  return interviewers;
}
