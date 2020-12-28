import React from 'react';
import SearchWrapper from 'components/common/search-wrap-v2/SearchWrapper';
import lodashGet from 'lodash.get';
// import apiUrls from 'api-endpoints';
import sApiUrls from 'components/admin/survey/endpoints';
import { t1 } from 'translate';
import { required } from 'common/validators';
import LineChart from 'recharts/lib/chart/LineChart';
import CartesianGrid from 'recharts/lib/cartesian/CartesianGrid';
import XAxis from 'recharts/lib/cartesian/XAxis';
import YAxis from 'recharts/lib/cartesian/YAxis';
import Tooltip from 'recharts/lib/component/Tooltip';
import Line from 'recharts/lib/cartesian/Line';
import { timestampToDateString } from 'common/utils/Date';
import Card from 'antd/lib/card';
import DisplayHtml from 'components/common/html';
import AutoSizer from 'react-virtualized/dist/es/AutoSizer';
import Warning from 'components/common/Warning';
import DatePicker from 'schema-form/elements/date-picker';

const date = new Date();
date.setDate(1);
const startTimestamp = date.getTime() / 1000;
date.setDate(31);
const endTimestamp = date.getTime() / 1000;

const searchFormSchema = {
  schema: (formid, values) => ({
    survey_iid: {
      type: 'select',
      floatingLabelText: t1('survey'),
      fullWidth: true,
      options: 'async',
      validate: [required()],
      paramsasync: {
        __url__: sApiUrls.get_surveys_target_users,
        transformData: (surveys) => {
          if (!Array.isArray(surveys) || !surveys.length) {
            return [];
          }

          return surveys.map((s) => ({
            value: lodashGet(s, 'iid'),
            primaryText: lodashGet(s, 'name'),
          }));
        },
      },
    },
    from_date: {
      type: DatePicker,
      getStartDate: true,
      fullWidth: true,
      floatingLabelText: t1('from_date'),
      validate: [required()],
      defaultValue: startTimestamp,
    },
    to_date: {
      type: DatePicker,
      getEndDate: true,
      fullWidth: true,
      floatingLabelText: t1('to_date'),
      validate: [required()],
      defaultValue: endTimestamp,
    },
  }),
  ui: () => [
    {
      id: 'default',
      fields: ['survey_iid', 'from_date', 'to_date'],
    },
  ],
};

const ListOfQuestionAverageScores = ({
  survey,
  numberQuestionsAverageScore,
}) => (
  <React.Fragment>
    {(lodashGet(survey, 'children') || []).map((question) => {
      const questionId = lodashGet(question, 'id');
      const dataForQuestion = (numberQuestionsAverageScore || [])
        .filter(
          (item) => ![null, undefined].includes(lodashGet(item, questionId)),
        )
        .sort(
          (item, anotherItem) =>
            lodashGet(item, '_id.survey_date') -
            lodashGet(anotherItem, '_id.survey_date'),
        )
        .map(
          (item) =>
            item && {
              ...item,
              surveyDateString: timestampToDateString(
                lodashGet(item, '_id.survey_date'),
              ),
            },
        );

      if (dataForQuestion.length === 0) {
        return null;
      }

      return (
        <Card key={questionId}>
          <DisplayHtml content={lodashGet(question, 'content')} />
          <AutoSizer disableHeight>
            {({ width }) => (
              <LineChart
                width={width}
                height={250}
                data={dataForQuestion}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="surveyDateString" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey={lodashGet(question, 'id')}
                  name={t1('rating')}
                />
              </LineChart>
            )}
          </AutoSizer>
        </Card>
      );
    })}
  </React.Fragment>
);

const ListOfComments = ({ takes }) => (
  <React.Fragment>
    {(takes || [])
      .filter((take) => lodashGet(take, 'comment'))
      .map((take) => {
        return (
          <Card key={lodashGet(take, 'id')}>
            <div>
              <b>{lodashGet(take, 'u.name')} - </b>
              {timestampToDateString(lodashGet(take, 'survey_date'))}
            </div>
            <br />
            <DisplayHtml content={lodashGet(take, 'comment')} />
          </Card>
        );
      })}
  </React.Fragment>
);

const renderResults = (data, props, { survey }) => {
  const numberQuestionsAverageScore = lodashGet(
    data,
    'number_questions_average_score',
  );
  const takes = lodashGet(data, 'takes');

  if (
    (!Array.isArray(numberQuestionsAverageScore) ||
      numberQuestionsAverageScore.length === 0) &&
    (!Array.isArray(takes) || takes.length === 0)
  ) {
    return <Warning>{t1('no_data')}</Warning>;
  }

  return (
    <div className="p-l-0 p-r-0">
      <div className="row">
        <div className="col-md-6">
          <ListOfQuestionAverageScores
            survey={survey}
            numberQuestionsAverageScore={numberQuestionsAverageScore}
          />
        </div>
        <div className="col-md-6">
          <ListOfComments takes={takes} />
        </div>
      </div>
    </div>
  );
};

const UserFeedback = ({ node }) => {
  const userIid = lodashGet(node, 'iid');

  return (
    <SearchWrapper
      formid={`feed_back_of_user_${userIid}`}
      schema={searchFormSchema}
      hiddenFields={{
        user_iid: userIid,
      }}
      renderResultsComponent={renderResults}
      alternativeApi={sApiUrls.get_report_survey_targeting_user}
      showResult
    />
  );
};

export default UserFeedback;
