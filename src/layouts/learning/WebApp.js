/**
 * Created by Peter Hoang Nguyen on 4/6/2017.
 */
import React from 'react';
import { connect } from 'react-redux';
import 'material-icons/css/material-icons.min.css';
import { Scrollbars } from 'react-custom-scrollbars';
import TopMenuApp from './menu/top-menu';
import './stylesheet.scss';
import Configs from 'configs/configuration';
import { windowResize } from './actions';
import Footer from './footer';
import QuickView from 'layouts/learning/quickview/QuickView';

class WebApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = { width: '0', height: '0' };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener(
      'resize',
      this.updateWindowDimensions.bind(this),
    );
  }

  updateWindowDimensions() {
    const { dispatch } = this.props;
    const screenSize = {
      width: window.innerWidth,
      height: window.innerHeight,
    };
    const bodyScreenSize = {
      width: window.innerWidth - Configs.leftSpace,
      height: window.innerHeight,
    };
    dispatch(windowResize(screenSize, bodyScreenSize));
  }

  render() {
    let { screenSize, bodyScreenSize } = this.props;
    screenSize = screenSize || {};
    bodyScreenSize = bodyScreenSize || {};

    return (
      <div
        className="ui-app clearfix"
        style={{
          width: `${screenSize.width}px`,
          height: `${screenSize.height}px`,
        }}
      >
        <QuickView />
        <TopMenuApp />

        <div className="ui-main-app">
          <div
            className="ui-right-frame ui-app-body"
            style={{
              width: `${bodyScreenSize.width}px`,
              height: `${bodyScreenSize.height}px`,
            }}
          >
            <Scrollbars>
              <div className=" screen-viewer-body">{this.props.children}</div>
              <Footer />
            </Scrollbars>
          </div>
        </div>
      </div>
    );
  }
}

const mapPropsToState = (state) => ({
  webApp: state.form.webApp,
  screenSize: state.common.screenSize,
  bodyScreenSize: state.common.bodyScreenSize,
});
export default connect(mapPropsToState)(WebApp);
