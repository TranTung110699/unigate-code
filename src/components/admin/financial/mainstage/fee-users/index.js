import React from 'react';
import PropTypes from 'prop-types';
import SearchWrapper from 'components/common/search-wrap-v2/SearchWrapper';
import schema from './schema';
import Results from './Results';

class FeeUsers extends React.Component {
  formId = 'fee_users_search';
  renderResultsComponent = (items, props) => (
    <Results items={items} searchFormId={this.formId} />
  );

  render() {
    return (
      <SearchWrapper
        showResult
        schema={schema({})}
        formid={this.formId}
        alternativeApi="/fee/api/fee-users-search"
        renderResultsComponent={this.renderResultsComponent}
        showSearchButton
      />
    );
  }
}

FeeUsers.propTypes = {
  className: PropTypes.string,
};

FeeUsers.defaultProps = {
  className: '',
};

export default FeeUsers;
