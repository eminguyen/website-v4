import React from 'react';

import './style.less';
import learnlyImage from '../../../images/learnly.png';

const Learnly = () => {
  return (
    <div className="learnly">
      <img className="background" src={learnlyImage}/>
      <div className="buttons">
        <button>About</button>
        <button>Code</button>
      </div>
    </div>
  );
};

export default Learnly;
