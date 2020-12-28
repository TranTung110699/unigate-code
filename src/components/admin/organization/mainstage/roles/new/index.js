/* eslint-disable react/prop-types,no-undef,quotes */
import React from 'react';
import PropTypes from 'prop-types';
import { getUrl } from 'routes/links/common';
import { withRouter } from 'react-router-dom';
import Form from 'components/admin/abac-role/concrete-role/new-and-edit/Form';
import { abacRoleAppliedScopes, abacRoleTypes } from 'configs/constants';

class New extends React.PureComponent {
  constructor(props) {
    super(props);

    this.requestSuccessful = this.requestSuccessful.bind(this);
  }

  requestSuccessful = () => {
    const { history, organization } = this.props;
    const url = getUrl(
      `organization/${organization && organization.iid}/roles`,
    );

    history.push(url);
  };

  render() {
    const { className, organization, ...rest } = this.props;
    const componentClassName = `${className || ''}`;

    return (
      <div className={componentClassName}>
        <Form
          {...rest}
          type={abacRoleTypes.SCHOOL}
          appliedScope={abacRoleAppliedScopes.SCHOOL}
          appliedTarget={organization}
          formid="new_department_role"
          mode="new"
          step={'organization'}
          requestSuccessful={this.requestSuccessful}
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

export default withRouter(New);
