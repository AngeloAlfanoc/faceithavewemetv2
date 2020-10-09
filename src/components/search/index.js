import './index.scss'

import React, {useEffect, useRef, useState} from 'react';
import {
    setPlayerOneAVGKD,
    setPlayerOneAvatar,
    setPlayerOneElo,
    setPlayerOneId,
    setPlayerOneLevel,
    setPlayerOneMatches,
    setPlayerOneName,
    setPlayerOneWinRate,
    setPlayerOneWins,
    setPlayerTwoAVGKD,
    setPlayerTwoAvatar,
    setPlayerTwoElo,
    setPlayerTwoId,
    setPlayerTwoLevel,
    setPlayerTwoMatches,
    setPlayerTwoName,
    setPlayerTwoWinRate,
    setPlayerTwoWins,
    setSearchInAmountOfMatches
} from '../../redux/actions'

import MainService from '../../services/MainService'
import {useDispatch} from "react-redux";

const Search = () => {
    const playerOne = useRef(null);
    const playerTwo = useRef(null);
    const dispatch = useDispatch();

    const fetchData = (avatar, avgkd, elo, id, matches, name, player_name, skill, winrate, wins) => {
        try {
            MainService
                .getPlayerByName(player_name)
                .then(result => {
                    dispatch(id(result.data.player_id))
                    dispatch(name(result.data.nickname))
                    dispatch(elo(result.data.games.csgo.faceit_elo))
                    dispatch(skill(result.data.games.csgo.skill_level))
                    dispatch(avatar(result.data.avatar))

                    return MainService.getPlayerStats(result.data.player_id);
                })
                .then((result) => {
                    dispatch(matches(result.data.lifetime.Matches))
                    dispatch(avgkd(result.data.lifetime["Average K/D Ratio"]))
                    dispatch(wins(result.data.lifetime.Wins))
                    dispatch(winrate(result.data.lifetime["Win Rate %"]))
                })
        } catch (e) {
            console.error(e)
        }
    };

    const handleSubmit = (e) => {
        fetchData(setPlayerOneAvatar, setPlayerOneAVGKD, setPlayerOneElo, setPlayerOneId, setPlayerOneMatches, setPlayerOneName, playerOne.current.value, setPlayerOneLevel, setPlayerOneWinRate, setPlayerOneWins)
        fetchData(setPlayerTwoAvatar, setPlayerTwoAVGKD, setPlayerTwoElo, setPlayerTwoId, setPlayerTwoMatches, setPlayerTwoName, playerTwo.current.value, setPlayerTwoLevel, setPlayerTwoWinRate, setPlayerTwoWins)
        e.preventDefault();
    }

    return (
        <div>
            <form onSubmit={e => handleSubmit(e)}>
                <input value={"luosrevo"} ref={playerOne} placeholder="player 1"></input>
                <input value={"sDohtem"} ref={playerTwo} placeholder="player 2"></input>
                <button>go</button>
            </form>

        </div>
    );
}

export default Search;
