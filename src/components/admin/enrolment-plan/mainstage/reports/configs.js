import React from 'react';
import Link from 'components/common/router/Link';
import { t1 } from 'translate';
import { checkIfAllCreditSyllabusesAreOnlineOnlyGivenConf } from 'common/conf';
import { epReportLink, nodeLink } from 'components/admin/enrolment-plan/routes';
import { isEnrolmentPlanSharedFromAncestorOrganizations } from 'components/admin/enrolment-plan/common';

const reports = (node, conf) => {
  const isSharedFromAncestorOrganizations = isEnrolmentPlanSharedFromAncestorOrganizations(
    node,
  );

  return [
    // {
    //   url: epReportLink(node, 'progress'),
    //   title: t1('enrolment_plan_progress'),
    //   tooltip: t1('enrolment_plan_progress'),
    //   description: t1('enrolment_plan_progress_description'),
    //   icon: {
    //     position: 'left',
    //     type: 'bar-chart',
    //   },
    // },
    {
      // url: epReportLink(node, 'learners-progress'),
      url: nodeLink(node, 'members'),
      title: t1('enrolment_plan_learners_progress'),
      tooltip: t1('enrolment_plan_learners_progress'),
      description: t1('enrolment_plan_learners_progress_description'),
      icon: {
        position: 'left',
        type: 'bar-chart',
      },
    },
    // {
    //   url: epReportLink(node, 'not-assigned-members'),
    //   title: t1('enrolment_plan_not_assigned_members'),
    //   tooltip: t1('enrolment_plan_not_assigned_members'),
    //   description: t1(
    //     'enrolment_plan_members_who_are_not_assigned_to_any_class',
    //   ),
    //   icon: {
    //     position: 'left',
    //     type: 'close',
    //   },
    // },
    // {
    //   url: epReportLink(node, 'not-started-learners'),
    //   title: t1('enrolment_plan_not_started_members'),
    //   tooltip: t1('enrolment_plan_not_started_members'),
    //   description: t1('enrolment_plan_not_started_members_description'),
    //   icon: {
    //     position: 'left',
    //     type: 'close',
    //   },
    // },
    {
      url: epReportLink(node, 'credit-overall-progress'),
      title: t1('enrolment_plan_credit_overall_progress'),
      tooltip: t1('enrolment_plan_credit_overall_progress'),
      description: t1('enrolment_plan_credit_overall_progress_description'),
      icon: {
        position: 'left',
        type: 'star',
      },
      hidden: isSharedFromAncestorOrganizations,
    },
    {
      url: epReportLink(node, 'progress-by-organization'),
      title: t1('progress_by_child_organizations'),
      tooltip: t1('progress_by_child_organization'),
      description: t1('progress_by_child_organization_description'),
      icon: {
        position: 'left',
        type: 'star',
      },
      hidden: isSharedFromAncestorOrganizations,
    },
    {
      title: t1('enrolment_plan_surveys'),
      tooltip: t1('enrolment_plan_surveys'),
      description: t1('enrolment_plan_surveys_description'),
      component: (
        <div>
          <ul>
            {!(
              checkIfAllCreditSyllabusesAreOnlineOnlyGivenConf(conf) ||
              isSharedFromAncestorOrganizations
            ) && (
              <li>
                <Link to={epReportLink(node, 'teacher-survey-result')}>
                  {t1('enrolment_plan_teacher_survey_result')}
                </Link>
              </li>
            )}
            {!(
              checkIfAllCreditSyllabusesAreOnlineOnlyGivenConf(conf) ||
              isSharedFromAncestorOrganizations
            ) && (
              <li>
                <Link to={epReportLink(node, 'credit-syllabus-survey-result')}>
                  {t1('enrolment_plan_teacher_survey_result')}
                </Link>
              </li>
            )}
            <li>
              <Link to={epReportLink(node, 'survey-by-training-plan')}>
                {t1('enrolment_plan_survey_by_training_plan')}
              </Link>
            </li>
          </ul>
        </div>
      ),
    },
  ];
};

export default reports;
