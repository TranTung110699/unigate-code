/* eslint-disable jsx-a11y/anchor-is-valid,react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import Form from 'components/admin/abac-role/concrete-role/new-and-edit/Form';
import { abacRoleAppliedScopes, abacRoleTypes } from 'configs/constants';

class NewSyllabusRole extends React.PureComponent {
  render() {
    const { className, node, ...rest } = this.props;
    const componentClassName = `${className || ''}`;
    const appliedTarget = {};

    for (const attr in node) {
      if (
        (!Array.isArray(node[attr]) && !(node[attr] instanceof Object)) ||
        attr === 'organizations'
      ) {
        appliedTarget[attr] = node[attr];
      }
    }

    return (
      <div className={componentClassName}>
        <Form
          {...rest}
          type={abacRoleTypes.SYLLABUS}
          appliedScope={abacRoleAppliedScopes.SYLLABUS}
          appliedTarget={appliedTarget}
          formid="new_syllabus_role"
          mode="new"
          step={'syllabus'}
        />
      </div>
    );
  }
}

NewSyllabusRole.propTypes = {
  className: PropTypes.string,
};

NewSyllabusRole.defaultProps = {
  className: '',
};

export default NewSyllabusRole;
