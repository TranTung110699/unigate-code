import React from 'react';
import Html from 'components/common/html';
import { Link } from 'react-router-dom';
import { t1, t3 } from 'translate';
import { getFrontendUrl } from 'routes/links/common';
import { layouts } from 'configs/constants';
import { timestampToDateString } from 'common/utils/Date';
import { displayAvatar } from 'utils/Util';
import Image from 'common/images/default-learning-material-avatar.png';
import './stylesheet.scss';

class Index extends React.Component {
  htmlStyle = {
    transform: 'translateY(-12px)',
    color: '#242c42',
    fontSize: '14px',
    fontWeight: '400',
  };

  constructor(props) {
    super(props);
    this.state = {
      shouldShowFullContent: false,
    };
  }

  getBlogThumbnail = (blog) => {
    if (!blog.medias || !blog.medias.length) {
      return (
        // TODO: configurable default img
        <Link to={getFrontendUrl('blog', blog)} title={t1(blog.name)}>
          <img
            className="hz-blog-preview__left__avatar"
            src={Image}
            alt={'default'}
          />
        </Link>
      );
    }
    const media = blog.medias[0];
    return (
      <Link to={getFrontendUrl('blog', blog)} title={t1(blog.name)}>
        <img
          className="hz-blog-preview__left__avatar"
          src={displayAvatar(media.link)}
          alt={media.name}
        />
      </Link>
    );
  };

  handleMouseEnterPreviewContent = () => {
    this.setState({ shouldShowFullContent: true });
  };

  handleMouseLeavePreviewContent = () => {
    this.setState({ shouldShowFullContent: false });
  };

  render() {
    const { blog, categorySlug, layout } = this.props;
    return (
      <div className="hz-blog-preview row">
        <div
          className="hz-blog-preview__left col-md-4 col-sm-6 col-xs-12"
          onMouseEnter={this.handleMouseEnterPreviewContent}
          onMouseLeave={this.handleMouseLeavePreviewContent}
        >
          {this.getBlogThumbnail(blog)}
        </div>

        <div className="hz-blog-preview__right col-md-8 col-sm-6 col-xs-12">
          <Link to={getFrontendUrl('blog', blog)}>
            <h3 className="hz-blog-preview__right__name">{blog.name}</h3>
          </Link>
          {layout === layouts.ETEC && (
            <div className="hz-blog-preview__right__info">
              <span className="hz-blog-preview__right__info__view">{500}</span>
              <span className="hz-blog-preview__right__info__date">
                {timestampToDateString(blog.ts)}
              </span>
            </div>
          )}

          <Html content={blog.summary} style={this.htmlStyle} />

          {layout === layouts.ETEC && (
            <Link
              to={getFrontendUrl('blog', { slug: blog.slug, categorySlug })}
              title={blog.name}
            >
              <button className="hz-blog-preview__view-more">
                {t3('view_more')}
              </button>
            </Link>
          )}
        </div>
      </div>
    );
  }
}

export default Index;
