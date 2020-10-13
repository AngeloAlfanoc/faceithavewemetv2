import './index.scss'

import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Animated } from "react-animated-css";
import Loader from '../loader/index'
import MainService from '../../services/MainService'
import Swal from 'sweetalert2'
import { TableHead } from './tablehead'
import { convertUnixTime } from '../../helpers/linuxConvert'
import { mapDecider } from '../../helpers/mapDecider'
import { setUserMatches } from '../../redux/actions'
import { uniqueEntry } from '../../helpers/uniqueEntry'

const Compare = (props) => {

    // cached arr
    let cached = [];
    const dispatch = useDispatch()

    const playerOneId = useSelector(state => state.isPlayerOneId)
    const playerTwoId = useSelector(state => state.isPlayerTwoId)
    const playerOneName = useSelector(state => state.isPlayerOneName);
    const playerTwoName = useSelector(state => state.isPlayerTwoName);
    const playerOneParams = useSelector(state => state.isPlayerOneParams);
    const playerTwoParams = useSelector(state => state.isPlayerTwoParams);

    const userMatches = useSelector(state => state.isUserMatches)
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [initLoad, setInitLoad] = useState(false)
    const [loopCounter, setLoopCounter] = useState();
    const [offset, setOffset] = useState(0)
    const loadMoreButton = useRef(null)
    const [startSearch, setStartSearch] = useState();
    const [endSearch, setEndSearch] = useState();
    const handleOnClick = (e) => {
        e.preventDefault();
        setOffset(100)
        fetchData(playerOneId)
        setItems([])
        cached=[]
        dispatch(setUserMatches(uniqueEntry(cached)))
    }

    const handleLoadMore = (e) => {
        setOffset(prevOffset => prevOffset + 100)
        fetchData(playerOneId)
    }

    // useEffect(() => {
    //     if (userMatches && items.length === 0 && cached.length === 0 && !initLoad && playerOneName === playerOneParams && playerTwoName === playerTwoParams) {

    //         setItems(userMatches)
    //     }
    // }, [userMatches, items.length, cached.length, initLoad]);


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
                    console.log(payloadChain)
                }
            }
        } catch (e) {
            setError(e);
        } finally {
            setLoading(false)
            setInitLoad(true)
            dispatch(setUserMatches(uniqueEntry(cached)))
        }
    }



    return (
        <div className="compare">
            {(!initLoad && !loading) && <Animated animationIn="fadeInDown" isVisible={!initLoad && !loading} animationInDuration={50} animationOutDuration={500}>
                <form>
                    <button disabled={playerOneId && playerTwoId ? false : true} style={playerOneId && playerTwoId ? { background: '#195962' } : { background: '#6c757d' }} onClick={e => handleOnClick(e)}>Click to find matches</button>
                </form>
            </Animated>}


            <div>

               
                {loading || initLoad ?
                    <Animated animationIn="fadeInDown" isVisible={initLoad || loading}>
                        <TableHead />
                    </Animated> : ''}

                <div className="matches-container">
                    {items && items.map((item, i) => {
                        let dura = (Math.atan2(i, 2) / Math.PI) * 1000

                        return (

                            <Animated  key={i} animationIn="fadeInRight" animationInDuration={dura}>
                                <a href={`https://www.faceit.com/en/csgo/room/${item[0].match_id}/scoreboard`} target='_blank'>
                                    <div  className="d-flex text-white">
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
                {loading && <Loader />}
                {loading || initLoad ? <Animated animationIn="fadeInUp" isVisible={initLoad || loading}>
                    {items && <button ref={loadMoreButton} disabled={loading ? true : false} onClick={e => handleLoadMore(e)}>{items.length} games found, <span style={{ textDecoration: "underline" }}>Load more?</span></button>}
                    <div className="period py-1"><small>Matches shown are between: {endSearch} and  {startSearch}</small> </div>
                </Animated> : ''}
            </div>
        </div>
    );
}

export default Compare;

