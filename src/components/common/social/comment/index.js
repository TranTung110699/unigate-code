/**
 * Created by DVN on 8/31/2017.
 */
import React from 'react';
import { findDOMNode } from 'react-dom';

class SocialComment extends React.Component {
  componentDidUpdate() {
    if (window.FB) {
      const commentsElNode = findDOMNode(this.commentsEl);
      if (commentsElNode && !commentsElNode.hasChildNodes()) {
        window.FB.XFBML.parse();
      }
    }
  }

  render() {
    let { url } = this.props;
    url = `${window.APP_SERVER_API_URL}${url}`;
    return (
      <div
        ref={(el) => {
          this.commentsEl = el;
        }}
        className="fb-comments"
        data-href={url}
        data-numposts="5"
      />
    );
  }
}

export default SocialComment;
