import React from 'react';

import "./NavigationToggle.scss";

const NavigationToggle = (props) => {
  let classes = ['hamburger', 'hamburger--arrow'];
  if(props.active) {
    classes.push('is-active');
  }
  return <div className={classes.join(' ')} onClick={props.clicked}>
    <div className="hamburger-box">
      <div className="hamburger-inner"></div>
    </div>
  </div>;
};

export default NavigationToggle;