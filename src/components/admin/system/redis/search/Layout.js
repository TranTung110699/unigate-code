import React, { Component } from 'react';
import { connect } from 'react-redux';
import SearchWrapper from 'components/common/search-wrap/SearchWrapper';
import Results from './Results';
import FormFilters from './FormFilters';
import systemApiUrls from 'components/admin/system/endpoints';

class Layout extends Component {
  constructor(props) {
    super(props);
    this.renderResultComponent = this.renderResultComponent.bind(this);
  }

  renderResultComponent(items, props) {
    return <Results items={items} {...props} />;
  }

  render() {
    const hiddenFields = {
      ntype: 'redis',
    };

    return (
      <div className="whitebox">
        <SearchWrapper
          formid="redis_search"
          hiddenFields={hiddenFields}
          alternativeApi={systemApiUrls.redis_search}
          renderResultsComponent={this.renderResultComponent}
        >
          <FormFilters formid="redis_search" />
        </SearchWrapper>
      </div>
    );
  }
}

export default connect()(Layout);
