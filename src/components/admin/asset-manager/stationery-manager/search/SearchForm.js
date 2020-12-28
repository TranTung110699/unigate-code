/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import SearchWrapper from 'components/common/search-wrap-v2/SearchWrapper';
import Results from './Results';
import schema from '../schema/search-form';
import { t1 } from 'translate';

class ImportSearchForm extends Component {
  constructor(props) {
    super(props);
    this.renderResultComponent = this.renderResultComponent.bind(this);
  }

  renderResultComponent(items, props) {
    return <Results items={items} {...props} />;
  }

  render() {
    const { step } = this.props;
    return (
      <SearchWrapper
        {...this.props}
        formid="stationery_search_import_items"
        hiddenFields={{ step }}
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

export default ImportSearchForm;
