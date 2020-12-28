/* eslint-disable jsx-a11y/anchor-is-valid,react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import Form from 'components/admin/abac-role/concrete-role/new-and-edit/Form';
import { abacRoleAppliedScopes, abacRoleTypes } from 'configs/constants';
import { getSearchFormId } from '../common/utils';
import { submit } from 'redux-form';
import { connect } from 'react-redux';

class New extends React.PureComponent {
  render() {
    const { className, node, ...rest } = this.props;
    const componentClassName = `${className || ''}`;

    return (
      <div className={componentClassName}>
        <Form
          {...rest}
          type={abacRoleTypes.CONTEST}
          appliedScope={abacRoleAppliedScopes.CONTEST}
          appliedTarget={node}
          formid="new_contest_role"
          mode="new"
          step={'contest'}
          requestSuccessful={() =>
            this.props.dispatch(submit(getSearchFormId(node)))
          }
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

export default connect()(New);
