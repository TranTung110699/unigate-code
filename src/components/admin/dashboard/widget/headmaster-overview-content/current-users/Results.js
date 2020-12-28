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
      student_code: '10%',
      name: '10%',
      phone_number: '10%',
      class_name: '15%',
      major: '15%',
      ico: '15%',
      status: '15%',
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
              <TableHeaderColumn
                width={width.student_code}
                title={t1('student_code')}
              >
                {t1('student_code')}
              </TableHeaderColumn>
              <TableHeaderColumn width={width.name} title={t1('name')}>
                {t1('name')}
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
              <TableHeaderColumn width={width.major} title={t1('major')}>
                {t1('major')}
              </TableHeaderColumn>
              <TableHeaderColumn width={width.ico} title={t1('ico')}>
                {t1('ico')}
              </TableHeaderColumn>
              <TableHeaderColumn width={width.status} title={t1('status')}>
                {t1('status')}
              </TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false} showRowHover stripedRows>
            {items &&
              items.map((item) => (
                <TableRow key={item.id}>
                  <TableRowColumn width={width.stt}>{item.stt}</TableRowColumn>
                  <TableRowColumn width={width.student_code}>
                    {item.code || item.admission_code}
                  </TableRowColumn>
                  <TableRowColumn width={width.name}>
                    {item.name}
                  </TableRowColumn>
                  <TableRowColumn width={width.phone_number}>
                    {item.phone}
                  </TableRowColumn>
                  <TableRowColumn width={width.class_name}>
                    {item.course && item.course.name}
                  </TableRowColumn>
                  <TableRowColumn width={width.major}>
                    {item.major && item.major.name}
                  </TableRowColumn>
                  <TableRowColumn width={width.ico}>
                    {item.ico && item.ico.name}
                  </TableRowColumn>
                  <TableRowColumn width={width.status}>
                    {item.status}
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
