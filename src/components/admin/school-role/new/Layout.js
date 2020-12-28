import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import getLodash from 'lodash.get';
import { abacRoleAppliedScopes, abacRoleTypes } from 'configs/constants';
import Form from 'components/admin/abac-role/concrete-role/new-and-edit/Form';
import SubTopMenuContext from 'common/context/menu/SubMenuTop';
import topMenuSchema from '../menu/teacher-menus';

class Layout extends React.Component {
  render() {
    const { className, school, ...rest } = this.props;
    const componentClassName = `${className || ''}`;

    return (
      <div>
        <SubTopMenuContext schema={topMenuSchema()} />
        <div className={componentClassName}>
          <Form
            {...rest}
            type={abacRoleTypes.SCHOOL}
            appliedScope={abacRoleAppliedScopes.SCHOOL}
            appliedTarget={school}
            formid="new_school_role"
            mode="new"
            step={'school'}
          />
        </div>
      </div>
    );
  }
}

Layout.propTypes = {
  className: PropTypes.string,
};

Layout.defaultProps = {
  className: '',
};

const mapStateToProps = (state) => {
  const allOrgTypes = getLodash(state, 'domainInfo.school.org_types') || [];
  const orgTypes = allOrgTypes.filter((orgType) => orgType.has_perm);

  return {
    orgTypes,
  };
};

export default connect(mapStateToProps)(Layout);
