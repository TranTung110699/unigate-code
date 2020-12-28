import React from 'react';
import { Link } from 'react-router-dom';
import { getFrontendUrl } from 'routes/links/common';
import { layouts } from 'configs/constants';
import './stylesheet.scss';

class BlogsPreviewList extends React.Component {
  render() {
    const { blogs, title, layout, numberOfArticles } = this.props;
    const classCssBlogPreviewList = [layouts.EVN, layouts.SEABANK].includes(
      layout,
    )
      ? 'layout-evn-blogs-preview-list'
      : 'blogs-preview-list';
    return (
      <div className={`${classCssBlogPreviewList}`}>
        {[layouts.EVN, layouts.SEABANK].includes(layout) ? (
          <div className={`${classCssBlogPreviewList}__title_wrapper`}>
            <div className={`${classCssBlogPreviewList}__title`}>{title}</div>
          </div>
        ) : (
          <div className={`${classCssBlogPreviewList}__title`}>{title}</div>
        )}
        <div className={`${classCssBlogPreviewList}__items`}>
          {blogs &&
            blogs.map((blog, index) => {
              if (index >= numberOfArticles) return null;
              return (
                <div
                  key={blog.id}
                  className={`${classCssBlogPreviewList}__item ${
                    index === blogs.length - 1
                      ? `${classCssBlogPreviewList}__item--last`
                      : ''
                  }`}
                >
                  <Link
                    to={getFrontendUrl('blog', { slug: blog.slug })}
                    key={blog.id}
                  >
                    {blog.name}
                  </Link>
                </div>
              );
            })}
        </div>
      </div>
    );
  }
}

export default BlogsPreviewList;
