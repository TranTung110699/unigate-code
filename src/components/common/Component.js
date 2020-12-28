import React, { Component } from 'react';
import { change } from 'redux-form';
import actions from 'actions/node/creators';
import MyIframe from 'components/common/iframe/MyIframe';
import Form from 'components/admin/user/new/Form';
import { t1, t2 } from 'translate';

class CommonComponent extends Component {
  openIframe(iframe, src, height, width) {
    const { dispatch } = this.props;

    const contentDialog = (
      <div>
        <MyIframe iframe={iframe} src={src} height={height} width={width} />
      </div>
    );

    const optionsProperties = {
      modal: true,
      handleClose: true,
      width: '90%',
    };

    dispatch(actions.handleOpenDialog({ contentDialog, optionsProperties }));
  }

  updatePassword(item) {
    const { dispatch } = this.props;

    const localItem = item;
    localItem.pass = '';

    dispatch(change('edit_password', 'pass', ''));

    const contentDialog = (
      <Form
        mode="edit"
        node={localItem}
        alternativeApi="/user/update"
        formid="edit_password"
        title={item.name}
        step="set_pass"
      />
    );
    const optionsProperties = {
      modal: true,
      handleClose: true,

      title: `${t1('update_account')} ${t2(item.name)}`,
    };
    dispatch(actions.handleOpenDialog({ contentDialog, optionsProperties }));
  }
}

export default CommonComponent;
