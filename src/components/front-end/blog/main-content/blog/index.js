import React from 'react';
import PageDisplay from 'components/common/page/display';
import Helmet from 'react-helmet';

class Blog extends React.Component {
  render() {
    const { page } = this.props;
    return (
      <div>
        <Helmet
          title={page.seo_title}
          meta={[
            {
              name: 'description',
              content: page.seo_description,
            },
            {
              name: 'keywords',
              content: page.seo_title,
            },
          ]}
        />
        <PageDisplay page={page} showInfo showTitle />
      </div>
    );
  }
}

export default Blog;
