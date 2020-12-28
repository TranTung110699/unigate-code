import React from 'react';
import Html from 'components/common/html';
import Avatar from 'material-ui/Avatar';
import { timestampToDateString } from 'common/utils/Date';
import Icon from 'components/common/Icon';
import SocialShare from 'components/common/social/share/index';
import SocialComment from 'components/common/social/comment/index';
import { getFrontendUrl } from 'routes/links/common';

import './stylesheet.scss';

class Display extends React.Component {
  render() {
    const { page, showInfo, showTitle } = this.props;

    return (
      page && (
        <div key={page.id} className="page-display">
          {showInfo && (
            <div>
              <div className="page-display__info">
                <div className="page-display__user-info">
                  <div className="page-display__user-avatar">
                    {page.u.avatar ? (
                      <Avatar src={page.u.avatar} />
                    ) : (
                      <Avatar icon={<Icon icon="user" />} />
                    )}
                  </div>
                  <div className="page-display__user-name">{page.u.name}</div>
                </div>
                <div className="page-display__time">
                  {timestampToDateString(page.ts)}
                </div>
              </div>

              <SocialShare url={getFrontendUrl('blog', { slug: page.slug })} />
              <br />
            </div>
          )}
          <br />
          {showTitle && <div className="page-display__name">{page.name}</div>}
          <div className="page-display__content">
            <Html content={page.content} />
            <SocialComment url={getFrontendUrl('blog', { slug: page.slug })} />
          </div>
        </div>
      )
    );
  }
}

export default Display;
