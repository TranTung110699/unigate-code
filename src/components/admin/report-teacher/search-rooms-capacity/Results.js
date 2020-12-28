import React, { Component } from 'react';
import { connect } from 'react-redux';
import { t1 } from 'translate';
import { monthsSelect } from 'common/utils/Date';

import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'components/common/mui/Table';

class Results extends Component {
  tableHeaderColumnStyle = { textAlign: 'center' };
  showMonthLabel = (monthValue) => {
    return monthsSelect.find((month) => month.value === monthValue).primaryText;
  };

  render() {
    const { items } = this.props;

    return (
      <div className="table-result">
        <Table>
          <TableHeader
            displaySelectAll={false}
            enableSelectAll={false}
            adjustForCheckbox={false}
          >
            <TableRow>
              <TableHeaderColumn width="10%" rowSpan="2">
                {t1('stt')}
              </TableHeaderColumn>
              <TableHeaderColumn width="10%" rowSpan="2">
                {t1('month')}
              </TableHeaderColumn>
              <TableHeaderColumn width="10%" rowSpan="2">
                {t1('room_name')}
              </TableHeaderColumn>
              <TableHeaderColumn width="10%" rowSpan="2">
                {t1('theater_name')}
              </TableHeaderColumn>
              <TableHeaderColumn width="10%" rowSpan="2">
                {t1('floor')}
              </TableHeaderColumn>
              <TableHeaderColumn
                colSpan="3"
                style={this.tableHeaderColumnStyle}
              >
                {t1('hours_number')}
              </TableHeaderColumn>
            </TableRow>
            <TableRow>
              <TableHeaderColumn>{t1('used')}</TableHeaderColumn>
              <TableHeaderColumn>{t1('assigned')}</TableHeaderColumn>
              <TableHeaderColumn>{t1('not_used')}</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          {items &&
            items.length && (
              <TableBody displayRowCheckbox={false} showRowHover>
                {items.map((item) => (
                  <TableRow key={item.id || item.iid}>
                    <TableRowColumn width="10%">
                      {item && item.stt}
                    </TableRowColumn>
                    {item.count_rooms_capacity &&
                      item.count_rooms_capacity && (
                        <TableRowColumn
                          rowSpan={item.count_rooms_capacity}
                          width="10%"
                        >
                          {item.assigned_month_ts &&
                            this.showMonthLabel(item.assigned_month_ts)}
                        </TableRowColumn>
                      )}
                    <TableRowColumn width="10%">
                      {item && item.room && item.room.name}
                    </TableRowColumn>
                    <TableRowColumn width="10%">
                      {item && item.theater && item.theater.name}
                    </TableRowColumn>
                    <TableRowColumn width="10%">
                      {item && item.room && item.room.floor_number}
                    </TableRowColumn>
                    <TableRowColumn>{item && item.used_hours}</TableRowColumn>
                    <TableRowColumn>
                      {item && item.assigned_hours}
                    </TableRowColumn>
                    <TableRowColumn>
                      {item && item.not_used_hours}
                    </TableRowColumn>
                  </TableRow>
                ))}
              </TableBody>
            )}
        </Table>
      </div>
    );
  }
}

export default connect()(Results);
