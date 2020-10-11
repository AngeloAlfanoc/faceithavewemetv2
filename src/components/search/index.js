import './index.scss'
import { useSelector, useDispatch  } from 'react-redux'
import React, { useRef, useState, useEffect } from 'react';
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

import { ReactComponent as SearchIcon } from '../../assets/ui/magnifier.svg'

const Search = () => {

    const playerOne = useRef(null);
    const playerTwo = useRef(null);
    const dispatch = useDispatch()

  // Player one Data 
  const playerOneName = useSelector(state => state.isPlayerOneName);
  const playerOneElo = useSelector(state => state.isPlayerOneElo);
  const playerOneLevel = useSelector(state => state.isPlayerOneLevel);
  const playerOneMatches = useSelector(state => state.isPlayerOneMatches);
  const playerOneWinRate = useSelector(state => state.isPlayerOneWinRate);
  const playerOneAVGKD = useSelector(state => state.isPlayerOneAVGKD);
  const playerOneWins = useSelector(state => state.isPlayerOneWins);
  const playerOneAvatar = useSelector(state => state.isPlayerOneAvatar);
  const playerOneWinstreak = useSelector(state => state.isPlayerOneWinstreak);
  const playerOneSteam = useSelector(state => state.isPlayerOneSteamLink);
  // Player two data 
  const playerTwoName = useSelector(state => state.isPlayerTwoName);
  const playerTwoElo = useSelector(state => state.isPlayerTwoElo);
  const playerTwoLevel = useSelector(state => state.isPlayerTwoLevel);
  const playerTwoMatches = useSelector(state => state.isPlayerTwoMatches);
  const playerTwoWinRate = useSelector(state => state.isPlayerTwoWinRate);
  const playerTwoAVGKD = useSelector(state => state.isPlayerTwoAVGKD);
  const playerTwoWins = useSelector(state => state.isPlayerTwoWins);
  const playerTwoAvatar = useSelector(state => state.isPlayerTwoAvatar);
  const playerTwoWinstreak = useSelector(state => state.isPlayerTwoWinstreak);
  const playerTwoSteam = useSelector(state => state.isPlayerTwoSteamLink);
    const fetchData = (avatar, avgkd, elo, id, matches, name, player_name, skill, winrate, wins, streak, steam) => {
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
    const onClickInput = (e) => {
        e.preventDefault();
    }
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
    const handleParamSearch = () => {
        fetchData(
            setPlayerOneAvatar,
            setPlayerOneAVGKD,
            setPlayerOneElo,
            setPlayerOneId,
            setPlayerOneMatches,
            setPlayerOneName,
            playerOneName,
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
            playerTwoName,
            setPlayerTwoLevel,
            setPlayerTwoWinRate,
            setPlayerTwoWins,
            setPlayerTwoStreak,
            setPlayerTwoSteamLink
        )
    }

    
    useEffect(() => {
        if(playerOneName && playerTwoName) {
            if (playerOneElo && playerTwoElo) {
                if (playerTwoMatches && playerTwoMatches) {
                    handleParamSearch();
                }
            }
        }
      },[]);

    return (
        <div>
            <form onSubmit={e => handleSubmit(e)}>
                <input onClick={e => { onClickInput(e) }} ref={playerOne} placeholder="player 1"></input>
                <input onClick={e => { onClickInput(e) }} ref={playerTwo} placeholder="player 2"></input>
                <button style={{ width: 45 }}><SearchIcon height={15} /></button>
            </form>

        </div>
    );
}

export default Search;
