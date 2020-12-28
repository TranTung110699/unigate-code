import React, { Component } from 'react';
import { t1 } from 'translate';
import getLodash from 'lodash.get';
import {
  questionTypeInText,
  types as questionTypes,
} from 'components/admin/question/schema/question-types';
import Table from 'antd/lib/table';
import DisplayHtml from 'components/common/html';

import { UserAnswer } from 'components/common/question/QuestionsPreview';
import MarkButton from './marking/MarkButton';
import { timestampToDateTimeString } from 'common/utils/Date';
import Editable from 'components/common/forms/editable';
import './styles.scss';

const width = {
  stt: '20px',
  type: '150px',
  content: '400px',
  answer: '400px',
  // answer: '40%',
  score: '150px',
};

class ExerciseScore extends Component {
  render() {
    const {
      takeId,
      exercise,
      answers,
      readOnly,
      onManualMarkingQuestion,
    } = this.props;

    const columns = [
      {
        title: t1('stt'),
        key: 'stt',
        dataIndex: 'id',
        width: width.stt,
        render: (value, item, index) => <span>{index + 1}</span>,
      },
      {
        title: t1('type'),
        key: 'type',
        width: width.type,
        dataIndex: 'type',
        render: (questionType, item) => {
          return questionTypeInText(questionType);
        },
      },
      {
        title: t1('content'),
        key: 'content',
        width: width.content,
        dataIndex: 'content',
        render: (content, item) => (
          <div style={{ maximumHeight: '50px', overflowY: 'scroll' }}>
            <DisplayHtml content={item.content} className="view-take" />
          </div>
        ),
        // render: (content, item) => <QuestionFullPreview item={item} />
      },
      {
        title: t1('user_answer'),
        key: 'answer',
        width: width.answer,
        render: (content, item) => (
          <UserAnswer
            item={item}
            userAnswer={getLodash(answers[item.id], 'answer')}
          />
        ),
      },
      {
        title: t1('score'),
        key: 'score',
        width: width.score,
        render: (item) => {
          const questionType = parseInt(item.type);
          const canEditScore =
            questionType == questionTypes.TYPE_OPEN_ENDED &&
            answers[item.id] &&
            typeof answers[item.id].score != 'undefined';
          let questionWeight =
            getLodash(answers, `${item.id}.weighted`) ||
            getLodash(answers, `${item.id}.sw`);
          if (typeof questionWeight == 'undefined')
            questionWeight =
              getLodash(item, 'weighted') || getLodash(item, 'sw');

          questionWeight = parseFloat(questionWeight);
          let score = getLodash(answers, `${item.id}.score`);
          const isPerfectScore =
            parseFloat(score) === parseFloat(questionWeight);

          if (
            questionType === questionTypes.TYPE_INTRODUCTION ||
            questionWeight == 0
          )
            return t1('introduction_question');

          return (
            <div className={isPerfectScore ? 'text-success text-bold' : ''}>
              {answers[item.id] &&
              typeof answers[item.id].score != 'undefined' ? (
                <span>
                  {!readOnly && canEditScore ? (
                    <Editable
                      type={'number'}
                      form={`edit-score-${item.id}`}
                      name="score"
                      initialValue={getLodash(answers, `${item.id}.score`) || 0}
                      url={`/take/update?id=${takeId}&question=${
                        item.id
                      }&_sand_step=set_question_score`}
                      validate={({ score }) => {
                        if (parseFloat(score) > questionWeight)
                          return {
                            score: `${t1(
                              'score_must_be_less_than',
                            )}: ${questionWeight}`,
                          };
                        return null;
                      }}
                      onRequestSuccessful={(values) => {
                        if (
                          onManualMarkingQuestion &&
                          typeof onManualMarkingQuestion == 'function'
                        )
                          onManualMarkingQuestion();
                      }}
                    />
                  ) : (
                    score
                  )}
                </span>
              ) : (
                <span title={t1('not_yet_done')}>{t1('not_yet_done')}</span>
              )}
              /<span>{questionWeight}</span>
              {!readOnly && canEditScore ? (
                <span className="m-l-10">
                  <MarkButton
                    question={item}
                    answer={getLodash(answers, item.id)}
                    takeId={takeId}
                    onManualMarkingQuestion={this.props.onManualMarkingQuestion}
                  />
                </span>
              ) : null}
              {canEditScore && (
                <div className="text-muted">
                  {getLodash(answers, `${item.id}.marking_ts`) ? (
                    <span>
                      {t1('last_marked')} :{' '}
                      {timestampToDateTimeString(
                        getLodash(answers, `${item.id}.marking_ts`),
                        { showTime: true },
                      )}
                    </span>
                  ) : null}
                </div>
              )}
            </div>
          );
        },
      },
    ];

    return (
      <Table
        columns={columns}
        dataSource={exercise.children}
        pagination={false}
        rowKey="id"
      />
    );
  }
}

export default ExerciseScore;
