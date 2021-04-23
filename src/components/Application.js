import React, { useState, useEffect } from "react";
import axios from 'axios';

import "components/Application.scss";

import DayList from "components/DayList.js"

import Appointment from "components/Appointment";
import InterviewerListItem from "./InterviewerListItem";

import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "../helpers/selectors";

export default function Application(props) {

  const [state, setState] = useState({
    day:"Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const interviewers = getInterviewersForDay(state, state.day )
  
  const bookInterview = (id, interview) => {
    // console.log(id, interview);
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    console.log('appt', appointment)
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    console.log('appts', appointments)

    return axios.put(`/api/appointments/${id}`, { interview })
      .then((response) => {
        setState({...state, appointments})
      })
  }

  const schedule = dailyAppointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);

  
    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={interviewers}
        bookInterview={bookInterview}
      />
    );
  });

  const setDay = day => setState({ ...state, day });

  useEffect(() => {
    const getDaysPromise = axios.get('http://localhost:8001/api/days');
    const getAppointmentsPromise = axios.get('http://localhost:8001/api/appointments');
    const getInterviewersPromise = axios.get('http://localhost:8001/api/interviewers');

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

  return (
    <main className="layout">
      <section className="sidebar">
      <img
  className="sidebar--centered"
  src="images/logo.png"
  alt="Interview Scheduler"
/>
<hr className="sidebar__separator sidebar--centered" />
<nav className="sidebar__menu">
<DayList
  days={state.days}
  day={state.day}
  setDay={setDay}
/>
</nav>
<img
  className="sidebar__lhl sidebar--centered"
  src="images/lhl.png"
  alt="Lighthouse Labs"
/>
      </section>
      <section className="schedule">
        {schedule}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
