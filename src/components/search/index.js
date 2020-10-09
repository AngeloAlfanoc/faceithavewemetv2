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
import {useDispatch, useSelector} from "react-redux";

import MainService from '../../services/MainService'

const Search = () => {
    const playerOne = useRef(null);
    const playerTwo = useRef(null);
    const dispatch = useDispatch();

    const fetchData = (player_name, name, elo, skill, avatar, matches, avgkd, wins, winrate) => {
        try {
            MainService
                .getPlayerByName(player_name)
                .then(result => {
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
        fetchData(playerOne.current.value, setPlayerOneName, setPlayerOneElo, setPlayerOneLevel, setPlayerOneAvatar, setPlayerOneMatches, setPlayerOneAVGKD, setPlayerOneWins, setPlayerOneWinRate)
        fetchData(playerTwo.current.value, setPlayerTwoName, setPlayerTwoElo, setPlayerTwoLevel, setPlayerTwoAvatar, setPlayerTwoMatches, setPlayerTwoAVGKD, setPlayerTwoWins, setPlayerTwoWinRate)
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
