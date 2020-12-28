import React from 'react';
import Store from 'store';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Perm from 'common/utils/Perm';
import Footer from './footer';
import Menu from './top/menu';
import { windowResize } from './actions';
import './stylesheet.scss';

class Ums extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    const { history } = this.props;

    if (Perm.hasPerm('teacher')) {
      history.push('/teach/timetable');
      return;
    }
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
      <div className="ums-layout">
        <Menu />
        {this.props.children}
        <Footer />
      </div>
    );
  }
}

const mapPropsToState = (state) => ({
  screenSize: state.common.screenSize,
});
export default withRouter(connect(mapPropsToState)(Ums));
