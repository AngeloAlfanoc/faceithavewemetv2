import './index.scss'

import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Animated } from "react-animated-css";
import Loader from '../loader/index'
import LostAndFriendly from '../../assets/ui/lostandfriendly.png'
import MainService from '../../services/MainService'
import { TableHead } from './tablehead'
import WonAndEnemy from '../../assets/ui/wonandenemy.png'
import { convertUnixTime } from '../../helpers/linuxConvert'
import { mapDecider } from '../../helpers/mapDecider'
import { setLoadCompare } from '../../redux/actions'
import { uniqueEntry } from '../../helpers/uniqueEntry'

const Compare = () => {

    // cached arr
    let cached = [];

    const dispatch = useDispatch()
    const matches = useRef(null)
    const playerOneId = useSelector(state => state.isPlayerOneId)
    const playerTwoId = useSelector(state => state.isPlayerTwoId)

    const playerOneMatches = useSelector(state => state.isPlayerOneMatches);
    const playerTwoMatches = useSelector(state => state.isPlayerTwoMatches);



    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [initLoad, setInitLoad] = useState(false)
    const [loopCounter, setLoopCounter] = useState(0);
    const [offset, setOffset] = useState(0)
    const [startSearch, setStartSearch] = useState();
    const [endSearch, setEndSearch] = useState();
    const [searchInAmountOfMatches, setSearchInAmountOfMatches] = useState();
    const handleOnClick = (e) => {
        e.preventDefault();
        setOffset(100)
        setLoopCounter(1)
        fetchData(playerOneId)
    }





    // Search in highest matches count of player matches
    useEffect(() => {

    
        if (playerOneMatches) {
            if (playerTwoMatches) {
                if (playerOneMatches > playerTwoMatches) {
                    setSearchInAmountOfMatches(Math.round(playerOneMatches / 100))
                }
                else {
                    setSearchInAmountOfMatches(Math.round(playerTwoMatches / 100))
                }
            }
        }
        if (loopCounter > 0 && loopCounter < 11) {
            if (!loading) {
                setOffset(prevOffset => prevOffset + 100)
                fetchData(playerOneId)
            }
        }
    

    }, [loopCounter, offset ]);

    async function fetchData(id) {
        let tmp;
        try {
            setLoading(true)
            dispatch(setLoadCompare(true))

            const payload = await MainService.getPlayerMatchHistory(id, offset, 100)

            for (let i = 0; i < 100; i++) {
                !initLoad && setStartSearch(convertUnixTime(payload.data.items[0].started_at))
                setEndSearch(convertUnixTime(payload.data.items[99].started_at))
                if (payload.data.items[i].playing_players.indexOf(playerOneId) !== -1 && payload.data.items[i].playing_players.indexOf(playerTwoId) !== -1) {
                    //get all match statistics
                    let payloadChain = await MainService.getPlayerMatchState(payload.data.items[i].match_id)
                    let status = {
                        opposites: 'enemy',
                        result:'',
                    }
                    if (payload.data.items[i].playing_players.indexOf(playerOneId) <= 4 && payload.data.items[i].playing_players.indexOf(playerTwoId) <= 4) {
                        status.opposites = 'friendly'
                    }
                    else if (payload.data.items[i].playing_players.indexOf(playerOneId) >= 5 && payload.data.items[i].playing_players.indexOf(playerTwoId) >= 5) {
                        status.opposites = 'friendly'
                    }

                    
                    payloadChain.data.rounds[0].teams.forEach(element => {
                        element.players.forEach(res => { 
                            const players = res
                            if (players.player_id.indexOf(playerOneId)){
                                
                            }
                            else{
                                status.result = players.player_stats.Result;
                            }
                        })
                       
                    }); 


                    // if (payloadChain.data[0].teams[0].players[i].playerOneId.indexOf(playerOneId)) {

                    // }
                    tmp = [payload.data.items[i], payloadChain.data.rounds[0], status]
                    console.log(tmp)
                    cached.push(...items, tmp)
                    setItems(uniqueEntry(cached));
                }
            }
        } finally {
            setLoading(false)
            setInitLoad(true)
            setLoopCounter(prevCount => prevCount + 1)
        }
    }



    return (
        <div className="compare">

            <div className="sub-container">
                {(!initLoad && !loading) && <Animated animationIn="fadeInDown" isVisible={!initLoad && !loading} animationInDuration={50} animationOutDuration={500}>
                    <form>
                        <button disabled={playerOneId && playerTwoId ? false : true} style={playerOneId && playerTwoId ? { background: '#195962' } : { background: '#6c757d' }} onClick={e => handleOnClick(e)}>Click to find matches</button>
                    </form>
                    <div className="text-white paraf px-5 py-4">
                        <h5>What?</h5>
                        <p>This application provides you with a functionality that is missing on faceit, finding matches which you played with one and another.</p>
                        <h5>Why?</h5>
                        <p>Originally created as a school project, i decided to remake it with a modern technology stack.</p>
                        <h5>About?</h5>
                        <p>www.faceithavewemet.xyz is a non profit project created by <a href="https://www.methods.digital" target="_blank" rel="noopener noreferrer" >methods.digital</a> if you feel like this tool helped you out and you want to donate me a coffee, you can do so by going to this <a href="https://www.paypal.com/paypalme/anch126" target="_blank" rel="noopener noreferrer">link</a>.</p>
                        <h5>Legend</h5>
                        <p>Here is an example of a game that has been lost by player one, which was a game he played together with player two.</p>
                        <img className="img-fluid" src={LostAndFriendly}></img>
                        <p>This also applies the other way around as you can see in this example</p>
                        <img className="img-fluid" src={WonAndEnemy}></img>
                        <p className="pt-3">Thanks for using this website and have fun searching!</p>
                    </div>
                </Animated>}

                <div>
                    {items.length > 1 && <TableHead />}
                    <div ref={matches} className="matches-container">
                        {items && items.map((item, i) => {
                            let dura = (Math.atan2(i, 2) / Math.PI) * 1000
                            return (
                                <Animated key={i} animationIn="fadeInRight" animationInDuration={dura}>
                                    <a href={`https://www.faceit.com/en/csgo/room/${item[0].match_id}/scoreboard`} target='_blank' rel="noopener noreferrer">
                                        <div className="d-flex text-white">
                                            <div className="match-listing">
                                                <div style={item[2].result === "1"? { backgroundColor: "green" } : { backgroundColor: "red" }} className="wol"></div>
                                                <div>{convertUnixTime(item[0].finished_at)}</div>
                                                <div>{item[1].round_stats.Score}</div>
                                                <div>
                                                    <div>{item[1].round_stats.Map}</div>
                                                    <img src={mapDecider(item[1].round_stats.Map)}></img>
                                                </div>
                                                <div style={item[2].opposites === 'friendly' ? { backgroundColor: "blue" } : { backgroundColor: "yellow" }} className="eon"></div>
                                            </div>
                                        </div>
                                    </a>
                                </Animated>
                            )
                        })}
                    </div>

                    {loading || initLoad ?
                        <>
                            <div className="blue-bar justify-content-center py-1"><small>Found a total of {items.length} matches.</small></div>
                            <div className="blue-bar justify-content-center py-1"><small>Now searching between: {endSearch} and  {startSearch}</small></div>
                        </> : ''}
                </div>
            </div>
        </div>
    );
}

export default Compare;

