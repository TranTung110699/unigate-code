import React from 'react';
import fetchData from 'components/common/fetchData';
import apiUrls from 'api-endpoints';
import questionApiUrls from 'components/admin/question/endpoints';
import lodashGet from 'lodash.get';
import VideoThumbnail from 'components/admin/video/common/VideoThumbnail';
import './QuestionLearningSuggestion.scss';
import { t1 } from 'translate';
import DetailOnDialog from 'components/common/detail-on-dialog';
import MediaLectureDisplay from 'components/learn/items/lecture/media-lecture/display';

const VideoThumbnailWithInfo = ({ className, video, onClick }) => {
  const videoName = lodashGet(video, 'name');
  const cssClass = 'video-thumbnail-with-info';

  return (
    <div className={`${className} ${cssClass}`} onClick={onClick}>
      <div className={`${cssClass}__container`}>
        <VideoThumbnail
          className={`${cssClass}__thumbnail`}
          video={video}
          alt={videoName}
        />
        <span className={`${cssClass}__title`}>{videoName}</span>
      </div>
    </div>
  );
};

const Video = ({ className, video }) => {
  const renderPreview = React.useCallback(
    ({ showFull }) => {
      return (
        <VideoThumbnailWithInfo
          className={className}
          video={video}
          onClick={() => showFull()}
        />
      );
    },
    [video, className],
  );

  const renderFull = React.useCallback(
    () => {
      return (
        <MediaLectureDisplay
          type="video"
          node={video}
          autoPlay
          responsive
          controls
        />
      );
    },
    [video],
  );

  return (
    <DetailOnDialog
      dialogKey={'video-suggestion'}
      renderPreview={renderPreview}
      renderFull={renderFull}
    />
  );
};

const VideoSuggestions = ({ title, className, videos }) => {
  const cssClass = 'question-learning-video-suggestions';

  if (!Array.isArray(videos) || videos.length === 0) {
    return null;
  }

  return (
    <div className={`${className} ${cssClass}`}>
      <div className={`${cssClass}__title`}>{title}</div>
      <div className={`${cssClass}__video-list`}>
        {videos.map((v, index, arr) => {
          return (
            <Video
              key={lodashGet(v, 'id')}
              className={`
                ${cssClass}__video
                ${index === 0 ? `${cssClass}__video--first` : ''}
                ${index === arr.length - 1 ? `${cssClass}__video--last` : ''}
                `}
              video={v}
            />
          );
        })}
      </div>
    </div>
  );
};

const QuestionSkillLearningSuggestion = ({
  className,
  suggestionsOfSkills,
}) => {
  const cssClass = 'question-skill-learning-suggestion';

  const skillNames = (suggestionsOfSkills || [])
    .map((sk) => lodashGet(sk, 'name'))
    .filter(Boolean)
    .join(', ');

  const videos = (suggestionsOfSkills || [])
    .map((sk) => lodashGet(sk, 'videos'))
    .filter(Boolean)
    .flat();

  if (!Array.isArray(videos) || videos.length === 0) {
    return null;
  }

  return (
    <div className={`${cssClass} ${className}`}>
      <div className={`${cssClass}__title`}>
        {t1('suggestions_for_learning_skills_%s', [skillNames])}
      </div>

      {/*TODO: handleDifferent type of suggestions (not just video)*/}

      <VideoSuggestions
        className={`${cssClass}__video-suggestions`}
        videos={videos}
      />
    </div>
  );
};

export default fetchData(({ question }) => {
  return {
    baseUrl: questionApiUrls.get_questions_skill_learning_suggestions,
    params: {
      question_iid: lodashGet(question, 'iid'),
    },
    propKey: 'suggestionsOfSkills',
  };
})(QuestionSkillLearningSuggestion);
