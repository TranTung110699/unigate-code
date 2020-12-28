import React, { Component } from 'react';
import SearchWrapper from 'components/common/search-wrap/SearchWrapper';
import PropTypes from 'prop-types';
import FormFilters from 'components/admin/node/search/FormFilters';

import Results from './Results';

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
      items_per_page: 10,
      ntype: 'syllabus',
      type: 'credit',
    };
    const formid = 'syllabus_search';
    return (
      <div>
        <SearchWrapper
          {...this.props}
          formid={formid}
          hiddenFields={hiddenFields}
          renderResultsComponent={this.renderResultComponent}
          showQueryField={false}
          showSearchButton={false}
        >
          <FormFilters formid={formid} searchButton />
        </SearchWrapper>
      </div>
    );
  }
}

Layout.propTypes = {
  categoryIid: PropTypes.number.isRequired,
};

export default Layout;
