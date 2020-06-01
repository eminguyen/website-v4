import React from 'react';
import anime from "animejs";
import Draggable from "react-draggable";

import './style.less';

const Window = (props) => {
  return (
    <Draggable bounds="parent">
      <div className="window">
        <div className="bar">
          <div className="circle"/>
          <div className="circle"/>
          <div className="circle"/>
        </div>
        <div className="content">
          {props.children}
        </div>
      </div>
   </Draggable>
  );
};

export default Window;
