import './index.scss'

import Level0 from '../../assets/skill_level/skill_level_0_svg.svg'
import Level1 from '../../assets/skill_level/skill_level_1_svg.svg'
import Level10 from '../../assets/skill_level/skill_level_10_svg.svg'
import Level2 from '../../assets/skill_level/skill_level_2_svg.svg'
import Level3 from '../../assets/skill_level/skill_level_3_svg.svg'
import Level4 from '../../assets/skill_level/skill_level_4_svg.svg'
import Level5 from '../../assets/skill_level/skill_level_5_svg.svg'
import Level6 from '../../assets/skill_level/skill_level_6_svg.svg'
import Level7 from '../../assets/skill_level/skill_level_7_svg.svg'
import Level8 from '../../assets/skill_level/skill_level_8_svg.svg'
import Level9 from '../../assets/skill_level/skill_level_9_svg.svg'
import React from 'react';
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
  
  // Player two data 
  const playerTwoName = useSelector(state => state.isPlayerTwoName);
  const playerTwoElo = useSelector(state => state.isPlayerTwoElo);
  const playerTwoLevel = useSelector(state => state.isPlayerTwoLevel);
  const playerTwoMatches = useSelector(state => state.isPlayerTwoMatches);
  const playerTwoWinRate = useSelector(state => state.isPlayerTwoWinRate);
  const playerTwoAVGKD = useSelector(state => state.isPlayerTwoAVGKD);
  const playerTwoWins = useSelector(state => state.isPlayerTwoWins);
  const playerTwoAvatar = useSelector(state => state.isPlayerTwoAvatar);

  // Create the player box
  const PlayerBox = (props) => {
    return (
      <div className='profileBox'>
        <div className="title"> {props.name} </div>
        <div className="statcontainer">
          <div className="avatar"><img src={props.avatar}></img></div>
          <div className="infocontainer">
            <div className="statbox"><img src={props.level}></img></div>
            <div className="statbox"><span><strong>{props.elo}</strong></span><span>ELO</span></div>
            <div className="statbox"><span><strong>{props.matches}</strong></span><span>MATCHES</span></div>
            <div className="statbox"><span><strong>{props.winrate}%</strong></span><span>WIN RATE</span></div>
            <div className="statbox"><span><strong>{props.avgkd}</strong></span><span>AVG K/D RATIO</span></div>
            <div className="statbox"><span><strong>{props.wins}</strong></span><span>Wins</span></div>
          </div>
        </div>
      </div>
    )
  }

  // Decide on which level to choose
  const chooseLevelSvg = (e) => {
    switch (e) {
      case 1:
        return Level1
      case 2:
        return Level2
      case 3:
        return Level3
      case 4:
        return Level4
      case 5:
        return Level5
      case 6:
        return Level6
      case 7:
        return Level7
      case 8:
        return Level8
      case 9:
        return Level9
      case 10:
        return Level10
      default:
        return Level0
    }
  }
  return (
    <div className='profiles'>
      <PlayerBox name={playerOneName} avatar={playerOneAvatar} level={chooseLevelSvg(playerOneLevel)} elo={playerOneElo} matches={playerOneMatches} winrate={playerOneWinRate} avgkd={playerOneAVGKD} wins={playerOneWins} />
      <PlayerBox name={playerTwoName} avatar={playerTwoAvatar} level={chooseLevelSvg(playerTwoLevel)} elo={playerTwoElo} matches={playerTwoMatches} winrate={playerTwoWinRate} avgkd={playerTwoAVGKD} wins={playerTwoWins} />
    </div>
  );
}

export default Player;
