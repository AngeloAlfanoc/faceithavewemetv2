import http from "./http-common";

const getPlayerByName = name => {
  return http.get(`players?nickname=${name}`);
};

const getPlayerById = player_id => {
  return http.get(`/players/${player_id}`);
};

const getMatchesById = match_id => {
  return http.get(`/matches/${match_id}`);
};


const getPlayerMatchHistory = (player_id, offset, end) => {
  let lifeTimeMatches = end
  return http.get(`/players/${player_id}/history?game=csgo&from=0&to=${new Date()/1000}&offset=${offset}&limit=${end}`), lifeTimeMatches;
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
};