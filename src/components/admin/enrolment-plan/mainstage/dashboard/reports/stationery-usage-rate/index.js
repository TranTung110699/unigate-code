import React from 'react';
import PropTypes from 'prop-types';
import Search from 'components/admin/training-plan/mainstage/dashboard/widget/stationery-report/search';
import apiUrls from 'components/admin/enrolment-plan/endpoints';

class StationeryUsageRate extends React.Component {
  render() {
    const { node } = this.props;
    const formid = 'stationery_usage_rate';
    const hiddenFields = {
      enrolment_plan_iid: node.iid,
    };

    return (
      <Search
        formid={formid}
        node={node}
        hiddenFields={hiddenFields}
        alternativeApi={apiUrls.enrolment_plan_stationery_usage_rate}
      />
    );
  }
}

StationeryUsageRate.propTypes = {
  node: PropTypes.shape(),
};

StationeryUsageRate.defaultProps = {
  node: {},
};

export default StationeryUsageRate;
