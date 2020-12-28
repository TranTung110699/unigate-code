import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { reset } from 'redux-form';
import { t1 } from 'translate';
import commonSagaActions from 'actions/saga-creators';
import Form from 'schema-form/Form';
import apiUrls from 'api-endpoints';
import schema from './schema';

class AssignmentGroupMemberAdd extends React.Component {
  cssClass = 'assignment-group-member-add';

  formid = 'assignment_group_member_add';

  handleSubmit = (values) => {
    const { dispatch, group, searchFormId } = this.props;

    const userIids =
      values &&
      Array.isArray(values.members) &&
      values.members.map((member) => member.iid);

    if (Array.isArray(userIids) && userIids.length > 0) {
      const data = {
        oid: userIids,
        sid: group && group.iid,
        object: 'user',
        subject: 'category',
        type: 'user_group',
        rt: 1,
        formid: searchFormId,
        sendMail: values.sendMail,
      };
      dispatch(
        commonSagaActions.changeRelationRequest(
          apiUrls.add_relation,
          data,
          true,
          () => {
            dispatch(reset(this.formid));
          },
        ),
      );
    }
  };

  render() {
    const { className, group } = this.props;
    return (
      <div className={`${className || ''} ${this.cssClass}`}>
        <Form
          schema={schema}
          node={group}
          ntype="group"
          mode="new"
          onSubmit={this.handleSubmit}
          formid={this.formid}
          params={{
            groups_to_exclude: group.iid,
          }}
          submitLabels={{
            new: t1('add_members_to_group'),
          }}
          notShowErrorMessageOnButton
        />
      </div>
    );
  }
}

AssignmentGroupMemberAdd.propTypes = {
  className: PropTypes.string,
};

AssignmentGroupMemberAdd.defaultProps = {
  className: '',
};

export default connect()(AssignmentGroupMemberAdd);
