import http from "./http-common";
import search from './search-common'

const getPlayerByName = name => {
  return http.get(`players?nickname=${name}`);
};

const getPlayersBySearch = name => {
  return search.get(`players?nickname=${name}&offset=0&limit=20`);
};

const getPlayerById = player_id => {
  return http.get(`/players/${player_id}`);
};

const getMatchesById = match_id => {
  return http.get(`/matches/${match_id}`);
};

const getPlayerMatchHistory = (player_id, offset, end) => {
  return http.get(`/players/${player_id}/history?game=csgo&from=0&to=${Math.round(new Date()/1000)}&offset=${offset}&limit=${end}`);
};

const getPlayerMatchState = (match_id) => {
  return http.get(`/matches/${match_id}/stats`);
};

const getPlayerStats = player_id => {
  return http.get(`/players/${player_id}/stats/csgo`);
};

export default {
    getPlayerByName,
    getPlayerById ,
    getMatchesById,
    getPlayerMatchHistory,
    getPlayerStats,
    getPlayerMatchState
};