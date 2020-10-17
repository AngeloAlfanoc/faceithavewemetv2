import React, { useEffect, } from 'react'
import { setLoadCompare, setPlayerOneParams, setPlayerTwoParams, setPreviousPush } from '../../redux/actions'
import { useDispatch, useSelector } from 'react-redux'

import firebase from 'firebase'
import md5 from 'md5'
import uid from 'uid'

const UrlState = (props) => {
  const dispatch = useDispatch();
  const userSession = useSelector(state => state.isUserSession);
  const prevUserPush = useSelector(state=> state.isPreviousPush)
  const db = firebase.firestore();
  let cached = []
  const writeRecentSearch = (prop1, prop2, session) => {
    db.collection('recentsearches').add({
      user: session,
      userOne: prop1,
      userTwo: prop2,
      timestamp:Math.floor(Date.now() / 1000)
    }).then(() => {
      dispatch(setPreviousPush({
        user: session,
        userOne: prop1,
        userTwo: prop2,
        timestamp:Math.floor(Date.now() / 1000)
      }))
    })
  }



  useEffect(() => {
   
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    for (let value of urlParams.values()) {
      cached.push(value)
    }
    dispatch(setPlayerOneParams(cached[0]))
    dispatch(setPlayerTwoParams(cached[1]))
    // if (cached.length > 0) {
    //   if (userSession) {
    //     if(prevUserPush === undefined) {
    //       dispatch(setPreviousPush({
    //         user: userSession,
    //         userOne: md5(uid()),
    //         userTwo: md5(uid()),
    //         timestamp:Math.floor(Date.now() / 1000)
    //       }))
    //     }
    //     else if(cached[0] !== prevUserPush.userOne || cached[1] !== prevUserPush.userTwo) { 
    //       writeRecentSearch(cached[0], cached[1], userSession)
    //     }
    //   }
    // }

  },  [cached, dispatch]);



  return (<></>)

}

export default UrlState;