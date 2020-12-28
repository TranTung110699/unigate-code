import React, { Component } from 'react';
import { connect } from 'react-redux';
import LayoutHelper from 'layouts/LayoutHelper';
import ImageBackGround from 'components/common/views/image-background';
import FlyPanel from 'components/common/views/fly-panel';
import Menu from 'components/common/views/menu';

import PhilosophyMainContent from './main-content';
import PhilosophyLeftSideBar from './left-side-bar';
import Slogan from './slogan';

import './stylesheet.scss';

class PhilosophyLayout extends Component {
  componentDidMount() {
    LayoutHelper.setLayout(this);
    window.scrollTo(0, 0);
  }

  render() {
    const { screenSize } = this.props;

    return (
      <div className="philosophy-wrapper">
        <FlyPanel breakPoint={250}>
          <Menu type="fly" />
        </FlyPanel>
        <ImageBackGround
          width={screenSize.width}
          height={250}
          src="/media/images/philosophy.png"
        >
          <Menu />
          <div className="container">
            <div className="row">
              <div className="col-sm-12 text-center text-transform">
                <h3>Xpeak - học tiếng anh giao tiếp</h3>
              </div>
            </div>
          </div>
        </ImageBackGround>
        <Slogan />
        <div className="container">
          <div className="row">
            <div className="col-md-4 col-lg-4 col-sm-12 col-xs-12">
              <PhilosophyLeftSideBar />
            </div>
            <div className="col-md-8 col-lg-8 col-sm-12 col-xs-12">
              <PhilosophyMainContent />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  screenSize: state.common.screenSize,
});

export default connect(mapStateToProps)(PhilosophyLayout);
