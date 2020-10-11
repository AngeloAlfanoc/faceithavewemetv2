import DefaultProfile from '../../assets/profile.png'
import { ReactComponent as SteamIcon } from '../../assets/ui/steam.svg'
import React from 'react';
import { Animated } from "react-animated-css";
const StatBox = (props) => {
    return <Animated animationIn="zoomIn"><div className="statbox">{props.element}</div></Animated>
}
// Create the player box
export const PlayerBox = (props) => {
    const { level, elo, matches, winrate, avgkd, wins, name, avatar, streak, steam } = props;
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
                    <StatBox element={<><span><a href={'http://steamcommunity.com/profiles/' + steam}><SteamIcon fill="#ffffff" /></a></span></>} />
                    <StatBox element={<><span><strong>{streak}</strong></span><span>Current Winstreak</span></>} />
                </div>
            </div>
        </div>
    )
}