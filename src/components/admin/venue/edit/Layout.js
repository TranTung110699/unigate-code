import React, { Component } from 'react';
import { connect } from 'react-redux';

import { t1, t2 } from 'translate';
import actions from 'actions/node/creators';
import { constants } from 'configs/constants';
import { getParams } from 'common';
import SubTopMenuContext from 'common/context/menu/SubMenuTop';
import Widget from 'components/common/Widget';

import NodeNew from 'components/admin/node/new';
import RaisedButton from 'components/common/mui/RaisedButton';
import NewRoom from 'components/admin/venue/room/new/Form';
import withNodeEditContainer from 'components/admin/node/edit/withNodeEditContainer';
import venueSchema from 'components/admin/venue/schema/form';

import RoomSearch from '../room/search/Layout';
import topMenuSchema from '../menu/MainstageTopMenu';

class EditVenue extends Component {
  newRoom = () => {
    const { dispatch, node } = this.props;
    const contentDialog = (
      <NewRoom
        mode="new"
        title={t1('new_room')}
        step=""
        params={{
          parent_iid: node.iid,
          type: constants.VenueTypeValue.ROOM,
          is_virtual: node.is_virtual,
        }}
        formid="new_room"
      />
    );
    const optionsProperties = {
      modal: true,
      handleClose: true,

      title: t1('new_room'),
    };
    dispatch(actions.handleOpenDialog({ contentDialog, optionsProperties }));
  };

  render() {
    const { node, requestSuccessful } = this.props;
    const iid = getParams(this.props).iid;

    return [
      <SubTopMenuContext schema={topMenuSchema()} />,
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-4">
            <Widget title={t1('venue_information')}>
              <NodeNew
                title={t2('edit_venue')}
                ntype={constants.VenueTypeValue.REVENUE}
                schema={venueSchema}
                mode="edit"
                step=""
                requestSuccessful={requestSuccessful}
                node={node}
                hiddenFields={{ type: constants.VenueTypeValue.REVENUE }}
                closeModal
                searchFormId="venue_search"
                formid="edit_venue"
              />
            </Widget>
          </div>
          <div className="col-md-8">
            <Widget title={t1('rooms_in_building')}>
              <RoomSearch iid={iid} node={node} />
              <div className="m-t-10">
                <RaisedButton
                  className="mui-button mui-button--primary"
                  primary
                  onClick={this.newRoom}
                  label={t1('add_new_room')}
                />
              </div>
            </Widget>
          </div>
        </div>
      </div>,
    ];
  }
}

// const mapStateToProps = (state) => getEditingItemSelector(state);

export default withNodeEditContainer(connect()(EditVenue));
