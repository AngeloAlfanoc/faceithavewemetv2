import './index.scss'

import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Animated } from "react-animated-css";
import Loader from '../loader/index'
import MainService from '../../services/MainService'
import { convertUnixTime } from '../../helpers/linuxConvert'
import { mapDecider } from '../../helpers/mapDecider'
import { setMatches } from '../../redux/actions'
import { uniqueEntry } from '../../helpers/uniqueEntry'
import {TableHead} from './tablehead'
const Compare = (props) => {

    // cached arr
    let cached = [];


    const playerOneId = useSelector(state => state.isPlayerOneId)
    const playerTwoId = useSelector(state => state.isPlayerTwoId)

    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [initLoad, setInitLoad] = useState(false)
    const [offset, setOffset] = useState(0)
    const loadMoreButton = useRef(null)
    const handleOnClick = (e) => {
        e.preventDefault();
        setOffset(100)
        fetchData(playerOneId)
    }


    const handleLoadMore = (e) => {
        e.preventDefault();
        setOffset(prevOffset => prevOffset + 100)
        fetchData(playerOneId)
    }



    async function fetchData(id) {
        let tmp;
        try {
            setLoading(true)
            const payload = await MainService.getPlayerMatchHistory(id, offset, 100)
            for (let i = 0; i < 100; i++) {
                if (payload.data.items[i].playing_players.indexOf(playerOneId) !== -1 && payload.data.items[i].playing_players.indexOf(playerTwoId) !== -1) {
                    let payloadChain = await MainService.getPlayerMatchState(payload.data.items[i].match_id)
                    tmp = [payload.data.items[i], payloadChain.data.rounds[0]]
                    cached.push(...items, tmp)
                    setItems(uniqueEntry(cached))
                }
            }
        } catch (e) {
            setError(e);
        } finally {
            setLoading(false)
            setInitLoad(true)
        }
    }


    return (
        <div className="compare">
            {!initLoad && !loading && <Animated animationIn="fadeInDown" isVisible={!initLoad && !loading} animationInDuration={50} animationOutDuration={500}>
                <form>
                    <button onClick={e => handleOnClick(e)}>Click to find matches</button>
                </form>
            </Animated>}
            {initLoad && <Animated animationIn="fadeInDown" isVisible={initLoad || loading}>
                <button ref={loadMoreButton} onClick={e => handleLoadMore(e)}>{items.length} games found, Load more?</button>
            </Animated>}


            <div>
                {initLoad && <TableHead/>}
                {initLoad || loading && <Animated animationIn="fadeInDown" isVisible={initLoad || loading}>
                <TableHead/>
                </Animated>}
                {error && <div className="text-white"> Error loading resources, please check your internet connection or refresh this page.</div>}
                {items && items.map((item, i) => {
                    let dura = (Math.atan2(i, 2) / Math.PI) * 1000
                    return <Animated animationIn="fadeInRight" animationInDuration={dura}>
                        <a href={`https://www.faceit.com/en/csgo/room/${item[0].match_id}/scoreboard`} target='_blank'>
                            <div key={i} className="d-flex text-white">
                                <div className="match-listing">
                                    <div>{convertUnixTime(item[0].finished_at)}</div>
                                    <div>{item[1].round_stats.Score}</div>
                                    <div>
                                        <img src={mapDecider(item[1].round_stats.Map)}></img>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </Animated>
                })}
                {loading && <Loader />}
                {initLoad && <button onClick={e => handleLoadMore(e)}>Load more?</button>}
            </div>
        </div>
    );
}

export default Compare;

