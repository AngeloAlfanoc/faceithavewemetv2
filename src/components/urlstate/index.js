import React, { useEffect, } from 'react'
import { setPlayerOneParams, setPlayerTwoParams } from '../../redux/actions'

import firebase from 'firebase'
import { useDispatch, } from 'react-redux'

const UrlState = (props) => {
const db = firebase.firestore();
  let cached = []
  const writeRecentSearch = (prop1, prop2) => {
    db.collection('recentsearches').add({
        userOne: prop1,
        userTwo: prop2
    })
}


  const dispatch = useDispatch();
  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    for (let value of urlParams.values()) {
      cached.push(value)
    }
    dispatch(setPlayerOneParams(cached[0]))
    dispatch(setPlayerTwoParams(cached[1]))
    console.log()
    if (cached.length > 0) {
      writeRecentSearch(cached[0], cached[1])  
    }
    
  }, [cached[0], cached[1]]);



  return (<></>)

}

export default UrlState;