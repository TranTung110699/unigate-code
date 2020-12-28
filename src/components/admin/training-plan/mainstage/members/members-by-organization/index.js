import React from 'react';
import PropTypes from 'prop-types';
import Search from './search';

class MembersByOrganization extends React.PureComponent {
  render() {
    const { className, node } = this.props;
    const componentClassName = `${className || ''}`;

    return (
      <div className={componentClassName}>
        <Search node={node} noActions />
      </div>
    );
  }
}

MembersByOrganization.propTypes = {
  className: PropTypes.string,
};

MembersByOrganization.defaultProps = {
  className: '',
};

export default MembersByOrganization;
