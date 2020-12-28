import React, { Component } from 'react';
import SearchWrapper from 'components/common/search-wrap/SearchWrapper';
import PropTypes from 'prop-types';
import Results from './Results';

import FormFilters from './FormFilters';

class MemberSearchLayout extends Component {
  constructor(props) {
    super(props);
    this.renderResultComponent = this.renderResultComponent.bind(this);
  }

  renderResultComponent = (items, props) => (
    <Results items={items} {...props} />
  );

  render() {
    const { hiddenFields } = this.props;
    return (
      <SearchWrapper
        formid="user_group_report"
        hiddenFields={hiddenFields}
        {...this.props}
        renderResultsComponent={this.renderResultComponent}
      >
        <FormFilters />
      </SearchWrapper>
    );
  }
}

MemberSearchLayout.propTypes = {
  courseIid: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  dispatch: PropTypes.func,
  groupsToExclude: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  ),
  type: PropTypes.string,
};

MemberSearchLayout.defaultProps = {
  courseIid: null,
  dispatch: () => {},
  groupsToExclude: [],
  type: '',
};

export default MemberSearchLayout;
