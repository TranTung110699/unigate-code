import React from 'react';
import { t1 } from 'translate';
import GlobalSurveyApplication from 'components/admin/training-plan/mainstage/reports/global-survey-application';
import SubTopMenuContext from 'common/context/menu/SubMenuTop';
import NotStartedLearners from 'components/admin/enrolment-plan/mainstage/not-started-learners';
import CreditOverallProgress from 'components/admin/enrolment-plan/mainstage/credit-overall-progress';
import ProgressByOrganization from 'components/admin/enrolment-plan/mainstage/progress-by-organization';
import TeacherSurveyResult from 'components/admin/enrolment-plan/mainstage/survey-result/teacher-survey-result';
import CreditSyllabusSurveyResult from 'components/admin/enrolment-plan/mainstage/survey-result/credit-syllabus-survey-result';
import LearnersProgress from 'components/admin/enrolment-plan/mainstage/learners-progress';
import Progress from 'components/admin/enrolment-plan/mainstage/progress';
import NotAssignedMembers from 'components/admin/enrolment-plan/mainstage/not-assigned-members';
import Dashboard from './Dashboard';

const getSubAction = (subAction) => {
  return Array.isArray(subAction) ? subAction[0] : 'dashboard';
};

class EpReports extends React.Component {
  render() {
    const { subAction, node } = this.props;
    const a = getSubAction(subAction);

    let contentDisplay;
    switch (a) {
      case 'progress': {
        contentDisplay = <Progress node={node} />;
        break;
      }
      case 'learners-progress': {
        contentDisplay = <LearnersProgress node={node} />;
        break;
      }
      case 'not-started-learners': {
        contentDisplay = <NotStartedLearners node={node} />;
        break;
      }
      case 'credit-overall-progress': {
        contentDisplay = <CreditOverallProgress node={node} />;
        break;
      }
      case 'progress-by-organization': {
        contentDisplay = <ProgressByOrganization node={node} />;
        break;
      }
      case 'teacher-survey-result': {
        contentDisplay = <TeacherSurveyResult node={node} />;
        break;
      }
      case 'credit-syllabus-survey-result': {
        contentDisplay = <CreditSyllabusSurveyResult node={node} />;
        break;
      }
      case 'not-assigned-members': {
        contentDisplay = <NotAssignedMembers node={node} />;
        break;
      }
      case 'survey-by-training-plan': {
        contentDisplay = (
          <GlobalSurveyApplication
            trainingPlan={{
              iid: node && node.training_plan_iid,
              ntype: 'training_plan',
            }}
            enrolmentPlan={node}
          />
        );
        break;
      }
      default: {
        contentDisplay = null;
        break;
      }
    }

    return (
      <div>
        <SubTopMenuContext
          lastBreadcrumbName={node.name}
          action={a}
          isSmallSize
        />
        {contentDisplay ? (
          <div className="white-background p-20">{contentDisplay}</div>
        ) : null}

        {a === 'dashboard' ? (
          <div>
            <Dashboard {...this.props} />
          </div>
        ) : (
          <div>
            <hr />
            <Dashboard
              {...this.props}
              title={t1('view_more_enrolment_plan_reports')}
            />
          </div>
        )}
      </div>
    );
  }
}

export default EpReports;
