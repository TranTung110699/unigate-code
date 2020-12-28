/* eslint-disable react/prop-types,no-undef */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import NoResults from 'components/admin/abac-role/concrete-role/search/NoResultsShowAbstractRoles';
import { abacRoleTypes } from 'configs/constants';
import { browserHistory } from 'react-router';
import { getSearchFormId } from './common/utils';

class AbstractRole extends React.Component {
  cssClass = 'admin-department-role';

  render() {
    const { node } = this.props;

    let type = node.type || node.ntype;
    // ROLE THAT APPLIED TO ORGANIZATIONS WILL HAVE TYPE SCHOOL
    if (type === 'organization') {
      type = abacRoleTypes.SCHOOL;
    }

    return (
      <div>
        <NoResults type={type} formid={getSearchFormId(node)} node={node} />;
      </div>
    );
  }
}

AbstractRole.propTypes = {
  className: PropTypes.string,
};

AbstractRole.defaultProps = {
  className: '',
};

export default connect()(AbstractRole);
