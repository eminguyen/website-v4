import React from 'react';

import './style.less';
import coronallyImage from '../../../images/coronally.png';

const Coronally = () => {
  return (
    <div className="coronally">
      <img className="background" src={coronallyImage}/>
      <div className="buttons">
        <button>About</button>
        <button>Code</button>
      </div>
    </div>
  );
};

export default Coronally;
