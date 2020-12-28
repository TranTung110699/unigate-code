import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import RaisedButton from 'components/common/mui/RaisedButton';
import { t1 } from 'translate';
import {
  TableAsReduxFormField as Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'schema-form/elements/table';

import actions from 'actions/node/creators';
import { timetableActions } from '../../../actions/timetable';
import apiEndpoints from 'api-endpoints';

const checkKey = 'iid';
const keysSave = ['id', 'iid', 'name'];
const style = {
  buttonChoose: { width: '100%', textAlign: 'center', paddingTop: '16px' },
};

class Results extends Component {
  handleChooseRoom = () => {
    const { clazz, rooms, dispatch } = this.props;
    if (!clazz) {
      return;
    }
    const roomIids = rooms.map((room) => room.iid);
    dispatch(
      timetableActions.addRoomsToClass(
        apiEndpoints.add_room_to_class,
        clazz.iid,
        roomIids,
      ),
    );
    dispatch(actions.handleOpenDialog({ openDialog: false }));
  };

  render() {
    const { items, rooms } = this.props;
    return (
      <div className="table-result">
        <Table
          multiSelectable
          name="room_selected_ids"
          itemList={items}
          checkKey={checkKey}
          keysSave={keysSave}
        >
          <TableHeader displaySelectAll enableSelectAll adjustForCheckbox>
            <TableRow>
              <TableHeaderColumn width="7%" title={t1('iid')}>
                {t1('iid')}
              </TableHeaderColumn>
              <TableHeaderColumn title={t1('name')}>
                {t1('name')}
              </TableHeaderColumn>
              <TableHeaderColumn title={t1('floor')}>
                {t1('floor')}
              </TableHeaderColumn>
              <TableHeaderColumn title={t1('room_seat')}>
                {t1('room_seat')}
              </TableHeaderColumn>
              <TableHeaderColumn title={t1('room_type')}>
                {t1('room_type')}
              </TableHeaderColumn>
            </TableRow>
          </TableHeader>

          <TableBody displayRowCheckbox showRowHover stripedRows>
            {items &&
              items.map((item) => (
                <TableRow key={item.id}>
                  <TableRowColumn>{item.iid}</TableRowColumn>
                  <TableRowColumn>{item.name}</TableRowColumn>
                  <TableRowColumn>{item.floor_number}</TableRowColumn>
                  <TableRowColumn>
                    {item.room_seat} ({item.room_size} m2)
                  </TableRowColumn>
                  <TableRowColumn>{item.room_type}</TableRowColumn>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <div style={style.buttonChoose}>
          <RaisedButton
            className="m-l-10"
            onClick={this.handleChooseRoom}
            label={t1('choose')}
            primary
            disabled={!rooms || rooms.length === 0}
          />
        </div>
      </div>
    );
  }
}

Results.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
};

Results.defaultProps = {
  items: [],
};

const mapStateToProps = (state) => {
  const selectRoomForm = state.form.selectRoom;
  return {
    rooms:
      selectRoomForm &&
      selectRoomForm.values &&
      selectRoomForm.values.room_selected_ids,
  };
};

export default reduxForm({
  form: 'selectRoom',
})(connect(mapStateToProps)(Results));
