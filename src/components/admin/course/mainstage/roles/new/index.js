/* eslint-disable jsx-a11y/anchor-is-valid,react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import Form from 'components/admin/abac-role/concrete-role/new-and-edit/Form';
import { abacRoleAppliedScopes, abacRoleTypes } from 'configs/constants';

class New extends React.PureComponent {
  render() {
    const { className, node, ...rest } = this.props;
    const componentClassName = `${className || ''}`;

    return (
      <div className={componentClassName}>
        <Form
          {...rest}
          type={abacRoleTypes.COURSE}
          appliedScope={abacRoleAppliedScopes.COURSE}
          appliedTarget={node}
          formid="new_course_role"
          mode="new"
          step={'course'}
        />
      </div>
    );
  }
}

New.propTypes = {
  className: PropTypes.string,
};

New.defaultProps = {
  className: '',
};

export default New;
