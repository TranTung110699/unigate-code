import React from 'react';
import PropTypes from 'prop-types';
import ChangeStaffStatus from '../../common/UpdateStaffStatus';

class Index extends React.Component {
  render() {
    const { node } = this.props;
    return <ChangeStaffStatus node={node} />;
  }
}

Index.propTypes = {
  className: PropTypes.string,
};

Index.defaultProps = {
  className: '',
};

export default Index;
