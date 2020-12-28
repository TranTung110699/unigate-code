import React, { Component } from 'react';
import SearchWrapper from 'components/common/search-wrap/SearchWrapper';
import PropTypes from 'prop-types';
import Results from './Results';
import FormFilters from './FormFilters';

class UserSearchLayout extends Component {
  renderResultComponent = (items, props) => (
    <Results items={items} {...props} />
  );

  render() {
    const { hiddenFields } = this.props;
    return (
      <SearchWrapper
        formid="user_search"
        hiddenFields={hiddenFields}
        {...this.props}
        renderResultsComponent={this.renderResultComponent}
      >
        <FormFilters />
      </SearchWrapper>
    );
  }
}

UserSearchLayout.propTypes = {
  dispatch: PropTypes.func,
};

UserSearchLayout.defaultProps = {
  dispatch: () => {},
};

export default UserSearchLayout;
