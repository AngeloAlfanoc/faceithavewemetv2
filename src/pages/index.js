import Activity from '../components/activity/index'
import Banner from '../components/banner/index'
import Compare from '../components/compare/index'
import Footer from '../components/footer/index'
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
    {/* <Banner/> */}
    <Header/>
    {/* <Activity/> */}
    
    <div className="container d-flex flex-column">
      <Search/>
      <Player/>
      <Compare/>
      
      <Footer/>
    </div>
   
    </>
  );
}

export default Index;
