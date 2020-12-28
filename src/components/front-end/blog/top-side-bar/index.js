import React, { Component } from 'react';
import { connect } from 'react-redux';
import './stylesheet.scss';
import { Link } from 'react-router-dom';
import { getFrontendUrl } from 'routes/links/common';

class Index extends Component {
  render() {
    const { categoryBlogs, categorySlug } = this.props;
    return (
      <div className="blog-top-side-bar">
        {categoryBlogs &&
          categoryBlogs.map((item) => (
            <Link
              id={item.id}
              to={getFrontendUrl('blog', { categorySlug: item.slug })}
            >
              <div
                className={`blog-top-side-bar__tab ${
                  categorySlug == item.slug ? 'blog-top-side-bar__actived' : ''
                }`}
              >
                {item.name}
              </div>
            </Link>
          ))}
      </div>
    );
  }
}

export default connect()(Index);
