import React from 'react';
import List from 'antd/lib/list';
import { t1 } from 'translate';
import get from 'lodash.get';
import Link from 'components/common/router/Link';
import fetchData from 'components/common/fetchData';
import Loading from 'components/common/loading';
import Paper from 'components/common/paper';
import Icon from '../../../common/Icon';
import MyTemis from 'components/temis/MyTemis';
import withUserInfo from 'common/hoc/withUserInfo';

const descriptionInformationOfTheSurveyOverview = (
  trainingPlan = {},
  enrolmentPlans = [],
) => {
  const trainingPlanName = get(trainingPlan, 'name');

  return (
    <div>
      <h3>{`${t1('training_plan')}: ${get(trainingPlan, 'name')}`}</h3>

      {false &&
        Array.isArray(enrolmentPlans) &&
        !!enrolmentPlans.length && [
          <p>{t1('enrolment_plan')}</p>,
          <ul>
            {enrolmentPlans.map(({ name }) => (
              <li>{name}</li>
            ))}
          </ul>,
        ]}
    </div>
  );
};

const ListOfSurvey = ({ loadingStatus, surveys, userInfo }) => {
  if (loadingStatus !== 'finished') {
    return <Loading />;
  }

  const styles = {
    textTransform: 'uppercase',
  };

  return (
    <div className="container m-t-30">
      <div className="text-center">
        <h1>{t1('list_of_surveys')}</h1>
      </div>

      {Array.isArray(surveys) &&
        surveys.map((item) => {
          return (
            <div className="m-t-30">
              <div>
                <Link
                  to={`/survey/training-plan/${get(
                    item,
                    'training_plan.iid',
                  )}/${get(item, 'survey.iid')}`}
                  style={styles}
                >
                  {get(item, 'survey.name')} <Icon icon={'edit'} />
                </Link>

                <div>
                  <i>
                    {descriptionInformationOfTheSurveyOverview(
                      get(item, 'training_plan'),
                      get(item, 'enrolment_plans'),
                    )}
                  </i>
                </div>
              </div>
            </div>
          );
        })}

      <MyTemis userId={get(userInfo, 'id')} userIid={get(userInfo, 'iid')} />
    </div>
  );
};

export default fetchData(() => ({
  baseUrl: '/survey/api/my-surveys',
  propKey: 'surveys',
  fetchCondition: true,
  refetchCondition: false,
}))(withUserInfo(ListOfSurvey));
