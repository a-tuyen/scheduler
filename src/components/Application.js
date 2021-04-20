import React, { useState, useEffect } from "react";
import axios from 'axios';

import "components/Application.scss";

import DayList from "components/DayList.js"

import Appointment from "components/Appointment";


const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 3,
    time: "2pm",
  },
  {
    id: 4,
    time: "3pm",
    interview: {
      student: "Mr. Incredible",
      interviewer: {
        id: 2,
        name: "Tori Malcolm",
        avatar: "https://i.imgur.com/Nmx0Qxo.png" ,
      }
    }
  },
  {
    id: 5,
    time: "5pm",
    interview: {
      student: "Elsa Frozen",
      interviewer: {
        id: 5,
        name: " Sven Jones",
        avatar: "https://i.imgur.com/twYrpay.jpg"
      }
    }
  },

];

export default function Application(props) {

  const [days, setDays] = useState([]);

  useEffect(() => {
    const url = 'http://localhost:8001/api/days';
    axios.get(url).then(response => {
      console.log('response', response.data);
      setDays(response.data)
    });
  }, [])


  const apptList = appointments.map(appointment => {
    return (
      <Appointment
      key={appointment.id}
      {...appointment}
      // id={appointment.id}
      // time={appointment.time}
      // interview={appointment.interview}
      />
    )
  })


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
  days={days}
  day={props.day}
  setDays={setDays}
/>
</nav>
<img
  className="sidebar__lhl sidebar--centered"
  src="images/lhl.png"
  alt="Lighthouse Labs"
/>
      </section>
      <section className="schedule">
        {apptList}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
