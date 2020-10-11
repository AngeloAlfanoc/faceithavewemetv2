import './index.scss'

import React from 'react';
import { chooseLevelSvg } from '../../helpers/chooseLevelSvg'
import { useSelector } from 'react-redux'

import {PlayerBox} from './playerBox'

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
  const playerOneWinstreak = useSelector(state => state.isPlayerOneWinstreak);
  const playerOneSteam = useSelector(state => state.isPlayerOneSteamLink);
  // Player two data 
  const playerTwoName = useSelector(state => state.isPlayerTwoName);
  const playerTwoElo = useSelector(state => state.isPlayerTwoElo);
  const playerTwoLevel = useSelector(state => state.isPlayerTwoLevel);
  const playerTwoMatches = useSelector(state => state.isPlayerTwoMatches);
  const playerTwoWinRate = useSelector(state => state.isPlayerTwoWinRate);
  const playerTwoAVGKD = useSelector(state => state.isPlayerTwoAVGKD);
  const playerTwoWins = useSelector(state => state.isPlayerTwoWins);
  const playerTwoAvatar = useSelector(state => state.isPlayerTwoAvatar);
  const playerTwoWinstreak = useSelector(state => state.isPlayerTwoWinstreak);
  const playerTwoSteam = useSelector(state => state.isPlayerTwoSteamLink);





  return (
    <div className='profiles'>
      <PlayerBox name={playerOneName} avatar={playerOneAvatar} level={chooseLevelSvg(playerOneLevel)} elo={playerOneElo} matches={playerOneMatches} winrate={playerOneWinRate} avgkd={playerOneAVGKD} wins={playerOneWins} streak={playerOneWinstreak} steam={playerOneSteam}/>
      <PlayerBox name={playerTwoName} avatar={playerTwoAvatar} level={chooseLevelSvg(playerTwoLevel)} elo={playerTwoElo} matches={playerTwoMatches} winrate={playerTwoWinRate} avgkd={playerTwoAVGKD} wins={playerTwoWins} streak={playerTwoWinstreak} steam={playerTwoSteam}/>
    </div>
  );
}

export default Player;
