import React from 'react';
import MediaPlayer from 'components/common/media-player/video';
import Question from 'components/common/forms/questions';
import {
  templateTypes,
  videoTypes,
} from 'components/admin/question/schema/question-types';
import { getMediaPlayerId } from 'components/common/media-player/common';

import Flashcard from '../flashcard/index';
import Speaking from '../Speaking/Speaking';

const generateVideo = (question) => {
  let youTubeId;
  let vimeoId;
  if (question.videoType === videoTypes.VIMEO) {
    vimeoId = question.videoId;
  } else {
    youTubeId = question.videoId;
  }

  return (
    <MediaPlayer
      autoPlay
      className="learn-content"
      controls
      playerId={getMediaPlayerId(question.iid)}
      playing
      youTubeId={youTubeId}
      vimeoId={vimeoId}
    />
  );
};

export const getComponent = (
  question,
  handleCheckAnswerFinish,
  onCheckAnswer,
  answer,
  shouldShowAnswerWhenHasResult,
) => {
  switch (question.vocabTemplateType) {
    case templateTypes.MC: {
      return (
        <Question
          key={question.iid}
          name="mc"
          mode="exam"
          iid={question.iid}
          onCheckAnswerFinish={(take) =>
            handleCheckAnswerFinish(question.iid, take)
          }
          shouldShowAnswerWhenHasResult={shouldShowAnswerWhenHasResult}
          defaultAnswers={answer}
        />
      );
    }
    case templateTypes.INPUT: {
      return (
        <Question
          key={question.iid}
          name="inline"
          mode="exam"
          onCheckAnswer={() => onCheckAnswer()}
          iid={question.iid}
          onCheckAnswerFinish={(take) =>
            handleCheckAnswerFinish(question.iid, take)
          }
          shouldShowAnswerWhenHasResult={shouldShowAnswerWhenHasResult}
          defaultAnswers={answer}
        />
      );
    }
    case templateTypes.FLASHCARD: {
      return <Flashcard iid={question.vid} />;
    }
    case templateTypes.SPEAK_GOOGLE: {
      return <Speaking iid={question.iid} vid={question.vid} />;
    }
    case templateTypes.VIDEO: {
      return generateVideo(question);
    }
    default:
      return <div>Question vocabTemplateType not found</div>;
  }
};
