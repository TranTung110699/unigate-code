import React from 'react';
import ResponsiveReactPlayer from 'components/common/enhanced-react-player/responsive';
import { getTimeInSeconds } from 'common/utils/Date';
import { configs } from 'configs/constants';
import { makeMediaGroupMember } from 'components/common/enhanced-react-player/media-group';

const defaultYoutubeConfig = {
  playerVars: {
    // https://developers.google.com/youtube/player_parameters
    rel: 0,
  },
};

const defaultVimeoConfig = {
  playerOptions: {},
};

const defaultFileConfig = {
  attributes: {},
};

const getConfigForYouTube = ({ startTime, endTime }) => {
  let { playerVars } = defaultYoutubeConfig;
  playerVars = Object.assign(
    {},
    playerVars,
    startTime ? { start: getTimeInSeconds(startTime) } : {},
    endTime ? { end: getTimeInSeconds(endTime) } : {},
  );

  return Object.assign({}, defaultYoutubeConfig, { playerVars });
};

const getConfigForVimeo = () => {
  let { playerOptions } = defaultVimeoConfig;
  playerOptions = Object.assign({}, playerOptions);

  return Object.assign({}, defaultVimeoConfig, { playerOptions });
};

const getConfigForFile = () => {
  let { attributes } = defaultFileConfig;
  attributes = Object.assign({}, attributes);

  return Object.assign({}, defaultFileConfig, { attributes });
};

let Video = ({
  autoPlay,
  className,
  controls,
  endTime,
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
  responsive,
  startTime,
  style,
  url,
  vimeoId,
  volume,
  width,
  withPlayer,
  wrapper,
  youTubeId,
  hlsUrl,
}) => {
  startTime = getTimeInSeconds(startTime) || 0;
  endTime = getTimeInSeconds(endTime);

  const [player, setPlayer] = React.useState();

  const configForYouTube = getConfigForYouTube({ startTime, endTime });
  const configForVimeo = getConfigForVimeo();
  const configForFile = getConfigForFile();

  if (vimeoId) {
    url = `${configs.VIMEO_URL}/${vimeoId}`;
  } else if (youTubeId) {
    url = `${configs.YOUTUBE_URL}/watch?v=${youTubeId}`;
  } else if (url) {
    if (!url.startsWith('http') && !url.startsWith('https')) {
      url = `${window.APP_AUDIO_MEDIA_SERVER_URL}/${url}`;
      if (!url.endsWith('.mp3')) {
        url = `${url}.mp3`;
      }
    }
  }

  // if play outside of boundary (start time to end time)
  const handleProgressIfOutOfBoundary = React.useCallback(
    (progress) => {
      const { playedSeconds } = progress;
      if (player) {
        if (startTime && playedSeconds < startTime) {
          player.seekTo(startTime);
        }

        if (endTime && playedSeconds >= endTime) {
          player.pause();
          player.seekTo(startTime);
          if (typeof onEnded === 'function') {
            onEnded();
          }
        }
      }
    },
    [player, endTime, onEnded, startTime],
  );

  const handleProgress = React.useCallback(
    (progress) => {
      handleProgressIfOutOfBoundary(progress);

      if (typeof onProgress === 'function') {
        onProgress(progress);
      }
    },
    [onProgress, handleProgressIfOutOfBoundary],
  );

  return (
    <ResponsiveReactPlayer
      className={className}
      config={{
        youtube: configForYouTube,
        vimeo: configForVimeo,
        file: configForFile,
      }}
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
      onPause={onPause}
      onPlay={onPlay}
      onProgress={handleProgress}
      onReady={onReady}
      onSeek={onSeek}
      onStart={onStart}
      pip={pip}
      playbackRate={playbackRate}
      playsinline={playsinline}
      progressInterval={progressInterval}
      responsive={responsive}
      style={style}
      url={url}
      volume={volume}
      width={width}
      withPlayer={(player) => {
        setPlayer(player);
        if (typeof withPlayer === 'function') {
          withPlayer(player);
        }
      }}
      wrapper={wrapper}
      autoPlay={autoPlay}
      hlsUrl={hlsUrl}
    />
  );
};

export default makeMediaGroupMember()(Video);
