import './index.scss'

import FaceitLogo from '../../assets/logo.png'
import React from 'react';

const Header = () => {


  return (
    <header className="container d-flex justify-content-between flex-column text-white">
      <div className="notice mb-2 py-2"><small>Searches are always case sensitive!</small></div>
      <div className="mast-head">
        <h1 className="my-4">Faceit have we met?</h1>
        <small style={{fontSize:'.6rem'}}>v2.0</small>
       </div>
    </header>
  );
}

export default Header;
