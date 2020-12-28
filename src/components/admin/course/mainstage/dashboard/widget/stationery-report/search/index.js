import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { t1 } from 'translate';
import apiUrls from 'api-endpoints';
import assetApiUrls from 'components/admin/asset-manager/endpoints';
import SearchWrapper from 'components/common/search-wrap-v2/SearchWrapper';

import Results from './Results';
import schema from 'components/admin/asset-manager/report/schema/search-form';

class StationeryUsageRate extends React.Component {
  renderResultComponent = (data, props) => {
    const { formid } = this.props;

    return <Results {...props} data={data} searchFormId={formid} />;
  };

  render() {
    const { node, formid } = this.props;

    return (
      <SearchWrapper
        formid={formid}
        alternativeApi={assetApiUrls.course_stationery_usage_rate}
        hiddenFields={{
          course_iid: node.iid,
        }}
        schema={schema}
        renderResultsComponent={this.renderResultComponent}
        paginationProps={{
          onlyShowIfTotalBigEnough: false,
        }}
        noResultText={t1('no_data')}
      />
    );
  }
}

StationeryUsageRate.propTypes = {
  formid: PropTypes.string,
  node: PropTypes.shape(),
  noSearchForm: PropTypes.bool,
};

StationeryUsageRate.defaultProps = {
  formid: '',
  node: {},
  noSearchForm: true,
};

export default connect()(StationeryUsageRate);
