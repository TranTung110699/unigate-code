import React, { Component } from 'react';
import { connect } from 'react-redux';

import LayoutHelper from 'layouts/LayoutHelper';
import ImageBackGround from 'components/common/views/image-background';
import FlyPanel from 'components/common/views/fly-panel';
import Menu from 'components/common/views/menu';

import PathMenu from 'components/front-end/path/menu';

import Intro from './intro';
import Class from './class';
import Package from './packages';
import Register from './register';
import ListTeacher from './list-teachers';
import './stylesheet.scss';

class XpeakLiveLayout extends Component {
  componentDidMount() {
    LayoutHelper.setLayout(this);
    window.scrollTo(0, 0);
  }

  render() {
    const { screenSize } = this.props;

    return (
      <div className="xpeak-live-wrapper">
        <FlyPanel breakPoint={250}>
          <Menu type="fly" />
        </FlyPanel>
        <ImageBackGround
          width={screenSize.width}
          height={250}
          src="/media/images/xpeak_live.png"
        >
          <Menu />
          <div className="container">
            <div className="row">
              <div className="col-sm-12 text-center text-transform">
                <h3>XPEAK LIVE</h3>
              </div>
            </div>
          </div>
        </ImageBackGround>
        <PathMenu rootPathIid="xpeakLive" />
        <Intro />
        <Class />
        <Package />
        <Register />
        <ListTeacher />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  screenSize: state.common.screenSize,
});

export default connect(mapStateToProps)(XpeakLiveLayout);
