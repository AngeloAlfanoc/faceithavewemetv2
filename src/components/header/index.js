import './index.scss'

import Banner from '../banner/index'
import React from 'react';

const Header = () => {


  return (
    <header className="container d-flex justify-content-between">
      <div>
        <h1 className="text-white mb-2 mt-4">Faceit have we met?<small style={{fontSize:'.6rem'}}>v2.0</small></h1>
      </div>
      <div className=" mb-2 mt-4"><Banner/></div>
    </header>
  );
}

export default Header;
