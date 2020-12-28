import React from 'react';
import Video from 'components/common/media-player/video';
import Audio from 'components/common/media-player/audio';
import { getAttachment } from 'components/learn/items/lecture/common';
import lodashGet from 'lodash.get';
import withQuestions from './withQuestions';
import withDefaultVideoProviderConfig from 'components/admin/video/common/withDefaultVideoProviderConfig';
import getActualVideoToPlay from 'components/admin/video/common/getActualVideoToPlay';

const Player = ({
  className,
  type,
  youtubeId,
  vimeoId,
  startTime,
  endTime,
  playerId,
  audioUrl,
  url,
  onStart,
  onProgress,
  onDuration,
  onEnded,
  autoPlay,
  responsive,
  withPlayer,
  onSeek,
  controls,
  progressInterval,
  onPlay,
  onPause,
  hlsUrl,
}) => {
  const handlerProps = {
    onStart,
    onProgress,
    onDuration,
    onEnded,
    autoPlay,
    className,
    startTime,
    endTime,
    responsive,
    withPlayer,
    onSeek,
    controls,
    progressInterval,
    onPlay,
    onPause,
  };

  if (type === 'video' && (youtubeId || vimeoId || url || hlsUrl)) {
    return (
      <Video
        key={playerId}
        playerId={playerId}
        youTubeId={youtubeId}
        vimeoId={vimeoId}
        url={url}
        hlsUrl={hlsUrl}
        {...handlerProps}
      />
    );
  }

  if (type === 'audio' && audioUrl) {
    return <Audio src={audioUrl} {...handlerProps} />;
  }

  return null;
};

const getVideoState = ({ node, defaultVideoProvider }) => {
  const videoToPlayInfo = getActualVideoToPlay({
    video: node,
    defaultVideoProvider,
  });

  if (!videoToPlayInfo) {
    return null;
  }

  const {
    youtubeId,
    vimeoId,
    url,
    startTime,
    endTime,
    hlsUrl,
  } = videoToPlayInfo;

  return {
    youtubeId,
    vimeoId,
    url,
    startTime,
    endTime,
    hlsUrl,
  };
};

const getAudioState = ({ node }) => {
  const attachment = getAttachment(node);

  return {
    audioUrl: lodashGet(attachment, 'link'),
    startTime: 0,
  };
};

const getMediaState = ({ type, node, defaultVideoProvider }) => {
  if (type === 'video') {
    return getVideoState({ node, defaultVideoProvider });
  } else if (type === 'audio') {
    return getAudioState({ node });
  }
  return null;
};

const MediaLectureDisplay = ({
  className,
  type,
  node,
  playerId,
  defaultVideoProvider,
  onStart,
  onProgress,
  onDuration,
  onEnded,
  handleMediaTime,
  autoPlay,
  responsive,
  withPlayer,
  onSeek,
  controls,
  progressInterval,
  onPlay,
  onPause,
}) => {
  const { youtubeId, vimeoId, startTime, endTime, audioUrl, url, hlsUrl } =
    getMediaState({ type, node, defaultVideoProvider }) || {};

  const handleMediaPlayerDuration = React.useCallback(
    (duration) => {
      let realEndTime = endTime;
      if (duration && (!endTime || duration < endTime)) {
        realEndTime = duration;
      }

      if (typeof handleMediaTime === 'function') {
        handleMediaTime(startTime, realEndTime);
      }

      if (typeof onDuration === 'function') {
        onDuration(duration);
      }
    },
    [onDuration, handleMediaTime, startTime, endTime],
  );

  return (
    <Player
      className={className}
      playerId={playerId}
      type={type}
      youtubeId={youtubeId}
      vimeoId={vimeoId}
      startTime={startTime}
      endTime={endTime}
      audioUrl={audioUrl}
      url={url}
      onStart={onStart}
      onProgress={onProgress}
      onDuration={handleMediaPlayerDuration}
      onEnded={onEnded}
      autoPlay={autoPlay}
      responsive={responsive}
      withPlayer={withPlayer}
      onSeek={onSeek}
      controls={controls}
      progressInterval={progressInterval}
      onPlay={onPlay}
      onPause={onPause}
      hlsUrl={hlsUrl}
    />
  );
};

const MediaLectureDisplayWithQuestions = withQuestions()(MediaLectureDisplay);

const MediaLectureDisplayWithValueFromConfig = withDefaultVideoProviderConfig(
  {},
)(MediaLectureDisplayWithQuestions);

export default MediaLectureDisplayWithValueFromConfig;
