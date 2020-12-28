import React from 'react';
import { connect } from 'react-redux';
import './stylesheet.scss';

class Embedded extends React.Component {
  constructor(props) {
    super(props);
    this.state = { currentHeight: 600 };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    setInterval(() => {
      this.updateWindowDimensions();
    }, 300);
    window.addEventListener('resize', this.updateWindowDimensions.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener(
      'resize',
      this.updateWindowDimensions.bind(this),
    );
  }

  updateWindowDimensions() {
    window.parent.postMessage(
      { height: window.document.body.clientHeight },
      '*',
    );
  }

  render() {
    return <div className="embedded-layout">{this.props.children}</div>;
  }
}

const populateStateToProps = (state) => ({
  screenSize: state.screenSize,
});

export default connect(populateStateToProps)(Embedded);
