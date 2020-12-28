import { t1 } from 'translate';
import React, { Component } from 'react';
import Icon from 'antd/lib/icon';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'components/common/mui/FlatButton';

class Confirm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  handleClose = () => {
    this.setState({ open: false });
  };

  handleOpen = () => {
    this.setState({ open: true });
  };
  handleCancelItem = () => {
    this.props.handleAction();
    this.handleClose();
  };

  render() {
    let { title, textConfirm } = this.props;
    title = title || t1('cancel_item');

    const actions = [
      <FlatButton label={t1('cancel')} primary onClick={this.handleClose} />,
      <FlatButton label={t1('ok')} primary onClick={this.handleCancelItem} />,
    ];
    textConfirm = textConfirm || t1('are_you_sure_you_want_to_do_this');
    return (
      <span>
        <Icon title={title} type="close" onClick={this.handleOpen} />
        <Dialog
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          {textConfirm}
        </Dialog>
      </span>
    );
  }
}

export default Confirm;
