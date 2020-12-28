import React from 'react';
import Overlay from 'components/common/overlay';
import {
  checkIfMustAnswerLectureQuestionsCorrectly,
  getQuestionPreviousSegmentStartTime,
  getQuestionsInTimeFrame,
} from 'components/learn/items/lecture/media-lecture/common/questions';
import { last } from 'common/utils/Array';
import QuestionAnswer from './QuestionAnswer';

import './withQuestions.scss';

const withQuestions = () => (MediaLecture) => (props) => {
  const {
    node,
    onSeek,
    onProgress,
    withPlayer,
    ignoreQuestions,
    canSkipQuestion,
    onQuestion,
    onQuestionFinish,
  } = props;

  const playerRef = React.useRef();
  const getPlayer = () => playerRef.current;
  const setPlayer = (player) => {
    playerRef.current = player;
  };

  const [trackingTime, setTrackingTime] = React.useState();
  const [questionToDo, setQuestionToDo] = React.useState();

  const handleMoveToSeconds = React.useCallback(
    (seconds) => {
      if (
        canSkipQuestion &&
        seconds - trackingTime > 2
        // user make a long jump in video/audio (not play it normally)
      ) {
        // not stop video/audio to show question
      } else {
        // stop video to show question
        const question = last(
          getQuestionsInTimeFrame(node, trackingTime, seconds, {
            sortByTime: true,
            startTimeExclusive: true,
          }),
        );

        if (question) {
          const player = getPlayer();
          if (player) {
            player.pause();
            player.seekTo(+question.time + 0.01);
          }
          setQuestionToDo(question);
          if (typeof onQuestion === 'function') {
            onQuestion();
          }
        }
      }

      setTrackingTime(seconds);
    },
    [node, trackingTime, canSkipQuestion, onQuestion],
  );

  const handleProgress = React.useCallback(
    (progress) => {
      const { playedSeconds } = progress;
      handleMoveToSeconds(playedSeconds);

      if (typeof onProgress === 'function') {
        onProgress(progress);
      }
    },
    [onProgress, handleMoveToSeconds],
  );

  const handleSeek = React.useCallback(
    (seconds) => {
      handleMoveToSeconds(seconds);

      if (typeof onSeek === 'function') {
        onSeek(seconds);
      }
    },
    [onSeek, handleMoveToSeconds],
  );

  const handleFinishQuetion = React.useCallback(
    () => {
      setQuestionToDo(undefined);
      if (typeof onQuestionFinish === 'function') {
        onQuestionFinish();
      }
      const player = getPlayer();
      if (player) {
        player.play();
      }
    },
    [onQuestionFinish],
  );

  /**
   * A segment is the video segment between
   *    - two questions
   *    - or from beginning of video to a question
   *    - or from  question -> end of video
   *
   * @param node
   * @param currentQuestion
   */
  const rewatchSegment = React.useCallback((node, currentQuestion) => {
    const ts = getQuestionPreviousSegmentStartTime(node, currentQuestion);

    const player = getPlayer();
    if (player) {
      player.seekTo(ts ? ts + 0.01 : 0);
      player.play();
    }
    setQuestionToDo(undefined);
  }, []);

  const cssClass = 'media-lecture-with-question';
  const newProps = ignoreQuestions
    ? {
        // nothing change
      }
    : {
        onSeek: handleSeek,
        onProgress: handleProgress,
        withPlayer: (player) => {
          setPlayer(player);
          if (typeof withPlayer === 'function') {
            withPlayer(player);
          }
        },
      };

  return (
    <Overlay
      overlayContent={
        questionToDo ? (
          <QuestionAnswer
            canSkipQuestion={canSkipQuestion}
            className={`${cssClass}__overlay`}
            question={questionToDo}
            onFinish={handleFinishQuetion}
            mustAnswerQuestionCorrectly={checkIfMustAnswerLectureQuestionsCorrectly(
              node,
            )}
            onRewatch={() => {
              rewatchSegment(node, questionToDo);
            }}
            node={node}
          />
        ) : null
      }
    >
      <MediaLecture {...props} {...newProps} />
    </Overlay>
  );
};

export default withQuestions;
