import React from 'react';
import Store from 'store';
import { windowResize } from 'layouts/actions';
import FlyPanel from 'components/common/views/fly-panel';
import Menu from './menu';
import Footer from './footer';
import './stylesheet.scss';

class VietEd extends React.Component {
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
    return (
      <div className="vieted-ui-web-app">
        <FlyPanel breakPoint={90}>
          <Menu type="fly" />
        </FlyPanel>
        {this.props.children}
        <Footer />
      </div>
    );
  }
}

export default VietEd;
