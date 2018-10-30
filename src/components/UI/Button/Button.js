import React from "react";
import './Button.scss';

const Button = (props) => {
  let classes = ['button'];

  switch (props.type) {
    case 'green':
      classes.push('green');
      break;
    case 'orange':
      classes.push('orange');
      break;
    default:
  }

  return <div className={classes.join(' ')} onClick={props.clicked}>
    {props.children}
  </div>
};

export default Button;