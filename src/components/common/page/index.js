import React from 'react';
import SearchWrapper from 'components/common/search-wrap/SearchWrapper';
import Display from './display';

class Page extends React.Component {
  renderPageDisplay = (items) => <Display page={items[0]} {...this.props} />;

  render() {
    let { id, slug } = this.props;
    slug = slug || process.env[id];

    return (
      slug && (
        <SearchWrapper
          formid="get_page"
          hiddenFields={{
            slug,
          }}
          hidePagination
          searchResultKey={slug}
          renderResultsComponent={this.renderPageDisplay}
        />
      )
    );
  }
}

export default Page;
