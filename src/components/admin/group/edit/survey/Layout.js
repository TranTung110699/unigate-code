import React from 'react';
import SearchWrapper from 'components/common/search-wrap-v2/SearchWrapper';
import lodashGet from 'lodash.get';
// import apiUrls from 'api-endpoints';
import sApiUrls from 'components/admin/survey/endpoints';
import { t1 } from 'translate';
import { required } from 'common/validators';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'components/common/mui/Table';
import { returnIfTrue } from 'common/utils';
import {
  timestampToDateTimeString,
  timestampToDateString,
} from 'common/utils/Date';
import { getIdOfFormSearchBatchSurveyInserts } from './common';
import { Link } from 'react-router-dom';
import routes from 'routes';
import Icon from 'components/common/Icon';
import DeleteItem from 'components/common/action-button/DeleteBtnWithConfirmDialog';
import SurveyReport from './chart';

import Paper from 'material-ui/Paper';
import Title from 'schema-form/field-set/Title';

const searchFormSchema = {
  schema: (formid, values) => ({
    survey_iid: {
      type: 'select',
      floatingLabelText: t1('survey'),
      fullWidth: true,
      options: 'async',
      validate: [required()],
      populateValue: true,
      paramsasync: {
        key: values.group_iid,
        __url__: sApiUrls.get_surveys_to_feedback_group_users,
        value: {
          group_iid: values.group_iid,
        },
        transformData: (data) => {
          if (!Array.isArray(data) || !data.length) {
            return [];
          }

          return data.map((row) => ({
            value: lodashGet(row, 'iid'),
            primaryText: lodashGet(row, 'name'),
          }));
        },
      },
    },
  }),
  ui: () => [
    {
      id: 'default',
      fields: ['survey_iid'],
    },
  ],
};

const stylePaper = {
  marginTop: 20,
  padding: 10,
};

const renderListOfBatchInsertions = (
  items,
  { formid, group },
  objects,
  searchValues,
) => {
  return (
    <div className={'flex-container'}>
      <div className="flex-item">
        <Paper style={stylePaper}>
          <Title title={t1('group_performance')} />
          <SurveyReport
            groupIid={searchValues.group_iid}
            surveyIid={searchValues.survey_iid}
          />
        </Paper>
      </div>
      <div className="flex-item">
        <Paper style={stylePaper}>
          <Title title={t1('survey_data_input_history')} />

          <Table className="table-border" selectable={false}>
            <TableHeader
              displaySelectAll={false}
              enableSelectAll={false}
              adjustForCheckbox={false}
            >
              <TableRow>
                <TableHeaderColumn>{t1('teacher')}</TableHeaderColumn>
                <TableHeaderColumn>{t1('created_at')}</TableHeaderColumn>
                <TableHeaderColumn>{t1('feedback_for_date')}</TableHeaderColumn>
                <TableHeaderColumn>{t1('feedbacked')}</TableHeaderColumn>
                <TableHeaderColumn>{t1('action')}</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody
              className="table-body-align-top"
              displayRowCheckbox={false}
              showRowHover={false}
            >
              {(items || []).map((item) => {
                const batchInsertInfo = lodashGet(item, 'batch_insert_info');
                const teacher = lodashGet(batchInsertInfo, 'u');
                const batchInsertId = lodashGet(item, 'id');
                const surveyIid = lodashGet(batchInsertInfo, 'survey_iid');

                return (
                  <TableRow key={batchInsertId}>
                    <TableRowColumn>
                      {lodashGet(teacher, 'name')}
                      {returnIfTrue(
                        lodashGet(teacher, 'code'),
                        (code) => ` (${code})`,
                      )}
                    </TableRowColumn>
                    <TableRowColumn>
                      {timestampToDateTimeString(
                        lodashGet(batchInsertInfo, 'ts'),
                      )}
                    </TableRowColumn>
                    <TableRowColumn>
                      {timestampToDateString(
                        lodashGet(batchInsertInfo, 'survey_date'),
                      )}
                    </TableRowColumn>
                    <TableRowColumn>
                      {lodashGet(batchInsertInfo, 'feedbacked') ? (
                        <span style={{ color: 'green' }}>{t1('yes')}</span>
                      ) : (
                        <span style={{ color: 'grey' }}>{t1('no')}</span>
                      )}
                    </TableRowColumn>
                    <TableRowColumn>
                      <Link
                        to={routes.url(
                          'node_edit',
                          Object.assign({}, group, {
                            ntype: 'group',
                            step: 'surveys',
                            subAction: 'batch',
                            queryStringParams: {
                              survey_iid: surveyIid,
                              batch_id: batchInsertId,
                            },
                          }),
                        )}
                      >
                        <Icon icon="edit" />
                      </Link>
                      <span className="p-l-10">
                        <DeleteItem
                          title={t1('remove')}
                          alternativeApi={sApiUrls.delete_survey_takes_in_batch}
                          textConfirm={t1(
                            'are_you_sure_you_want_to_delete_this_feedback?',
                          )}
                          formid={formid}
                          params={{
                            batch_insert_id: batchInsertId,
                          }}
                        />
                      </span>
                    </TableRowColumn>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Paper>
      </div>
    </div>
  );
};

const SearchSurveyBatchInsertions = ({ group }) => (
  <SearchWrapper
    formid={getIdOfFormSearchBatchSurveyInserts(group)}
    schema={searchFormSchema}
    hiddenFields={{
      group_iid: lodashGet(group, 'iid'),
    }}
    group={group}
    renderResultsComponent={renderListOfBatchInsertions}
    alternativeApi={
      sApiUrls.search_survey_takes_batch_inserts_to_feedback_users_of_group
    }
  />
);

export default SearchSurveyBatchInsertions;
