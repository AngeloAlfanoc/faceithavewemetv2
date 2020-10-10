import './index.scss'

import React from 'react';
import { chooseLevelSvg } from '../../helpers/chooseLevelSvg'
import { useSelector } from 'react-redux'
import DefaultProfile from '../../assets/profile.png'
import { ReactComponent as UserIcon } from '../../assets/ui/user.svg'
import { ReactComponent as SteamIcon } from '../../assets/ui/steam.svg'
import { Animated } from "react-animated-css";
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
  const StatBox = (props) => {
    return <Animated animationIn="zoomIn"><div className="statbox">{props.element}</div></Animated>
  }

  // Create the player box
  const PlayerBox = (props) => {
    const { level, elo, matches, winrate, avgkd, wins, name, avatar, streak,steam } = props;
    return (
      <div className='profileBox'>
        <div className="title"> {name} </div>
        <div className="statcontainer">
          <div className="avatar"><img className="img-fluid" src={avatar ? avatar : DefaultProfile}></img></div>
          <div className="infocontainer">
            <StatBox element={<img src={level}></img>} />
            <StatBox element={<><span><strong>{elo}</strong></span><span>Elo</span></>} />
            <StatBox element={<><span><strong>{avgkd}</strong></span><span>Avg k/d</span></>} />
            <StatBox element={<><span><strong>{matches}</strong></span><span>Matches</span></>} />
            <StatBox element={<><span><strong>{winrate}%</strong></span><span>Winrate</span></>} />
            <StatBox element={<><span><strong>{wins}</strong></span><span>Wins</span></>} />
            <StatBox element={<><span><a href={steam}><SteamIcon fill="#ffffff" /></a></span></>} />
            <StatBox element={<><span><strong>{streak}</strong></span><span>Current Winstreak</span></>} />
          </div>
        </div>
      </div>
    )
  }


  return (
    <div className='profiles'>
      <PlayerBox name={playerOneName} avatar={playerOneAvatar} level={chooseLevelSvg(playerOneLevel)} elo={playerOneElo} matches={playerOneMatches} winrate={playerOneWinRate} avgkd={playerOneAVGKD} wins={playerOneWins} streak={playerOneWinstreak} steam={playerOneSteam}/>
      <PlayerBox name={playerTwoName} avatar={playerTwoAvatar} level={chooseLevelSvg(playerTwoLevel)} elo={playerTwoElo} matches={playerTwoMatches} winrate={playerTwoWinRate} avgkd={playerTwoAVGKD} wins={playerTwoWins} streak={playerTwoWinstreak} steam={playerTwoSteam}/>
    </div>
  );
}

export default Player;
