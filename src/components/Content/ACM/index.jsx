import React from 'react';

import './style.less';
import acmLogo from '../../../images/acm.png';

const ACM = () => {
  return (
    <div className="acm">
      <img className="acm-logo" src={acmLogo}/>
    </div>
  );
};

export default ACM;
