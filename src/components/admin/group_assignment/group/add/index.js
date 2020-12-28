import React from 'react';
import PropTypes from 'prop-types';
import NodeNew from 'components/admin/node/new';
import groupApiUrls from 'components/admin/group/endpoints';
import { userGroupSubTypes } from 'configs/constants';
import getSchema from 'components/admin/group/schema/form';

class AssignmentGroupAdd extends React.Component {
  cssClass = 'assignment-group-add';

  render() {
    const {
      className,
      course,
      groupAssignment,
      exercise,
      requestSuccessful,
    } = this.props;
    const params = {
      context: {
        ntype: course.ntype,
        iid: course.iid,
      },
      type: 'user_group',
      sub_type: userGroupSubTypes.ASSIGNMENT_GROUP,
      exercise: {
        iid: exercise.iid,
        sco_iid: groupAssignment.iid,
      },
    };
    return (
      <div className={`${className || ''} ${this.cssClass}`}>
        <NodeNew
          alternativeApi={groupApiUrls.new_user_group}
          mode="new"
          schema={getSchema()}
          ntype="group"
          params={params}
          requestSuccessful={requestSuccessful}
        />
      </div>
    );
  }
}

AssignmentGroupAdd.propTypes = {
  className: PropTypes.string,
};

AssignmentGroupAdd.defaultProps = {
  className: '',
};

export default AssignmentGroupAdd;
