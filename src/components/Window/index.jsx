import React, { useEffect } from 'react';
import anime from "animejs";
import Draggable from "react-draggable";

import './style.less';

const Window = (props) => {
  useEffect(() =>{
    // TODO: Animate pop up
    anime({
        targets: `#window${props.id - 1}`,
        translateY: 0
      });
  })

  return (
    <Draggable bounds="parent">
      <div className="window" id={'window' + props.id}>
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
