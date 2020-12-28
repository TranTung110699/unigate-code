import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import get from 'lodash.get';

import { t1 } from 'translate';
import Links from 'routes/links';
import { getUrl } from 'routes/links/common';
import actions from 'actions/creators';
import sagaActions from 'actions/node/saga-creators';
import { abacRoleTypes } from 'configs/constants';
import { getThemeConfig } from 'utils/selectors';

import { formatSiteTitle } from 'common/layout';
import SubLeftMenuContext from 'common/context/menu/SubMenuLeft';
import SubTopMenuContext from 'common/context/menu/SubMenuTop';

import Icon from 'components/common/Icon';
import Loading from 'components/common/loading';
import PrimaryButton from 'components/common/primary-button';
import RaisedButton from 'components/common/mui/RaisedButton';

import withNodeEditContainer from 'components/admin/node/edit/withNodeEditContainer';
import Dashboard from 'components/admin/course/mainstage/dashboard';
import GroupAssignment from 'components/admin/group_assignment';
import AssignmentGroup from 'components/admin/group_assignment/group/manage';
import Communicate from 'components/admin/course/mainstage/communication/Form';

import SearchReport from 'components/admin/report/dashboard/search';
import ScoreAndMarking from 'components/admin/course/mainstage/score-and-marking';

import CertificateLayout from 'components/admin/course/mainstage/certificate/Layout';
import SessionLayout from 'components/admin/course/mainstage/session/Layout';
import SessionManager from 'components/admin/session/search/Layout';
import AttendanceLayout from 'components/admin/course/mainstage/attendance/Layout';
import Roles from 'components/admin/course/mainstage/roles/Layout';
import TimetableV2 from 'components/timetable_v2';
import Schedule from 'components/timetable/views';
import Staff from 'components/admin/course/mainstage/staff/Layout';
import Pricing from 'components/admin/course/mainstage/pricing/Layout';
import CourseComments from 'components/admin/course/mainstage/comments';
import Survey from 'components/admin/course/mainstage/survey';
import ReportLayout from 'components/admin/report/node/draw-graph/Layout';
import CourseInvite from '../mainstage/invite';
import CourseEdit from '../mainstage/info';
import ManageRubric from '../mainstage/manage-rubric';

import ButtonNew from 'components/admin/user-abac-role/staff/new-staff/ButtonNew';
import { getSearchFormId } from 'components/admin/user-abac-role/staff/common/utils';
import { getSearchFormId as getSurveySearchFormId } from 'components/admin/course/mainstage/survey/common';
import NewSurveyButton from 'components/admin/course/mainstage/survey/new/ButtonNew';
import AbstractRoles from 'components/admin/organization/edit/EditContainer';
import { CourseActions } from 'configs/constants/permission';
import Permission from 'components/common/permission/Permission';
import { isK12 } from 'common/k12';
import { menuItems } from './sub-menu-left-configs';
import { menuItems as K12MenuItems } from './k12-sub-menu-left-configs';
import ImportStudentsToCourse from '../mainstage/import-students';

import MarkingOpenEndedQuestion from 'components/admin/course/mainstage/score-and-marking/marking-open-ended-question';
import { parse } from 'query-string';
import urlActions from '../routes/url-actions';

const USER_TARGET = 'user';
const GROUP_TARGET = 'group';

class CourseEditContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  getParamsForCheckPermission = (props) => {
    const { course } = props;
    return {
      actions: CourseActions,
      resourceIids: course && [course.iid],
      type: abacRoleTypes.COURSE,
    };
  };

  iconStyle = {
    fontSize: 20,
    marginTop: '8px',
  };

  getElementRightMenuTopForRolesAction = (props) => {
    const { course } = props;

    return (
      <Fragment>
        <Link to={getUrl(`course/${course && course.iid}/roles/new`)}>
          <PrimaryButton
            name="submit"
            type="submit"
            icon={<Icon icon="plus" />}
            label={t1('new_role')}
          />
        </Link>
      </Fragment>
    );
  };

  getElementRightMenuTopForStaffAction = (props) => {
    const { course } = props;

    return (
      <Fragment>
        <ButtonNew
          searchFormId={getSearchFormId(course)}
          node={course}
          ntype={'course'}
        />
      </Fragment>
    );
  };

  getElementRightMenuTop = (props) => {
    const { course, action, permissions, hasPermission } = props;
    const hasPermissionManagerCollaborator =
      hasPermission &&
      hasPermission(
        CourseActions.COURSE_ACTION_MANAGE_COLLABORATORS,
        course && course.iid,
        permissions,
      );

    switch (action) {
      case urlActions.ROLES:
        return (
          hasPermissionManagerCollaborator &&
          this.getElementRightMenuTopForRolesAction(props)
        );
      case urlActions.STAFF:
        return (
          hasPermissionManagerCollaborator &&
          this.getElementRightMenuTopForStaffAction(props)
        );
      case urlActions.INVITE:
        return (
          <span>
            {get(course, 'max_student')
              ? t1('this_course_has_%s/%s_students', [
                  get(course, 'number_of_students'),
                  get(course, 'max_student'),
                ])
              : t1('this_course_has_%s_students', [
                  get(course, 'number_of_students') || 0,
                ])}
          </span>
        );
      case urlActions.SURVEY:
        return (
          <NewSurveyButton
            node={course}
            searchFormId={getSurveySearchFormId(course)}
          />
        );
      default:
        return (
          <Link to={Links.overViewCourse(course, true)} target="_blank">
            <RaisedButton label={t1('preview')} primary />{' '}
          </Link>
        );
    }
  };

  getContentByAction(props) {
    const {
      dispatch,
      action,
      course,
      themeConfig,
      location,
      permissions,
      hasPermission,
      ...options
    } = props;
    const { subAction, search } = options;
    if (!course || !course.iid) {
      return <Loading />;
    }

    // if (
    //   action &&
    //   !getMenuIdsAvailable(course, themeConfig.type).includes(action) &&
    //   !['attendance'].includes(action)
    // ) {
    //   return <Dashboard node={course} {...options} />;
    // }
    let contentDisplay = '';
    switch (action) {
      case 'rubric': {
        return <ManageRubric node={course} />;
      }
      case urlActions.DASHBOARD: {
        contentDisplay = (
          <Dashboard
            node={course}
            {...options}
            permissions={permissions}
            hasPermission={hasPermission}
          />
        );
        break;
      }
      case urlActions.ASSIGNMENTS: {
        const { itemAncestors } = options;
        if (!Array.isArray(itemAncestors) || itemAncestors.length === 1) {
          contentDisplay = <GroupAssignment node={course} />;
          break;
        } else {
          const exercise = itemAncestors.find(
            (item) => item && item.ntype === 'exercise',
          );
          const sco = itemAncestors.find(
            (item) => item && item.ntype === 'sco',
          );
          contentDisplay = (
            <AssignmentGroup course={course} sco={sco} exercise={exercise} />
          );
          break;
        }
      }
      case urlActions.GROUPS: {
        const itemAncestors = props.itemAncestors || [];
        const group = itemAncestors[itemAncestors.length - 1];
        const groups =
          group && group.iid && group.ntype === 'group'
            ? group.iid.split('+')
            : [];
        contentDisplay = (
          <SearchReport
            node={course}
            target={groups.length ? USER_TARGET : GROUP_TARGET}
            groups={groups}
          />
        );
        break;
      }
      case urlActions.IMPORT_MEMBERS: {
        contentDisplay = (
          <ImportStudentsToCourse course={course} subAction={subAction} />
        );
        break;
      }
      case urlActions.INVITE: {
        contentDisplay = (
          <CourseInvite
            exportMembers
            course={course}
            permissions={permissions}
            hasPermission={hasPermission}
          />
        );
        break;
      }
      // TODO is this still in use???
      case urlActions.INVITE_PLAN: {
        contentDisplay = (
          <CourseInvite
            course={course}
            permissions={permissions}
            hasPermission={hasPermission}
            invitingEpMembers
          />
        );
        break;
      }
      // case 'marking': {
      //   contentDisplay = <Marking node={course} action={action} />;
      //   break;
      // }
      case urlActions.MARK_OE_QUESTION: {
        const {
          user_iid: userIid,
          question_iid: questionIid,
          default_comment_id_to_focus: defaultCommentIdToFocus,
        } = parse(search);

        contentDisplay = (
          <MarkingOpenEndedQuestion
            node={course}
            userIid={userIid}
            questionIid={questionIid}
            defaultCommentIdToFocus={defaultCommentIdToFocus}
          />
        );
        break;
      }

      case urlActions.SCORE: {
        contentDisplay = (
          <ScoreAndMarking
            course={course}
            action={action}
            subAction={subAction}
            permissions={permissions}
            hasPermission={hasPermission}
          />
        );

        break;
      }

      case urlActions.CERTIFICATE: {
        contentDisplay = <CertificateLayout node={course} action={action} />;
        break;
      }
      // case 'timetable': {
      //   contentDisplay = <Timetable classIid={course.iid} />;
      //   break;
      // }
      case urlActions.TIMETABLE: {
        contentDisplay = <TimetableV2 course_iid={course.iid} />;
        break;
      }
      case urlActions.SCHEDULE: {
        contentDisplay = <Schedule classIid={course.iid} />;
        break;
      }
      case urlActions.SESSION_ATTENDANCE: {
        contentDisplay = (
          <SessionLayout
            node={course}
            action={action}
            permissions={permissions}
            hasPermission={hasPermission}
          />
        );
        break;
      }
      case urlActions.SESSION_MANAGER: {
        contentDisplay = (
          <SessionManager
            node={course}
            permissions={permissions}
            hasPermission={hasPermission}
          />
        );
        break;
      }
      case urlActions.ATTENDANCE: {
        const itemAncestors = props.itemAncestors || [];
        const sessionIid =
          itemAncestors && itemAncestors[1] && itemAncestors[1].iid
            ? itemAncestors[1].iid
            : null;
        contentDisplay = (
          <AttendanceLayout
            node={course}
            action={action}
            sessionIid={sessionIid}
            permissions={props.permissions}
            hasPermission={props.hasPermission}
          />
        );
        break;
      }
      case urlActions.ABSTRACT_ROLES: {
        contentDisplay = (
          <AbstractRoles {...props} action={subAction && subAction[0]} />
        );
        break;
      }
      // case 'test': {
      //   contentDisplay = <Marking node={course} action={action} />;
      //   break;
      // }
      case urlActions.COMMUNICATION: {
        contentDisplay = (
          <Communicate
            params={{
              targets: { node_type: course.ntype, node_iid: course.iid },
            }}
            node={course}
          />
        );
        break;
      }
      case urlActions.FEEDBACK: {
        contentDisplay = <CourseComments course={course} />;
        break;
      }
      case urlActions.SURVEY: {
        contentDisplay = <Survey node={course} />;
        break;
      }
      case urlActions.UPDATE: {
        contentDisplay = (
          <CourseEdit
            course={course}
            hasPermission={hasPermission}
            permissions={permissions}
          />
        );

        break;
      }
      case urlActions.REPORT: {
        contentDisplay = <ReportLayout node={course} />;
        break;
      }
      case urlActions.STAFF: {
        contentDisplay = (
          <Staff
            node={course}
            permissions={props.permissions}
            hasPermission={props.hasPermission}
          />
        );
        break;
      }
      // case 'avatar': {
      //   contentDisplay = (
      //     <EditAvatar
      //       node={course}
      //       readOnly={
      //         !hasPermission ||
      //         !hasPermission(
      //           CourseActions.COURSE_ACTION_UPDATE,
      //           course && course.iid,
      //           permissions,
      //         )
      //       }
      //     />
      //   );
      //   break;
      // }
      case urlActions.PRICING: {
        contentDisplay = <Pricing node={course} />;
        break;
      }
      case urlActions.ROLES: {
        contentDisplay = (
          <Roles
            node={course}
            action={subAction && subAction[0]}
            location={location}
            permissions={permissions}
            hasPermission={hasPermission}
          />
        );
        break;
      }
      // case 'paper': {
      //   contentDisplay = <Paper course={course} />;
      //   break;
      // }
      default: {
        contentDisplay = <Dashboard node={course} />;
      }
    }

    return contentDisplay;
  }

  componentWillReceiveProps(nextProps) {
    let { course, action, syllabus } = this.props;
    if (
      nextProps &&
      nextProps.course &&
      (nextProps.course.iid !== course.iid ||
        nextProps.action !== action ||
        nextProps.course.number_of_students !== course.number_of_students)
    ) {
      course = nextProps.course || course;

      const siteTitle = course.name
        ? course.credit_syllabus
          ? formatSiteTitle('class', course.name)
          : formatSiteTitle('course', course.name)
        : t1('course');
      const { dispatch } = this.props;

      dispatch(actions.setTopMenuElement({ siteTitle }));
    }
  }

  render() {
    const contentDisplay = this.getContentByAction(this.props);
    const {
      course,
      schoolType,
      themeConfig,
      conf,
      action,
      syllabus,
      hasPermission,
      permissions,
      k12,
    } = this.props;

    const theMenuItems = k12 ? K12MenuItems : menuItems;
    return [
      !this.props.noSubMenu && (
        <SubLeftMenuContext
          node={course}
          schema={theMenuItems(
            course || {},
            schoolType,
            themeConfig,
            conf,
            hasPermission,
            permissions,
          )}
        />
      ),
      <SubTopMenuContext
        lastBreadcrumbName={course.name}
        action={action}
        button={this.getElementRightMenuTop(this.props)}
        node={syllabus}
        isSmallSize
      />,
      contentDisplay,
    ];
  }
}

CourseEditContainer.propTypes = {
  action: PropTypes.string,
  dispatch: PropTypes.func.isRequired,
  itemAncestors: PropTypes.arrayOf(PropTypes.any),
  course: PropTypes.shape(),
  syllabus: PropTypes.shape(),
  themeConfig: PropTypes.shape(),
};

CourseEditContainer.defaultProps = {
  action: '',
  dispatch: () => {},
  itemAncestors: [],
  course: {},
  syllabus: {},
  themeConfig: {},
};

const mapStateToProps = (state, props) => {
  const course = props.node || {};
  const nodes = props.nodes || {};
  const syllabus = nodes[course.syllabus];
  return {
    course,
    syllabus,
    themeConfig: getThemeConfig(state),
    schoolType: get(state, 'domainInfo.school.type'),
    conf: get(state, 'domainInfo.conf'),
    k12: isK12(state),
  };
};

const refreshPermission = (props, nextProps) =>
  get(props, 'course.iid') !== get(nextProps, 'course.iid');

export default withNodeEditContainer(
  connect(mapStateToProps)(Permission(CourseEditContainer, refreshPermission)),
);
