import React from 'react';
import PropTypes from 'prop-types';
import lodashGet from 'lodash.get';

import { t1 } from 'translate';
import Table from 'antd/lib/table';
import Question from 'components/admin/survey/common/edit-survey-take-question-answer';
import UpdateBatchAnswerVertically from '../common/update-batch-vertically';
import UpdateBatchAnswerHorizontally from '../common/update-batch-horizontally';
import apiUrls from 'api-endpoints';
import sApiUrls from 'components/admin/survey/endpoints';
import DeleteButton from 'components/common/action-button/DeleteBtnWithConfirmDialog';

const Results = ({ items, node, objects, searchFormId }) => {
  const survey = lodashGet(objects, 'survey');
  const teachers = lodashGet(objects, 'teachers');
  const questions = lodashGet(survey, 'children');

  const columns = [
    {
      key: 'user',
      title: t1('user'),
      render: (item) => {
        return lodashGet(item, 'anonymous')
          ? t1('anonymous_%s', [item.user_iid])
          : lodashGet(item, 'user.name');
      },
    },
    ...(teachers || []).map((t) => ({
      key: lodashGet(t, 'teacher.iid'),
      title: lodashGet(t, 'teacher.name'),
      children: (questions || []).map((q, index) => {
        return {
          key: lodashGet(q, 'iid'),
          title: (
            <React.Fragment>
              {index + 1}
              <UpdateBatchAnswerVertically
                enrolmentPlan={node}
                question={q}
                targetIid={lodashGet(t, 'teacher.iid')}
                userIids={(items || []).map((item) =>
                  lodashGet(item, 'user_iid'),
                )}
                searchFormId={searchFormId}
                style={{
                  marginLeft: 5,
                }}
              />
            </React.Fragment>
          ),
          render: (item) => {
            const takesThatMatchTeacher = (
              lodashGet(item, 'teacher_takes') || []
            )
              .filter(
                (elem) =>
                  lodashGet(elem, 'teacher.iid') ===
                  lodashGet(t, 'teacher.iid'),
              )
              .map((elem) => lodashGet(elem, 'take'));

            const takeToShowAnswer = takesThatMatchTeacher[0];

            return (
              takeToShowAnswer && (
                <Question
                  searchFormId={searchFormId}
                  take={takeToShowAnswer}
                  question={q}
                  takeIdsToSaveAnswer={takesThatMatchTeacher.map((take) =>
                    lodashGet(take, 'id'),
                  )}
                />
              )
            );
          },
        };
      }),
    })),
    {
      key: 'action',
      title: t1('action'),
      render: (item) => {
        return (
          <React.Fragment>
            <UpdateBatchAnswerHorizontally
              enrolmentPlan={node}
              userIid={lodashGet(item, 'user_iid')}
              targetIids={(teachers || []).map((t) =>
                lodashGet(t, 'teacher.iid'),
              )}
              questions={questions}
              searchFormId={searchFormId}
            />
            &nbsp;
            <DeleteButton
              title={t1('delete')}
              textConfirm={t1('do_you_want_to_remove_this_row?')}
              itemId={item.id}
              alternativeApi={sApiUrls.remove_survey_takes}
              formid={searchFormId}
              params={{
                ids: (lodashGet(item, 'teacher_takes') || []).map(
                  (teacherTake) => lodashGet(teacherTake, 'take.id'),
                ),
              }}
            />
          </React.Fragment>
        );
      },
    },
  ];

  return (
    <div className="white-box">
      <Table
        columns={columns}
        dataSource={items}
        pagination={false}
        bordered
        size="middle"
        scroll={{ x: true }}
      />
    </div>
  );
};

Results.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any),
};

Results.defaultProps = {
  items: [],
};

export default Results;
