import {
  playerStart,
  playerStop,
} from 'components/common/media-player/actions';

export const onMediaPlayerStarted = (component) => {
  const { playerId, dispatch } = component.props;
  if (playerId) {
    dispatch(playerStart(playerId));
  }
  component.setState({
    isPlaying: true,
    componentCanSetStateOnEnded: true,
  });
};

export const onMediaPlayerStoped = (component) => {
  const { playerId, dispatch } = component.props;
  const state = component.state || {};
  const { componentCanSetStateOnEnded } = state;
  if (playerId) {
    dispatch(playerStop(playerId));
  }
  if (!componentCanSetStateOnEnded) {
    return;
  }
  component.setState({
    isPlaying: false,
    componentCanSetStateOnEnded: false,
  });
};

export const getMediaPlayerStatus = (component) => {
  const props = component.props || {};
  const state = component.state || {};
  const { playerId, isPlaying, mediaPlayerId } = props;
  if (playerId) {
    if (mediaPlayerId && playerId === mediaPlayerId) {
      return isPlaying;
    }
    return false;
  }
  return state.isPlaying;
};
