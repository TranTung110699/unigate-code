/**
 * Created by hungvo on 21/04/2017.
 */
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import isEqual from 'lodash.isequal';
import get from 'lodash.get';

import { t1 } from 'translate';
import routes from 'routes';
import actions from 'actions/creators';
import SubTopMenuContext from 'common/context/menu/SubMenuTop';
import SubLeftMenuContext from 'common/context/menu/SubMenuLeft';
import Loading from 'components/common/loading';
import withNodeEditContainer from 'components/admin/node/edit/withNodeEditContainer';
import withUserInfo from 'common/hoc/withUserInfo';
import membersTopMenuSchema from 'components/admin/enrolment-plan/menu/teacher-menus/enrolment_plan_members';
import teacherSurveyResultTopMenuSchema from 'components/admin/enrolment-plan/menu/teacher-menus/enrolment_plan_teacher_survey_result';
import creditSyllabusSurveyResultTopMenuSchema from 'components/admin/enrolment-plan/menu/teacher-menus/enrolment_plan_credit_syllabus_survey_result';
import Workflow from 'components/admin/enrolment-plan/mainstage/dashboard/Workflow';
import Reports from '../mainstage/reports';
import ImportSurveyTakes from '../mainstage/import-survey-takes';
import Dashboard from '../mainstage/dashboard';
import Info from '../mainstage/info';
import Members from '../mainstage/members';
import Credits from '../mainstage/credits';
import Courses from '../mainstage/courses';
import CourseStudentArrangementStatus from '../mainstage/course-student-arrangement-status';
import { menuItems } from './sub-left-menu-configs';
import ImportUsers from 'components/admin/import-users';
import { timestampToDateTimeString } from 'common/utils/Date';
import {
  isEnrolmentOrganizationMyOrganization,
  isEnrolmentPlanSharedFromAncestorOrganizations,
} from 'components/admin/enrolment-plan/common';
import withFeatureFlags from 'feature-flag/withFeatureFlags';
import features from 'feature-flag/features';
import Alert from 'antd/lib/alert';
import urlActions from '../routes/url-actions';

class EnrolmentPlanEditContainer extends Component {
  getTopMenuSchemaByAction(props) {
    const { action } = props;

    switch (action) {
      case urlActions.IMPORT_MEMBERS: //'import-members':
      case urlActions.MEMBERS_LIST: {
        //'members': {
        return membersTopMenuSchema(null, props);
      }
      case urlActions.TEACHER_SURVEY_RESULT: {
        //'teacher-survey-result': {
        return teacherSurveyResultTopMenuSchema(null, props);
      }
      case urlActions.CREDIT_SYLLABUS_SURVEY_RESULT: {
        // 'credit-syllabus-survey-result': {
        return creditSyllabusSurveyResultTopMenuSchema(null, props);
      }
      // case 'dashboard':
      // case 'info':
      // case 'program':
      // case 'courses':
      // case 'approval':
      // case 'not-started-learners':
      // case 'credit-overall-progress':
      // case 'progress-by-organization':
      // case 'reports':
      // case 'enrolment-status':
      default:
        return null;
    }
  }

  getContentByAction() {
    const {
      dispatch,
      action,
      rootNode,
      nodes,
      subAction,
      conf,
      itemAncestors,
      isFeatureEnabled,
      userInfo, // from HOC
    } = this.props;
    if (!rootNode || !rootNode.iid) {
      return <Loading />;
    }

    let contentDisplay = '';

    // hack for path like /enrolment-plan/123/program/123123
    let isProgram = false;
    itemAncestors.map((item) => {
      if (item.type === 'program') isProgram = true;
    });
    const enrolmentPlan = nodes[itemAncestors[0].iid];
    let paddingLeft = 10;
    if (isFeatureEnabled(features.NEW_UI_JULY_2019)) {
      paddingLeft = 0;
    }
    if (isProgram) {
      return <Credits node={enrolmentPlan} paddingLeft={paddingLeft} />;
    }

    switch (action) {
      case urlActions.DASHBOARD: {
        contentDisplay = <Dashboard node={rootNode} dispatch={dispatch} />;
        break;
      }
      case urlActions.EDIT_INFO: {
        //'info': {
        contentDisplay = <Info node={rootNode} />;
        break;
      }
      case urlActions.MEMBERS_LIST: {
        //'members': {
        contentDisplay = <Members node={rootNode} />;
        break;
      }
      case urlActions.IMPORT_MEMBERS: {
        //'import-members': {
        return (
          <div>
            <Alert
              message={t1('import_members_to_enrolment_plan_from_excel_file')}
              description={
                <div>
                  {t1(
                    'you_can_import_members_from_an_excel_file_with_the_following_steps',
                  )}
                  <ul>
                    <li>{t1('download_the_sample_template_excel_file')}</li>
                    <li>{t1('edit_the_list_of_members_in_the_excel_file')}</li>
                    <li>
                      {t1(
                        'upload_the_excel_file_by_clicking_the_upload_icon_or_simply_paste_the_url_of_the_excel_file',
                      )}
                    </li>
                    <li>{t1('click_preview')}</li>
                    <li>{t1('review_the_list_of_members_and_then_import')}</li>
                  </ul>
                </div>
              }
              type="info"
              showIcon
              className="m-b-20"
            />
            <ImportUsers
              importId={Array.isArray(subAction) && subAction[0]}
              node={rootNode}
            />
          </div>
        );
      }
      // case 'program': {
      //   contentDisplay = <Credits node={node} />;
      //   break;
      // }
      case urlActions.COURSES: {
        //'courses': {
        contentDisplay = <Courses node={rootNode} />;
        break;
      }
      case urlActions.APPROVAL_FLOW: {
        //'approval': {
        contentDisplay = <Workflow node={rootNode} />;
        break;
      }
      case urlActions.REPORTS: {
        //reports': {
        contentDisplay = (
          <Reports node={rootNode} subAction={subAction} conf={conf} />
        );
        break;
      }
      case 'import-survey-takes': {
        contentDisplay = (
          <ImportSurveyTakes enrolmentPlan={rootNode} subAction={subAction} />
        );
        break;
      }
      case urlActions.COURSE_STUDENT_ARRANGEMENT_STATUS: {
        contentDisplay = <CourseStudentArrangementStatus node={rootNode} />;
        break;
      }
      default:
        if (
          isEnrolmentPlanSharedFromAncestorOrganizations(rootNode) &&
          !isEnrolmentOrganizationMyOrganization(userInfo, rootNode)
        ) {
          contentDisplay = (
            <Redirect
              to={routes.url(
                'node_edit',
                Object.assign({}, rootNode, {
                  ntype: 'enrolment_plan',
                  step: 'members',
                }),
              )}
            />
          );
        } else {
          contentDisplay = (
            <Redirect
              to={routes.url(
                'node_edit',
                Object.assign({}, rootNode, {
                  ntype: 'enrolment_plan',
                  step: 'dashboard',
                }),
              )}
            />
          );
        }
    }

    return contentDisplay;
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.rootNode &&
      !isEqual(this.props.rootNode, nextProps.rootNode)
    ) {
      const siteTitle = `${t1('enrolment_plan')}: ${
        nextProps.rootNode.name
      } (${timestampToDateTimeString(
        nextProps.rootNode.start_date,
      )} - ${timestampToDateTimeString(nextProps.rootNode.end_date)})`;
      this.props.dispatch(actions.setTopMenuElement({ siteTitle }));
    }
  }

  render() {
    const { rootNode, action, conf } = this.props;

    return (
      <div>
        <SubLeftMenuContext
          node={rootNode}
          schema={menuItems(rootNode, conf)}
        />
        <SubTopMenuContext
          lastBreadcrumbName={get(rootNode, 'name')}
          action={action}
          schema={this.getTopMenuSchemaByAction(this.props)}
          isSmallSize
        />
        {this.getContentByAction()}
      </div>
    );
  }
}

EnrolmentPlanEditContainer.propTypes = {
  action: PropTypes.string,
  dispatch: PropTypes.func.isRequired,
};

EnrolmentPlanEditContainer.defaultProps = {
  action: '',
  dispatch: () => {},
};

function mapStateToProps(state, props) {
  return {
    conf: get(state, 'domainInfo.conf'),
  };
}

export default connect(mapStateToProps)(
  withNodeEditContainer(
    withFeatureFlags()(withUserInfo(EnrolmentPlanEditContainer)),
  ),
);
