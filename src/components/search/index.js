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

    const playerOneMatches = useSelector(state => state.isPlayerOneMatches)
    const playerTwoMatches = useSelector(state => state.isPlayerTwoMatches)
    const searchInMatches = useSelector(state => state.isSearchInAmountOfMatches)
    const [tempMatchArrOne,
        setTempMatchArrOne] = useState();
    const [tempMatchArrTwo,
        setTempMatchArrTwo] = useState();

    const fetchData = (player_name, name, elo, skill, avatar, matches, avgkd, wins, winrate) => {
        let flagged = true;

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

// const searchAmount= () => {   while (searchOffset !== calcAmount) {
// searchOffset = parseFloat(searchOffset + 100);   }   return searchOffset; };
// const getPlayerMatches = (player_id, c, offset) => {
// MainService.getPlayerMatchHistory(player_id, offset, 100)     .then(result =>
// {       if (c === 1) {         console.log(result)       }       if (c ===
// 2) {       }     }).then(() => {     })     .catch(e => {
// console.log(e)   }) } const getPlayer =  (player_name, c) => {   if (c === 1)
// { MainService.getPlayerByName(player_name)       .then(result => {
// dispatch(setPlayerOneName(result.data.nickname))
// dispatch(setPlayerOneElo(result.data.games.csgo.faceit_elo))
// dispatch(setPlayerOneLevel(result.data.games.csgo.skill_level))         //
// dispatch(setPlayerOneId(result.data.player_id))
// dispatch(setPlayerOneAvatar(result.data.avatar))       })   }   if (c === 2)
// {     MainService.getPlayerByName(player_name)       .then(result => {
// dispatch(setPlayerTwoName(result.data.nickname))
// dispatch(setPlayerTwoElo(result.data.games.csgo.faceit_elo))
// dispatch(setPlayerTwoLevel(result.data.games.csgo.skill_level))
// dispatch(setPlayerTwoId(result.data.player_id))
// dispatch(setPlayerTwoAvatar(result.data.avatar))       })   } }; const
// getPlayerStats = async (player_id, c) => {   await
// MainService.getPlayerStats(player_id)     .then(result => {       if (c ===
// 1) {         dispatch(setPlayerOneMatches(result.data.lifetime.Matches))
// dispatch(setPlayerOneAVGKD(result.data.lifetime["Average K/D Ratio"]))
// dispatch(setPlayerOneWins(result.data.lifetime.Wins))
// dispatch(setPlayerOneWinRate(result.data.lifetime["Win Rate %"]))       }
// if (c === 2) { dispatch(setPlayerTwoMatches(result.data.lifetime.Matches))
// dispatch(setPlayerTwoAVGKD(result.data.lifetime["Average K/D Ratio"]))
// dispatch(setPlayerTwoWins(result.data.lifetime.Wins))
// dispatch(setPlayerTwoWinRate(result.data.lifetime["Win Rate %"]))       } })
//    .catch(e => {       console.log(e)     }) } setInterval(() => {     return
// MainService         .getPlayerMatchHistory(result.data.player_id, increment,
// playerOneMatches)         .then((result) => {             console.log(result)
//         }     dispatch(setSearchInAmountOfMatches(searchInMatches + 100))
// console.log(parseInt(searchInMatches), parseInt(playerOneMatches)) }, 1000);