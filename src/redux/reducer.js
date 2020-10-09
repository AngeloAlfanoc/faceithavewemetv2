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
    case 'SEARCH_IN_AMOUNT_OF_MATCHES': {
      const { int } = action;
      return { ...state, isSearchInAmountOfMatches: int };
    }
    default:
      return { ...state };
  }
};

export default withReduxStateSync(mainReducer);
