

export const setPlayerOneName = string => ({ type : 'SET_PLAYER_ONE_NAME', string});
export const setPlayerOneId = string => ({ type : 'SET_PLAYER_ONE_ID', string});
export const setPlayerOneElo = string => ({ type : 'SET_PLAYER_ONE_ELO', string});
export const setPlayerOneLevel = string => ({ type : 'SET_PLAYER_ONE_LEVEL', string});
export const setPlayerOneMatches = string => ({ type : 'SET_PLAYER_ONE_MATCHES', string});
export const setPlayerOneWinRate = string => ({ type : 'SET_PLAYER_ONE_WINRATE', string});
export const setPlayerOneAVGKD = string => ({ type : 'SET_PLAYER_ONE_AVGKD', string});
export const setPlayerOneWins = string => ({ type : 'SET_PLAYER_ONE_WINS', string});
export const setPlayerOneAvatar = string => ({type: 'SET_PLAYER_ONE_AVATAR', string});
export const setPlayerTwoName = string => ({ type : 'SET_PLAYER_TWO_NAME', string});
export const setPlayerTwoId = string => ({ type : 'SET_PLAYER_TWO_ID', string});
export const setPlayerTwoElo = string => ({ type : 'SET_PLAYER_TWO_ELO', string});
export const setPlayerTwoLevel = string => ({ type : 'SET_PLAYER_TWO_LEVEL', string});
export const setPlayerTwoMatches = string => ({ type : 'SET_PLAYER_TWO_MATCHES', string});
export const setPlayerTwoWinRate = string => ({ type : 'SET_PLAYER_TWO_WINRATE', string});
export const setPlayerTwoAVGKD = string => ({ type : 'SET_PLAYER_TWO_AVGKD', string});
export const setPlayerTwoWins = string => ({ type : 'SET_PLAYER_TWO_WINS', string});
export const setPlayerTwoAvatar = string => ({type: 'SET_PLAYER_TWO_AVATAR', string});
export const setPlayerTwoWinStreak = string => ({type: 'SET_PLAYER_TWO_CURRENT_STREAK', string})
export const setPlayerOneWinStreak = string => ({type: 'SET_PLAYER_ONE_CURRENT_STREAK', string})
export const setPlayerTwoSteamLink = string => ({type: 'SET_PLAYER_TWO_STEAM', string})
export const setPlayerOneSteamLink = string => ({type: 'SET_PLAYER_ONE_STEAM', string})
export const setPlayerOneParams = string => ({type: 'SET_PLAYER_ONE_PARAMS', string})
export const setPlayerTwoParams = string => ({type: 'SET_PLAYER_TWO_PARAMS', string})
export const setPlayerOneCountry = string => ({type: 'SET_PLAYER_ONE_COUNTRY', string})
export const setPlayerTwoCountry = string => ({type: 'SET_PLAYER_TWO_COUNTRY', string})
export const setUserSessionID = string => ({type : 'SET_USER_SESSION', string})
export const setHardReset = obj => ({type: 'SET_HARD_RESET', obj})
export const setPreviousPush = string => ({type: 'SET_PREV_PUSH', string})
export const setRecentSearches = obj => ({type: 'SET_RECENT_SEARCHES', obj})
export const setLoadCompare = bool => ({type: 'SET_LOAD_COMPARE', bool})