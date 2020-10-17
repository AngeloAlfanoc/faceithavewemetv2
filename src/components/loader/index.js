import './index.scss'

import React from 'react';

const Loader = () => {


  return (
    <div className="d-flex justify-content-center loader">
      <div class="lds-facebook"><div></div><div></div><div></div></div>
    </div>
  );
}

export default Loader;
