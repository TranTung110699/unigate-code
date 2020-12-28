import React from 'react';
import SearchWrapper from 'components/common/search-wrap/SearchWrapper';
import { t3 } from 'translate';
import { withRouter } from 'react-router-dom';
import { getFrontendUrl } from 'routes/links/common';
import { layouts } from 'configs/constants';
import BlogsPreviewList from './blogs-preview-list';
import BlogSearch from './search';
import './stylesheet.scss';

class BlogRightSideBar extends React.Component {
  searchWrapperHiddenFields = {
    items_per_page: 5,
  };

  renderNewestBlogs = (items) => {
    const { layout } = this.props;
    return (
      <BlogsPreviewList title={t3('newest')} blogs={items} layout={layout} />
    );
  };

  renderMostReadBlogs = (items) => {
    const { layout, numberOfArticles } = this.props;
    return (
      <BlogsPreviewList
        title={t3('most_read')}
        blogs={items}
        layout={layout}
        numberOfArticles={numberOfArticles}
      />
    );
  };

  handleSearchSubmit = (values) => {
    const { history } = this.props;
    let { query } = values;
    query = query || '';
    history.push(getFrontendUrl('blog', { query }));
  };

  render() {
    const { layout } = this.props;
    return (
      <div className="blogs-right-side-bar">
        {layout === layouts.ETEC && (
          <div className="blogs-right-side-bar__search">
            <BlogSearch onSubmit={this.handleSearchSubmit} />
          </div>
        )}
        <SearchWrapper
          formid="most_read_featured_news_blogs"
          hiddenFields={this.searchWrapperHiddenFields}
          searchResultKey="most_read_blogs"
          hidePagination
          renderResultsComponent={this.renderMostReadBlogs}
        />
        {layout === layouts.ETEC && (
          <SearchWrapper
            formid="newest_featured_news_blogs"
            searchResultKey="newest_blogs"
            hidePagination
            hiddenFields={{
              items_per_page: 5,
              order_by: 'ts',
              order_direction: -1,
            }}
            renderResultsComponent={this.renderNewestBlogs}
          />
        )}
      </div>
    );
  }
}

export default withRouter(BlogRightSideBar);
