import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class Layout extends Component {
  constructor(props) {
    super(props);
    // const { user, history } = props;
    // history.push(getMobileUrl(!user || !user.lname ? 'sign-in' : 'teacher-schedule'));
  }

  render() {
    return <div>this is layout for mobile</div>;
  }
}

const mapStateToProps = (state) => ({
  user: state.user && state.user.info,
});

export default withRouter(connect(mapStateToProps)(Layout));
