import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import SearchWrapper from 'components/common/search-wrap-v2/SearchWrapper';
import schema from './schema';
import apiUrls from 'api-endpoints';
import tpApiUrls from 'components/admin/training-plan/endpoints';
import { t1 } from 'translate';
import { getSearchFormId } from '../common';
import Results from './Results';
import { getDepthOptionsForCategoryStructureLevelSearchSelector } from 'common/category-structure/selectors';

class Search extends React.Component {
  renderResultComponent = (items, props, objects, searchValues) => {
    const { node } = this.props;

    return (
      <Results
        {...props}
        items={items}
        searchFormId={getSearchFormId(node)}
        node={node}
        searchValues={searchValues}
      />
    );
  };

  render() {
    const { node, levelOptions } = this.props;
    const searchFormId = getSearchFormId(node);

    return (
      <SearchWrapper
        formid={searchFormId}
        schema={schema}
        hiddenFields={{
          training_plan_iid: node && node.iid,
          levelOptions,
        }}
        renderResultsComponent={this.renderResultComponent}
        alternativeApi={
          tpApiUrls.report_training_plan_members_group_by_organization
        }
        noResultText={t1('no_members')}
      />
    );
  }
}

Search.propTypes = {
  className: PropTypes.string,
};

Search.defaultProps = {
  className: '',
};

const mapStateToProps = createSelector(
  (state) =>
    getDepthOptionsForCategoryStructureLevelSearchSelector(state)(
      'organization',
    ),
  (depthOptionsFromConf) => ({
    levelOptions: depthOptionsFromConf.depthOptions,
  }),
);

export default connect(mapStateToProps)(Search);
