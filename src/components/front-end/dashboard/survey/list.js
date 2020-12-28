import React from 'react';
import get from 'lodash.get';

import AntdTable from 'antd/lib/table';
import fetchData from 'components/common/fetchData';
import apiUrls from 'api-endpoints';
import sApiUrls from 'components/admin/survey/endpoints';
import Loading from 'components/common/loading';
import { Link } from 'react-router-dom';
import Links from '../../../../routes/links';
import { t1 } from '../../../../translate';
import IconButton from 'material-ui/IconButton';

const surveyList = ({ loadingStatus, surveyList }) => {
  if (loadingStatus !== 'finished') {
    return <Loading />;
  }

  if (!Array.isArray(surveyList) || !surveyList.length) {
    return null;
  }

  return (
    <AntdTable
      columns={[
        {
          render: (index, row) => {
            return (
              <div>
                <h3 title={get(row, 'survey.title')}>
                  {get(row, 'survey.name')}
                </h3>
                <p>
                  {get(row, 'semester.name')} (
                  {`${get(row, 'semester.start_month')}/${get(
                    row,
                    'semester.start_year',
                  )} - ${get(row, 'semester.end_month')}/${get(
                    row,
                    'semester.end_year',
                  )}`}
                  )
                </p>
                <p>{`${t1('type')}: ${t1(
                  get(row, 'survey.apply_survey_for'),
                )}`}</p>
              </div>
            );
          },
        },
        {
          render: (index, row) => (
            <IconButton
              iconClassName="ti-comment-alt"
              containerElement={
                <Link
                  to={Links.startSurvey(
                    get(row, 'survey.iid'),
                    get(row, 'semester'),
                  )}
                />
              }
              title={t1('go_to_take_survey')}
            />
          ),
        },
      ]}
      dataSource={surveyList}
      showHeader={false}
      pagination={false}
      bordered={false}
      size="middle"
    />
  );
};

export default fetchData(() => ({
  baseUrl: sApiUrls.get_survey_list_to_take,
  params: {
    page: 0,
    item_per_page: 5,
  },
  propKey: 'surveyList',
  refetchCondition: () => false,
  // Never refetch, I did not add this logic here, I just refactor based on the previous coder logic
  // he/she did not pass refetchCondition here, therefore, it will never refetch
  // I just refactor make it clearer
}))(surveyList);
