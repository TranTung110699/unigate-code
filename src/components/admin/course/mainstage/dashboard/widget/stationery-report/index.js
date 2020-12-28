import React from 'react';
import PropTypes from 'prop-types';
import { t1 } from 'translate';
import Search from './search';

class StationeryReport extends React.Component {
  render() {
    const { node } = this.props;
    const formid = 'stationery_usage_rate';

    return <Search formid={formid} node={node} />;
  }
}

StationeryReport.propTypes = {
  node: PropTypes.shape(),
};

StationeryReport.defaultProps = {
  node: {},
};

export default StationeryReport;
