import React from 'react';
import { connect } from 'react-redux';
import SearchWrapper from 'components/common/search-wrap/SearchWrapper';
import PropTypes from 'prop-types';
import FormFilters from './FormFilters';
import Results from './Results';

class GroupLearningItemSearchLayout extends React.Component {
  formid = 'invited_items_of_group_search';

  renderResultComponent = (items, props) => {
    const { group } = this.props;
    return (
      <Results
        items={items}
        group={group}
        searchFormId={this.formid}
        {...props}
      />
    );
  };

  render() {
    const { group } = this.props;
    return (
      group && (
        <SearchWrapper
          formid={this.formid}
          hiddenFields={{
            iid: group && group.iid,
          }}
          renderResultsComponent={this.renderResultComponent}
        >
          <FormFilters />
        </SearchWrapper>
      )
    );
  }
}

GroupLearningItemSearchLayout.propTypes = {
  className: PropTypes.string,
  dispatch: PropTypes.func,
  group: PropTypes.shape(),
};

GroupLearningItemSearchLayout.defaultProps = {
  className: '',
  dispatch: () => {},
  group: null,
};

export default connect()(GroupLearningItemSearchLayout);
