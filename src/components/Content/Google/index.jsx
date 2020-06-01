import React from 'react';
import Draggable from "react-draggable";

import './style.less';
import googleLogo from '../../../images/google.png';

const Google = () => {
  return (
    <div className="google">
      <img className="google-logo" src={googleLogo}/>
      <div className="search-bar" />
    </div>
  );
};

export default Google;
