import './index.scss'

import FaceitLogo from '../../assets/logo.png'
import React from 'react';

const Footer = () => {


  return (
    <footer>
      <div className="d-flex container h-100 flex-row align-items-center justify-content-between mt-1 flex-wrap">
          <div><small>Created by <a href="https://www.methods.digital" target="_blank" rel="noopener noreferrer" >methods.digital</a> - 2020 © some rights reserved.</small></div>
          <div><small className="mr-2">Powered by</small> <img className="mr-1" width={100.4} height={22.8} src={FaceitLogo}></img></div>
      </div>
    </footer>
  );
}

export default Footer;
