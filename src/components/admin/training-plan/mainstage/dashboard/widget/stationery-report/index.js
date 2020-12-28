import React from 'react';
import PropTypes from 'prop-types';
import { t1 } from 'translate';
import Search from './search';
import apiUrls from 'api-endpoints';
import assetApiUrls from 'components/admin/asset-manager/endpoints';

class StationeryReport extends React.Component {
  render() {
    const { node } = this.props;
    const formid = 'stationery_usage_rate';
    const hiddenFields = {
      training_plan_iid: node.iid,
    };

    return (
      <Search
        formid={formid}
        node={node}
        hiddenFields={hiddenFields}
        alternativeApi={assetApiUrls.training_plan_stationery_usage_rate}
      />
    );
  }
}

StationeryReport.propTypes = {
  node: PropTypes.shape(),
};

StationeryReport.defaultProps = {
  node: {},
};

export default StationeryReport;
