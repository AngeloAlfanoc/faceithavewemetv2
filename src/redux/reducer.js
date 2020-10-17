import { loadState } from "./localStorage";
import { withReduxStateSync } from "redux-state-sync";

const mainReducer = (state = loadState(), action) => {
  switch (action.type) {
    case 'SET_PLAYER_ONE_NAME': {
      const { string } = action;
      return { ...state, isPlayerOneName: string };
    }
    case 'SET_PLAYER_ONE_ID': {
      const { string } = action;
      return { ...state, isPlayerOneId: string };
    }
    case 'SET_PLAYER_ONE_ELO': {
      const { string } = action;
      return { ...state, isPlayerOneElo: string };
    }
    case 'SET_PLAYER_ONE_LEVEL': {
      const { string } = action;
      return { ...state, isPlayerOneLevel: string };
    }
    case 'SET_PLAYER_ONE_MATCHES': {
      const { string } = action;
      return { ...state, isPlayerOneMatches: string };
    }
    case 'SET_PLAYER_ONE_WINRATE': {
      const { string } = action;
      return { ...state, isPlayerOneWinRate: string };
    }
    case 'SET_PLAYER_ONE_AVGKD': {
      const { string } = action;
      return { ...state, isPlayerOneAVGKD: string };
    }
    case 'SET_PLAYER_ONE_WINS': {
      const { string } = action;
      return { ...state, isPlayerOneWins: string };
    }
    case 'SET_PLAYER_ONE_AVATAR': {
      const { string } = action;
      return { ...state, isPlayerOneAvatar: string };
    }
    case 'SET_PLAYER_ONE_CURRENT_STREAK': {
      const { string } = action;
      return { ...state, isPlayerOneWinStreak: string };
    }
    case 'SET_PLAYER_TWO_NAME': {
      const { string } = action;
      return { ...state, isPlayerTwoName: string };
    }
    case 'SET_PLAYER_TWO_ID': {
      const { string } = action;
      return { ...state, isPlayerTwoId: string };
    }
    case 'SET_PLAYER_TWO_ELO': {
      const { string } = action;
      return { ...state, isPlayerTwoElo: string };
    }
    case 'SET_PLAYER_TWO_LEVEL': {
      const { string } = action;
      return { ...state, isPlayerTwoLevel: string };
    }
    case 'SET_PLAYER_TWO_MATCHES': {
      const { string } = action;
      return { ...state, isPlayerTwoMatches: string };
    }
    case 'SET_PLAYER_TWO_WINRATE': {
      const { string } = action;
      return { ...state, isPlayerTwoWinRate: string };
    }
    case 'SET_PLAYER_TWO_AVGKD': {
      const { string } = action;
      return { ...state, isPlayerTwoAVGKD: string };
    }
    case 'SET_PLAYER_TWO_WINS': {
      const { string } = action;
      return { ...state, isPlayerTwoWins: string };
    }
    case 'SET_PLAYER_TWO_AVATAR': {
      const { string } = action;
      return { ...state, isPlayerTwoAvatar: string };
    }
    case 'SET_PLAYER_TWO_CURRENT_STREAK': {
      const { string } = action;
      return { ...state, isPlayerTwoWinStreak: string };
    }
    case 'SET_PLAYER_TWO_STEAM': {
      const { string } = action;
      return { ...state, isPlayerTwoSteamLink: string };
    }
    case 'SET_PLAYER_ONE_STEAM': {
      const { string } = action;
      return { ...state, isPlayerOneSteamLink: string };
    }
    case 'SET_PLAYER_ONE_PARAMS': {
      const { string } = action;
      return { ...state, isPlayerOneParams: string };
    }
    case 'SET_PLAYER_TWO_PARAMS': {
      const { string } = action;
      return { ...state, isPlayerTwoParams: string };
    }
    case 'SET_PLAYER_TWO_COUNTRY': {
      const { string } = action;
      return { ...state, isPlayerTwoCountry: string };
    }
    case 'SET_PLAYER_ONE_COUNTRY': {
      const { string } = action;
      return { ...state, isPlayerOneCountry: string };
    }
    case 'SET_USER_SESSION': {
      const { string } = action;
      return { ...state, isUserSession: string };
    }
    case 'SET_PREV_PUSH': {
      const { string } = action;
      return { ...state, isPreviousPush: string };
    }
    case 'SET_RECENT_SEARCHES': {
      const { obj } = action;
      return { ...state, isRecentSearches: obj };
    }
    case 'SET_HARD_RESET' : {
      return { state : {} }
    }
    case 'SET_LOAD_COMPARE' : {
      const { bool } = action;
      return { ...state, isLoading: bool };
    }
    default:
      return { ...state };
  }
};

export default withReduxStateSync(mainReducer);
