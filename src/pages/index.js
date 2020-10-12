import Activity from '../components/activity/index'
import Compare from '../components/compare/index'
import Header from '../components/header/index'
import Player from '../components/player/index'
import React from 'react';
import Search from '../components/search/index'
import Session from '../components/session/index'
import UrlState from '../components/urlstate/index'

const Index = () => {
  return (
    <>
    <Session/>
    <UrlState/>
    <Header/>
    <Activity/>
    <div className="container d-flex flex-column">
      <Search/>
      <Player/>
      <Compare/>
    </div>
    </>
  );
}

export default Index;
