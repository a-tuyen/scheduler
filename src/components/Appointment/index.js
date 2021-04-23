import React from "react";

import "components/Appointment/styles.scss";

import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import useVisualMode from "../../hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const EDIT = "EDIT";


export default function Appointment (props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
    );

  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props.bookInterview(props.id, interview)
      .then(res => transition(SHOW));
  };

  return (
    <article className="appointment">
      <Header 
      time={props.time}
      />
      {mode === EMPTY && (
      <Empty
      onAdd={() => transition(CREATE)}
      />
      )}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          />
      )}
      {mode === SAVING && (
        <Status message="Saving" />
      )}
      {mode === CREATE && (
        <Form
        interviewers={props.interviewers}
        onSave={save}
        onCancel={back}
        />
      )}
      {/* {mode === EDIT && (
        <Form
        name="props.name"
        interviewers={props.interviewers}
        // interviewer={interviewer.id}
        onSave={save}
        onCancel={back}
        />
      )} */}
    </article>
  )
}

