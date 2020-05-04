import React, { useEffect } from 'react';
import Draggable from "react-draggable";

import './style.less';
import Window from '../Window';

const Screen = () => {
  return (
    <div className="screen">
      <Window />
    </div>
  );
};

export default Screen;
