import React, {useEffect, useState} from 'react'
import {setPlayerOneParams, setPlayerTwoParams} from '../../redux/actions'

import { useDispatch } from 'react-redux'

const UrlState = () => {

  let cached = []
  const dispatch = useDispatch();
    // TODO Track and fill in user currently being searched in URL
    useEffect(() => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        for(let value of urlParams.values()) {
          cached.push(value)
        }
        dispatch(setPlayerOneParams(cached[0]))
        dispatch(setPlayerTwoParams(cached[1]))
         if (cached.length === 0){
          window.location.href=`/?user=${''}&?user=${''}`
         }
      },[]);


      return (<></>)

}

export default UrlState;