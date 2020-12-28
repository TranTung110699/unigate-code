import React from 'react';
import PropTypes from 'prop-types';
import lodashGet from 'lodash.get';

import { t1 } from 'translate';
import Question from 'components/admin/survey/common/edit-survey-take-question-answer';
import UpdateBatchAnswerVertically from '../common/update-batch-vertically';
import UpdateBatchAnswerHorizontally from '../common/update-batch-horizontally';
import Table from 'antd/lib/table';
// import apiUrls from 'api-endpoints';
import sApiUrls from 'components/admin/survey/endpoints';
import DeleteButton from 'components/common/action-button/DeleteBtnWithConfirmDialog';

const Results = ({ items, node, objects, searchFormId }) => {
  const survey = lodashGet(objects, 'survey');
  const creditSyllabuses = lodashGet(objects, 'credit_syllabuses');
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
    ...(creditSyllabuses || []).map((cs) => ({
      key: lodashGet(cs, 'iid'),
      title: lodashGet(cs, 'name'),
      children: (questions || []).map((q, index) => {
        return {
          key: lodashGet(q, 'iid'),
          title: (
            <React.Fragment>
              {index + 1}
              <UpdateBatchAnswerVertically
                enrolmentPlan={node}
                question={q}
                targetIid={lodashGet(cs, 'iid')}
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
            const takesThatMatchCreditSyllabus = (
              lodashGet(item, 'takes') || []
            ).filter((take) =>
              [
                lodashGet(cs, 'iid'),
                ...(lodashGet(cs, 'course_iids_in_enrolment_plan') || []),
              ]
                .map((iid) => String(iid))
                .includes(String(lodashGet(take, 'target_item_iid'))),
            );

            const takeToShowAnswer = takesThatMatchCreditSyllabus[0];

            return (
              takeToShowAnswer && (
                <Question
                  searchFormId={searchFormId}
                  take={takeToShowAnswer}
                  question={q}
                  takeIdsToSaveAnswer={takesThatMatchCreditSyllabus.map(
                    (take) => lodashGet(take, 'id'),
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
              targetIids={(creditSyllabuses || []).map((cs) =>
                lodashGet(cs, 'iid'),
              )}
              questions={questions}
              searchFormId={searchFormId}
            />
            <DeleteButton
              title={t1('delete')}
              textConfirm={t1('do_you_want_to_remove_this_row?')}
              itemId={item.id}
              alternativeApi={sApiUrls.remove_survey_takes}
              formid={searchFormId}
              params={{
                ids: (lodashGet(item, 'takes') || []).map((take) =>
                  lodashGet(take, 'id'),
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
  data: PropTypes.shape(),
};

Results.defaultProps = {
  data: {},
};

export default Results;
