import React from 'react';
import Store from 'store';
import FlatButton from 'components/common/mui/FlatButton';
import { t1 } from 'translate';
import actions from '../../../actions/node/creators';

class Confirm extends React.PureComponent {
  render() {
    const { message, actionName, onClick, closeDialog } = this.props;
    return (
      <div>
        <div>{message}</div>
        <div style={{ textAlign: 'right' }}>
          <FlatButton onClick={onClick} label={actionName || t1('create')} />
          <FlatButton onClick={closeDialog} label={t1('cancel')} />
        </div>
      </div>
    );
  }
}

export default function(message, onClick) {
  const closeDialog = () => {
    Store.dispatch(actions.handleOpenDialog({ openDialog: false }));
  };
  const contentDialog = (
    <Confirm
      message={message}
      onClick={() => {
        closeDialog();
        onClick();
      }}
      closeDialog={closeDialog}
    />
  );

  const optionsProperties = {
    title: t1('confirm'),
    handleClose: true,

    modal: true,
  };

  Store.dispatch(
    actions.handleOpenDialog({ contentDialog, optionsProperties }),
  );
}
