import React from 'react';
import Draggable from "react-draggable";

import './style.less';

const Screen = () => {
  return (
    <div className="screen">
      <Draggable bounds="parent">
        <div className="window">
          <h1> test </h1>
        </div>
     </Draggable>
    </div>
  );
};

export default Screen;
