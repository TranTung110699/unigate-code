import React, { Component } from 'react';
import { connect } from 'react-redux';
import schema from '../schema/form';
import { constants } from 'configs/constants';
import { t1 } from 'translate';
import actions from 'actions/node/creators';
import UpdateVenue from 'components/admin/venue/room/new/Form';
import DeleteItem from 'components/common/action-button/DeleteBtnWithConfirmDialog';
import IconButton from 'material-ui/IconButton';

class RoomActions extends Component {
  updateItem(item) {
    const { dispatch } = this.props;
    const contentDialog = (
      <UpdateVenue
        title={t1('edit_room')}
        ntype={'venue'}
        mode="edit"
        schema={schema}
        step=""
        node={item}
        params={{
          parent_iid: item.parent_iid,
          type: constants.VenueTypeValue.ROOM,
        }}
        closeModal
        searchFormId="venue_search"
        formid="edit_room"
      />
    );

    const optionsProperties = {
      modal: true,
      handleClose: true,

      title: t1('edit_room'),
    };
    dispatch(actions.handleOpenDialog({ contentDialog, optionsProperties }));
  }

  render() {
    const { formid, room } = this.props;
    return (
      <div>
        <IconButton
          title={t1('edit_room')}
          iconClassName="mi mi-edit"
          onClick={() => this.updateItem(room)}
        />
        <DeleteItem
          formid={formid}
          ntype="venue"
          itemId={room.id}
          params={{ _sand_purge: 1 }}
        />
      </div>
    );
  }
}

export default connect()(RoomActions);
