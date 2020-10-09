import './index.scss'

import React, { useState } from 'react';

import MainService from '../../services/MainService'
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const Compare = () => {
    // cached arr
    let cached = [];

    const playerOneId = useSelector(state => state.isPlayerOneId)
    const playerTwoId = useSelector(state => state.isPlayerTwoId)

    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);



    const handleOnClick = (e) => {
        e.preventDefault();
        fetchData(playerOneId)
        fetchData(playerTwoId)

    }

    async function fetchData(id) {
        try {
            setLoading(true)
            const result = await MainService.getPlayerMatchHistory(id, 0, 100)
            for (let i = 0; i < 100; i++) {
                if (result.data.items[i].playing_players.indexOf(playerOneId) !== -1 && result.data.items[i].playing_players.indexOf(playerTwoId) !== -1) {
                    cached.push(result.data.items[i])
                    let res = await MainService.getPlayerMatchState(result.data.items[i].match_id)
                    console.log(res)
                }
            
            }
            setItems(cached)
            
        } catch (e) {
            setError(e);
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
                {error ? "Failed to load Resource" : loading ? "loading..." : items.map((item) => console.log(item))}
            </div>
        </div>
    );
}

export default Compare;
