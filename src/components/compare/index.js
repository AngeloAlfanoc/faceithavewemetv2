import './index.scss'

import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {Animated} from "react-animated-css";
import Loader from '../loader/index'
import MainService from '../../services/MainService'
import {convertUnixTime} from '../../helpers/linuxConvert'
import {mapDecider} from '../../helpers/mapDecider'
import {setMatches} from '../../redux/actions'

const Compare = () => {
    // cached arr
    let cached = [];

    const matches = useSelector(state => state.isMatches);
    const playerOneId = useSelector(state => state.isPlayerOneId)
    const playerTwoId = useSelector(state => state.isPlayerTwoId)

    const [items,setItems] = useState([]);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [offset,setOffset] = useState(100)

    const handleOnClick = (e) => {
        e.preventDefault();
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
            const result = await MainService.getPlayerMatchHistory(id, offset, 100)
            for (let i = 0; i < 100; i++) {
                if (result.data.items[i].playing_players.indexOf(playerOneId) !== -1 
                && result.data.items[i].playing_players.indexOf(playerTwoId) !== -1 
                
                ) {
                  
                    let res = await MainService.getPlayerMatchState(result.data.items[i].match_id)
                    tmp = [result.data.items[i], res.data.rounds[0]]
    
                    if (tmp[0])
                    cached.push(tmp)

                    setItems(tmp) 

                    console.log(cached)
                
                }
            }
        } catch (e) {
            setError(e);
            const error = new ErrorEvent('error', {message:'my error', error:e})
            window.dispatchEvent(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="compare">
            <form>
                <button onClick={e => handleOnClick(e)}>Click here to find all matches played together</button>
            </form>
            <div>
                <div>
                    <div className="d-flex text-white">
                        <div className="matchButton">
                            <div>Time</div>
                            <div>Score</div>
                            <div>Map</div>
                        </div>
                    </div>
                </div>
                {error
                    ? "Failed to load Resource"
                    : loading
                        ? <Loader/>
                        : items.map((item, i) => {
                            let dura = (Math.atan2(i, 2) / Math.PI) * 1000
                            return <Animated animationIn="fadeInUp" animationInDuration={dura}>
                                <a
                                    href={`https://www.faceit.com/en/csgo/room/${item[0].match_id}/scoreboard`}
                                    target='_blank'>
                                    <div key={i} className="d-flex text-white">
                                        <div className="matchButton">
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
                <button onClick={e => handleLoadMore(e)}>Load more?</button>
            </div>
        </div>
    );
}

export default Compare;
