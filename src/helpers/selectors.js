


export function getAppointmentsForDay(state, day) {
  
  const dayFound = state.days.find(eachDay => eachDay.name === day);

  if (!dayFound) {
    return [];
  }

  const appointments = dayFound.appointments.map(appointmentId => state.appointments[appointmentId]);
  
  return appointments;
  
}
