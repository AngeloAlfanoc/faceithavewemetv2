import './index.scss'

import React, { useEffect, useRef, useState } from 'react';

import { Animated } from "react-animated-css";
import Loader from '../loader/index'
import MainService from '../../services/MainService'
import { TableHead } from './tablehead'
import { convertUnixTime } from '../../helpers/linuxConvert'
import { mapDecider } from '../../helpers/mapDecider'
import { uniqueEntry } from '../../helpers/uniqueEntry'
import { useSelector } from 'react-redux';

const Compare = () => {

    // cached arr
    let cached = [];


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
        if (loopCounter > 0 && loopCounter < searchInAmountOfMatches) {
            if (!loading) {
                setOffset(prevOffset => prevOffset + 100)
                fetchData(playerOneId)

            }
        }



    }, [loopCounter, offset]);

    async function fetchData(id) {
        let tmp;
        try {
            setLoading(true)
            const payload = await MainService.getPlayerMatchHistory(id, offset, 100)

            for (let i = 0; i < 100; i++) {
                !initLoad && setStartSearch(convertUnixTime(payload.data.items[0].started_at))
                setEndSearch(convertUnixTime(payload.data.items[99].started_at))
                if (payload.data.items[i].playing_players.indexOf(playerOneId) !== -1 && payload.data.items[i].playing_players.indexOf(playerTwoId) !== -1) {
                    let payloadChain = await MainService.getPlayerMatchState(payload.data.items[i].match_id)
                    tmp = [payload.data.items[i], payloadChain.data.rounds[0]]
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
            {(!initLoad && !loading) && <Animated animationIn="fadeInDown" isVisible={!initLoad && !loading} animationInDuration={50} animationOutDuration={500}>
                <form>
                    <button disabled={playerOneId && playerTwoId ? false : true} style={playerOneId && playerTwoId ? { background: '#195962' } : { background: '#6c757d' }} onClick={e => handleOnClick(e)}>Click to find matches</button>
                </form>
            </Animated>}
            {loading && <Loader />}
            <div>
                {items.length > 1 && <TableHead />}
                <div className="matches-container">
                    {items && items.map((item, i) => {
                        let dura = (Math.atan2(i, 2) / Math.PI) * 1000
                        return (
                            <Animated key={i} animationIn="fadeInRight" animationInDuration={dura}>
                                <a href={`https://www.faceit.com/en/csgo/room/${item[0].match_id}/scoreboard`} target='_blank'>
                                    <div className="d-flex text-white">
                                        <div className="match-listing">
                                            <div>{convertUnixTime(item[0].finished_at)}</div>
                                            <div>{item[1].round_stats.Score}</div>
                                            <div>
                                                <div>{item[1].round_stats.Map}</div>
                                                <img src={mapDecider(item[1].round_stats.Map)}></img>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            </Animated>
                        )
                    })}
                </div>
              
                {loading || initLoad ?
                    <>
                        <div className="blue-bar py-1"><small>Found a total of {items.length} matches.</small></div>
                        <div className="blue-bar py-1"><small>Now searching between: {endSearch} and  {startSearch}</small></div>
                    </> : ''}
            </div>
        </div>
    );
}

export default Compare;

