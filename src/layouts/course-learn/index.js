import React from 'react';
import Store from 'store';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { windowResize } from 'layouts/actions';
import Footer from './footer';
import Menu from './top/menu';
import './stylesheet.scss';

const cssClass = 'evn-layout course-learn-wrapper';
const style = {
  minHeight: 'calc(100vh - 170px - 110px)',
  maxWidth: 'none',
  maxHeight: 'none',
  zIndex: '1',
};

class Evn extends React.Component {
  componentDidMount() {
    window.addEventListener('resize', this.updateWindowDimensions);
    this.updateWindowDimensions();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions = () => {
    const screenSize = {
      width: window.innerWidth,
      height: window.innerHeight,
    };
    Store.dispatch(windowResize(screenSize));
  };

  render() {
    const { children } = this.props;
    return (
      <div className={`${cssClass}`}>
        {/*
        <Menu className={`${cssClass}__header`} />
           */}
        <div style={style}>{children}</div>

        {/*
        <GJFooter className={`${cssClass}__footer`} />
*/}
      </div>
    );
  }
}

const mapPropsToState = (state) => ({
  screenSize: state.common.screenSize,
});
export default withRouter(connect(mapPropsToState)(Evn));
