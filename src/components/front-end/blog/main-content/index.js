import React from 'react';
import SearchWrapper from 'components/common/search-wrap/SearchWrapper';
import { layouts } from 'configs/constants';
import { t1 } from 'translate';
import { connect } from 'react-redux';
import { getThemeConfig } from 'utils/selectors';
import lGet from 'lodash.get';
import Blog from './blog';
import BlogsPreview from './blogs-preview';
import './stylesheet.scss';

class BlogMainContent extends React.Component {
  searchWrapperPaginationProps = {
    showExtraControl: false,
    theme: 'light',
  };

  renderBlogsPreview = (items) => (
    <BlogsPreview
      blogs={items}
      categorySlug={this.props.categorySlug}
      categoryBlogs={this.props.categoryBlogs}
      query={this.props.query}
      blogRouterId={this.props.blogRouterId}
    />
  );

  renderBlog = (items) => <Blog page={items[0]} />;

  render() {
    const {
      slug,
      categorySlug,
      categoryBlogs,
      query,
      themeConfig,
    } = this.props;

    const layout = lGet(themeConfig, 'layout');
    return (
      <div className="blogs-main">
        {slug ? (
          <SearchWrapper
            formid="get_page"
            hiddenFields={{
              slug,
            }}
            hidePagination
            searchResultKey={slug}
            autoSearchWhenValuesChange
            renderResultsComponent={this.renderBlog}
          />
        ) : (
          <SearchWrapper
            formid="featured_news_blogs"
            searchResultKey="blogs"
            hiddenFields={
              themeConfig.layout === layouts.ETEC
                ? { category: query }
                : { query, 'category-slug': categorySlug }
            }
            renderResultsComponent={this.renderBlogsPreview}
            autoSearchWhenValuesChange
            renderNoResultComponent={() => (
              <h3 className="text-center">
                {t1('there_are_no_blogs_for_this_category')}
              </h3>
            )}
            paginationProps={this.searchWrapperPaginationProps}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  themeConfig: getThemeConfig(state),
});

export default connect(mapStateToProps)(BlogMainContent);
