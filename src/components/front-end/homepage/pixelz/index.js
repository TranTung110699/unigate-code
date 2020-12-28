import React from 'react';
import { connect } from 'react-redux';
import LayoutHelper from 'layouts/LayoutHelper';
import Menu from 'layouts/pixelz-theme/menu';
import DashboardLayout from 'components/front-end/dashboard/Layout';

import VideoBackGround from 'components/common/views/video-background';
import webMp4 from 'components/common/media-player/video/pixelz/web.mp4';
import webOgv from 'components/common/media-player/video/pixelz/web.ogv';
import webWebm from 'components/common/media-player/video/pixelz/web.webm';

import Header from './header';
import Company from './company';
import Plan from './plan';
import Recruitment from './recruitment';

class Homepage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    LayoutHelper.setLayout(this);
  }

  render() {
    const { screenSize, userInfo } = this.props;

    if (userInfo && userInfo.iid) {
      return <DashboardLayout />;
    }

    return (
      <div>
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
            <Header className="home-info" />
          </div>
        </VideoBackGround>
        <Company />
        <Plan />
        <Recruitment />
      </div>
    );
  }
}

const mapPropsToState = (state) => ({
  userInfo: state.user.info,
  screenSize: state.common.screenSize,
});
export default connect(mapPropsToState)(Homepage);
