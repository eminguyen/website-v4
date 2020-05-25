import React from 'react';
import Draggable from "react-draggable";

import './style.less';

const Window = () => {
  return (
    <Draggable bounds="parent">
      <div className="window">
        <div className="bar"></div>
        <div className="content">
          <h1> Hi I'm Emi! </h1>
          <p>But you can call me Emi. When I was younger, I was called Antony but things change. What hasn't changed is my love for computers. My parents sacrificed most of their savings so that I could have a PC at age 3.   Now, I'm a software engineer who wants to pay it forward by providing others with opportunities to code.</p>
        </div>
      </div>
   </Draggable>
  );
};

export default Window;
