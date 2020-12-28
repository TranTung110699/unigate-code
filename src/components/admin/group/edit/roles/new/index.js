import React from 'react';
import PropTypes from 'prop-types';
import Form from 'components/admin/abac-role/concrete-role/new-and-edit/Form';
import { abacRoleAppliedScopes, abacRoleTypes } from 'configs/constants';

class New extends React.PureComponent {
  render() {
    const { className, group, ...rest } = this.props;
    const componentClassName = `${className || ''}`;

    return (
      <div className={componentClassName}>
        <Form
          {...rest}
          type={abacRoleTypes.GROUP}
          appliedScope={abacRoleAppliedScopes.GROUP}
          appliedTarget={group}
          formid="new_group_role"
          mode="new"
          step={'group'}
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
