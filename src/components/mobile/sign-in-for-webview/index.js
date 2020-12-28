import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Request from 'common/network/http/Request';
import nodeActions from 'actions/node/creators';
import { loginSuccess } from 'actions/auth';

class Layout extends Component {
  componentDidMount() {
    const { lname, pass, dispatch } = this.props;
    if (lname && pass) {
      Request.get('/user/login', { lname, pass })
        .then((response) => {
          if (response.success) {
            dispatch(loginSuccess(response.result));
            dispatch(nodeActions.snackbar(true, response.message));
          }
        })
        .catch((response) => {
          dispatch(nodeActions.snackbar(true, response.message));
        });
    }
  }

  render() {
    return '';
  }
}

const mapStateToProps = (state, props) => {
  const { match } = props;
  const { lname, pass } = match && match.params;
  return {
    lname,
    pass,
  };
};

export default withRouter(connect(mapStateToProps)(Layout));
