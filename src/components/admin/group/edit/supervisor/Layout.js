import React from 'react';
import PropTypes from 'prop-types';
import Search from './search/Layout';
import { getSupervisorSearchFormId } from './utils';

/**
 * Group supervisor search
 * @param {string} className
 * @param {Object} group
 * @returns {JSX.Element}
 * @constructor
 */
function GroupSupervisor({ className, group }) {
  const componentClassName = `${className || ''}`;

  return (
    <div className={componentClassName}>
      <Search formid={getSupervisorSearchFormId(group)} node={group} />
    </div>
  );
}

GroupSupervisor.propTypes = {
  className: PropTypes.string,
};

GroupSupervisor.defaultProps = {
  className: '',
};

export default GroupSupervisor;
