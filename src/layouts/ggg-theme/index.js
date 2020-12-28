import React from 'react';
import Store from 'store';
import { connect } from 'react-redux';

import Footer from './footer';
import { windowResize } from './actions';
import './stylesheet.scss';

class GGG extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
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
      width: window.clientWidth,
      height: window.innerHeight,
    };
    this.setState(screenSize);
    Store.dispatch(windowResize(screenSize));
  }

  render() {
    return (
      <div className="ggg-theme">
        {this.props.children}
        <Footer />
      </div>
    );
  }
}

const mapPropsToState = (state) => ({
  screenSize: state.common.screenSize,
});
export default connect(mapPropsToState)(GGG);
