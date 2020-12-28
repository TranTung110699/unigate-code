import React from 'react';
import { connect } from 'react-redux';
// import actions from 'actions/node/creators';
import lodashGet from 'lodash.get';
// import antMessage from 'antd/lib/message';
import notification from 'antd/lib/notification';

class SnackbarSimple extends React.Component {
  componentWillReceiveProps(nextProps) {
    const { snackbar } = nextProps;
    const { message, messageType } = snackbar;
    if (!message) return;

    const getContainer = () => {
      // THIS IS A HACK SO THAT WE CAN MAKE SURE THE SNACK BAR IS SHOWN ON SCREEN

      // TODO: add more case here to your specific use cases OR create a better mechanic
      // case exam full screen
      const examBody = document.getElementsByClassName(
        'learn-exercise-exam__body',
      )[0];
      if (examBody) {
        return examBody;
      }

      // default case
      return document.body;
    };

    let duration = lodashGet(snackbar, 'duration', 4.5);

    notification.config({
      duration,
    });

    if (messageType === 'success' || messageType === true)
      notification.success({
        getContainer,
        message,
        // description: message,
      });
    else if (messageType === 'error') {
      notification.destroy();
      notification.error({
        message,
        getContainer,
        // description: message,
      });
    } else if (messageType === 'warning')
      notification.warning({
        getContainer,
        message, // t3('warning'),
        // description: message,
      });
  }

  render() {
    return null;
  }
}

function mapStateToProps(state) {
  return { snackbar: lodashGet(state, 'ui.snackbar') };
}

export default connect(mapStateToProps)(SnackbarSimple);
