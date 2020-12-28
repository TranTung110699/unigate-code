import React from 'react';

import { generateShareIcon, ShareButtons } from 'react-share';

import './stylesheet.scss';

const {
  FacebookShareButton,
  GooglePlusShareButton,
  LinkedinShareButton,
  TwitterShareButton,
} = ShareButtons;

const FacebookIcon = generateShareIcon('facebook');
const TwitterIcon = generateShareIcon('twitter');
const GooglePlusIcon = generateShareIcon('google');
const LinkedinIcon = generateShareIcon('linkedin');

class SocialShare extends React.Component {
  render() {
    const { url } = this.props;

    return (
      <div>
        <div>
          <div className="item-social">
            <FacebookShareButton url={url}>
              <FacebookIcon size={24} round />
            </FacebookShareButton>
          </div>
          <div className="item-social">
            <LinkedinShareButton url={url}>
              <LinkedinIcon size={24} round />
            </LinkedinShareButton>
          </div>
          <div className="item-social">
            <TwitterShareButton url={url}>
              <TwitterIcon size={24} round />
            </TwitterShareButton>
          </div>
          <div className="item-social">
            <GooglePlusShareButton url={url}>
              <GooglePlusIcon size={24} round />
            </GooglePlusShareButton>
          </div>
        </div>
      </div>
    );
  }
}

export default SocialShare;
