import React from 'react';
import { connect } from 'react-redux';
import lodashGet from 'lodash.get';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'components/common/mui/Table';
import SearchWrapper from 'components/common/search-wrap-v2/SearchWrapper';
import { returnIfTrue } from 'common/utils';
import Question from 'components/admin/survey/common/edit-survey-take-question-answer';
import EditTakeResult from 'components/admin/survey/common/edit-survey-take-result';
import Comment from 'components/admin/survey/common/edit-survey-take-comment';
import { t1 } from 'translate';
import apiUrls from 'api-endpoints';
import sApiUrls from 'components/admin/survey/endpoints';
import fetchData from 'components/common/fetchData';
import { timestampToDateString } from 'common/utils/Date';
import Warning from 'components/common/Warning';
import DetailOnDialog from 'components/common/detail-on-dialog';
import Truncate from 'react-truncate';
import DisplayHtml from 'components/common/html';
import ApiRequestButton from 'components/common/action-button/ApiRequestBtnWithConfirmDialog';
import { searchResultIdSelector } from 'components/common/search-wrap/common';
import RaisedButton from 'components/common/mui/RaisedButton';

const renderFeedbackStudentsTable = (takes, { survey, formid }) => {
  const questions = lodashGet(survey, 'children') || [];

  return (
    <Table className="table-border" selectable={false}>
      <TableHeader
        displaySelectAll={false}
        enableSelectAll={false}
        adjustForCheckbox={false}
      >
        <TableRow>
          <TableHeaderColumn>{t1('student')}</TableHeaderColumn>
          {questions.map((question, qIndex) => (
            <TableHeaderColumn key={lodashGet(question, 'id')}>
              <DetailOnDialog
                renderPreview={({ showFull }) => (
                  <a
                    href="#"
                    style={{
                      width: '100%',
                      overflow: 'hidden',
                    }}
                    onClick={showFull}
                  >
                    <Truncate>
                      <DisplayHtml content={lodashGet(question, 'content')} />
                    </Truncate>
                  </a>
                )}
                textFull={lodashGet(question, 'content')}
              />
            </TableHeaderColumn>
          ))}
          <TableHeaderColumn>{t1('comment')}</TableHeaderColumn>
          <TableHeaderColumn>{t1('action')}</TableHeaderColumn>
        </TableRow>
      </TableHeader>
      <TableBody displayRowCheckbox={false} showRowHover={false}>
        {(takes || []).map((take) => {
          const targetUser = lodashGet(take, '__expand.target_item_iid');

          return (
            <TableRow key={lodashGet(take, 'id')}>
              <TableRowColumn>
                {lodashGet(targetUser, 'name')}
                {returnIfTrue(
                  lodashGet(targetUser, 'code'),
                  (code) => ` (${code})`,
                )}
              </TableRowColumn>
              {questions.map((question, qIndex) => (
                <TableRowColumn key={lodashGet(question, 'id')}>
                  <Question
                    searchFormId={formid}
                    question={question}
                    take={take}
                  />
                </TableRowColumn>
              ))}
              <TableRowColumn>
                <Comment searchFormId={formid} take={take} />
              </TableRowColumn>
              <TableRowColumn>
                <EditTakeResult
                  searchFormId={formid}
                  take={take}
                  questions={questions}
                  label={t1('feedback_to_%s', [lodashGet(targetUser, 'name')])}
                />
              </TableRowColumn>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

const searchFormSchema = {};

const getSearchFormId = ({ surveyIid, batchId }) =>
  `feedback_students_of_survey_${surveyIid}_of_batch_${batchId}`;

const FeedbackStudentsInBatch = ({
  surveyIid,
  survey,
  batchId,
  batchInsertInfo,
}) => {
  const formid = getSearchFormId({ surveyIid, batchId });

  return (
    <React.Fragment>
      <Warning>
        {t1('feedback_for_%s', [
          timestampToDateString(lodashGet(batchInsertInfo, 'survey_date')),
        ])}
      </Warning>
      <SearchWrapper
        formid={formid}
        schema={searchFormSchema}
        hiddenFields={{
          batch_insert_id: batchId,
          survey_iid: surveyIid,
          _sand_expand: ['target_item_iid'],
        }}
        survey={survey}
        renderResultsComponent={renderFeedbackStudentsTable}
        alternativeApi={sApiUrls.search_survey_take_for_feedback_users_in_group}
        autoSearchWhenStart
        showSearchButton={false}
      />
      {
        <ApiRequestButton
          title={t1('mark_feedback_as_finished')}
          renderComponent={({ onClick }) => (
            <RaisedButton
              primary
              onClick={onClick}
              disabled={lodashGet(batchInsertInfo, 'feedbacked')}
              label={
                lodashGet(batchInsertInfo, 'feedbacked')
                  ? t1('you_already_marked_this_feedback_as_finished')
                  : t1('mark_feedback_as_finished')
              }
            />
          )}
          formidToSubmitOnSuccess={formid}
          closeModal
          textConfirm={t1('do_you_want_to_mark_this_feedback_as_finished?')}
          params={{ batch_insert_id: batchId }}
          url={sApiUrls.finish_feedback_for_survey_takes}
        />
      }
    </React.Fragment>
  );
};

const getDataFromStore = connect((state, { surveyIid, batchId }) => ({
  searchResultId: searchResultIdSelector(state)(
    getSearchFormId({ surveyIid, batchId }),
  ),
}));

const fetchSurveyData = fetchData((props) => ({
  baseUrl: apiUrls.fetch_node,
  params: {
    ntype: 'survey',
    iid: lodashGet(props, 'surveyIid'),
    depth: -1,
  },
  propKey: 'survey',
  keyState: `survey_${lodashGet(props, 'surveyIid')}`,
  fetchCondition: lodashGet(props, 'surveyIid'),
}));

const fetchBatchInsertInfo = fetchData((props) => {
  const { batchId, searchResultId } = props;

  return {
    baseUrl: sApiUrls.get_survey_take_batch_insertion_info,
    params: {
      batch_id: batchId,
    },
    propKey: 'batchInsertInfo',
    keyState: `survey_batch_insert_info_${batchId}`,
    fetchCondition: batchId,
    refetchCondition: (prevProps) =>
      batchId !== lodashGet(prevProps, 'batchId') ||
      searchResultId !== lodashGet(prevProps, 'searchResultId'),
  };
});

export default getDataFromStore(
  fetchSurveyData(fetchBatchInsertInfo(FeedbackStudentsInBatch)),
);
