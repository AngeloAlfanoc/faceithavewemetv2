import React, { useEffect, } from 'react'
import { setPlayerOneParams, setPlayerTwoParams, setPreviousPush } from '../../redux/actions'
import { useDispatch, useSelector } from 'react-redux'

import firebase from 'firebase'

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
      userTwo: prop2
    }).then(() => {
      dispatch(setPreviousPush({
        user: session,
        userOne: prop1,
        userTwo: prop2
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
    if (cached.length > 0) {
      if (userSession) {
        if(cached[0] !== prevUserPush.userOne || cached[1] !== prevUserPush.userTwo) { 
            writeRecentSearch(cached[0], cached[1], userSession)
        }
      }
    }

  }, [cached[0], cached[1]]);



  return (<></>)

}

export default UrlState;