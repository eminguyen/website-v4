import React from 'react';

import './style.less';
import sdhacksLogo from '../../../images/sdhacks.png';

const SDHacks = () => {
  return (
    <div className="sdhacks">
      <img className="sdhacks-logo" src={sdhacksLogo}/>
    </div>
  );
};

export default SDHacks;
