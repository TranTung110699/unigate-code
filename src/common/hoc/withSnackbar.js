import React from 'react';
import { connect } from 'react-redux';
import actions from 'actions/node/creators';

export default () => (Component) =>
  connect(
    null,
    (dispatch) => {
      return {
        showSnackbar: (messageType, message, duration) =>
          dispatch(actions.snackbar(messageType, message, duration)),
      };
    },
  )(Component);
