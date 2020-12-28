import React from 'react';
import PropTypes from 'prop-types';
import SearchWrapper from 'components/common/search-wrap/SearchWrapper';
import { t1 } from 'translate';
import Results from './Results';

class Search extends React.Component {
  paginationProps = {
    onlyShowIfTotalBigEnough: true,
  };

  cssClass = 'admin-department-students';

  renderResultComponent = (items, props, objects, searchValues) => {
    const { node, formid } = this.props;
    return (
      <Results
        {...props}
        items={items}
        searchFormId={formid}
        node={node}
        searchValues={searchValues}
      />
    );
  };

  render() {
    const { node, formid } = this.props;

    return (
      node && (
        <SearchWrapper
          formid={formid}
          hiddenFields={{
            user_iid: node.iid,
          }}
          renderResultsComponent={this.renderResultComponent}
          paginationProps={this.paginationProps}
          noResultText={t1('no_goals')}
        />
      )
    );
  }
}

Search.propTypes = {
  className: PropTypes.string,
};

Search.defaultProps = {
  className: '',
};

export default Search;
