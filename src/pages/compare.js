import Compare from '../components/compare/index'
import Header from '../components/header/index'
import Player from '../components/player/index'
import React from 'react';
import Search from '../components/search/index'
import UrlState from '../components/urlstate/index'
const Index = () => {
  return (
    <>
    <UrlState/>
    <Header/>
    <div className="container d-flex flex-column">
      <Search/>
      <Player/>
      <Compare/>
    </div>
    </>
  );
}

export default Index;
