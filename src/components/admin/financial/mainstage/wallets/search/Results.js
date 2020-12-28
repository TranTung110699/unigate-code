import React, { Component } from 'react';
import { connect } from 'react-redux';
import { formatMoney } from 'common';
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
      // stt: '8%',
      student_code: '10%',
      student_name: '15%',
      major: '15%',
      ico: '10%',
      wallet_type: '15%',
      money: '10%',
      vmoney: '10%',
      total: '10%',
    };

    return (
      <div className="table-result">
        <Table>
          <TableHeader
            displaySelectAll={false}
            adjustForCheckbox={false}
            enableSelectAll={false}
          >
            <TableRow>
              {/*<TableHeaderColumn width={width.stt}>{t1('stt')}</TableHeaderColumn>*/}
              <TableHeaderColumn width={width.student_code}>
                {t1('student_code')}
              </TableHeaderColumn>
              <TableHeaderColumn width={width.student_name}>
                {t1('student_name')}
              </TableHeaderColumn>
              <TableHeaderColumn width={width.major}>
                {t1('major')}
              </TableHeaderColumn>
              <TableHeaderColumn width={width.ico}>
                {t1('ico')}
              </TableHeaderColumn>
              <TableHeaderColumn width={width.wallet_type}>
                {t1('wallet_type')}
              </TableHeaderColumn>
              <TableHeaderColumn width={width.money}>
                {t1('money')}
              </TableHeaderColumn>
              <TableHeaderColumn width={width.vmoney}>
                {t1('vmoney')}
              </TableHeaderColumn>
              <TableHeaderColumn width={width.total}>
                {t1('total')}
              </TableHeaderColumn>
            </TableRow>
          </TableHeader>

          <TableBody displayRowCheckbox={false} showRowHover stripedRows>
            {items &&
              items.map((item) => (
                <TableRow key={item.id}>
                  {/*<TableRowColumn width={width.stt}>*/}
                  {/*{item.stt}*/}
                  {/*</TableRowColumn>*/}
                  <TableRowColumn width={width.student_code}>
                    {item.user && item.user.code}
                  </TableRowColumn>
                  <TableRowColumn width={width.student_name}>
                    {item.user && item.user.name}
                  </TableRowColumn>
                  <TableRowColumn width={width.major}>
                    {item.major && item.major.name}
                  </TableRowColumn>
                  <TableRowColumn width={width.ico}>
                    {item.ico && item.ico.name}
                  </TableRowColumn>
                  <TableRowColumn width={width.wallet_type}>
                    {item.wallet_type && item.wallet_type.name}
                  </TableRowColumn>
                  <TableRowColumn width={width.money}>
                    {`${formatMoney(item.money)} ${item.currency}`}
                  </TableRowColumn>
                  <TableRowColumn width={width.vmoney}>
                    {`${formatMoney(item.vmoney)} ${item.currency}`}
                  </TableRowColumn>
                  <TableRowColumn width={width.total}>
                    {`${formatMoney(item.total)} ${item.currency}`}
                  </TableRowColumn>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    );
  }
}

export default connect()(Results);
