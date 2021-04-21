


export function getAppointmentsForDay (state, day) {
  // const apptForDay = state.days.filter(day => user.name === name);
  // return filteredNames;
  const dayFound = state.days.find(eachDay => eachDay.name === day);

  if (!dayFound) {
    return [];
  }

  const appointments = dayFound.appointments.map(appointmentId => state.appointments[appointmentId]);
  
  return appointments;
  
}
