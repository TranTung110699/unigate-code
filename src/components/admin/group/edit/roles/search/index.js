import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Search from 'components/admin/abac-role/concrete-role/search';
import { abacRoleTypes } from 'configs/constants';
import { getSearchFormId } from '../common/utils';

class GroupRole extends React.Component {
  cssClass = 'admin-group-role';

  render() {
    const { className, group, location } = this.props;
    const componentClassName = `${className || ''} ${this.cssClass}`;

    return (
      <div className={componentClassName}>
        <Search
          step={'group'}
          type={abacRoleTypes.GROUP}
          formid={getSearchFormId(group)}
          node={group}
          location={location}
        />
      </div>
    );
  }
}

GroupRole.propTypes = {
  className: PropTypes.string,
};

GroupRole.defaultProps = {
  className: '',
};

export default connect()(GroupRole);
