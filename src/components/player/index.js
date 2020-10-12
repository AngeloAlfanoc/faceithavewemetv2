import './index.scss'

import {PlayerBox} from './playerBox'
import React from 'react';
import { chooseLevelSvg } from '../../helpers/chooseLevelSvg'
import { useSelector } from 'react-redux'

const Player = () => {

  // Player one Data 
  const playerOneName = useSelector(state => state.isPlayerOneName);
  const playerOneElo = useSelector(state => state.isPlayerOneElo);
  const playerOneLevel = useSelector(state => state.isPlayerOneLevel);
  const playerOneMatches = useSelector(state => state.isPlayerOneMatches);
  const playerOneWinRate = useSelector(state => state.isPlayerOneWinRate);
  const playerOneAVGKD = useSelector(state => state.isPlayerOneAVGKD);
  const playerOneWins = useSelector(state => state.isPlayerOneWins);
  const playerOneAvatar = useSelector(state => state.isPlayerOneAvatar);
  const playerOneWinstreak = useSelector(state => state.isPlayerOneWinStreak);
  const playerOneSteam = useSelector(state => state.isPlayerOneSteamLink);
  const playerOneCountry  = useSelector(state => state.isPlayerOneCountry);
  // Player two data 
  const playerTwoName = useSelector(state => state.isPlayerTwoName);
  const playerTwoElo = useSelector(state => state.isPlayerTwoElo);
  const playerTwoLevel = useSelector(state => state.isPlayerTwoLevel);
  const playerTwoMatches = useSelector(state => state.isPlayerTwoMatches);
  const playerTwoWinRate = useSelector(state => state.isPlayerTwoWinRate);
  const playerTwoAVGKD = useSelector(state => state.isPlayerTwoAVGKD);
  const playerTwoWins = useSelector(state => state.isPlayerTwoWins);
  const playerTwoAvatar = useSelector(state => state.isPlayerTwoAvatar);
  const playerTwoWinstreak = useSelector(state => state.isPlayerTwoWinStreak);
  const playerTwoSteam = useSelector(state => state.isPlayerTwoSteamLink);
  const playerTwoCountry  = useSelector(state => state.isPlayerTwoCountry);

  





  return (
    <div className='profiles'>
      <PlayerBox name={playerOneName} avatar={playerOneAvatar} level={chooseLevelSvg(playerOneLevel)} elo={playerOneElo} matches={playerOneMatches} winrate={playerOneWinRate} avgkd={playerOneAVGKD} wins={playerOneWins} streak={playerOneWinstreak} steam={playerOneSteam} country={playerOneCountry}/>
      <PlayerBox name={playerTwoName} avatar={playerTwoAvatar} level={chooseLevelSvg(playerTwoLevel)} elo={playerTwoElo} matches={playerTwoMatches} winrate={playerTwoWinRate} avgkd={playerTwoAVGKD} wins={playerTwoWins} streak={playerTwoWinstreak} steam={playerTwoSteam} country={playerTwoCountry}/>
    </div>
  );
}

export default Player;
