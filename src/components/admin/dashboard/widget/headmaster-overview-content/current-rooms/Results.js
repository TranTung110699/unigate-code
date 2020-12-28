import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { t1 } from 'translate';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'components/common/mui/Table';

class Results extends Component {
  render() {
    const { items } = this.props;

    const width = {
      stt: '8%',
      room: '15%',
      building: '15%',
      status: '10%',
      capacity: '10%',
    };

    return (
      <div className="table-result">
        <Table>
          <TableHeader
            displaySelectAll={false}
            enableSelectAll={false}
            adjustForCheckbox={false}
          >
            <TableRow>
              <TableHeaderColumn width={width.stt} title={t1('stt')}>
                {t1('stt')}
              </TableHeaderColumn>
              <TableHeaderColumn width={width.room} title={t1('room')}>
                {t1('room')}
              </TableHeaderColumn>
              <TableHeaderColumn width={width.building} title={t1('building')}>
                {t1('building')}
              </TableHeaderColumn>
              <TableHeaderColumn width={width.status} title={t1('status')}>
                {t1('status')}
              </TableHeaderColumn>
              <TableHeaderColumn width={width.capacity} title={t1('capacity')}>
                {t1('capacity')}
              </TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false} showRowHover stripedRows>
            {items &&
              items.map((item) => (
                <TableRow key={item.id}>
                  <TableRowColumn width={width.stt}>{item.stt}</TableRowColumn>
                  <TableRowColumn width={width.room}>
                    {item.name}
                  </TableRowColumn>
                  <TableRowColumn width={width.building}>
                    {item.building && item.building.name}
                  </TableRowColumn>
                  <TableRowColumn width={width.status}>
                    {item.status}
                  </TableRowColumn>
                  <TableRowColumn width={width.capacity}>
                    {item.room_seat}
                  </TableRowColumn>
                </TableRow>
              ))}
          </TableBody>
        </Table>
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

export default Results;
