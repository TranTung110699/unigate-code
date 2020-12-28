import React from 'react';
import ReactPlayer from 'react-player';
import { getFileExtension } from 'common/utils/File';
import './style.scss';
import get from 'lodash/get';

/**
 * play an react-player instance https://github.com/CookPete/react-player
 * (the thing you get when pass ref to ReactPlayer component)
 * @param player
 */
const playReactPlayerInstance = (player) => {
  if (!player) {
    return;
  }

  const internalPlayer = player.getInternalPlayer();
  if (!internalPlayer) {
    // player is not ready
    return;
  }

  const possibleMethods = [
    // for file, vimeo
    'play',
    // for youtube
    'playVideo',
    // TODO: add more method for other types
  ];
  for (let method of possibleMethods) {
    if (typeof internalPlayer[method] === 'function') {
      internalPlayer[method]();
      return;
    }
  }
};

/**
 * pause an react-player instance https://github.com/CookPete/react-player
 * (the thing you get when pass ref to ReactPlayer component)
 * @param player
 */
const pauseReactPlayerInstance = (player) => {
  if (!player) {
    return;
  }

  const internalPlayer = player.getInternalPlayer();
  if (!internalPlayer) {
    // player is not ready
    return;
  }

  const possibleMethods = [
    // for file, vimeo
    'pause',
    // for youtube
    'pauseVideo',
    // TODO: add more method for other types
  ];
  for (let method of possibleMethods) {
    if (typeof internalPlayer[method] === 'function') {
      internalPlayer[method]();
      return;
    }
  }
};

/**
 * seek to a specific time of an react-player instance https://github.com/CookPete/react-player
 * (the thing you get when pass ref to ReactPlayer component)
 * @param player
 * @param time
 */
const seekReactPlayerInstance = (player, time) => {
  if (!player) {
    return;
  }

  const internalPlayer = player.getInternalPlayer();
  if (!internalPlayer) {
    // player is not ready
    return;
  }

  const possibleMethods = [
    // for youtube
    'seekTo',
    // vimeo
    'setCurrentTime',
    // TODO: add more method for other types
  ];
  for (let method of possibleMethods) {
    if (typeof internalPlayer[method] === 'function') {
      internalPlayer[method](time);
      return;
    }
  }

  if (typeof internalPlayer.currentTime !== 'undefined') {
    // for html5 default video/audio player
    internalPlayer.currentTime = time;
  }
};

const shouldPlayHlsVideo = (hlsUrl) => {
  return !!hlsUrl && window.hls && getFileExtension(hlsUrl) === 'm3u8';
};

/**
 * This component is a wrapper around react-player https://github.com/CookPete/react-player to make its more usable
 *
 * User can use this component just like they use react-player except:
 *  - We create our custom mechanism for playing and pausing video instead of using props "playing" of react-player
 *    because in react-player video/audio can still be paused when playing === true
 *    (if user click on the embedded video player's play button (youtube, vimeo, ...))
 *
 *    so we remove this prop and add some new methods to the the player instance of react-player (the thing you get when pass ref to ReactPlayer component)
 *      + play()
 *      + pause()
 *
 *  - the player will re-render every time a prop change (as it should be)
 *    (for some reasons react-player component will not re-render when only its functional props change,
 *    may be to optimize performance but it breaks component logic)
 *
 *  - there is a new prop "autoPlay" to auto play video/audio on load
 */
const EnhancedReactPlayer = React.forwardRef(
  (
    {
      className,
      config,
      controls,
      height,
      light,
      loop,
      muted,
      onBuffer,
      onBufferEnd,
      onDisablePIP,
      onDuration,
      onEnablePIP,
      onEnded,
      onError,
      onPause,
      onPlay,
      onProgress,
      onReady,
      onSeek,
      onStart,
      pip,
      playbackRate,
      playsinline,
      progressInterval,
      style,
      url,
      volume,
      width,
      wrapper,
      autoPlay,
      hlsUrl,
    },
    ref,
  ) => {
    const playerRef = React.useRef();
    const didAutoPlayByPlayerRef = React.useRef(new Map());
    // a map from player to a boolean value represent whether or not it auto played

    const getCurrentPlayer = () => playerRef.current;
    const setCurrentPlayer = (player) => {
      playerRef.current = player;
    };

    const checkIfPlayerDidAutoPlay = (player) =>
      Boolean(didAutoPlayByPlayerRef.current.get(player));
    const markPlayerAsDidAutoPlay = (player) =>
      didAutoPlayByPlayerRef.current.set(player, true);

    const getEnhancedReactPlayerInstance = React.useCallback((player) => {
      if (player) {
        player.play = () => {
          playReactPlayerInstance(player);
        };
        player.pause = () => {
          pauseReactPlayerInstance(player);
        };
        player.seekTo = (time) => {
          seekReactPlayerInstance(player, time);
        };
      }
      return player;
    }, []);

    const handleReady = React.useCallback(
      (...params) => {
        const player = getCurrentPlayer();

        if (autoPlay && !checkIfPlayerDidAutoPlay(player)) {
          playReactPlayerInstance(player);
          markPlayerAsDidAutoPlay(player);
        }

        if (typeof onReady === 'function') {
          onReady(...params);
        }
      },
      [onReady, autoPlay],
    );

    const handleStart = React.useCallback(
      () => {
        /**
         * the duration value that youtube return before video playing is rounded
         * so we need to call onDuration again with the correct value
         */
        if (typeof onDuration === 'function') {
          const player = getCurrentPlayer();
          if (player) {
            const duration = player.getDuration();
            onDuration(duration);
          }
        }

        if (typeof onStart === 'function') {
          onStart();
        }
      },
      [onStart, onDuration],
    );

    /*
     * this variable will be passed to react-player so that it will re-render when any functional prop change
     * see the comment at the top of this component to understand why need this variable
     */
    const forceUpdateValue = React.useMemo(
      () => {
        return Math.random();
      },
      /*
       * if in the future you want to add new functional prop, please add it to the following array
       * or prepare for a bug :)
       */
      //eslint-disable-next-line react-hooks/exhaustive-deps
      [
        onPlay,
        onPause,
        onBuffer,
        onBufferEnd,
        onDisablePIP,
        onDuration,
        onEnablePIP,
        onEnded,
        onError,
        onProgress,
        onReady,
        onSeek,
        onStart,
      ],
    );

    React.useEffect(
      () => {
        if (shouldPlayHlsVideo(hlsUrl)) {
          try {
            window.hls.audioTrack = 0;
            window.hls.mediaElm = document.getElementById('video-player');
            window.hls.loadSource(hlsUrl, {
              method: 'sigma',
            });
          } catch (e) {
            throw e;
          }
        }
      },
      [hlsUrl],
    );

    if (shouldPlayHlsVideo(hlsUrl)) {
      return (
        <video
          className={className}
          onPlay={onPlay}
          onPause={onPause}
          ref={(player) => {
            setCurrentPlayer(player);
            if (typeof ref === 'function') {
              ref(getEnhancedReactPlayerInstance(player));
            }
          }}
          controls={controls}
          height={height}
          loop={loop}
          muted={muted}
          onEnded={() => onEnded(100)}
          onError={onError}
          onProgress={(e) => {
            onProgress({
              playedSeconds: get(e, 'target.currentTime'),
            });
          }}
          onStart={handleStart}
          playsinline={playsinline}
          style={style}
          width={width}
          id="video-player"
          autoPlay
        />
      );
    }

    return (
      <ReactPlayer
        forceUpdateValue={forceUpdateValue}
        /* see the comment where we define this variable to understand why we need this prop*/

        playing={undefined}
        /* see the comment at the top of this component for more information*/

        className={className}
        onPlay={onPlay}
        onPause={onPause}
        ref={(player) => {
          setCurrentPlayer(player);
          if (typeof ref === 'function') {
            ref(getEnhancedReactPlayerInstance(player));
          }
        }}
        config={config}
        controls={controls}
        height={height}
        light={light}
        loop={loop}
        muted={muted}
        onBuffer={onBuffer}
        onBufferEnd={onBufferEnd}
        onDisablePIP={onDisablePIP}
        onDuration={onDuration}
        onEnablePIP={onEnablePIP}
        onEnded={onEnded}
        onError={onError}
        onProgress={onProgress}
        onReady={handleReady}
        onSeek={onSeek}
        onStart={handleStart}
        pip={pip}
        playbackRate={playbackRate}
        playsinline={playsinline}
        progressInterval={progressInterval || 500}
        style={style}
        url={url}
        volume={volume}
        width={width}
        wrapper={wrapper}
      />
    );
  },
);

export default EnhancedReactPlayer;
