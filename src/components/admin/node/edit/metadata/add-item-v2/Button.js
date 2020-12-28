import React, { Component } from 'react';
import { t1 } from '../../../../../../translate';
import RaisedButton from 'components/common/mui/RaisedButton';
import actions from 'actions/node/creators';
import AddItemPreview from '../add-item-preview';

class AddItemV2 extends Component {
  chooseItemToAddDialog() {
    const { dispatch, parentItem } = this.props;
    const contentDialog = <AddItemPreview parentItem={parentItem} />;
    const title = t1('new_ico');
    const optionsProperties = {
      handleClose: true,

      modal: true,
      title,
    };
    dispatch(actions.handleOpenDialog({ contentDialog, optionsProperties }));
  }
  render() {
    return (
      <span>
        <RaisedButton
          label={'+'}
          onClick={() => {
            this.chooseItemToAddDialog();
          }}
        />
      </span>
    );
  }
}
