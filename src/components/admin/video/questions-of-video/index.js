import React from 'react';
import { connect } from 'react-redux';
import MediaLectureDisplay from 'components/learn/items/lecture/media-lecture/display';
import lodashGet from 'lodash.get';
import DetailOnDialog from 'components/common/detail-on-dialog';
import NodeNew from 'components/admin/node/new';
import questionSchema from 'components/admin/question/schema/form';
import { UsedFor } from 'configs/constants';
import sagaActions from 'actions/node/saga-creators';
import { pushToSet, removeAtIndex } from 'common/utils/Array';
import apiUrls from 'api-endpoints';
import { set } from 'common/utils/object';
import { t1 } from 'translate';
import Table from 'antd/lib/table';
import { secondsToTimeString } from 'common/utils/Date';
import Icon from 'components/common/Icon';
import Tooltip from 'antd/lib/tooltip';
import Warning from 'components/common/Warning';
import Popover from 'antd/lib/popover';
import ActionBtnWithConfirmDialog from 'components/common/action-button/ActionBtnWithConfirmDialog';
import Button from 'antd/lib/button';
import { getQuestions } from 'components/learn/items/lecture/media-lecture/common/questions';
import Control from 'components/common/media-player/common/display/control';
import { videoIsPlayable } from '../utils';
import {
  QuestionAnswer,
  QuestionContent,
  QuestionDifficultyLevel,
  QuestionType,
} from 'components/common/question/QuestionsPreview';
import './stylesheet.scss';
import UpdateBtnWithConfirmDialog from 'components/common/action-button/UpdateBtnWithConfirmDialog';
import Switch from 'schema-form/elements/toggle';
import { getNode } from 'components/admin/node/utils';
import { createSelector } from 'reselect';

const CannotContinueLearningIfAnswerQuestionIncorrectlySwitch = ({ node }) => {
  const cannotContinueLearningIfAnswerQuestionIncorrectly = lodashGet(
    node,
    'cannot_continue_learning_if_answer_question_incorrectly',
  );

  return (
    <UpdateBtnWithConfirmDialog
      renderComponent={({ onClick }) => {
        return (
          <div className="white-box border-round">
            <Switch
              onChange={onClick}
              toggled={cannotContinueLearningIfAnswerQuestionIncorrectly}
              label={t1(
                'user_must_answer_questions_in_item_correctly_if_they_want_to_continue_learning',
              )}
            />
          </div>
        );
      }}
      noConfirm
      step={'cannot_continue_learning_if_answer_question_incorrectly'}
      data={{
        cannot_continue_learning_if_answer_question_incorrectly: cannotContinueLearningIfAnswerQuestionIncorrectly
          ? 0
          : 1,
        id: lodashGet(node, 'id'),
        iid: lodashGet(node, 'iid'),
        ntype: 'video',
      }}
    />
  );
};

const UpsertQuestionButton = ({
  renderButton,
  onSuccess,
  mode,
  question,
  title,
}) => {
  const renderPreview = React.useCallback(
    ({ showFull }) => renderButton({ onClick: showFull }),
    [renderButton],
  );

  const renderFull = React.useCallback(
    ({ closeDialog }) => {
      const handleRequestSuccessful = (post) => {
        onSuccess(lodashGet(post, 'result'));
        closeDialog();
      };

      return (
        <NodeNew
          mode={mode}
          node={question}
          ntype="question"
          formid={`${mode}_question_of_video_${lodashGet(question, 'iid')}`}
          schema={questionSchema}
          hiddenFields={{
            used_for: [UsedFor.VIDEO],
          }}
          requestSuccessful={handleRequestSuccessful}
        />
      );
    },
    [onSuccess, mode, question],
  );

  const dialogOptionsProperties = {
    handleClose: true,

    title:
      title || (mode === 'new' ? t1('add_new_question') : t1('edit_question')),
    modal: true,
  };

  return (
    <DetailOnDialog
      dialogKey={'questions_of_video'}
      renderPreview={renderPreview}
      renderFull={renderFull}
      dialogOptionsProperties={dialogOptionsProperties}
    />
  );
};

const QuestionList = ({
  node,
  onEditQuestion,
  onRemoveQuestion,
  startTime,
  endTime,
  trackingTime,
}) => {
  const cssClass = 'questions-of-video-table';

  const sortedQuestions = getQuestions(node, {
    sortByTime: true,
  });

  const columns = [
    {
      title: t1('time'),
      key: 'type',
      dataIndex: 'time',
      render: (time) => {
        const offset = time - startTime;
        return <div>{offset && secondsToTimeString(offset)}</div>;
      },
    },
    {
      title: t1('type'),
      key: 'type',
      render: (row) => {
        return <QuestionType item={row} />;
      },
    },
    {
      title: t1('content'),
      key: 'content',
      render: (row) => {
        return <QuestionContent item={row} />;
      },
    },
    {
      title: t1('answer'),
      key: 'answer',
      render: (row) => {
        return <QuestionAnswer item={row} />;
      },
    },
    {
      title: t1('difficulty_level'),
      key: 'difficulty_level',
      render: (row) => {
        return <QuestionDifficultyLevel item={row} />;
      },
    },
    {
      title: t1('action'),
      key: 'action',
      render: (row) => {
        return (
          <React.Fragment>
            <UpsertQuestionButton
              mode="edit"
              question={row}
              renderButton={({ onClick }) => (
                <Tooltip title={t1('view_and_edit')}>
                  <a href="#" onClick={onClick}>
                    <Icon icon="edit" />
                  </a>
                </Tooltip>
              )}
              onSuccess={(updatedQuestion) =>
                onEditQuestion(updatedQuestion, lodashGet(row, 'originalIndex'))
              }
            />
            <ActionBtnWithConfirmDialog
              renderComponent={({ onClick }) => (
                <Tooltip title={t1('remove')}>
                  <a href="#" onClick={onClick}>
                    <Icon icon="delete" />
                  </a>
                </Tooltip>
              )}
              textConfirm={t1('do_you_want_to_remove_this_question?')}
              actionHandler={(onRequestSuccessful) => {
                onRemoveQuestion(lodashGet(row, 'originalIndex'));
                onRequestSuccessful();
              }}
            />
          </React.Fragment>
        );
      },
    },
  ];

  return (
    <Table
      className={cssClass}
      dataSource={sortedQuestions}
      columns={columns}
      pagination={false}
      bordered
      size="middle"
    />
  );
};

const TrackingBarWithQuestions = ({
  node,
  className,
  startTime,
  endTime,
  trackingTime,
  onCreateNewQuestion,
  onEditQuestion,
  onPositionChange,
  onPlayButtonClick,
  isPlaying,
  disabled,
  onNewQuestionButtonClick,
  onEditQuestionButtonClick,
}) => {
  const cssClass = 'questions-of-video-tracking-bar';

  const duration = endTime - startTime;
  const offset = trackingTime - startTime;
  const isOffsetValid = !isNaN(offset) && offset >= 0;

  return (
    <div className={`${className || ''} ${cssClass}`}>
      <div className={`${cssClass}__core`}>
        <Control
          disabled={disabled}
          isPlaying={isPlaying}
          onPlayButtonClick={onPlayButtonClick}
          onChangeTrackingPosition={onPositionChange}
          duration={duration}
          currentTime={isOffsetValid ? offset : 0}
          renderUnderTrackingHead={() =>
            isOffsetValid ? (
              <Popover
                overlayClassName={`${cssClass}__button-popover-overlay`}
                placement="bottom"
                content={
                  <div>
                    <UpsertQuestionButton
                      mode="new"
                      renderButton={({ onClick }) => (
                        <Button
                          onClick={(event) => {
                            onClick();
                            if (
                              typeof onNewQuestionButtonClick === 'function'
                            ) {
                              onNewQuestionButtonClick();
                            }
                            event.stopPropagation();
                            event.preventDefault();
                          }}
                          shape="circle"
                          icon="plus"
                          size="small"
                          disabled={
                            [startTime, endTime, trackingTime].some(
                              (v) => typeof v !== 'number',
                            ) ||
                            trackingTime < startTime ||
                            trackingTime > endTime
                          }
                        />
                      )}
                      title={t1('add_question_at_%s', [
                        secondsToTimeString(offset),
                      ])}
                      onSuccess={onCreateNewQuestion}
                    />
                    {offset >= 0 && <div>{secondsToTimeString(offset)}</div>}
                  </div>
                }
                visible
              />
            ) : null
          }
          marks={(getQuestions(node) || []).map((q, index) => {
            const questionOffset = lodashGet(q, 'time') - startTime;
            return Object.assign({}, q, {
              time: questionOffset,
              renderUnder: () => (
                <Popover
                  overlayClassName={`${cssClass}__button-popover-overlay`}
                  placement="bottom"
                  content={
                    <div>
                      <UpsertQuestionButton
                        mode="edit"
                        question={q}
                        renderButton={({ onClick }) => (
                          <Button
                            onClick={(event) => {
                              onClick();
                              if (
                                typeof onEditQuestionButtonClick === 'function'
                              ) {
                                onEditQuestionButtonClick(q);
                              }
                              event.stopPropagation();
                              event.preventDefault();
                            }}
                            shape="circle"
                            icon="edit"
                            size="small"
                          />
                        )}
                        onSuccess={(question) =>
                          onEditQuestion(question, index)
                        }
                      />
                      {questionOffset >= 0 && (
                        <div>{secondsToTimeString(questionOffset)}</div>
                      )}
                    </div>
                  }
                  visible
                />
              ),
            });
          })}
        />
      </div>
    </div>
  );
};

const Core = ({
  node,
  onCreateNewQuestion,
  onEditQuestion,
  onRemoveQuestion,
}) => {
  const playerRef = React.useRef();
  const getPlayer = () => playerRef.current;
  const setPlayer = (player) => {
    playerRef.current = player;
  };

  const [isMediaPlaying, setIsMediaPlaying] = React.useState();
  const [isDoingQuestion, setIsDoingQuestion] = React.useState();
  const [{ startTime, endTime }, setMediaTime] = React.useState({});
  const [trackingTime, setTrackingTime] = React.useState();

  const isTrackingBarDisabled = isDoingQuestion;

  const handleMediaTime = (startTime, endTime) => {
    setMediaTime({ startTime, endTime });
  };

  const handleProgress = ({ played, playedSeconds }) => {
    setTrackingTime(playedSeconds);
  };

  const handlePlay = React.useCallback(() => {
    setIsMediaPlaying(true);
  }, []);

  const handlePause = React.useCallback(() => {
    setIsMediaPlaying(false);
  }, []);

  const handleTrackingBarPositionChange = (newOffset) => {
    if (isTrackingBarDisabled) {
      return;
    }

    const player = getPlayer();
    if (player) {
      const newTrackingTime = startTime + newOffset;
      player.seekTo(newTrackingTime);
      setTrackingTime(newTrackingTime);
    }
  };

  const handlePlayButtonClick = React.useCallback(
    () => {
      if (isTrackingBarDisabled) {
        return;
      }

      const player = getPlayer();
      if (isMediaPlaying) {
        player && player.pause();
      } else {
        player && player.play();
      }
    },
    [isMediaPlaying, isTrackingBarDisabled],
  );

  const handleCreateNewQuestion = (question) => {
    if (typeof onCreateNewQuestion === 'function') {
      onCreateNewQuestion(question, trackingTime);
    }
  };

  const handleEditQuestion = (question, index) => {
    if (typeof onEditQuestion === 'function') {
      onEditQuestion(question, index);
    }
  };

  const handleRemoveQuestion = (index) => {
    if (typeof onRemoveQuestion === 'function') {
      onRemoveQuestion(index);
    }
  };

  const handleQuestion = React.useCallback(() => {
    setIsDoingQuestion(true);
  }, []);

  const handleQuestionFinish = React.useCallback(() => {
    setIsDoingQuestion(false);
  }, []);

  const handleNewQuestionButtonClick = React.useCallback(() => {
    const player = getPlayer();
    if (player) {
      player.pause();
    }
  }, []);

  const handleEditQuestionButtonClick = handleNewQuestionButtonClick;

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-6">
          <MediaLectureDisplay
            canSkipQuestion
            responsive
            autoPlay={false}
            type={lodashGet(node, 'type')}
            node={node}
            onStart={undefined}
            onProgress={handleProgress}
            onDuration={undefined}
            onEnded={undefined}
            handleMediaTime={handleMediaTime}
            withPlayer={(player) => {
              setPlayer(player);
            }}
            onPlay={handlePlay}
            onPause={handlePause}
            onQuestion={handleQuestion}
            onQuestionFinish={handleQuestionFinish}
          />
          <div className="p-t-30 p-b-30">
            <TrackingBarWithQuestions
              disabled={isTrackingBarDisabled}
              node={node}
              startTime={startTime}
              endTime={endTime}
              trackingTime={trackingTime}
              onCreateNewQuestion={handleCreateNewQuestion}
              onEditQuestion={handleEditQuestion}
              onPositionChange={handleTrackingBarPositionChange}
              onPlayButtonClick={handlePlayButtonClick}
              isPlaying={isMediaPlaying}
              onNewQuestionButtonClick={handleNewQuestionButtonClick}
              onEditQuestionButtonClick={handleEditQuestionButtonClick}
            />
          </div>
        </div>
        <div className="col-md-6">
          <QuestionList
            node={node}
            startTime={startTime}
            endTime={endTime}
            trackingTime={trackingTime}
            onEditQuestion={handleEditQuestion}
            onRemoveQuestion={handleRemoveQuestion}
          />
        </div>
      </div>
    </div>
  );
};

const QuestionsOfVideo = ({
  node,
  addQuestionToVideo,
  editQuestionOfVideo,
  removeQuestionOfVideo,
}) => {
  const handleCreateNewQuestion = (question, time) => {
    addQuestionToVideo(node, question, time);
  };

  const handleEditQuestion = (question, questionIndex) => {
    editQuestionOfVideo(node, question, questionIndex);
  };

  const handleRemoveQuestion = (questionIndex) => {
    removeQuestionOfVideo(node, questionIndex);
  };

  if (!videoIsPlayable(node)) {
    return <Warning>{t1('lecture_has_no_video_to_play')}</Warning>;
  }

  return (
    <React.Fragment>
      <Core
        node={node}
        onCreateNewQuestion={handleCreateNewQuestion}
        onEditQuestion={handleEditQuestion}
        onRemoveQuestion={handleRemoveQuestion}
      />
      <div className="p-t-50 p-l-15">
        <CannotContinueLearningIfAnswerQuestionIncorrectlySwitch node={node} />
      </div>
    </React.Fragment>
  );
};

const mapDispatchToProps = {
  addQuestionToVideo: (node, question, time) =>
    sagaActions.upsertNodeRequest({
      mode: 'edit',
      apiUrl: apiUrls.update_node('video', 'questions'),
      iid: lodashGet(node, 'iid'),
      ntype: lodashGet(node, 'ntype'),
      data: Object.assign({}, node, {
        questions: pushToSet(lodashGet(node, 'questions'), {
          ...question,
          time,
        }),
      }),
      requestSuccessful: () => {
        window.location.reload();
      },
    }),
  editQuestionOfVideo: (node, question, questionIndex) => {
    // update everything of question but its time in the video
    let updatedQuestion = lodashGet(node, ['questions', questionIndex]);
    updatedQuestion = Object.assign({}, updatedQuestion, question, {
      time: lodashGet(updatedQuestion, 'time'),
    });

    return sagaActions.upsertNodeRequest({
      mode: 'edit',
      apiUrl: apiUrls.update_node('video', 'questions'),
      iid: lodashGet(node, 'iid'),
      ntype: lodashGet(node, 'ntype'),
      data: set(node, ['questions', questionIndex], updatedQuestion),
      requestSuccessful: () => {
        window.location.reload();
      },
    });
  },
  removeQuestionOfVideo: (node, questionIndex) => {
    return sagaActions.upsertNodeRequest({
      mode: 'edit',
      apiUrl: apiUrls.update_node('video', 'questions'),
      iid: lodashGet(node, 'iid'),
      ntype: lodashGet(node, 'ntype'),
      data: Object.assign({}, node, {
        questions: removeAtIndex(lodashGet(node, 'questions'), questionIndex),
      }),
    });
  },
};

const mapStateToProps = createSelector(
  (state) => state.tree,
  (state, props) => lodashGet(props, 'node.iid'),
  (nodes, videoIid) => {
    return { node: getNode(videoIid, null, nodes, -1) };
  },
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(QuestionsOfVideo);
