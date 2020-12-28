import React from 'react';
import { connect } from 'react-redux';
import LayoutHelper from 'layouts/LayoutHelper';
import Menu from 'layouts/xpeak-theme/menu';
import Body from 'layouts/xpeak-theme/body';
import VideoBackGround from 'components/common/views/video-background';
import FlyPanel from 'components/common/views/fly-panel';
import webMp4 from 'components/common/media-player/video/xpeak.mp4';
import webOgv from 'components/common/media-player/video/xpeak.ogv';
import webWebm from 'components/common/media-player/video/xpeak.webm';

import IntroArticle from './body';
import IntroduceXpeak from './introduce-xpeak';

// import Header from './header';

/**
 * Created by Peter Hoang Nguyen
 * Email: vntopmas@gmail.com
 * Tel: 0966298666
 * created date 23/05/2017
 **/
class Homepage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    LayoutHelper.setLayout(this);
    window.scrollTo(0, 0);
  }

  render() {
    const { screenSize } = this.props;

    return (
      <div>
        <FlyPanel breakPoint={screenSize.height}>
          <Menu type="fly" />
        </FlyPanel>
        <VideoBackGround
          width={screenSize.width}
          height={screenSize.height}
          values={[
            { src: webWebm, type: 'video/webm' },
            { src: webOgv, type: 'video/ogg' },
            { src: webMp4, type: 'video/mp4' },
          ]}
        >
          <div className="home-banner">
            <Menu />
            <IntroduceXpeak className="home-info" />
          </div>
        </VideoBackGround>
        <IntroArticle />
        <Body />
      </div>
    );
  }
}

const mapPropsToState = (state) => ({
  screenSize: state.common.screenSize,
});
export default connect(mapPropsToState)(Homepage);
