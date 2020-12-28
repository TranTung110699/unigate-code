import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Search from './search/Layout';

class JobPositions extends React.Component {
  cssClass = 'admin-job-positions';

  render() {
    const { node } = this.props;

    return <Search formid="job_position_search_form" node={node} />;
  }
}

JobPositions.propTypes = {
  className: PropTypes.string,
};

JobPositions.defaultProps = {
  className: '',
};

export default connect()(JobPositions);
