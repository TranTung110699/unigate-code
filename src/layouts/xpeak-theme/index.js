import React from 'react';
import Store from 'store';
import Footer from './footer';
import { windowResize } from './actions';
import './stylesheet.scss';

/**
 * Created by Peter Hoang Nguyen
 * Email: vntopmas@gmail.com
 * Tel: 0966298666
 * created date 20/05/2017
 **/
class Xpeak extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentWillMount() {
    if (!window.Tawk_API) {
      window.Tawk_API = window.Tawk_API || {};
      window.Tawk_LoadStart = new Date();
      const s1 = document.createElement('script');
      const s0 = document.getElementsByTagName('script')[0];
      s1.async = true;
      s1.src = 'https://embed.tawk.to/58c3a6bf5b8fe5150eefca9a/default';
      s1.charset = 'UTF-8';
      s1.setAttribute('crossorigin', '*');
      s0.parentNode.insertBefore(s1, s0);
    }
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
    if (
      window.Tawk_API &&
      !window.Tawk_API.isChatHidden &&
      typeof window.Tawk_API.toggleVisibility === 'function'
    ) {
      window.Tawk_API.toggleVisibility();
    }
  }

  updateWindowDimensions() {
    const screenSize = {
      width: window.innerWidth,
      height: window.innerHeight,
    };
    Store.dispatch(windowResize(screenSize));
  }

  render() {
    return (
      <div className="ui-web-app" style={{ background: 'white' }}>
        {this.props.children}
        <Footer />
      </div>
    );
  }
}

export default Xpeak;
