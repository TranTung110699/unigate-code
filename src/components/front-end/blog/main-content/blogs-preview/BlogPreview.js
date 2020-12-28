import React from 'react';
import Html from 'components/common/html';
import Avatar from 'material-ui/Avatar';
import { Link } from 'react-router-dom';
import { t3 } from 'translate';
import { timestampToDateString } from 'common/utils/Date';
import { getFrontendUrl } from 'routes/links/common';
import Icon from 'components/common/Icon';
import './BlogPreview.scss';

class BlogPreview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shouldShowFullContent: false,
    };
  }

  getBlogContent = (blog) => {
    if (!blog.medias || !blog.medias.length) {
      return null;
    }
    const media = blog.medias[0];
    return (
      <img
        className="blog-preview-content__image"
        src={media.link}
        alt={media.name}
      />
    );
  };

  handleMouseEnterPreviewContent = () => {
    this.setState({ shouldShowFullContent: true });
  };

  handleMouseLeavePreviewContent = () => {
    this.setState({ shouldShowFullContent: false });
  };

  render() {
    const { blog, blogRouterId } = this.props;

    const linkTo = getFrontendUrl(blogRouterId || 'blog', { slug: blog.slug });
    return (
      <div className="blog-preview">
        <div
          className="blog-preview__content blog-preview-content"
          onMouseEnter={this.handleMouseEnterPreviewContent}
          onMouseLeave={this.handleMouseLeavePreviewContent}
        >
          {this.getBlogContent(blog)}
          {this.state.shouldShowFullContent && (
            <Link className="blog-preview-content__summary" to={linkTo}>
              <Html content={blog.summary} />
              <div className="blog-preview-content__read-more">
                {`${t3('read_more')} > `}
              </div>
            </Link>
          )}
        </div>
        <Link className="blog-preview__name" to={linkTo} title={blog.name}>
          {blog.name}
        </Link>
        <div className="blog-preview__info">
          <div className="blog-preview__user-info">
            <div className="blog-preview__user-avatar">
              {blog.u.avatar ? (
                <Avatar src={blog.u.avatar} />
              ) : (
                <Avatar icon={<Icon icon="user" />} />
              )}
            </div>
            <div className="blog-preview__user-name">{blog.u.name}</div>
          </div>
          <div className="blog-preview__time">
            {timestampToDateString(blog.ts)}
          </div>
        </div>
      </div>
    );
  }
}

export default BlogPreview;
