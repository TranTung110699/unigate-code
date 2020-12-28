import React, { Component } from 'react';
import PropTypes from 'prop-types';
import apiUrls from 'api-endpoints';
import withSchoolConfigs from 'common/hoc/withSchoolConfigs';
import SearchWrapper from 'components/common/search-wrap-v2/SearchWrapper';
import Results from './results';
import schema from './schema';

class SearchInvite extends Component {
  displayFieldsWhenNodeExists = [
    'q',
    'date_gte',
    'date_lte',
    'user_codes',
    'sinvite_status',
  ];

  getFormId = () => {
    const { node, formid } = this.props;
    return formid || `sinvite_search_${node && node.iid}`;
  };

  renderResultComponent = (items, props, objects, searchValues, resultId) => (
    <Results
      {...props}
      searchValues={searchValues}
      resultId={resultId}
      items={items}
      searchFormId={this.getFormId()}
      node={this.props.node}
    />
  );

  render() {
    const { node } = this.props;
    let { hiddenFields } = this.props;

    const ntype = node && node.ntype;
    let alternativeApi = apiUrls.sinvite_search;
    const item = hiddenFields && hiddenFields.items && hiddenFields.items[0];
    if (item && item.iid) {
      hiddenFields = {
        ...(hiddenFields || {}),
        item_iid: item.iid,
      };
    }

    if (node) {
      hiddenFields = {
        ...(hiddenFields || {}),
        displayFields: this.displayFieldsWhenNodeExists,
      };
    }

    hiddenFields = {
      ...hiddenFields,
      _sand_expand: ['user_organizations'],
      items_per_page: 100,
    };

    return (
      <SearchWrapper
        {...this.props}
        hiddenFields={hiddenFields}
        formid={this.getFormId()}
        ntype={ntype}
        alternativeApi={alternativeApi}
        renderResultsComponent={this.renderResultComponent}
        schema={schema}
        paginationProps={{
          itemPerPage: [100, 50, 20, 10],
        }}
      />
    );
  }
}

SearchInvite.propTypes = {
  hiddenFields: PropTypes.instanceOf(Object),
  node: PropTypes.instanceOf(Object),
  dispatch: PropTypes.func,
};

SearchInvite.defaultProps = {
  hiddenFields: null,
  node: null,
  dispatch: null,
};

export default withSchoolConfigs(SearchInvite);
