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
    setPlayerOneParams,
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
    setPlayerTwoParams,
    setPlayerTwoSteamLink,
    setPlayerTwoWinRate,
    setPlayerTwoWinStreak,
    setPlayerTwoWins
} from '../../redux/actions'
import { useDispatch, useSelector } from 'react-redux'

import MainService from '../../services/MainService'
import { ReactComponent as SearchIcon } from '../../assets/ui/magnifier.svg'
import firebase from 'firebase'

const Search = () => {
    const db = firebase.firestore();
    const playerOne = useRef(null);
    const playerTwo = useRef(null);
    const dispatch = useDispatch()

    const [inputOne, setInputOne] = useState()
    const [inputTwo, setInputTwo] = useState()

    const playerOneName = useSelector(state => state.isPlayerOneName);
    const playerTwoName = useSelector(state => state.isPlayerTwoName);
    const playerOneParams = useSelector(state => state.isPlayerOneParams);
    const playerTwoParams = useSelector(state => state.isPlayerTwoParams);



    const fetchData = (avatar, avgkd, elo, id, matches, name, player_name, skill, winrate, wins, streak, steam, country) => {

        try {

            MainService.getPlayerByName(player_name).then(result => {
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




    const onInput = () => {
        setInputOne();
        setInputTwo();
        dispatch(setPlayerOneParams());
        dispatch(setPlayerTwoParams());
    }


    const fetchDataPlayerOne = (value) => {
        fetchData(setPlayerOneAvatar, setPlayerOneAVGKD, setPlayerOneElo, setPlayerOneId, setPlayerOneMatches, setPlayerOneName, value, setPlayerOneLevel, setPlayerOneWinRate, setPlayerOneWins, setPlayerOneWinStreak, setPlayerOneSteamLink, setPlayerOneCountry)
    }
    const fetchDataPlayerTwo = (value) => {
        fetchData(setPlayerTwoAvatar, setPlayerTwoAVGKD, setPlayerTwoElo, setPlayerTwoId, setPlayerTwoMatches, setPlayerTwoName, value, setPlayerTwoLevel, setPlayerTwoWinRate, setPlayerTwoWins, setPlayerTwoWinStreak, setPlayerTwoSteamLink, setPlayerTwoCountry)
    }



    // submit if parameters
    const handleSubmitParam = () => {
        if (playerOneParams && playerTwoParams) {
            if (playerOneName !== '' && playerTwoName !== '') {
                if (playerOneName !== playerOneParams || playerTwoName !== playerTwoParams) {
                    fetchDataPlayerOne(playerOneParams)
                    fetchDataPlayerTwo(playerTwoParams)
                }
            }

        }
    }


    const runInit = async () => {
            await playerOneParams
            await playerTwoParams
            setInputOne(playerOneParams)
            setInputTwo(playerTwoParams)
            handleSubmitParam();

    }



    useEffect(() => {

        runInit()

    },[playerOneParams,  playerTwoParams]);



    const handleReset = (e) => {
        e.preventDefault();
        dispatch(setHardReset())
        window.location.replace(`/?player=${''}&?player=${''}`)
    }



    return (
        <div>
            <form className="d-flex align-items-center flex-wrap search" >
               
                    <input type="text" value={inputOne} name='player' required={true} onKeyDown={e => onInput(e)} onChange={e => setInputOne(e.target.value)} onClick={e => { onInput(e) }} ref={playerOne} placeholder="player 1"></input>
               
                <input type="text" value={inputTwo} name='player' required={true} onKeyDown={e => onInput(e)} onChange={e => setInputTwo(e.target.value)} onClick={e => { onInput(e) }} ref={playerTwo} placeholder="player 2"></input>
                <div className="button-set">
                <button style={{ width: 45 }}><SearchIcon height={15} /></button>
                <button onClick={e => handleReset(e)} className="mx-1 text-white" style={{ width: 60 }}><small>Reset</small></button>
                </div>
            </form>

        </div>
    );
}

export default Search;
