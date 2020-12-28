import React, { Component } from 'react';
import { connect } from 'react-redux';
import { submit } from 'redux-form';
import { Link } from 'react-router-dom';
import get from 'lodash.get';

import { t1 } from 'translate';
import { getUrl } from 'routes/links/common';
import nodeActions from 'actions/node/creators';
import { extractObject } from 'common/utils/Array';

import Icon from 'components/common/Icon';
import RaisedButton from 'components/common/mui/RaisedButton';
import FormNewInvite from 'components/admin/invite/new/FormNewInvite';
import InviteEnrolment from 'components/admin/invite/new/Form';
import EnrolmentPlanSearch from 'components/admin/invite/enrolment-session';

import BatchInviteEnrolmentPlanMembersToCourseButton from 'components/admin/course/common/batch-invite-enrolment-plan-members-to-course/Button';
import { isEnrolmentPlanCourse } from 'components/admin/node/utils';

/**
 * Handles both normal invite screen and invite-ep-members-to-course screen
 */
class CourseInvite extends Component {
  fetchCourse = () => {
    const { course, dispatch } = this.props;
    dispatch(nodeActions.fetchNode(Object.assign(course)));
  };

  getSearchInviteFormId = () => {
    const { course } = this.props;
    return `search_invite_${get(course, 'iid')}`;
  };

  handleInviteChange = () => {
    const { dispatch, action } = this.props;
    if (action === 'invite') {
      dispatch(submit(this.getSearchInviteFormId()));
    }
    this.fetchCourse();
  };

  inviteSuccessFull = () => {
    const { course, dispatch } = this.props;
    const url = `/admin/${course.ntype}/${course.iid}/invite`;
    window.history.pushState(null, null, url);
    dispatch(nodeActions.setEditingItem({ action: 'invite' }));
    this.handleInviteChange();
  };

  render() {
    const {
      course,
      permissions,
      hasPermission,
      invitingEpMembers, // whether or not we wanna invite members in EP only
      exportMembers,
    } = this.props;

    if (invitingEpMembers) {
      const val = extractObject(course, ['name', 'iid', 'id', 'ntype']);
      return (
        <EnrolmentPlanSearch
          modal
          course={course}
          hiddenFields={{
            learning_items: [{ ...val }],
          }}
          inviteSuccessFull={this.inviteSuccessFull}
          permissions={permissions}
          hasPermission={hasPermission}
        />
      );
    }

    const value = extractObject(course, [
      'name',
      'iid',
      'id',
      'ntype',
      'credit_syllabus',
    ]);
    value.type = course.ntype;

    return (
      <InviteEnrolment
        formid={this.getSearchInviteFormId()}
        step="node"
        node={course}
        hiddenFields={{ items: [{ ...value }] }}
        inviteSuccessFull={this.inviteSuccessFull}
        handleInviteChange={this.handleInviteChange}
        permissions={permissions}
        hasPermission={hasPermission}
        isCourseInvite
        exportMembers={exportMembers}
        formNewInvite={
          <FormNewInvite
            modal
            course={course}
            hiddenFields={{
              learning_items: [{ ...value }],
              _sand_step: 'course',
            }}
            inviteSuccessFull={this.inviteSuccessFull}
          />
        }
        buttonImportInvite={
          <Link to={getUrl('node_edit', { ...course, step: 'import' })}>
            <RaisedButton
              primary
              icon={<Icon icon="import" style={{ color: 'white' }} />}
              label={t1('import_students')}
              className="m-l-10 m-r-10"
            />
          </Link>
        }
        buttonBatchInviteEnrolmentPlanMembers={
          isEnrolmentPlanCourse(course) && (
            <BatchInviteEnrolmentPlanMembersToCourseButton
              course={course}
              inviteSuccessFull={this.inviteSuccessFull}
            />
          )
        }
      />
    );
  }
}

export default connect()(CourseInvite);
