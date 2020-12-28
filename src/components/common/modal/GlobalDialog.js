import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import actions from 'actions/node/creators';
import DisplayHtml from 'components/common/html';
import './stylesheet.scss';
import lodashGet from 'lodash.get';
import { set } from 'common/utils/object';

class GlobalDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowFull: false,
    };
  }

  cssClass = 'detail-on-dialog';

  componentDidUpdate() {
    if (typeof this.props.open !== 'undefined') {
      if (this.props.open && !this.state.isShowFull) {
        this.handleShowFull();
      }
      if (!this.props.open && this.state.isShowFull) {
        this.handleCloseDialog();
      }
    }
  }

  handleCloseDialog = () => {
    const { dispatch, dialogKey } = this.props;
    dispatch(actions.handleOpenDialog({ openDialog: false }, dialogKey));
  };

  handleCloseDialogSuccessFull = () => {
    if (this.state.isShowFull) {
      this.setState({
        isShowFull: false,
      });
    }
  };

  componentDidMount() {
    const { open } = this.props;
    if (open) {
      this.handleShowFull();
    }
  }

  handleShowFull = () => {
    const { onShowFull } = this.props;
    this.renderContentDialog(this.props);

    if (typeof onShowFull === 'function') {
      onShowFull();
    }

    if (!this.state.isShowFull) {
      this.setState({
        isShowFull: true,
      });
    }
  };

  renderContentDialog = (props) => {
    const { renderFull, textFull, dialogOptionsProperties, dialogKey } = props;
    let contentDialog = null;
    if (renderFull) {
      contentDialog = renderFull(
        { closeDialog: this.handleCloseDialog },
        props,
      );
    } else if (textFull) {
      contentDialog = <DisplayHtml content={textFull} />;
    }

    let optionsProperties = dialogOptionsProperties || {
      handleClose: true,
    };

    const onCloseDialog = lodashGet(
      optionsProperties,
      'callbacks.onCloseDialog',
    );

    optionsProperties = set(
      optionsProperties,
      'callbacks.onCloseDialog',
      () => {
        this.handleCloseDialogSuccessFull();
        if (typeof onCloseDialog === 'function') {
          onCloseDialog();
        }
      },
    );

    this.props.dispatch(
      actions.handleOpenDialog(
        {
          contentDialog,
          optionsProperties,
        },
        dialogKey,
      ),
    );
  };

  render() {
    return null;
  }
}

GlobalDialog.propTypes = {
  className: PropTypes.string,
  dialogKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  dialogOptionsProperties: PropTypes.shape(),
  renderFull: PropTypes.func,
  textFull: PropTypes.string,
  textPreview: PropTypes.string || PropTypes.func,
  onShowFull: PropTypes.func,
};

GlobalDialog.defaultProps = {
  className: '',
  dialogKey: 'default',
  dialogOptionsProperties: null,
  renderFull: null,
  textFull: '',
  textPreview: '',
  onShowFull: null,
};

export default connect()(GlobalDialog);
