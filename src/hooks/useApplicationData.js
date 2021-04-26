import { useState, useEffect } from "react";
import axios from 'axios';

export default function useApplicationData() {

  const [state, setState] = useState({
    day:"Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({ ...state, day });

  useEffect(() => {
    const getDaysPromise = axios.get('/api/days');
    const getAppointmentsPromise = axios.get('/api/appointments');
    const getInterviewersPromise = axios.get('/api/interviewers');

    Promise.all([getDaysPromise, getAppointmentsPromise, getInterviewersPromise])
      .then((allArr) => {
        const dayInfo = allArr[0].data;
        const appointmentInfo = allArr[1].data;
        const interviewersInfo = allArr[2].data;
        setState(prev => ({
          ...prev,
          days: dayInfo,
          appointments: appointmentInfo,
          interviewers: interviewersInfo
        }))
      })
    }, [])

  // const getSpotsForDay = (dayObj, appointments) => {
  //   return dayObj.reduce((spotAccumulator, id) => {
  //     const appointment = appointments[id];
  //     // if (!appointment.interview) {
  //     //   return spotAccumulator++;
  //     // } else
  //     return (appointment.interview === null) ? spotAccumulator : spotAccumulator++;

  //   }, 0)
  // }


  const getSpotsForDay = (dayObj, appointments) => {
    // console.log('dayObj', dayObj, 'appts', appointments)
    let spots = 0;
    for (const id of dayObj.appointments) {
      const appointment = appointments[id];
      if (!appointment.interview) {
        spots++;
      }
    }
    return spots;
  };

  const spotsRemaining = (dayName, days, appointments) => {
    const dayObj = days.find(day => day.name === dayName);
    const spots = getSpotsForDay(dayObj, appointments);
    const newDay = {...dayObj, spots};
    const newDays = days.map(day => day.name === dayName ? newDay : day);

    return newDays;
  };

  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const days = [...spotsRemaining(state.day, state.days, appointments)];

    return axios.put(`/api/appointments/${id}`, { interview })
      .then(() => {
        setState({...state, appointments, days})
      })
  }

  const cancelInterview = (id) => {

    const appointment = {
      ...state.appointments[id],
      interview: null
    }

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const days = [...spotsRemaining(state.day, state.days, appointments)];

    return axios.delete(`/api/appointments/${id}`)
    .then(() => {
      setState({ ...state, 
        appointments, 
        days
      });
    })
  }

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
   };
}
