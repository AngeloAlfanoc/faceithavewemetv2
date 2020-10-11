import React, {useEffect} from 'react'
import { useSelector, useDispatch  } from 'react-redux'
import {setPlayerOneName, setPlayerTwoName} from '../../redux/actions'
const UrlState = () => {
  let cached = []
  const dispatch = useDispatch();
  const playerOneName = useSelector(state => state.isPlayerOneName);
  const playerTwoName = useSelector(state => state.isPlayerTwoName);

    useEffect(() => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        for(let value of urlParams.values()) {
          cached.push(value)
        }
        dispatch(setPlayerOneName(cached[1]))
        dispatch(setPlayerOneName(cached[2]))
      },[]);
      return (<></>)

}

export default UrlState;