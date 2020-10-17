import Activity from '../components/activity/index'
import { Animated } from "react-animated-css";
import Banner from '../components/banner/index'
import Compare from '../components/compare/index'
import CookieConsent from "react-cookie-consent";
import Footer from '../components/footer/index'
import Header from '../components/header/index'
import Loader from './../components/loader/index';
import Notice from '../components/notice/index'
import Player from '../components/player/index'
import React from 'react';
import Search from '../components/search/index'
import UrlState from '../components/urlstate/index'
import { useSelector } from 'react-redux';

const Index = () => {
  const loader = useSelector(state => state.isLoading);
  return (
    <>
      <Notice />
      <UrlState />
      <Header />

      <main className="container d-flex flex-column">
        <Search />
        <Player />
        <Compare />
      </main>
      
      <Footer />
      <CookieConsent 
      buttonText="I Understand"
      cookieName="GDPR_COOKIE"
      expires={150}
      buttonStyle={{
      backgroundColor: "#195962",
      fontSize: "13px",
      borderRadius: "4px"
        }}>
        This website uses cookies to optimize user experience.
        </CookieConsent>

    </>
  );
}

export default Index;


/* 
    
    Unused components

    <Session/> 
    <Activity/>
    <Banner/>
  
  
*/
