import React, { Component } from 'react';
import SearchWrapper from 'components/common/search-wrap/SearchWrapper';
import PropTypes from 'prop-types';
import Results from './Results';
import BenefitResults from './BenefitResults';
import FormFilters from './FormFilters';

function getSearchFormId(classification) {
  return classification === 'fee'
    ? 'finance_template_search'
    : 'benefit_search';
}

class Layout extends Component {
  renderResultComponent = (items, form, count, page) => {
    const { classification } = this.props;
    if (classification === 'benefit') {
      return (
        <BenefitResults
          items={items}
          searchFormId={getSearchFormId(classification)}
          classification={classification}
          page={page}
          ntype="finance-template"
        />
      );
    }
    return (
      <Results
        items={items}
        searchFormId={getSearchFormId(classification)}
        classification={classification}
        ntype="finance-template"
      />
    );
  };

  render() {
    const { classification } = this.props;
    const formid = getSearchFormId(classification);
    const hiddenFields = { classification: [classification] };

    return (
      <SearchWrapper
        key={formid}
        formid={formid}
        hiddenFields={hiddenFields}
        renderResultsComponent={this.renderResultComponent}
      >
        <FormFilters classification={classification} />
      </SearchWrapper>
    );
  }
}

Layout.propTypes = {
  classification: PropTypes.string,
  page: PropTypes.shape(),
};

Layout.defaultProps = {
  classification: null,
  page: null,
};

export default Layout;
