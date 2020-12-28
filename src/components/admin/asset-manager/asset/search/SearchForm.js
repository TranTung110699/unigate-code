/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import SearchWrapper from 'components/common/search-wrap-v2/SearchWrapper';
import Results from './Results';
import schema from '../schema/search-form';

class AssetSearchForm extends Component {
  constructor(props) {
    super(props);
    this.renderResultComponent = this.renderResultComponent.bind(this);
  }

  renderResultComponent(items, props) {
    return <Results items={items} {...props} />;
  }

  render() {
    return (
      <SearchWrapper
        {...this.props}
        formid="asset_search"
        schema={schema}
        renderResultsComponent={this.renderResultComponent}
      />
    );
  }
}

export default AssetSearchForm;
