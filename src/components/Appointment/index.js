import React, {Fragment} from "react";

import "components/Appointment/styles.scss";

import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";



export default function Appointment (props) {

//   return (
//     <article className="appointment">
//       <Header time={props.time} />
//       {props.interview ? (
//         <Show
//           student={props.interview.student}
//           interview={props.interview.interviewer}
//         />
//       ) : (
//         <Empty />
//       )}
//     </article>
//   );
// }

  return (
    <article className="appointment">
      <Header 
      time={props.time}
      />
      { props.interview ?  <Show student={props.interview.student} interviewer={props.interview.interviewer} /> : <Empty /> }
    </article>
  )
}


// All Appointment components will render a Header that 
// takes in a time prop.
// If props.interview is truthy (an interview object) 
// the Appointment will render the <Show /> component, 
// else it should render the <Empty /> component.

