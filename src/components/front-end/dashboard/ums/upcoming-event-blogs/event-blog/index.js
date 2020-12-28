import React from 'react';
import { connect } from 'react-redux';
import { timestampToDateString } from 'common/utils/Date';
import { getFrontendUrl } from 'routes/links/common';
import { Link } from 'react-router-dom';

class Layout extends React.Component {
  render() {
    const { eventBlog } = this.props;

    const linkTo = getFrontendUrl('learn', { slug: eventBlog.slug });

    return (
      <Link
        to={linkTo}
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
        className="event-blog-item col-xs-12 col-md-6 col-lg-6"
      >
        <div className="date-block">
          <span className="date-content">
            {timestampToDateString(eventBlog && eventBlog.ts)}
          </span>
        </div>
        <div className="title">{eventBlog && eventBlog.name}</div>
      </Link>
    );
  }
}

export default connect()(Layout);
