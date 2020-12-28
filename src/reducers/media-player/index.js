/**
 * Created by Peter Hoang Nguyen on 3/17/2017.
 */

import {
  ADD_SPEED_RECOGNITION_RESULT,
  START_MEDIA_PLAYER,
  STOP_MEDIA_PLAYER,
} from 'components/common/media-player/actions';

const mediaPlayerInitialState = {
  playingId: undefined,
  status: false,
  playersData: {},
};

const mediaPlayer = (state = mediaPlayerInitialState, action) => {
  let newState = {};
  switch (action.type) {
    case START_MEDIA_PLAYER: {
      newState = {
        ...state,
        playingId: action.playerId,
        status: true,
      };
      break;
    }
    case STOP_MEDIA_PLAYER: {
      if (state.status && action.playerId === state.playingId) {
        newState = {
          ...state,
          playingId: action.playerId,
          status: false,
        };
        break;
      }
      return state;
    }
    case ADD_SPEED_RECOGNITION_RESULT: {
      const { playerId } = action;
      if (playerId) {
        const resultList = { ...state.playersData, [playerId]: action.result };
        newState = {
          ...state,
          playersData: resultList,
        };
      }
      break;
    }
    default: {
      return state;
    }
  }
  return newState;
};
export default mediaPlayer;
