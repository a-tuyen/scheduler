import React from "react";

import "components/Button.scss";

export default function Button(props) {
   let buttonClass = 'button';
   let onClick = `onClick ={action('button-clicked')}`

   if (props.confirm) {
      buttonClass += ' button--confirm';

   }

  if (props.danger) {
      buttonClass += ' button--danger';
   }

   if (props.disabled) {
      onClick = ` disabled ${onClick}`;
   }
   
   return (
      <button
        className={buttonClass}
        onClick={props.onClick}
        disabled={props.disabled}
      >
         {props.children}
      </button>
   );
}
