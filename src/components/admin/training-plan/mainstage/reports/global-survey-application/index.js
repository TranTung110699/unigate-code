import React from 'react';
import get from 'lodash.get';
import fetchData from 'components/common/fetchData';
import apiUrls from 'api-endpoints';
import sApiUrls from 'components/admin/survey/endpoints';
import Loading from 'components/common/loading';
import { t1 } from 'translate';
import Tabs from 'antd/lib/tabs';
import SurveyStatistics from 'components/admin/survey/mainstage/dashboard/widget/survey-statistics';

const GlobalSurveyApplication = ({
  surveys,
  loadingStatus,
  trainingPlan,
  enrolmentPlan,
}) => {
  if (loadingStatus !== 'finished') {
    return <Loading />;
  }

  if (!Array.isArray(surveys) || !surveys.length) {
    return <div>{t1('surveys_empty')}</div>;
  } else if (surveys.length === 1) {
    return [
      <h1>{get(surveys, '0.name')}</h1>,
      <SurveyStatistics
        node={surveys[0]}
        item={trainingPlan}
        enrolmentPlan={enrolmentPlan}
      />,
    ];
  }

  return (
    <Tabs defaultActiveKey="0">
      {surveys.map((survey, index) => (
        <Tabs.TabPane tab={get(survey, 'name')} key={index}>
          <SurveyStatistics
            node={survey}
            item={trainingPlan}
            enrolmentPlan={enrolmentPlan}
          />
        </Tabs.TabPane>
      ))}
    </Tabs>
  );
};

export default fetchData(({ surveyIids, trainingPlan }) => ({
  baseUrl: sApiUrls.survey_search,
  params: {
    iid: surveyIids,
    training_plan_iid: trainingPlan && trainingPlan.iid,
  },
  propKey: 'surveys',
  fetchCondition:
    (Array.isArray(surveyIids) && surveyIids.length) ||
    (trainingPlan && trainingPlan.iid),
  refetchCondition: (prevProps) =>
    prevProps.trainingPlan.iid !== trainingPlan.iid,
}))(GlobalSurveyApplication);
