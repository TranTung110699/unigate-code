import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Search from './search/Layout';
import { getSearchFormId } from './common/utils';

class GroupStaff extends React.Component {
  cssClass = 'admin-group-staff';

  render() {
    const { className, group } = this.props;
    const componentClassName = `${className || ''} ${this.cssClass}`;

    return (
      <div className={componentClassName}>
        <Search formid={getSearchFormId(group)} node={group} />
      </div>
    );
  }
}

GroupStaff.propTypes = {
  className: PropTypes.string,
};

GroupStaff.defaultProps = {
  className: '',
};

export default connect()(GroupStaff);
