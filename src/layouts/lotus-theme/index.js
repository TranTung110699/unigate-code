import React from 'react';
import Store from 'store';
import { windowResize } from 'layouts/actions';
import Footer from './footer';
import Menu from './top/menu';
import './stylesheet.scss';

class Lotus extends React.Component {
  constructor(props) {
    super(props);
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    window.addEventListener('resize', this.updateWindowDimensions.bind(this));
    this.updateWindowDimensions();
  }

  componentWillUnmount() {
    window.removeEventListener(
      'resize',
      this.updateWindowDimensions.bind(this),
    );
  }

  updateWindowDimensions() {
    const screenSize = {
      width: window.innerWidth,
      height: window.innerHeight,
    };
    Store.dispatch(windowResize(screenSize));
  }

  render() {
    const currentLocation = this.props.location.pathname;
    return (
      <div className="lotus-ui-web-app">
        {currentLocation !== '/' && <Menu />}
        <div style={{ minHeight: '550px' }}>{this.props.children}</div>
        <Footer />
      </div>
    );
  }
}

export default Lotus;
