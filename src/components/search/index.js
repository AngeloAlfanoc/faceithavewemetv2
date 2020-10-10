import './index.scss'
import { useSelector } from 'react-redux'
import React, { useRef, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom'
import { getParams } from '../../helpers/getQueryByObject'
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
    setPlayerTwoStreak,
    setPlayerOneStreak,
    setPlayerTwoSteamLink,
    setPlayerOneSteamLink
} from '../../redux/actions'

import MainService from '../../services/MainService'
import { useDispatch } from "react-redux";

import { ReactComponent as SearchIcon } from '../../assets/ui/magnifier.svg'

const Search = () => {
    let location = useLocation()
    const playerOne = useRef(null);
    const playerTwo = useRef(null);
    const dispatch = useDispatch();

    const fetchData = (avatar, avgkd, elo, id, matches, name, player_name, skill, winrate, wins, streak) => {
        try {
            MainService
                .getPlayerByName(player_name)
                .then(result => {
                    dispatch(id(result.data.player_id))
                    dispatch(name(result.data.nickname))
                    dispatch(elo(result.data.games.csgo.faceit_elo))
                    dispatch(skill(result.data.games.csgo.skill_level))
                    dispatch(avatar(result.data.avatar))
                    console.log(result)
                    return MainService.getPlayerStats(result.data.player_id);
                })
                .then((result) => {
                    console.log(result)
                    dispatch(matches(result.data.lifetime.Matches))
                    dispatch(avgkd(result.data.lifetime["Average K/D Ratio"]))
                    dispatch(wins(result.data.lifetime.Wins))
                    dispatch(winrate(result.data.lifetime["Win Rate %"]))
                    dispatch(streak(result.data.lifetime["Current Win Streak"]))
                })
        } catch (e) {
            console.error(e)
        }
    };
 
    const handleSubmit = (e) => {
        fetchData(setPlayerOneAvatar,
        setPlayerOneAVGKD,
        setPlayerOneElo,
        setPlayerOneId,
        setPlayerOneMatches,
        setPlayerOneName,
        playerOne.current.value,
        setPlayerOneLevel,
        setPlayerOneWinRate,
        setPlayerOneWins,
        setPlayerOneStreak,
        setPlayerOneSteamLink
        )
        fetchData(
        setPlayerTwoAvatar,
        setPlayerTwoAVGKD,
        setPlayerTwoElo,
        setPlayerTwoId,
        setPlayerTwoMatches,
        setPlayerTwoName,
        playerTwo.current.value,
        setPlayerTwoLevel,
        setPlayerTwoWinRate,
        setPlayerTwoWins,
        setPlayerTwoStreak,
        setPlayerTwoSteamLink
        )
        e.preventDefault();
    }

    return (
        <div>
            <form onSubmit={e => handleSubmit(e)}>
                <input ref={playerOne} placeholder="player 1"></input>
                <input ref={playerTwo} placeholder="player 2"></input>
                <button style={{ width: 45 }}><SearchIcon height={15} /></button>
            </form>

        </div>
    );
}

export default Search;
