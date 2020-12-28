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
                {t1('name')}
              </TableHeaderColumn>
              <TableHeaderColumn width="10%" rowSpan="2">
                {t1('phone')}
              </TableHeaderColumn>
              <TableHeaderColumn width="10%" rowSpan="2">
                {t1('email')}
              </TableHeaderColumn>
              <TableHeaderColumn
                colSpan="2"
                style={this.tableHeaderColumnStyle}
              >
                {t1('contract')}
              </TableHeaderColumn>
              <TableHeaderColumn
                colSpan="3"
                style={this.tableHeaderColumnStyle}
              >
                {t1('hours_number')}
              </TableHeaderColumn>
            </TableRow>
            <TableRow>
              <TableHeaderColumn>{t1('kind')}</TableHeaderColumn>
              <TableHeaderColumn>{t1('hourly_rate')}</TableHeaderColumn>
              <TableHeaderColumn>{t1('taught')}</TableHeaderColumn>
              <TableHeaderColumn>{t1('assigned')}</TableHeaderColumn>
              <TableHeaderColumn>{t1('not_taught')}</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          {items && items.length && (
            <TableBody displayRowCheckbox={false} showRowHover>
              {items.map((item) => (
                <TableRow key={item.id || item.iid}>
                  <TableRowColumn width="10%">
                    {item && item.stt}
                  </TableRowColumn>
                  {item.count_teaching_hours && item.count_teaching_hours && (
                    <TableRowColumn
                      rowSpan={item.count_teaching_hours}
                      width="10%"
                    >
                      {item.session_scheduled_month &&
                        this.showMonthLabel(item.session_scheduled_month)}
                    </TableRowColumn>
                  )}
                  <TableRowColumn width="10%">
                    {item && item.teacher && item.teacher.name} (
                    {item && item.teacher && item.teacher.iid})
                  </TableRowColumn>
                  <TableRowColumn width="10%">
                    {item && item.teacher && item.teacher.phone}
                  </TableRowColumn>
                  <TableRowColumn width="10%">
                    {item && item.teacher && item.teacher.email}
                  </TableRowColumn>
                  <TableRowColumn>
                    {item && item.contract && item.contract.type}
                  </TableRowColumn>
                  <TableRowColumn>
                    {item && item.contract && item.contract.hourly_rate}
                  </TableRowColumn>
                  <TableRowColumn>{item && item.taught_hours}</TableRowColumn>
                  <TableRowColumn>{item && item.assigned_hours}</TableRowColumn>
                  <TableRowColumn>
                    {item && item.not_taught_hours}
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
