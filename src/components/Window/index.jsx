import React from 'react';
import Draggable from "react-draggable";

import './style.less';
import IEEE from '../Content/IEEE';

const Window = () => {
  return (
    <Draggable bounds="parent">
      <div className="window">
        <div className="bar">
          <div className="circle"/>
          <div className="circle"/>
          <div className="circle"/>
        </div>
        <div className="content">
          <IEEE />
        </div>
      </div>
   </Draggable>
  );
};

export default Window;
