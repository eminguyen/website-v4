import React from 'react';

import './style.less';
import placeitLogo from '../../../images/placeit.png';

const PlaceIt = () => {
  return (
    <div className="place-it">
      <img className="background" src={placeitLogo}/>
      <div className="buttons">
        <button>About</button>
        <button>Code</button>
      </div>
    </div>
  );
};

export default PlaceIt;
