/**
 * Created by hungvo on 19/04/2017.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Dialog from './Dialog';

class ModalDialogs extends Component {
  render() {
    const { dialogs } = this.props;
    return (
      <div>
        {dialogs &&
          Object.keys(dialogs) &&
          Object.keys(dialogs).map(
            (key) =>
              dialogs[key] && (
                <Dialog
                  key={key}
                  dialogKey={key}
                  {...dialogs[key]}
                  bodyClassName="dialog-content"
                />
              ),
          )}
      </div>
    );
  }
}

ModalDialogs.propTypes = {
  dialogs: PropTypes.shape(),
};

ModalDialogs.defaultProps = {
  dialogs: {},
};

function mapStateToProps(state) {
  return {
    dialogs: state.dialogState,
  };
}

export default connect(mapStateToProps)(ModalDialogs);
