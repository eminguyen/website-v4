import React from 'react';

import './style.less';
import ceresImage from '../../../images/ceres.png';

const Ceres= () => {
  return (
    <div className="ceres">
      <img className="background" src={ceresImage}/>
      <div className="buttons">
        <button>About</button>
        <button>Code</button>
      </div>
    </div>
  );
};

export default Ceres;
