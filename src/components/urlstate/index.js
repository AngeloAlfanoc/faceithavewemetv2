import React, { useEffect, } from 'react'
import { setPlayerOneParams, setPlayerTwoParams } from '../../redux/actions'

import { useDispatch, } from 'react-redux'

const UrlState = (props) => {

  let cached = []


  const dispatch = useDispatch();
  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    for (let value of urlParams.values()) {
      cached.push(value)
    }
    dispatch(setPlayerOneParams(cached[0]))
    dispatch(setPlayerTwoParams(cached[1]))
  }, []);



  return (<></>)

}

export default UrlState;