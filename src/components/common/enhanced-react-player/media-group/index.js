import React from 'react';
import lodashSet from 'lodash.set';
import lodashGet from 'lodash.get';

/*
 * inside a media group, only one player can active at any given time
 * if one player is playing, all others will be paused
 */

const MediaGroupContext = React.createContext({
  addPlayerToGroup: (playerId, player) => {},
  removePlayerFromGroup: (playerId) => {},
  onPlayerPlay: (playerId) => {},
});

export const MediaGroupContextProvider = ({ children }) => {
  const playersInGroupRef = React.useRef({
    /**
     * [playerId]: {
     *    playerId: ...,
     *    player: react-player https://github.com/CookPete/react-player instance
     * }
     */
  });

  const addPlayerToGroup = React.useCallback((playerId, player) => {
    lodashSet(playersInGroupRef.current, [playerId], {
      playerId,
      player: player,
    });
  }, []);

  const removePlayerFromGroup = React.useCallback((playerId) => {
    lodashSet(playersInGroupRef.current, [playerId], null);
  }, []);

  const handlePlayerPlay = React.useCallback((playerId) => {
    Object.values(playersInGroupRef.current).forEach((p) => {
      // pause every other players
      if (lodashGet(p, 'playerId') !== playerId) {
        const player = lodashGet(p, 'player');
        if (player) {
          player.pause();
        }
      }
    });
  }, []);

  return (
    <MediaGroupContext.Provider
      value={{
        addPlayerToGroup,
        removePlayerFromGroup,
        onPlayerPlay: handlePlayerPlay,
      }}
    >
      {children}
    </MediaGroupContext.Provider>
  );
};

export const makeMediaGroupMember = (transformNewProps) => (Comp) => ({
  mainPlayerId,
  mainPlayerIsPlaying,
  ...originalProps
}) => {
  const { playerId, onPlay, withPlayer } = originalProps;
  const [player, setPlayer] = React.useState();

  const {
    addPlayerToGroup,
    removePlayerFromGroup,
    onPlayerPlay,
  } = React.useContext(MediaGroupContext);

  React.useEffect(
    () => {
      addPlayerToGroup(playerId, player);
      return () => {
        removePlayerFromGroup(playerId);
      };
    },
    [playerId, player, addPlayerToGroup, removePlayerFromGroup],
  );

  const handleRef = (player) => {
    setPlayer(player);
    if (typeof withPlayer === 'function') {
      withPlayer(player);
    }
  };

  const handlePlay = (...params) => {
    onPlayerPlay(playerId);
    if (typeof onPlay === 'function') {
      onPlay(...params);
    }
  };

  let newProps = {
    withPlayer: handleRef,
    onPlay: handlePlay,
  };

  if (typeof transformNewProps === 'function') {
    newProps = transformNewProps(newProps);
  }

  return <Comp {...originalProps} {...newProps} />;
};
