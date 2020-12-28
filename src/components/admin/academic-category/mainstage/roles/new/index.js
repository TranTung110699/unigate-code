import React from 'react';
import PropTypes from 'prop-types';
import Form from 'components/admin/abac-role/concrete-role/new-and-edit/Form';
import { abacRoleAppliedScopes, abacRoleTypes } from 'configs/constants';

class New extends React.PureComponent {
  render() {
    const { className, category, ...rest } = this.props;
    const componentClassName = `${className || ''}`;

    return (
      <div className={componentClassName}>
        <Form
          {...rest}
          type={abacRoleTypes.ACADEMIC_CATEGORY}
          appliedScope={abacRoleAppliedScopes.ACADEMIC_CATEGORY}
          appliedTarget={category}
          formid="new_academic_category_role"
          mode="new"
          step={'academic_category'}
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
