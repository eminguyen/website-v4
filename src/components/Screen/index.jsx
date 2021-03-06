import React, { useEffect } from 'react';

import './style.less';
import Window from '../Window';

const Screen = (props) => {
  return (
    <div className="screen">
      {props.children}
    </div>
  );
};

export default Screen;
