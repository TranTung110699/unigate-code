import React from 'react';
import DetailOnDialog from 'components/common/detail-on-dialog';
import UserAvatarListPreview from 'components/common/users-avatar-list/preview';
import Icon from 'components/common/Icon';
import FlatButton from 'components/common/mui/FlatButton';
import sagaActions from 'actions/node/saga-creators';
import { connect } from 'react-redux';
import { t1 } from 'translate';
import {
  getAssignmentMarkingTeachers,
  getCourseStaffWhoCouldBeTeacher,
} from './utils';
import Edit from './edit';

class MarkingTeachers extends React.Component {
  style = {
    minWidth: 0,
  };

  avatarStyle = {
    margin: 2,
  };

  renderPreview = ({ showFull }) => {
    const { groupAssignment, course } = this.props;
    const markingTeachers = getAssignmentMarkingTeachers(
      course,
      groupAssignment,
    );
    if (!Array.isArray(markingTeachers) || markingTeachers.length === 0) {
      return (
        <FlatButton onClick={showFull}>
          <Icon icon="add" />
          {t1('click_to_add')}
        </FlatButton>
      );
    }
    return (
      <div>
        <UserAvatarListPreview users={markingTeachers} onClick={showFull} />
      </div>
    );
  };

  handleEditSubmit = ({ marking_teachers }, onSuccess) => {
    const { course, dispatch, groupAssignment } = this.props;
    const data = {
      ntype: 'course',
      id: course.id,
      iid: course.iid,
      marking_teachers,
      assignment_iid: groupAssignment.iid,
    };

    dispatch(
      sagaActions.updateNodeRequest({
        iid: '',
        data,
        step: 'assignment_marking_teachers',
        requestSuccessful: onSuccess,
      }),
    );
  };

  renderFull = ({ closeDialog }) => {
    const { groupAssignment, course } = this.props;
    return (
      <Edit
        onSubmit={(values) => this.handleEditSubmit(values, closeDialog)}
        staff={getCourseStaffWhoCouldBeTeacher(course)}
        initialValues={{
          marking_teachers: getAssignmentMarkingTeachers(
            course,
            groupAssignment,
          ),
        }}
        form={`marking_teachers_${groupAssignment && groupAssignment.iid}`}
      />
    );
  };

  render() {
    return (
      <DetailOnDialog
        {...this.props}
        renderPreview={this.renderPreview}
        renderFull={this.renderFull}
      />
    );
  }
}

export default connect()(MarkingTeachers);
