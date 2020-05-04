import React, { useEffect } from 'react';
import Draggable from "react-draggable";

import './style.less';

const Screen = () => {
  useEffect(() => {
    console.log('test');
  })

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
