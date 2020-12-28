import React from 'react';
import Helmet from 'react-helmet';
import { t1 } from 'translate';
import { layouts } from 'configs/constants';
import { connect } from 'react-redux';
import { getThemeConfig } from 'utils/selectors';
import lGet from 'lodash.get';
import BlogPreview from './BlogPreview';
import './stylesheet.scss';
import HorizontalBlogPreview from './horizontal';

class BlogsPreview extends React.Component {
  renderBlogCategory = (categorySlug, categoryBlogs) =>
    categoryBlogs.map((item) => {
      if (item.slug === categorySlug) {
        return item.name;
      }
    });

  render() {
    const {
      blogs,
      query,
      categorySlug,
      categoryBlogs,
      themeConfig,
      blogRouterId,
    } = this.props;
    const layout = lGet(themeConfig, 'layout');
    return (
      <div className="blogs-preview">
        <Helmet title={t1('blog')} />
        <div className="row">
          <div className="blog-category-title-wrapper">
            <div className="blog-category-title">
              {this.renderBlogCategory(categorySlug, categoryBlogs)}
            </div>
          </div>
          {blogs &&
          ![layouts.EVN, layouts.SEABANK, layouts.ETEC].includes(layout)
            ? blogs.map((blog) => (
                <div key={blog.id} className={'col-sm-6'}>
                  <BlogPreview blog={blog} blogRouterId={blogRouterId} />
                </div>
              ))
            : blogs.map((blog) => (
                <div key={blog.id} className={'col-sm-12'}>
                  <HorizontalBlogPreview
                    blog={blog}
                    query={query}
                    categorySlug={categorySlug}
                    layout={layout}
                  />
                </div>
              ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  themeConfig: getThemeConfig(state),
});

export default connect(mapStateToProps)(BlogsPreview);
