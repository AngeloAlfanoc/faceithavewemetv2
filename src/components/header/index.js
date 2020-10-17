import './index.scss'

import React from 'react';

const Header = () => {


  return (
    <header className="container d-flex justify-content-between flex-column text-white" >
     
      <div className="mast-head ">
        <h1 className="mt-1 mb-1">Faceit have we met?</h1>
        <small style={{fontSize:'.6rem'}}>v2.0</small>
       </div>
       <h5 className="text-white">Start by filling in 2 player-names:</h5>
    </header>
  );
}

export default Header;
