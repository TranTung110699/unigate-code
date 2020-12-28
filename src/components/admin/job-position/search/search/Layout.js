import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SearchWrapper from 'components/common/search-wrap-v2/SearchWrapper';
// import apiUrls from 'api-endpoints';
import jApiUrls from 'components/admin/job-position/endpoints';
import { t1 } from 'translate';
import schema from './schema';
import schemaAdvance from './schema-advance';
import Results from './Results';

class JobPositionsSearch extends React.Component {
  cssClass = 'admin-job-positions-search';

  renderResultComponent = (items, props, objects, searchValues) => {
    const { formid } = this.props;

    return (
      <Results
        {...props}
        items={items}
        searchFormId={formid}
        searchValues={searchValues}
      />
    );
  };

  render() {
    const { organization, formid, node } = this.props;
    let hiddenFields = {
      view: 'grid',
    };

    // backward compatibility
    if (organization && organization.iid) {
      hiddenFields = {
        ...hiddenFields,
        organizations: [Number.parseInt(organization.iid, 10)],
        notShowOrganizationField: true,
      };
    }

    // NOTE : somehow as of June 5th 2019, top_equivalent_position in 'job-positions' collection
    // is the array of top-equivalent-positions's CDANHTDUONG_EVN_ID
    if (node && node.iid) {
      hiddenFields = {
        ...hiddenFields,
        top_equivalent_position: [
          Number.parseInt(node.CDANHTDUONG_EVN_ID || node.iid, 10),
        ],
      };
    }

    return (
      <div>
        {node && node.CDANHTDUONG_EVN ? node.CDANHTDUONG_EVN : null}
        <SearchWrapper
          node={node}
          formid={formid}
          hiddenFields={hiddenFields}
          schema={schemaAdvance}
          renderResultsComponent={this.renderResultComponent}
          alternativeApi={jApiUrls.job_position_search}
          noResultText={t1('no_job_positions')}
          showSearchButton={false}
        />
      </div>
    );
  }
}

JobPositionsSearch.propTypes = {
  className: PropTypes.string,
};

JobPositionsSearch.defaultProps = {
  className: '',
};

export default connect()(JobPositionsSearch);
