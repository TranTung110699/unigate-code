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
      teacher: '10%',
      phone_number: '10%',
      class_name: '15%',
      session_time: '25%',
      attendance_info: '15%',
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
              <TableHeaderColumn width={width.teacher} title={t1('teacher')}>
                {t1('teacher')}
              </TableHeaderColumn>
              <TableHeaderColumn
                width={width.phone_number}
                title={t1('phone_number')}
              >
                {t1('phone_number')}
              </TableHeaderColumn>
              <TableHeaderColumn
                width={width.class_name}
                title={t1('class_name')}
              >
                {t1('class_name')}
              </TableHeaderColumn>
              <TableHeaderColumn
                width={width.session_time}
                title={t1('session_time')}
              >
                {t1('session_time')}
              </TableHeaderColumn>
              <TableHeaderColumn
                width={width.attendance_info}
                title={t1('present/_total')}
              >
                {t1('present_/_total')}
              </TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false} showRowHover stripedRows>
            {items &&
              items.map((item) => (
                <TableRow key={item.id}>
                  <TableRowColumn width={width.stt}>{item.stt}</TableRowColumn>
                  <TableRowColumn width={width.teacher}>
                    {item.teacher && item.teacher.name}
                  </TableRowColumn>
                  <TableRowColumn width={width.phone_number}>
                    {item.teacher && item.teacher.phone}
                  </TableRowColumn>
                  <TableRowColumn width={width.class_name}>
                    {item.name}
                  </TableRowColumn>
                  <TableRowColumn width={width.session_time}>
                    {item.session_time}
                  </TableRowColumn>
                  <TableRowColumn width={width.attendance_info}>
                    {item.attendance_info}
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
