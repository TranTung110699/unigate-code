import React from 'react';
import { t1 } from 'translate';
import Widget from 'components/common/Widget';
import lodashGet from 'lodash.get';
import LearningStatusOfGVCC from './leaning-status-of-GVCC';
import GlobalSurveyApplication from './global-survey-application';
import { reportTypes } from '../../routes';
import UsersOverallProgress from './users-overall-progress';
import NotStartedLearners from './not-started-learners';
import CreditOverallProgress from './credit-overall-progress';
import ReportDashboard from './dashboard';

const ReportContainer = ({ trainingPlan, subAction }) => {
  if (!trainingPlan.iid) return null;

  const sub = Array.isArray(subAction) ? subAction[0] : subAction;

  let contentDisplay;
  switch (sub) {
    case reportTypes.usersOverallProgress: {
      contentDisplay = <UsersOverallProgress node={trainingPlan} />;
      break;
    }
    // case 'users-by-organization': {
    //   contentDisplay = <MembersByOrganization node={node} />;
    //   break;
    // }
    case reportTypes.notStartedLearners: {
      contentDisplay = <NotStartedLearners node={trainingPlan} />;
      break;
    }
    case reportTypes.creditOverallProgress: {
      contentDisplay = <CreditOverallProgress trainingPlan={trainingPlan} />;
      break;
    }
    case reportTypes.survey: {
      const global_survey_application = lodashGet(
        trainingPlan,
        'global_survey_application',
      );

      contentDisplay = (
        <div>
          {Array.isArray(global_survey_application) &&
            !!global_survey_application.length && (
              <GlobalSurveyApplication
                surveyIids={global_survey_application}
                trainingPlan={trainingPlan}
              />
            )}
        </div>
      );
      break;
    }
    case reportTypes.cbcc: {
      contentDisplay = (
        <Widget title="Trạng thái học tập của giảng viên cốt cán">
          <p>{t1('Thống kê theo trạng thái học tập GVPTCC/CBQLCSGDPTCC')}</p>
          <div className="m-t-30">
            <LearningStatusOfGVCC trainingPlan={trainingPlan} />
          </div>
        </Widget>
      );
      break;
    }
    default:
      contentDisplay = <ReportDashboard trainingPlan={trainingPlan} />;
      break;
  }

  return <div className="whitebox">{contentDisplay}</div>;
};

export default ReportContainer;
