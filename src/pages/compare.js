import Compare from '../components/compare/index'
import Header from '../components/header/index'
import Player from '../components/player/index'
import React from 'react';
import Search from '../components/search/index'

const Index = () => {
  return (
    <>
    <Header/>
    <div className="container d-flex flex-column">
      <Search/>
      {/* add params for url  */}
      <Player/>
      <Compare/>
    </div>
    </>
  );
}

export default Index;
