import './index.scss'

import React, { useEffect, useRef, useState } from 'react';
import {
    setHardReset,
    setPlayerOneAVGKD,
    setPlayerOneAvatar,
    setPlayerOneCountry,
    setPlayerOneElo,
    setPlayerOneId,
    setPlayerOneLevel,
    setPlayerOneMatches,
    setPlayerOneName,
    setPlayerOneSteamLink,
    setPlayerOneWinRate,
    setPlayerOneWinStreak,
    setPlayerOneWins,
    setPlayerTwoAVGKD,
    setPlayerTwoAvatar,
    setPlayerTwoCountry,
    setPlayerTwoElo,
    setPlayerTwoId,
    setPlayerTwoLevel,
    setPlayerTwoMatches,
    setPlayerTwoName,
    setPlayerTwoSteamLink,
    setPlayerTwoWinRate,
    setPlayerTwoWinStreak,
    setPlayerTwoWins
} from '../../redux/actions'
import { setPlayerOneParams, setPlayerTwoParams } from '../../redux/actions'
import { useDispatch, useSelector } from 'react-redux'

import MainService from '../../services/MainService'
import { ReactComponent as SearchIcon } from '../../assets/ui/magnifier.svg'
import initialState from '../../redux/initialState'
import {setUserMatches} from '../../redux/actions'

const Search = () => {

    const playerOne = useRef(null);
    const playerTwo = useRef(null);
    const dispatch = useDispatch()

    const [inputOne, setInputOne] = useState()
    const [inputTwo, setInputTwo] = useState()

    const playerOneName = useSelector (state => state.isPlayerOneName);
    const playerTwoName = useSelector (state => state.isPlayerTwoName)
    const playerOneParams = useSelector(state => state.isPlayerOneParams);
    const playerTwoParams = useSelector(state => state.isPlayerTwoParams);

    const fetchData = (avatar, avgkd, elo, id, matches, name, player_name, skill, winrate, wins, streak, steam, country) => {
        try {
            MainService
                .getPlayerByName(player_name)
                .then(result => {
                    dispatch(id(result.data.player_id))
                    dispatch(name(result.data.nickname))
                    dispatch(elo(result.data.games.csgo.faceit_elo))
                    dispatch(skill(result.data.games.csgo.skill_level))
                    dispatch(avatar(result.data.avatar))
                    dispatch(steam(result.data.steam_id_64))
                    dispatch(country(result.data.country))
                    return MainService.getPlayerStats(result.data.player_id);
                })
                .then((result) => {
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
 
    const onClickInput = () => {
        setInputOne()
        setInputTwo()
        dispatch(setPlayerOneParams())
        dispatch(setPlayerTwoParams())
        
    }
    const fetchDataPlayerOne = (value) => {
        fetchData(
                setPlayerOneAvatar,
                setPlayerOneAVGKD,
                setPlayerOneElo,
                setPlayerOneId,
                setPlayerOneMatches,
                setPlayerOneName,
                value,
                setPlayerOneLevel,
                setPlayerOneWinRate,
                setPlayerOneWins,
                setPlayerOneWinStreak,
                setPlayerOneSteamLink,
                setPlayerOneCountry
            )
    }
    const fetchDataPlayerTwo = (value) => {
        fetchData(
                setPlayerTwoAvatar,
                setPlayerTwoAVGKD,
                setPlayerTwoElo,
                setPlayerTwoId,
                setPlayerTwoMatches,
                setPlayerTwoName,
                value,
                setPlayerTwoLevel,
                setPlayerTwoWinRate,
                setPlayerTwoWins,
                setPlayerTwoWinStreak,
                setPlayerTwoSteamLink,
                setPlayerTwoCountry
            )
    }
    const handleSubmit = (e) => {
        if (inputOne || inputTwo !== '') {
            fetchDataPlayerOne(playerOne.current.value)
            fetchDataPlayerTwo(playerTwo.current.value)
            e.preventDefault();
            
 
        }
    }
    const handleSubmitParam = () => {
        if (playerOneParams && playerTwoParams) {
            fetchDataPlayerOne(playerOneParams)
            fetchDataPlayerTwo(playerTwoParams)
        }
    }

    const setInputFields = async () => {
        await playerOneParams
        await playerTwoParams
        setInputOne(playerOneParams)
        setInputTwo(playerTwoParams)
    }
    setInputFields().then(()=>handleSubmitParam());

    const handleInputOne = (e) => {
        e.preventDefault();
        setInputOne(e.target.value)
    }
    const handleInputTwo = (e) => {
        e.preventDefault();
        setInputTwo(e.target.value)
    }
    const handleReset= (e) => {
        e.preventDefault();
        dispatch(setHardReset())
    }
    return (
        <div>
            <form onSubmit={e => handleSubmit(e)}>
                <input type="text" value={inputOne} name='player' required={true} onChange={e => handleInputOne(e)} onClick={e => { onClickInput(e) }} ref={playerOne} placeholder="player 1"></input>
                <input type="text" value={inputTwo} name='player' required={true} onChange={e => handleInputTwo(e)} onClick={e => { onClickInput(e) }} ref={playerTwo} placeholder="player 2"></input>
                <button style={{ width: 45 }}><SearchIcon height={15} /></button>
                <button onClick={e=>handleReset(e)} className="mx-1 text-white" style={{ width: 60 }}><small>Reset</small></button>
            </form>

        </div>
    );
}

export default Search;
